/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback } from 'react';

type CallbackInput<T> = {
  name: string;
  value: T;
  event: Event;
  target: Element;
};

export function useFormHandler<T>(
  callback: (input: CallbackInput<T>) => void,
  dependencies?: any,
) {
  return useCallback((e: any) => {
    const { target } = e;
    const { name, value } = target;

    callback({ name, value, target, event: e });
  }, dependencies || []);
}
