import React from 'react';
import { Moon, Sun, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { THEME_COLORS } from '@/lib/constants';
import { ThemeColor } from '@/lib/types';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  color: ThemeColor;
  onThemeChange: (theme: 'light' | 'dark') => void;
  onColorChange: (color: ThemeColor) => void;
}

export function ThemeToggle({ theme, color, onThemeChange, onColorChange }: ThemeToggleProps) {
  const handleColorChange = (newColor: ThemeColor) => {
    const root = document.documentElement;
    const selectedColor = THEME_COLORS.find(c => c.name === newColor);
    
    if (selectedColor) {
      root.style.setProperty('--primary', `var(${selectedColor.variable})`);
      root.style.setProperty('--primary-foreground', '0 0% 100%');
    }
    
    onColorChange(newColor);
  };

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
        className="rounded-full w-9 h-9 p-0 hover:bg-muted transition-colors"
      >
        {theme === 'light' ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full w-9 h-9 p-0 hover:bg-muted transition-colors"
          >
            <Palette className="h-4 w-4" />
            <span className="sr-only">Choose theme color</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          {THEME_COLORS.map((themeColor) => (
            <DropdownMenuItem
              key={themeColor.name}
              onClick={() => handleColorChange(themeColor.name as ThemeColor)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div 
                className={`w-4 h-4 rounded-full ${themeColor.color} transition-transform hover:scale-110`} 
                style={{
                  boxShadow: color === themeColor.name ? '0 0 0 2px var(--background), 0 0 0 4px hsl(var(--primary))' : 'none'
                }}
              />
              <span className="capitalize font-medium">{themeColor.name}</span>
              {color === themeColor.name && (
                <span className="ml-auto">✓</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}