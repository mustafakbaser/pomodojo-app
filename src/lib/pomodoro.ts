import type { PomodoroPhase, PomodoroSettings } from './types';

export interface PomodoroCycle {
  phase: PomodoroPhase;
  // Work sessions completed since the last long break.
  completedWorkSessions: number;
}

export const INITIAL_CYCLE: PomodoroCycle = { phase: 'work', completedWorkSessions: 0 };

const sessionsPerSet = (sessionsBeforeLongBreak: number) =>
  Math.max(1, Math.floor(sessionsBeforeLongBreak) || 1);

// Work -> short break, or long break after every `sessionsBeforeLongBreak`
// work sessions. Any break -> work; the count starts over after a long break.
export function getNextCycle(
  cycle: PomodoroCycle,
  sessionsBeforeLongBreak: number
): PomodoroCycle {
  if (cycle.phase === 'longBreak') {
    return { phase: 'work', completedWorkSessions: 0 };
  }
  if (cycle.phase === 'break') {
    return { phase: 'work', completedWorkSessions: cycle.completedWorkSessions };
  }

  const completedWorkSessions = cycle.completedWorkSessions + 1;
  return {
    phase: completedWorkSessions >= sessionsPerSet(sessionsBeforeLongBreak) ? 'longBreak' : 'break',
    completedWorkSessions,
  };
}

// Position of the current phase in the set, e.g. { current: 2, total: 4 } for
// the second work session or the break that follows it.
export function getSessionProgress(cycle: PomodoroCycle, sessionsBeforeLongBreak: number) {
  const total = sessionsPerSet(sessionsBeforeLongBreak);
  const current = cycle.phase === 'work' ? cycle.completedWorkSessions + 1 : cycle.completedWorkSessions;
  return { current: Math.min(Math.max(current, 1), total), total };
}

export function getPhaseDuration(phase: PomodoroPhase, settings: PomodoroSettings): number {
  switch (phase) {
    case 'work':
      return settings.workDuration;
    case 'break':
      return settings.breakDuration;
    case 'longBreak':
      return settings.longBreakDuration;
  }
}

export function getAutoStart(phase: PomodoroPhase, settings: PomodoroSettings): boolean {
  return phase === 'work' ? settings.autoStartPomodoros : settings.autoStartBreaks;
}