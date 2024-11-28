import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';
import { useTimer } from '@/hooks/useTimer';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useNotification } from '@/hooks/useNotification';
import { cn } from '@/lib/utils';

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
        return 'from-primary/20 to-primary';
      case 'break':
        return 'from-green-500/20 to-green-500';
      case 'longBreak':
        return 'from-blue-500/20 to-blue-500';
      default:
        return 'from-primary/20 to-primary';
    }
  };

  React.useEffect(() => {
    document.title = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} - Pomodoro`;
    return () => {
      document.title = 'Pomodoro Timer';
    };
  }, [minutes, seconds]);

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Animated background ring */}
        <div 
          className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-br opacity-20 animate-pulse",
            getTypeColor()
          )}
        />
        
        {/* Timer display */}
        <div className="relative z-10 flex flex-col items-center">
          <div className={cn(
            "text-7xl font-bold tracking-tighter transition-colors",
            isRunning ? "text-primary animate-pulse" : "text-primary/80"
          )}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="text-sm text-muted-foreground mt-2 capitalize">
            {type} Session
          </div>
        </div>

        {/* Circular progress */}
        <svg
          className="absolute inset-0 -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            className="text-muted stroke-current"
            strokeWidth="2"
            fill="none"
            r="48"
            cx="50"
            cy="50"
          />
          <circle
            className={cn(
              "transition-all duration-500 ease-in-out",
              {
                'text-primary': type === 'work',
                'text-green-500': type === 'break',
                'text-blue-500': type === 'longBreak'
              }
            )}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            r="48"
            cx="50"
            cy="50"
            style={{
              strokeDasharray: `${2 * Math.PI * 48}`,
              strokeDashoffset: `${2 * Math.PI * 48 * (1 - progress / 100)}`,
            }}
            stroke="currentColor"
          />
        </svg>
      </div>

      {/* Linear progress bar */}
      <Progress 
        value={progress} 
        className={cn(
          "w-full max-w-md h-2 transition-all duration-500",
          {
            'bg-primary/20': type === 'work',
            'bg-green-500/20': type === 'break',
            'bg-blue-500/20': type === 'longBreak'
          }
        )}
      />
      
      {/* Control buttons */}
      <div className="flex space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={reset}
          className="rounded-full w-12 h-12 transition-transform hover:scale-105"
          title="Reset (R)"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
        
        <Button
          variant="default"
          size="icon"
          onClick={isRunning ? pause : start}
          className={cn(
            "rounded-full w-16 h-16 transition-all duration-300",
            isRunning ? "bg-primary/90 hover:bg-primary/100" : "bg-primary hover:bg-primary/90",
            "hover:scale-105"
          )}
          title="Play/Pause (Space)"
        >
          {isRunning ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 ml-1" />
          )}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={skip}
          className="rounded-full w-12 h-12 transition-transform hover:scale-105"
          title="Skip (S)"
        >
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}