import { useState, useEffect, useCallback, useRef } from 'react';

interface TimerHook {
  timeLeft: number;
  isRunning: boolean;
  progress: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
}

export function useTimer(
  duration: number,
  onComplete?: () => void,
  autoStart = false
): TimerHook {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(autoStart);
  const totalTime = duration * 60;

  // Wall-clock time (ms) at which the running timer reaches zero. The remaining
  // time is always derived from it: browsers throttle intervals in background
  // tabs, so counting ticks makes the timer fall behind.
  const endTimeRef = useRef<number | null>(null);
  // Remaining time (ms) while paused.
  const remainingMsRef = useRef(duration * 60 * 1000);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const reset = useCallback(() => {
    endTimeRef.current = null;
    remainingMsRef.current = duration * 60 * 1000;
    setTimeLeft(duration * 60);
    setIsRunning(false);
  }, [duration]);

  const start = () => {
    if (remainingMsRef.current <= 0) return;
    setIsRunning(true);
  };

  const pause = () => {
    if (endTimeRef.current !== null) {
      remainingMsRef.current = Math.max(0, endTimeRef.current - Date.now());
      endTimeRef.current = null;
      setTimeLeft(Math.ceil(remainingMsRef.current / 1000));
    }
    setIsRunning(false);
  };

  const skip = () => {
    endTimeRef.current = null;
    remainingMsRef.current = 0;
    setTimeLeft(0);
    setIsRunning(false);
    onCompleteRef.current?.();
  };

  useEffect(() => {
    if (!isRunning) return;

    if (endTimeRef.current === null) {
      endTimeRef.current = Date.now() + remainingMsRef.current;
    }

    const tick = () => {
      if (endTimeRef.current === null) return;

      const remainingMs = endTimeRef.current - Date.now();
      if (remainingMs <= 0) {
        endTimeRef.current = null;
        remainingMsRef.current = 0;
        setTimeLeft(0);
        setIsRunning(false);
        onCompleteRef.current?.();
        return;
      }
      setTimeLeft(Math.ceil(remainingMs / 1000));
    };

    tick();
    const interval = setInterval(tick, 250);
    // One-off timeout at the expected end, so completion is not held back when
    // the display interval is throttled in a background tab.
    const timeout = setTimeout(tick, endTimeRef.current - Date.now() + 50);
    document.addEventListener('visibilitychange', tick);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [isRunning]);

  useEffect(() => {
    reset();
  }, [duration, reset]);

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return {
    timeLeft,
    isRunning,
    progress,
    start,
    pause,
    reset,
    skip,
  };
}