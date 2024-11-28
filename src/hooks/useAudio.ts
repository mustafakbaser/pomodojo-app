import { useState, useEffect, useRef } from 'react';
import { Sound } from '@/lib/types';

export function useAudio(sounds: Sound[]) {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    const setupAudio = async (sound: Sound) => {
      try {
        // If there's a currently playing audio, fade it out first
        if (audioRef.current) {
          const currentAudio = audioRef.current;
          const fadeOutInterval = setInterval(() => {
            if (currentAudio.volume > 0.1) {
              currentAudio.volume = Math.max(0, currentAudio.volume - 0.1);
            } else {
              clearInterval(fadeOutInterval);
              currentAudio.pause();
              currentAudio.src = '';
            }
          }, 50);
        }

        // Create and set up new audio
        const audio = new Audio();
        audio.src = sound.url;
        audio.loop = true;
        audio.volume = 0;  // Start at 0 volume for fade-in
        audioRef.current = audio;

        // Pre-load the audio
        isLoadingRef.current = true;
        await audio.load();
        
        // Only start playing if this is still the active sound
        if (activeSound === sound.id) {
          await audio.play();
          // Fade in
          const fadeInInterval = setInterval(() => {
            if (audio.volume < volume) {
              audio.volume = Math.min(volume, audio.volume + 0.1);
            } else {
              clearInterval(fadeInInterval);
            }
          }, 50);
        }
      } catch (error) {
        console.error('Audio playback error:', error);
      } finally {
        isLoadingRef.current = false;
      }
    };

    if (activeSound) {
      const sound = sounds.find(s => s.id === activeSound);
      if (sound) {
        setupAudio(sound);
      }
    } else if (audioRef.current) {
      // If no active sound, fade out and stop current audio
      const currentAudio = audioRef.current;
      const fadeOutInterval = setInterval(() => {
        if (currentAudio.volume > 0.1) {
          currentAudio.volume = Math.max(0, currentAudio.volume - 0.1);
        } else {
          clearInterval(fadeOutInterval);
          currentAudio.pause();
          currentAudio.src = '';
          audioRef.current = null;
        }
      }, 50);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [activeSound, sounds, volume]);

  const toggleSound = (soundId: string) => {
    if (isLoadingRef.current) return; // Prevent rapid toggling while loading
    setActiveSound(current => current === soundId ? null : soundId);
  };

  const adjustVolume = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return {
    activeSound,
    volume,
    toggleSound,
    adjustVolume
  };
}