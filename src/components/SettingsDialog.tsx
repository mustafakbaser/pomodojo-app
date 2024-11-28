import React from 'react';
import { Settings, Bell, Clock, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { PomodoroSettings } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SettingsDialogProps {
  settings: PomodoroSettings;
  onSettingsChange: (settings: PomodoroSettings) => void;
}

export function SettingsDialog({ settings, onSettingsChange }: SettingsDialogProps) {
  const handleInputChange = (key: keyof PomodoroSettings, value: string | boolean | number) => {
    if (typeof value === 'string' && !isNaN(parseInt(value))) {
      const numValue = parseInt(value);
      if (numValue > 0) {
        onSettingsChange({ ...settings, [key]: numValue });
      }
    } else {
      onSettingsChange({ ...settings, [key]: value });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full w-9 h-9 p-0 hover:scale-105 transition-transform"
        >
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl">Timer Settings</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="duration" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b h-12 p-0 px-6">
            <TabsTrigger value="duration" className="data-[state=active]:bg-background rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              <Clock className="h-4 w-4 mr-2" />
              Duration
            </TabsTrigger>
            <TabsTrigger value="automation" className="data-[state=active]:bg-background rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              <PlayCircle className="h-4 w-4 mr-2" />
              Automation
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-background rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="duration" className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="workDuration">Work Duration (minutes)</Label>
                <Input
                  id="workDuration"
                  type="number"
                  value={settings.workDuration}
                  onChange={(e) => handleInputChange('workDuration', e.target.value)}
                  min="1"
                  className="h-9"
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
                  className="h-9"
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
                  className="h-9"
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
                  className="h-9"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="automation" className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="autoStartBreaks">Auto-start Breaks</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically start break timer when work session ends
                  </p>
                </div>
                <Switch
                  id="autoStartBreaks"
                  checked={settings.autoStartBreaks}
                  onCheckedChange={(checked) => handleInputChange('autoStartBreaks', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="autoStartPomodoros">Auto-start Pomodoros</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically start work timer when break ends
                  </p>
                </div>
                <Switch
                  id="autoStartPomodoros"
                  checked={settings.autoStartPomodoros}
                  onCheckedChange={(checked) => handleInputChange('autoStartPomodoros', checked)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="notificationSound">Sound Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Play a sound when timer completes
                  </p>
                </div>
                <Switch
                  id="notificationSound"
                  checked={settings.notificationSound}
                  onCheckedChange={(checked) => handleInputChange('notificationSound', checked)}
                />
              </div>
              
              <div className={cn("space-y-3", !settings.notificationSound && "opacity-50 pointer-events-none")}>
                <div className="flex justify-between items-center">
                  <Label htmlFor="notificationVolume">Notification Volume</Label>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(settings.notificationVolume * 100)}%
                  </span>
                </div>
                <Slider
                  id="notificationVolume"
                  value={[settings.notificationVolume * 100]}
                  onValueChange={([value]) => handleInputChange('notificationVolume', value / 100)}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}