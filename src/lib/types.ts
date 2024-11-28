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

export interface PomodoroSession {
  id: string;
  startTime: string;
  duration: number;
  type: 'work' | 'break' | 'longBreak';
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