interface ClockOptions {
  /**
   * Function called to fetch the current time.
   *
   * @default () => Date.now()
   */
  fetchTime?(): number | Promise<number>;

  /**
   * Number of samples to fetch during each synchronization.
   *
   * @default 10
   */
  sampleCount?: number;

  /**
   * Delay between each synchronization.
   * Set to `Number.POSITIVE_INFINITY` to disable it.
   *
   * @default 60000
   */
  interval?: number;
}

export class Clock extends EventTarget {
  /**
   * Current time offset.
   */
  readonly offset: number;

  /**
   * Promise resolved when the clock is ready.
   */
  readonly ready: Promise<void>;

  /**
   * Creates a new clock.
   */
  constructor(options?: ClockOptions);

  /**
   * Returns the current time.
   */
  now(): number;

  /**
   * Synchronizes the clock.
   */
  sync(): Promise<void>;
}
