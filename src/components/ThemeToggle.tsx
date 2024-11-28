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
  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
        className="rounded-full"
      >
        {theme === 'light' ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <Palette className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {THEME_COLORS.map((themeColor) => (
            <DropdownMenuItem
              key={themeColor.name}
              onClick={() => onColorChange(themeColor.name as ThemeColor)}
              className="flex items-center"
            >
              <div className={`w-4 h-4 rounded-full mr-2 ${themeColor.color}`} />
              <span className="capitalize">{themeColor.name}</span>
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