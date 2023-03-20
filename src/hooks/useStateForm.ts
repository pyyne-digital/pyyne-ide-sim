/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useState } from 'react';

export type handlerInput = {
  target: {
    type?: string;
    name: string;
    value: any;
    checked?: boolean;
  };
};

export function useStateForm<T>(form: T | [T, ...any], ...handlers: any) {
  const [formState, setForm] = useState<T>(
    form instanceof Array ? form[0] : form,
  );

  const formHandler = useCallback((e: handlerInput) => {
    const { target } = e;
    let { name, value, checked } = target;

    let result = e.target.type === 'checkbox' ? checked : value;

    if (handlers)
      handlers.forEach((handler: any) => {
        if (handler instanceof Array) {
          if (handler.includes(name))
            handler.forEach(appl => {
              if (typeof appl === 'function') result = appl(result);
            });
        } else if (handler[name]) result = handler[name](result);
      });

    setForm((currentFormState: any) => ({
      ...currentFormState,
      [name]: result,
    }));
  }, []);

  useEffect(() => {
    if (form instanceof Array) setForm(form[0]);
  }, [...(form instanceof Array ? form.slice(1) : [])]);

  return [formState, formHandler, setForm] as [
    typeof formState,
    typeof formHandler,
    typeof setForm,
  ];
}
