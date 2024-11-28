import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useAudio } from '@/hooks/useAudio';
import { AMBIENT_SOUNDS } from '@/lib/constants';
import { 
  CloudRain, 
  TreePine, 
  Waves, 
  Bird, 
  Flame, 
  Wind, 
  Music,
  Volume2
} from 'lucide-react';

const iconMap = {
  CloudRain,
  TreePine,
  Waves,
  Bird,
  Flame,
  Wind,
  Music
};

export function SoundControl() {
  const { activeSound, volume, toggleSound, adjustVolume } = useAudio(AMBIENT_SOUNDS);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {AMBIENT_SOUNDS.map((sound) => {
          const Icon = iconMap[sound.icon as keyof typeof iconMap];
          return (
            <Button
              key={sound.id}
              variant={activeSound === sound.id ? "default" : "outline"}
              size="icon"
              onClick={() => toggleSound(sound.id)}
              className="rounded-full"
            >
              <Icon className="h-4 w-4" />
            </Button>
          );
        })}
      </div>
      
      {activeSound && (
        <div className="flex items-center space-x-4">
          <Volume2 className="h-4 w-4" />
          <Slider
            value={[volume * 100]}
            onValueChange={([value]) => adjustVolume(value / 100)}
            max={100}
            step={1}
            className="w-32"
          />
        </div>
      )}
    </div>
  );
}