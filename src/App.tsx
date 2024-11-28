import React from 'react';
import { Timer } from '@/components/Timer';
import { SoundControl } from '@/components/SoundControl';
import { SettingsDialog } from '@/components/SettingsDialog';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SessionHistory } from '@/components/SessionHistory';
import { BreakSuggestion } from '@/components/BreakSuggestion';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { PomodoroSettings, PomodoroSession, ThemeColor } from '@/lib/types';
import { DEFAULT_SETTINGS, MOTIVATIONAL_QUOTES } from '@/lib/constants';
import { Quote } from '@/components/ui/quote';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

function App() {
  const [settings, setSettings] = useLocalStorage<PomodoroSettings>('settings', DEFAULT_SETTINGS);
  const [sessions, setSessions] = useLocalStorage<PomodoroSession[]>('sessions', []);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  const [themeColor, setThemeColor] = useLocalStorage<ThemeColor>('themeColor', 'slate');
  const [currentQuote, setCurrentQuote] = React.useState(() => {
    const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    return MOTIVATIONAL_QUOTES[randomIndex];
  });

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleComplete = () => {
    const newSession: PomodoroSession = {
      id: Date.now().toString(),
      startTime: new Date().toISOString(),
      duration: settings.workDuration,
      type: 'work',
      completed: true
    };
    setSessions([newSession, ...sessions].slice(0, 100));
  };

  const handleClearHistory = () => {
    setSessions([]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Pomodoro Timer
          </h1>
          <div className="flex items-center gap-2">
            <SettingsDialog settings={settings} onSettingsChange={setSettings} />
            <ThemeToggle
              theme={theme}
              color={themeColor}
              onThemeChange={setTheme}
              onColorChange={setThemeColor}
            />
          </div>
        </div>

        <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-8">
            <Timer
              duration={settings.workDuration}
              onComplete={handleComplete}
              type="work"
              autoStart={settings.autoStartPomodoros}
            />
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <SessionHistory sessions={sessions} onClearHistory={handleClearHistory} />
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <BreakSuggestion />
            </CardContent>
          </Card>
        </div>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <SoundControl />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6 text-center">
            <blockquote className="italic text-lg text-primary/80">
              "{currentQuote.text}"
            </blockquote>
            <Separator className="my-4" />
            <p className="text-muted-foreground">
              — {currentQuote.author}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;