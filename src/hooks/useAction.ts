/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo } from 'react';

declare global {
  interface Window {
    useAction: string[];
  }
}

type ServiceMethods<T> = {
  [serviceName: string]: (...params: any) => Promise<T>;
};

type UseActionHookOptions<T> = {
  setState?: React.Dispatch<React.SetStateAction<T>>;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  params?: Array<any>;
  condition?: boolean;
};

if (!window.useAction) window.useAction = [];

/**
 * Executes a Get service action and appends the result to a state.
 * This hook is solely a syntax simplification for the useService hook.
 * @param setState React state setter action dispatch
 * @param serviceCalls Service class method (must be called Get...Something)
 * @param params Optional array of params to call serviceCalls
 * @param condition Optional boolean value; will impede effect execution if false
 */
export function useAction<T>(
  serviceCalls: ((...serviceParams: any) => Promise<T>) | ServiceMethods<T>,
  { setState, setLoading, params, condition }: UseActionHookOptions<T> = {},
) {
  const actionId = useMemo(() => Math.random(), []);

  useEffect(() => {
    const rid = JSON.stringify({
      actionId,
      serviceCalls,
      setState,
      setLoading,
      params,
      condition,
    });

    if (window.useAction.find(x => x === rid)) return;

    window.useAction = [...window.useAction, rid];

    const cleanup = () => {
      if (setLoading) setLoading(false);
      window.useAction = window.useAction.filter(x => x !== rid);
    };

    if (
      (condition || condition === undefined) &&
      (params || []).every(x => !!x)
    ) {
      if (serviceCalls instanceof Function) {
        (async function ServiceCall() {
          try {
            if (setLoading) setLoading(true);

            const value = await serviceCalls(...(params || []));

            if (setState) setState(value);
          } finally {
            cleanup();
          }
        })();
      } else {
        const calls: [string, (...callbackParams: any) => Promise<T>][] =
          Object.entries(serviceCalls as ServiceMethods<T>);

        if (setLoading) setLoading(true);

        Promise.all(
          calls.map(([property, serviceCall]) =>
            (async function ServiceCall() {
              const value = await serviceCall(...(params || []));

              if (property.substring(0, 3).toLowerCase() === 'get')
                property = `${property
                  .substring(3, 4)
                  .toLowerCase()}${property.substring(4)}`;

              if (setState)
                setState((prevState: T) => ({
                  ...prevState,
                  [property]: value,
                }));
            })(),
          ),
        ).finally(cleanup);
      }
    }
  }, params || []);
}
