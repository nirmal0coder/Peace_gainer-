import { VoiceOption, UserGender } from '../types';

let currentAudio: HTMLAudioElement | null = null;
let currentAudioContext: AudioContext | null = null;
let currentSourceNode: AudioBufferSourceNode | null = null;

// Stop any currently playing voice note
export const stopVoiceNote = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  if (currentSourceNode) {
    try {
      currentSourceNode.stop();
    } catch (_) {}
    currentSourceNode = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

// Play PCM or WAV base64 audio string using Web Audio API or HTML5 Audio
export const playBase64Audio = async (base64Data: string, sampleRate = 24000): Promise<boolean> => {
  try {
    stopVoiceNote();

    // Try decoding base64 to array buffer
    const binaryString = atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Check if it's already a WAV or MP3 header
    if (binaryString.startsWith('RIFF') || binaryString.startsWith('ID3') || binaryString.includes('fmt ')) {
      const blob = new Blob([bytes], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      currentAudio = audio;
      await audio.play();
      return true;
    }

    // Otherwise decode raw 16-bit LE PCM audio
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return false;

    const audioCtx = new AudioCtx({ sampleRate });
    currentAudioContext = audioCtx;

    // Convert Int16 PCM to Float32
    const int16Array = new Int16Array(bytes.buffer, bytes.byteOffset, Math.floor(bytes.byteLength / 2));
    const float32Array = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768;
    }

    const audioBuffer = audioCtx.createBuffer(1, float32Array.length, sampleRate);
    audioBuffer.getChannelData(0).set(float32Array);

    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);
    currentSourceNode = source;
    source.start(0);
    return true;
  } catch (err) {
    console.warn('Failed to play base64 PCM audio directly:', err);
    return false;
  }
};

// Fallback SpeechSynthesis player with opposite gender voice preference
export const playBrowserSpeech = (text: string, userGender: UserGender, voiceName?: VoiceOption) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  stopVoiceNote();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.92; // slightly slower, calming pace
  utterance.pitch = userGender === 'male' ? 1.2 : userGender === 'female' ? 0.85 : 1.0;

  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    // Attempt to pick opposite gender voice
    let targetVoice = null;
    if (userGender === 'male') {
      // Female voice for male user
      targetVoice = voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('google us english') || v.name.toLowerCase().includes('victoria'));
    } else if (userGender === 'female') {
      // Male voice for female user
      targetVoice = voices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('alex') || v.name.toLowerCase().includes('george') || v.name.toLowerCase().includes('daniel'));
    }

    if (targetVoice) {
      utterance.voice = targetVoice;
    } else {
      utterance.voice = voices[0];
    }
  }

  window.speechSynthesis.speak(utterance);
};
