import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Coffee, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BREAK_ACTIVITIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function BreakSuggestion() {
  const [currentIndex, setCurrentIndex] = React.useState(() => {
    return Math.floor(Math.random() * BREAK_ACTIVITIES.length);
  });
  const [direction, setDirection] = React.useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const currentActivity = BREAK_ACTIVITIES[currentIndex];

  const handleNavigation = (type: 'next' | 'prev') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection(type === 'next' ? 'right' : 'left');
    
    setTimeout(() => {
      if (type === 'next') {
        setCurrentIndex((prev) => (prev + 1) % BREAK_ACTIVITIES.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + BREAK_ACTIVITIES.length) % BREAK_ACTIVITIES.length);
      }
      setDirection(null);
      setIsAnimating(false);
    }, 200);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Coffee className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Break Activity</h2>
      </div>
      
      <div className="relative">
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavigation('prev')}
            className="rounded-full w-8 h-8 hover:bg-background hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavigation('next')}
            className="rounded-full w-8 h-8 hover:bg-background hover:text-primary transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <Card className="overflow-hidden bg-gradient-to-br from-card to-background border-2">
          <CardContent className="p-6">
            <div
              className={cn(
                "transition-all duration-200 ease-in-out",
                direction === 'left' && "-translate-x-full opacity-0",
                direction === 'right' && "translate-x-full opacity-0"
              )}
            >
              <h3 className="font-semibold text-lg mb-2 text-primary">
                {currentActivity.title}
              </h3>
              <p className="text-muted-foreground">
                {currentActivity.description}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 flex justify-center gap-1">
          {BREAK_ACTIVITIES.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-colors duration-300",
                index === currentIndex
                  ? "bg-primary"
                  : "bg-primary/20"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}