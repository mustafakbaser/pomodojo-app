import { LucideIcon } from 'lucide-react';

export interface PomodoroSettings {
  workDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  sessionsBeforeLongBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  notificationSound: boolean;
  notificationVolume: number;
}

export type PomodoroPhase = 'work' | 'break' | 'longBreak';

export interface PomodoroSession {
  id: string;
  startTime: string;
  duration: number;
  type: PomodoroPhase;
  completed: boolean;
}

export type ThemeColor = 'slate' | 'rose' | 'blue' | 'green' | 'purple';

export interface Sound {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface Quote {
  text: string;
  author: string;
}