import { useState, useEffect, useCallback } from 'react';

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

  const reset = useCallback(() => {
    setTimeLeft(duration * 60);
    setIsRunning(false);
  }, [duration]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const skip = () => {
    setTimeLeft(0);
    setIsRunning(false);
    onComplete?.();
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

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