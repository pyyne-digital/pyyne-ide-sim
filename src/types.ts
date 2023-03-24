import { Dispatch, SetStateAction } from "react";

export type State<T, R = true> = R extends true
  ? [T, Dispatch<SetStateAction<T>>]
  : readonly [
      T,
      (
        key: keyof T,
        value: T[typeof key] | ((value: T[typeof key]) => T[typeof key])
      ) => void
    ];

export const createSetter =
  <T>(setFunction: Dispatch<SetStateAction<T>>): State<T, false>[1] =>
  (
    key: keyof T,
    value: T[typeof key] | ((value: T[typeof key]) => T[typeof key])
  ) =>
    setFunction((previous) => ({
      ...previous,
      [key]:
        typeof value === "function"
          ? (value as (value: T[typeof key]) => T[typeof key])(previous[key])
          : value,
    }));

export type TypingBehaviour = Partial<{
  speed: number;
  timidness: number;
  confidence: number;

  halt: State<boolean>;
}>;
