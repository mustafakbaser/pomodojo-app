import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { History, Trash2 } from 'lucide-react';
import { PomodoroSession } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface SessionHistoryProps {
  sessions: PomodoroSession[];
  onClearHistory: () => void;
}

export function SessionHistory({ sessions, onClearHistory }: SessionHistoryProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <History className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Session History</h2>
        </div>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear History</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your session history.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onClearHistory}>Clear</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <ScrollArea className="h-[200px] rounded-md border p-4">
        {sessions.length === 0 ? (
          <p className="text-center text-muted-foreground">No sessions recorded yet.</p>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center space-x-2">
                  <span className="capitalize">{session.type}</span>
                  <span className="text-muted-foreground">
                    ({session.duration} minutes)
                  </span>
                </div>
                <span className="text-muted-foreground">
                  {formatDistanceToNow(new Date(session.startTime), { addSuffix: true })}
                </span>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}