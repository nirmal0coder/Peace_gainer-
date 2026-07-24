export type ThemeMode = 'light' | 'dark';

export type BackgroundParticleType = 'leaves' | 'butterflies' | 'clouds' | 'orbs' | 'none';

export interface MoodEntry {
  id: string;
  date: string; // YYYY-MM-DD
  time: string;
  mood: 'ecstatic' | 'calm' | 'okay' | 'anxious' | 'sad' | 'overwhelmed';
  note?: string;
}

export interface GratitudeEntry {
  id: string;
  date: string;
  content: string;
  tag: 'person' | 'experience' | 'self' | 'nature' | 'general';
}

export interface CauseItem {
  id: string;
  title: string;
  iconName: string;
  category: string;
  shortDescription: string;
  detailedExplanation: string;
  positiveAdvice: string;
  copingTip: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  iconName: string;
  summary: string;
  detailedGuide: string[];
  scientificBenefits: string;
  durationMinutes?: number;
  category: 'mindfulness' | 'physical' | 'lifestyle' | 'social';
}

export interface InspirationalStory {
  id: string;
  title: string;
  author: string;
  age: number;
  summary: string;
  fullStory: string;
  keyTakeaway: string;
  tags: string[];
}

export interface Affirmation {
  id: string;
  text: string;
  category: 'self-love' | 'calm' | 'hope' | 'strength' | 'healing';
}

export interface KindnessTask {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'gentle' | 'heartwarming';
}

export interface SoundTrack {
  id: string;
  name: string;
  icon: string;
  volume: number; // 0 to 1
  isPlaying: boolean;
}

export type UserGender = 'male' | 'female' | 'non-binary';

export type VoiceOption = 'Kore' | 'Zephyr' | 'Puck' | 'Fenrir' | 'Charon';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  audioBase64?: string;
  voiceName?: string;
}

