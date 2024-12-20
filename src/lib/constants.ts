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
    url: 'https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3',
    icon: 'CloudRain'
  },
  {
    id: 'forest',
    name: 'Forest',
    url: 'https://assets.mixkit.co/active_storage/sfx/2526/2526-preview.mp3',
    icon: 'TreePine'
  },
  {
    id: 'waves',
    name: 'Ocean',
    url: 'https://assets.mixkit.co/active_storage/sfx/135/135-preview.mp3',
    icon: 'Waves'
  },
  {
    id: 'birds',
    name: 'Birds',
    url: 'https://assets.mixkit.co/active_storage/sfx/2516/2516-preview.mp3',
    icon: 'Bird'
  },
  {
    id: 'fire',
    name: 'Fireplace',
    url: 'https://assets.mixkit.co/active_storage/sfx/2544/2544-preview.mp3',
    icon: 'Flame'
  },
  {
    id: 'wind',
    name: 'Wind',
    url: 'https://assets.mixkit.co/active_storage/sfx/2517/2517-preview.mp3',
    icon: 'Wind'
  },
  {
    id: 'white-noise',
    name: 'White Noise',
    url: 'https://assets.mixkit.co/active_storage/sfx/2523/2523-preview.mp3',
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
  { name: 'slate', color: 'bg-slate-500', variable: '--slate' },
  { name: 'rose', color: 'bg-rose-500', variable: '--rose' },
  { name: 'blue', color: 'bg-blue-500', variable: '--blue' },
  { name: 'green', color: 'bg-green-500', variable: '--green' },
  { name: 'purple', color: 'bg-purple-500', variable: '--purple' }
];