import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Settings } from 'lucide-react';
import { PomodoroSettings } from '@/lib/types';

interface SettingsDialogProps {
  settings: PomodoroSettings;
  onSettingsChange: (settings: PomodoroSettings) => void;
}

export function SettingsDialog({ settings, onSettingsChange }: SettingsDialogProps) {
  const handleInputChange = (key: keyof PomodoroSettings, value: string | boolean) => {
    if (typeof value === 'string') {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue) && numValue > 0) {
        onSettingsChange({ ...settings, [key]: numValue });
      }
    } else {
      onSettingsChange({ ...settings, [key]: value });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Timer Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="workDuration">Work Duration (minutes)</Label>
            <Input
              id="workDuration"
              type="number"
              value={settings.workDuration}
              onChange={(e) => handleInputChange('workDuration', e.target.value)}
              min="1"
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="breakDuration">Break Duration (minutes)</Label>
            <Input
              id="breakDuration"
              type="number"
              value={settings.breakDuration}
              onChange={(e) => handleInputChange('breakDuration', e.target.value)}
              min="1"
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="longBreakDuration">Long Break Duration (minutes)</Label>
            <Input
              id="longBreakDuration"
              type="number"
              value={settings.longBreakDuration}
              onChange={(e) => handleInputChange('longBreakDuration', e.target.value)}
              min="1"
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="sessionsBeforeLongBreak">Sessions Before Long Break</Label>
            <Input
              id="sessionsBeforeLongBreak"
              type="number"
              value={settings.sessionsBeforeLongBreak}
              onChange={(e) => handleInputChange('sessionsBeforeLongBreak', e.target.value)}
              min="1"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="autoStartBreaks">Auto-start Breaks</Label>
            <Switch
              id="autoStartBreaks"
              checked={settings.autoStartBreaks}
              onCheckedChange={(checked) => handleInputChange('autoStartBreaks', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="autoStartPomodoros">Auto-start Pomodoros</Label>
            <Switch
              id="autoStartPomodoros"
              checked={settings.autoStartPomodoros}
              onCheckedChange={(checked) => handleInputChange('autoStartPomodoros', checked)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}