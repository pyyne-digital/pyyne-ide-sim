/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useEffect } from 'react';

export function useExternalClick<T extends HTMLDivElement>(
  callback: () => void,
) {
  const ref = useRef<T>(null!);

  const handleClick = (e: MouseEvent | TouchEvent) => {
    if (!ref?.current?.contains(e.target as any)) callback();
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return ref;
}
