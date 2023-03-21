export type TypingBehaviour = Partial<{
  speed: number;
  timidness: number;
  confidence: number;
}>;

export type Animation = { clock: number } & Partial<{
  interval: number;
  behaviour: TypingBehaviour;
}>;

export type AnimationEvent = {
  time: number;
  event: Function;
};
