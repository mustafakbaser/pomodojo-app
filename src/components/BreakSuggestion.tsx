import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Coffee, ArrowRight } from 'lucide-react';
import { BREAK_ACTIVITIES } from '@/lib/constants';

export function BreakSuggestion() {
  const [currentActivity, setCurrentActivity] = React.useState(() => {
    const randomIndex = Math.floor(Math.random() * BREAK_ACTIVITIES.length);
    return BREAK_ACTIVITIES[randomIndex];
  });

  const getNextActivity = () => {
    const currentIndex = BREAK_ACTIVITIES.findIndex(
      (activity) => activity.title === currentActivity.title
    );
    const nextIndex = (currentIndex + 1) % BREAK_ACTIVITIES.length;
    setCurrentActivity(BREAK_ACTIVITIES[nextIndex]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Coffee className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Break Activity</h2>
      </div>
      
      <Card className="relative overflow-hidden">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">{currentActivity.title}</h3>
          <p className="text-muted-foreground">{currentActivity.description}</p>
          
          <button
            onClick={getNextActivity}
            className="absolute top-1/2 -translate-y-1/2 right-4 p-2 hover:bg-accent rounded-full transition-colors"
            title="Next activity"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </CardContent>
      </Card>
    </div>
  );
}