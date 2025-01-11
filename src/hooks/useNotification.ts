import { useEffect, useRef } from 'react';
import { NOTIFICATION_SOUNDS } from '@/lib/constants';

const clampVolume = (volume: number) => Math.min(1, Math.max(0, volume || 0));

export function useNotification(enabled: boolean, volume: number) {
  // A single element for the app's lifetime: browsers that block autoplay
  // remember per element that it was started from a user gesture.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const unlockedRef = useRef(false);

  const getAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(NOTIFICATION_SOUNDS.COMPLETE);
      audioRef.current.preload = 'auto';
    }
    return audioRef.current;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = clampVolume(volume);
    }
  }, [volume]);

  // Call from a click or key handler. Starting the element (muted) inside a
  // user gesture lets play() succeed later, when a phase ends on its own.
  const unlock = () => {
    if (!enabled || unlockedRef.current) return;

    const audio = getAudio();
    audio.muted = true;
    audio
      .play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
        unlockedRef.current = true;
      })
      .catch(() => {
        // Not allowed yet; the next gesture will try again.
      })
      .finally(() => {
        audio.muted = false;
      });
  };

  const play = () => {
    if (!enabled) return;

    const audio = getAudio();
    audio.muted = false;
    audio.volume = clampVolume(volume);
    audio.currentTime = 0;
    audio.play().catch((error) => {
      // Blocked by the browser's autoplay policy or failed to load.
      console.warn('Could not play the completion sound:', error);
    });
  };

  return { play, unlock };
}