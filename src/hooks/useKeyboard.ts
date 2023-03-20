import { useEffect } from 'react';

export function useKeyboard(
  keys: number | Array<number> | null,
  callback: (e: KeyboardEvent) => void,
) {
  let keyArray: Array<number> | null = null;
  if (keys) keyArray = !(keys instanceof Array) ? [keys] : [...keys];

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!keyArray || (keyArray as [number]).includes(e.keyCode)) callback(e);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });
}
