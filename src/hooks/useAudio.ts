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
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }

        const audio = new Audio();
        
        // Add error handling before setting the source
        audio.onerror = (e) => {
          console.error('Audio loading error:', e);
          isLoadingRef.current = false;
          setActiveSound(null);
        };

        // Set audio properties
        audio.src = sound.url;
        audio.loop = true;
        audio.volume = volume;
        audioRef.current = audio;

        // Play audio if this is the active sound
        if (activeSound === sound.id) {
          try {
            await audio.play();
          } catch (error) {
            console.error('Audio play error:', error);
            setActiveSound(null);
          }
        }
      } catch (error) {
        console.error('Audio setup error:', error);
        setActiveSound(null);
      } finally {
        isLoadingRef.current = false;
      }
    };

    if (activeSound) {
      const sound = sounds.find(s => s.id === activeSound);
      if (sound) {
        isLoadingRef.current = true;
        setupAudio(sound);
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [activeSound, sounds, volume]);

  const toggleSound = (soundId: string) => {
    if (isLoadingRef.current) return;
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