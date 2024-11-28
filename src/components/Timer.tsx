import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PlayIcon, PauseIcon, SkipForwardIcon, RefreshCwIcon } from 'lucide-react';
import { useTimer } from '@/hooks/useTimer';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useNotification } from '@/hooks/useNotification';

interface TimerProps {
  duration: number;
  onComplete: () => void;
  type: 'work' | 'break' | 'longBreak';
  autoStart?: boolean;
  notificationEnabled?: boolean;
  notificationVolume?: number;
}

export function Timer({
  duration,
  onComplete,
  type,
  autoStart = false,
  notificationEnabled = true,
  notificationVolume = 0.5
}: TimerProps) {
  const { timeLeft, isRunning, progress, start, pause, reset, skip } = useTimer(
    duration,
    onComplete,
    autoStart
  );

  const notification = useNotification(notificationEnabled, notificationVolume);

  const handleComplete = () => {
    notification.play();
    onComplete();
  };

  useKeyboardShortcuts({
    onSpace: () => (isRunning ? pause() : start()),
    onR: reset,
    onS: skip,
  });

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const getTypeColor = () => {
    switch (type) {
      case 'work':
        return 'text-primary';
      case 'break':
        return 'text-green-500';
      case 'longBreak':
        return 'text-blue-500';
      default:
        return 'text-primary';
    }
  };

  React.useEffect(() => {
    // Update document title with timer
    document.title = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} - Pomodoro`;
    return () => {
      document.title = 'Pomodoro Timer';
    };
  }, [minutes, seconds]);

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className={`text-6xl font-bold ${getTypeColor()}`}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      
      <Progress value={progress} className="w-full max-w-md" />
      
      <div className="flex space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={reset}
          className="rounded-full"
          title="Reset (R)"
        >
          <RefreshCwIcon className="h-4 w-4" />
        </Button>
        
        <Button
          variant="default"
          size="icon"
          onClick={isRunning ? pause : start}
          className="rounded-full"
          title="Play/Pause (Space)"
        >
          {isRunning ? (
            <PauseIcon className="h-4 w-4" />
          ) : (
            <PlayIcon className="h-4 w-4" />
          )}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={skip}
          className="rounded-full"
          title="Skip (S)"
        >
          <SkipForwardIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}