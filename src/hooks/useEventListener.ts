import { useEffect } from 'react';

export function useEventListener(
  name: string,
  callback: (e: CustomEvent) => (() => void) | void,
) {
  useEffect(() => {
    const listener = document.addEventListener(name, callback as EventListener);

    return () => {
      document.removeEventListener(name, listener as any);
    };
  });

  return (data?: CustomEventInit['detail']) =>
    document.dispatchEvent(new CustomEvent(name, { detail: data }));
}
