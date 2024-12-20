import { useState, useEffect, useRef } from 'react';
import { Sound } from '@/lib/types';

export function useAudio(sounds: Sound[]) {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
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
        
        audio.onerror = (e) => {
          console.error('Audio loading error:', e);
          isLoadingRef.current = false;
          setActiveSound(null);
          setIsPlaying(false);
        };

        audio.src = sound.url;
        audio.loop = true;
        audio.volume = volume;
        audioRef.current = audio;

        if (activeSound === sound.id) {
          try {
            if (isPlaying) {
              await audio.play();
            }
          } catch (error) {
            console.error('Audio play error:', error);
            setActiveSound(null);
            setIsPlaying(false);
          }
        }
      } catch (error) {
        console.error('Audio setup error:', error);
        setActiveSound(null);
        setIsPlaying(false);
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
  }, [activeSound, sounds, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleSound = (soundId: string) => {
    if (isLoadingRef.current) return;
    
    if (activeSound === soundId) {
      setIsPlaying(false);
      setActiveSound(null);
    } else {
      setActiveSound(soundId);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !activeSound) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const adjustVolume = (newVolume: number) => {
    setVolume(newVolume);
  };

  return {
    activeSound,
    volume,
    isPlaying,
    toggleSound,
    togglePlayPause,
    adjustVolume
  };
}