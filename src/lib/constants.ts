import { PomodoroSettings, Sound, Quote } from './types';

export const DEFAULT_SETTINGS: PomodoroSettings = {
  workDuration: 25,
  breakDuration: 5,
  longBreakDuration: 15,
  sessionsBeforeLongBreak: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  notificationSound: true,
  notificationVolume: 0.5,
};

export const AMBIENT_SOUNDS: Sound[] = [
  {
    id: 'rain',
    name: 'Rain',
    url: 'https://cdn.pixabay.com/audio/2022/03/15/audio_c8b8530038.mp3',
    icon: 'CloudRain'
  },
  {
    id: 'forest',
    name: 'Forest',
    url: 'https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3',
    icon: 'TreePine'
  },
  {
    id: 'waves',
    name: 'Ocean',
    url: 'https://cdn.pixabay.com/audio/2022/05/16/audio_db6c7ac069.mp3',
    icon: 'Waves'
  },
  {
    id: 'birds',
    name: 'Birds',
    url: 'https://cdn.pixabay.com/audio/2022/04/07/audio_942b0d9875.mp3',
    icon: 'Bird'
  },
  {
    id: 'fire',
    name: 'Fireplace',
    url: 'https://cdn.pixabay.com/audio/2022/03/15/audio_270c3c5dcf.mp3',
    icon: 'Flame'
  },
  {
    id: 'wind',
    name: 'Wind',
    url: 'https://cdn.pixabay.com/audio/2022/03/15/audio_c8b8530038.mp3',
    icon: 'Wind'
  },
  {
    id: 'white-noise',
    name: 'White Noise',
    url: 'https://cdn.pixabay.com/audio/2022/03/15/audio_c8b8530038.mp3',
    icon: 'Music'
  }
];

export const NOTIFICATION_SOUNDS = {
  COMPLETE: 'https://cdn.pixabay.com/audio/2022/03/15/audio_c8b8530038.mp3',
};

export const KEYBOARD_SHORTCUTS = [
  { key: 'Space', description: 'Start/Pause Timer' },
  { key: 'R', description: 'Reset Timer' },
  { key: 'S', description: 'Skip Timer' },
  { key: 'M', description: 'Toggle Sound' },
  { key: 'Esc', description: 'Close Dialogs' },
];

export const MOTIVATIONAL_QUOTES: Quote[] = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "Focus on being productive instead of busy.",
    author: "Tim Ferriss"
  },
  {
    text: "Time is what we want most, but what we use worst.",
    author: "William Penn"
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  }
];

export const BREAK_ACTIVITIES = [
  {
    title: "Quick Stretch",
    description: "Stand up and stretch your arms above your head, then touch your toes."
  },
  {
    title: "Deep Breathing",
    description: "Take 5 deep breaths, inhaling for 4 counts and exhaling for 6 counts."
  },
  {
    title: "Eye Rest",
    description: "Look at something 20 feet away for 20 seconds to reduce eye strain."
  },
  {
    title: "Mindful Moment",
    description: "Close your eyes and focus on your breath for one minute."
  },
  {
    title: "Hydrate",
    description: "Drink a glass of water to stay hydrated."
  }
];

export const THEME_COLORS = [
  { name: 'slate', color: 'bg-slate-500' },
  { name: 'rose', color: 'bg-rose-500' },
  { name: 'blue', color: 'bg-blue-500' },
  { name: 'green', color: 'bg-green-500' },
  { name: 'purple', color: 'bg-purple-500' }
];