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
      
      <div className="relative group">
        {/* Navigation Buttons */}
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavigation('prev')}
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 shadow-lg hover:shadow-xl transition-all"
          >
            <ChevronLeft className="h-5 w-5 text-primary" />
          </Button>
        </div>

        <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavigation('next')}
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 shadow-lg hover:shadow-xl transition-all"
          >
            <ChevronRight className="h-5 w-5 text-primary" />
          </Button>
        </div>

        {/* Activity Card */}
        <Card className="overflow-hidden bg-gradient-to-br from-card to-background border-2 hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div
              className={cn(
                "transition-all duration-200 ease-in-out",
                direction === 'left' && "-translate-x-full opacity-0",
                direction === 'right' && "translate-x-full opacity-0"
              )}
            >
              <h3 className="font-semibold text-lg mb-3 text-primary">
                {currentActivity.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {currentActivity.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Progress Dots */}
        <div className="mt-4 flex justify-center gap-1.5">
          {BREAK_ACTIVITIES.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-primary w-3"
                  : "bg-primary/20"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}