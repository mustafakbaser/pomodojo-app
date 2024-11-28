import { useEffect } from 'react';

interface ShortcutHandlers {
  onSpace?: () => void;
  onR?: () => void;
  onS?: () => void;
  onM?: () => void;
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore shortcuts when typing in input fields
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.code) {
        case 'Space':
          event.preventDefault();
          handlers.onSpace?.();
          break;
        case 'KeyR':
          event.preventDefault();
          handlers.onR?.();
          break;
        case 'KeyS':
          event.preventDefault();
          handlers.onS?.();
          break;
        case 'KeyM':
          event.preventDefault();
          handlers.onM?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handlers]);
}