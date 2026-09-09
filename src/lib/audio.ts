const moduleScope: {
  ctx: AudioContext | null
  master: GainNode | null
  pulseGain: GainNode | null
  running: boolean
  pulseId: number | null
} = {
  ctx: null,
  master: null,
  pulseGain: null,
  running: false,
  pulseId: null,
}

const JUDGMENT_TS = Date.UTC(2026, 8, 16, 8, 0, 0)

function pulseInterval(now: number): number {
  const total = JUDGMENT_TS - Date.UTC(2026, 0, 1, 0, 0, 0)
  const left = Math.max(0, JUDGMENT_TS - now)
  const frac = Math.min(1, left / total)
  return 520 + frac * 940
}

function ensureContext(): AudioContext | null {
  if (moduleScope.ctx) return moduleScope.ctx
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    const ctx = new AC()
    moduleScope.ctx = ctx
    return ctx
  } catch {
    return null
  }
}

function buildNoiseBuffer(ctx: AudioContext, seconds = 2) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) {
    data[i] = Math.random() * 2 - 1
  }
  return buffer
}

export const ambient = {
  get running() {
    return moduleScope.running
  },

  async start() {
    if (moduleScope.running) return
    const ctx = ensureContext()
    if (!ctx) return
    await ctx.resume()
    if (ctx.state !== 'running') {
      // still blocked — will be resumed on first user gesture elsewhere
    }

    const master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)

    const droneGain = ctx.createGain()
    droneGain.gain.value = 0.055
    droneGain.connect(master)

    const osc1 = ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.value = 55
    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = 82.4
    const osc3 = ctx.createOscillator()
    osc3.type = 'triangle'
    osc3.frequency.value = 110.1
    const osc3Gain = ctx.createGain()
    osc3Gain.gain.value = 0.14
    osc3.connect(osc3Gain)
    osc3Gain.connect(droneGain)
    osc1.connect(droneGain)
    osc2.connect(droneGain)

    const noiseSrc = ctx.createBufferSource()
    noiseSrc.buffer = buildNoiseBuffer(ctx)
    noiseSrc.loop = true
    const noiseFilter = ctx.createBiquadFilter()
    noiseFilter.type = 'lowpass'
    noiseFilter.frequency.value = 320
    const noiseGain = ctx.createGain()
    noiseGain.gain.value = 0.012
    noiseSrc.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(master)

    osc1.start()
    osc2.start()
    osc3.start()
    noiseSrc.start()

    // pulse layer — tempo accelerates as the day approaches
    const pulseGain = ctx.createGain()
    pulseGain.gain.value = 0
    pulseGain.connect(master)
    const pulseOsc = ctx.createOscillator()
    pulseOsc.type = 'sine'
    pulseOsc.frequency.value = 52
    const pulseFilter = ctx.createBiquadFilter()
    pulseFilter.type = 'lowpass'
    pulseFilter.frequency.value = 90
    pulseOsc.connect(pulseFilter)
    pulseFilter.connect(pulseGain)
    pulseOsc.start()

    function thump() {
    const ctx = moduleScope.ctx
    const gain = moduleScope.pulseGain
    if (!ctx || !gain) return
    const t = ctx.currentTime
    gain.gain.cancelScheduledValues(t)
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(0.5, t + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5)
  }

  function schedulePulse() {
    const loop = () => {
      thump()
      moduleScope.pulseId = window.setTimeout(loop, pulseInterval(Date.now()))
    }
    loop()
  }

  schedulePulse()

  master.gain.setValueAtTime(0, ctx.currentTime)
  master.gain.linearRampToValueAtTime(1, ctx.currentTime + 3.5)

  moduleScope.master = master
  moduleScope.pulseGain = pulseGain
  moduleScope.running = true
},

  async stop() {
    if (moduleScope.pulseId !== null) {
      window.clearTimeout(moduleScope.pulseId)
      moduleScope.pulseId = null
    }
    if (!moduleScope.ctx || !moduleScope.master) {
      moduleScope.running = false
      return
    }
    const ctx = moduleScope.ctx
    const master = moduleScope.master
    master.gain.cancelScheduledValues(ctx.currentTime)
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime)
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6)
    window.setTimeout(() => {
      master.disconnect()
      moduleScope.master = null
      moduleScope.running = false
    }, 750)
  },
}