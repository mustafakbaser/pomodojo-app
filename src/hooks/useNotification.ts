import { useEffect, useRef } from 'react';
import { NOTIFICATION_SOUNDS } from '@/lib/constants';

export function useNotification(enabled: boolean, volume: number) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (enabled) {
      audioRef.current = new Audio(NOTIFICATION_SOUNDS.COMPLETE);
      audioRef.current.volume = volume;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, [enabled, volume]);

  const play = () => {
    if (enabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
    }
  };

  return { play };
}