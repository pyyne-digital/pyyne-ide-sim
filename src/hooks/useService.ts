/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from 'react';

type ServiceMethods<T> = {
  [serviceName: string]: (...params: any) => Promise<T>;
};

type UpdateBinderBlob<T> = {
  setState: [
    React.Dispatch<React.SetStateAction<T>>,
    React.Dispatch<React.SetStateAction<boolean>>?,
  ];
  action?: (...params: any) => Promise<T>;
  actions?: ServiceMethods<any>;
  params?: Array<any>;
  dependencies?: Array<any>;
  condition?: boolean;

  callback?: (data: any) => void;
};

/**
 * Executes a getter service action from a service and appends the result to a state.
 * @param config Configuration
 */
export function useService<T>({
  setState: [setState, setLoading],
  action,
  actions,
  params,
  dependencies,
  condition,
  callback,
}: UpdateBinderBlob<T>) {
  useEffect(() => {
    if (
      condition ||
      (condition === undefined && (dependencies || []).every(x => !!x))
    ) {
      if (action) {
        (async function ServiceCall() {
          if (setLoading) setLoading(true);
          const value = await action(...(params || []));

          setState(value);
          if (setLoading) setLoading(false);
        })();
      }

      Promise.allSettled(
        Object.entries(actions || {}).map(([name, call]) =>
          (async function AttemptServiceCall() {
            const property =
              name.substring(0, 3).toLowerCase() === 'get'
                ? `${name.substring(3, 4).toLowerCase()}${name.substring(4)}`
                : name;

            const parms = Object.values({
              ...(dependencies || []),
              ...(params || []),
            });

            const value = await call(...parms);

            (setState as any)((prevState: T) => ({
              ...prevState,
              [property]: value,
            }));

            if (callback) callback({ params: parms, value });
          })(),
        ),
      ).then(() => {
        if (setLoading) setLoading(false);
      });
    }
  }, dependencies || []);
}
