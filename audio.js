(() => {
  'use strict';
const FEEDBACK_TONES = {
  correct: [
    { frequency: 587.33, delay: 0, duration: .11, volume: .22, wave: 'triangle' },
    { frequency: 739.99, delay: .085, duration: .12, volume: .22, wave: 'triangle' },
    { frequency: 880, delay: .17, duration: .19, volume: .2, wave: 'triangle' }
  ],
  wrong: [
    { frequency: 880, delay: 0, duration: .12, volume: .18, wave: 'triangle' },
    { frequency: 739.99, delay: .095, duration: .15, volume: .17, wave: 'triangle' },
    { frequency: 587.33, endFrequency: 440, delay: .21, duration: .32, volume: .17, wave: 'triangle' }
  ],
  'builder-correct': [
    { frequency: 523.25, delay: 0, duration: .13, volume: .3, wave: 'sine' },
    { frequency: 659.25, delay: .09, duration: .15, volume: .28, wave: 'sine' },
    { frequency: 783.99, delay: .19, duration: .24, volume: .27, wave: 'sine' }
  ],
  'builder-wrong': [
    { frequency: 392, delay: 0, duration: .16, volume: .27, wave: 'square' },
    { frequency: 293.66, delay: .14, duration: .28, volume: .24, wave: 'square' }
  ],
  'builder-tick': [
    { frequency: 1320, endFrequency: 980, delay: 0, duration: .042, volume: .07, wave: 'triangle', attack: .003 },
    { frequency: 2200, endFrequency: 1760, delay: .004, duration: .022, volume: .035, wave: 'sine', attack: .002 }
  ],
  tick: [{ frequency: 1046.5, delay: 0, duration: .045, volume: .075, wave: 'triangle' }]
};

  let audioContext = null;
  let enabled = true;
  try { enabled = localStorage.getItem('quick-tap-sound-enabled') !== 'false'; } catch {}
  function prepareAudio() {
    if (!enabled) return null;
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return null;
    try {
      if (!audioContext) audioContext = new Context();
      if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
      return audioContext;
    } catch { return null; }
  }
function playFeedbackSound(type) {
  if (!prepareAudio()) return;
  const startTime = audioContext.currentTime;
  const tones = FEEDBACK_TONES[type] || [];

  tones.forEach(tone => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const toneStart = startTime + tone.delay;
    const toneEnd = toneStart + tone.duration;
    oscillator.type = tone.wave || 'triangle';
    oscillator.frequency.setValueAtTime(tone.frequency, toneStart);
    if (tone.endFrequency) {
      oscillator.frequency.exponentialRampToValueAtTime(tone.endFrequency, toneEnd);
    }
    gain.gain.setValueAtTime(.0001, toneStart);
    gain.gain.exponentialRampToValueAtTime(tone.volume, toneStart + (tone.attack || .018));
    gain.gain.exponentialRampToValueAtTime(.0001, toneEnd);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.addEventListener('ended', () => {
      oscillator.disconnect();
      gain.disconnect();
    }, { once: true });
    oscillator.start(toneStart);
    oscillator.stop(toneEnd);
  });
}


  window.QuickTapAudio = {
    prepare: prepareAudio,
    play: playFeedbackSound,
    isEnabled: () => enabled,
    setEnabled(value) {
      enabled = Boolean(value);
      try { localStorage.setItem('quick-tap-sound-enabled', String(enabled)); } catch {}
      if (enabled) prepareAudio();
    }
  };
})();
