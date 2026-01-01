let audioCtx: AudioContext | null = null

export function getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null

    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
        if (AudioContextClass) {
            audioCtx = new AudioContextClass()
        }
    }
    return audioCtx
}

export function resumeAudioContext() {
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(console.error)
    }
}
