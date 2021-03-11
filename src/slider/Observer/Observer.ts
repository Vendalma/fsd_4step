interface valueForBroadcast {
  value: number | unknown;
  type?: string;
}

class Observer {
  private observers: Array<any>; /* eslint-disable-line */

  constructor() {
    this.observers = [];
  }

  subscribe(fn: unknown): void {
    this.observers.push(fn);
  }

  broadcast({ value, type }: valueForBroadcast): void {
    this.observers.forEach((subscriber) => subscriber({ value, type }));
  }
}
export default Observer;
