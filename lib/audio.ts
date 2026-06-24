/** Lazily created, shared AudioContext — created on first user gesture. */
let _ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null
  try {
    const AC =
      window.AudioContext ??
      (window as unknown as Record<string, typeof AudioContext>)["webkitAudioContext"]
    if (!_ctx || _ctx.state === "closed") _ctx = new AC()
    if (_ctx.state === "suspended") void _ctx.resume()
    return _ctx
  } catch {
    return null
  }
}

function note(
  ac: AudioContext,
  freq: number,
  offsetSec: number,
  durationSec: number,
  peak: number,
  type: OscillatorType = "sine",
): void {
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  const t = ac.currentTime + offsetSec
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.linearRampToValueAtTime(peak, t + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + durationSec)
  osc.connect(gain)
  gain.connect(ac.destination)
  osc.start(t)
  osc.stop(t + durationSec + 0.05)
}

// ─── Netflix Ta-Dum ──────────────────────────────────────────────────────────
// Uses the real Netflix intro sound served from /sounds/netflix-tadum.mp3.

export function playNetflixTaDum(): void {
  if (typeof window === "undefined") return
  try {
    const audio = new Audio("/sounds/netflix-tadum.mp3")
    audio.volume = 0.75
    void audio.play()
  } catch { /* autoplay blocked — silently skip */ }
}

// ─── DTMF Keypad Tones ──────────────────────────────────────────────────────

const DTMF: Record<string, [number, number]> = {
  "1": [697, 1209], "2": [697, 1336], "3": [697, 1477],
  "4": [770, 1209], "5": [770, 1336], "6": [770, 1477],
  "7": [852, 1209], "8": [852, 1336], "9": [852, 1477],
  "*": [941, 1209], "0": [941, 1336], "#": [941, 1477],
}

export function playDTMF(digit: string): void {
  const ac = getCtx()
  if (!ac) return
  const freqs = DTMF[digit]
  if (!freqs) return
  note(ac, freqs[0], 0, 0.12, 0.18)
  note(ac, freqs[1], 0, 0.12, 0.18)
}

// ─── Phone Ringtone ─────────────────────────────────────────────────────────

let _ringOsc: OscillatorNode | null = null
let _ringGain: GainNode | null = null
let _ringTimer: ReturnType<typeof setTimeout> | null = null

export function startRingtone(): void {
  const ac = getCtx()
  if (!ac || _ringOsc) return

  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = "sine"
  osc.frequency.value = 480
  gain.gain.value = 0
  osc.connect(gain)
  gain.connect(ac.destination)
  osc.start()
  _ringOsc = osc
  _ringGain = gain

  // Double-ring: 400ms ON → 200ms OFF → 400ms ON → 2 000ms OFF → repeat
  const pattern = [400, 200, 400, 2000]
  let idx = 0

  const tick = () => {
    if (!_ringGain) return
    const isOn = idx % 2 === 0
    _ringGain.gain.setValueAtTime(isOn ? 0.18 : 0, ac.currentTime)
    idx++
    _ringTimer = setTimeout(tick, pattern[(idx - 1) % 4])
  }
  tick()
}

export function stopRingtone(): void {
  if (_ringTimer) { clearTimeout(_ringTimer); _ringTimer = null }
  if (_ringOsc && _ringGain) {
    try {
      _ringGain.gain.setValueAtTime(0, _ringOsc.context.currentTime)
      _ringOsc.stop()
    } catch { /* already stopped */ }
    _ringOsc = null
    _ringGain = null
  }
}

// ─── Hang-up Sound ───────────────────────────────────────────────────────────

export function playHangup(): void {
  const ac = getCtx()
  if (!ac) return
  // Clean low thud — sine only, no harsh square waves
  note(ac, 60,  0.000, 0.12, 0.32)  // deep fundamental
  note(ac, 120, 0.000, 0.05, 0.10)  // subtle octave harmonic
}

// ─── Spotify Ambient Loop ────────────────────────────────────────────────────

let _ambOscs: OscillatorNode[] = []
let _ambMaster: GainNode | null = null
let _ambLfo: OscillatorNode | null = null

export function startAmbientLoop(): void {
  const ac = getCtx()
  if (!ac || _ambOscs.length) return

  const master = ac.createGain()
  master.gain.value = 0.0001

  // Warm lo-fi lowpass filter
  const lpf = ac.createBiquadFilter()
  lpf.type = "lowpass"
  lpf.frequency.value = 1100
  lpf.Q.value = 0.7

  // Small feedback delay for depth
  const delay = ac.createDelay(0.5)
  delay.delayTime.value = 0.25
  const fb = ac.createGain()
  fb.gain.value = 0.32
  delay.connect(fb)
  fb.connect(delay)

  master.connect(lpf)
  lpf.connect(ac.destination)
  lpf.connect(delay)
  delay.connect(ac.destination)

  // Gentle tremolo LFO
  const lfo = ac.createOscillator()
  const lfoGain = ac.createGain()
  lfo.frequency.value = 0.10
  lfoGain.gain.value = 0.025
  lfo.connect(lfoGain)
  lfoGain.connect(master.gain)
  lfo.start()
  _ambLfo = lfo

  // C-minor pentatonic drone: C2 G2 C3 Eb3 G3 Bb3
  const voices: [number, OscillatorType, number][] = [
    [65.41,  "sine",     0],
    [98.00,  "sine",     3],
    [130.81, "sine",    -4],
    [155.56, "triangle", 6],
    [196.00, "triangle",-2],
    [233.08, "triangle", 5],
  ]

  _ambOscs = voices.map(([f, type, detune]) => {
    const osc = ac.createOscillator()
    osc.type = type
    osc.frequency.value = f
    osc.detune.value = detune
    osc.connect(master)
    osc.start()
    return osc
  })

  _ambMaster = master

  // Fade in over 1.2 s
  const now = ac.currentTime
  master.gain.setValueAtTime(0.0001, now)
  master.gain.linearRampToValueAtTime(0.10, now + 1.2)
}

export function stopAmbientLoop(): void {
  if (!_ambMaster || !_ambOscs.length) return
  const ac = getCtx()
  const now = ac?.currentTime ?? 0

  _ambMaster.gain.setValueAtTime(_ambMaster.gain.value, now)
  _ambMaster.gain.linearRampToValueAtTime(0.0001, now + 0.5)

  const oscs = _ambOscs
  const lfo = _ambLfo
  _ambOscs = []
  _ambMaster = null
  _ambLfo = null

  setTimeout(() => {
    try { oscs.forEach((o) => o.stop()); lfo?.stop() } catch { /* ignore */ }
  }, 600)
}

// ─── Messages Bubble Pop ─────────────────────────────────────────────────────

export function playBubblePop(): void {
  const ac = getCtx()
  if (!ac) return
  // Gentle pitch-rising sine pop: 180 Hz → 260 Hz over 30 ms, fades in 90 ms
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  const t = ac.currentTime
  osc.type = "sine"
  osc.frequency.setValueAtTime(180, t)
  osc.frequency.exponentialRampToValueAtTime(260, t + 0.03)
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.linearRampToValueAtTime(0.30, t + 0.005)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09)
  osc.connect(gain)
  gain.connect(ac.destination)
  osc.start(t)
  osc.stop(t + 0.12)
}

// ─── Mail Send Whoosh ────────────────────────────────────────────────────────

export function playMailWhoosh(): void {
  const ac = getCtx()
  if (!ac) return
  // Descending frequency sweep (paper sliding away): 900 Hz → 180 Hz over 320 ms
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  const t = ac.currentTime
  osc.type = "sine"
  osc.frequency.setValueAtTime(900, t)
  osc.frequency.exponentialRampToValueAtTime(180, t + 0.32)
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.linearRampToValueAtTime(0.22, t + 0.04)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.34)
  osc.connect(gain)
  gain.connect(ac.destination)
  osc.start(t)
  osc.stop(t + 0.38)
  // Airy texture layer — thin triangle at upper harmonic
  note(ac, 2700, 0.01, 0.18, 0.05, "triangle")
}

// ─── Settings Tactile Click ──────────────────────────────────────────────────

export function playToggleClick(): void {
  const ac = getCtx()
  if (!ac) return
  // Soft sine tick — no square waves, gain kept low so it's present but never jarring
  note(ac, 1200, 0.000, 0.012, 0.06)
  note(ac, 900,  0.010, 0.010, 0.03)
}
