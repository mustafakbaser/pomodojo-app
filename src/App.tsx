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
import { Quote } from 'lucide-react';

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
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <SettingsDialog settings={settings} onSettingsChange={setSettings} />
          <ThemeToggle
            theme={theme}
            color={themeColor}
            onThemeChange={setTheme}
            onColorChange={setThemeColor}
          />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Pomodoro Timer</h1>
          <p className="text-muted-foreground">Stay focused and productive</p>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-lg">
          <Timer
            duration={settings.workDuration}
            onComplete={handleComplete}
            type="work"
            autoStart={settings.autoStartPomodoros}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-card rounded-lg p-6 shadow-lg">
            <SessionHistory sessions={sessions} onClearHistory={handleClearHistory} />
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-lg">
            <BreakSuggestion />
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Quote className="h-5 w-5" />
            <span>Ambient Sounds</span>
          </h2>
          <SoundControl />
        </div>

        <div className="bg-card rounded-lg p-6 shadow-lg text-center">
          <blockquote className="italic text-lg">
            "{currentQuote.text}"
          </blockquote>
          <p className="mt-2 text-muted-foreground">— {currentQuote.author}</p>
        </div>
      </div>
    </div>
  );
}

export default App;