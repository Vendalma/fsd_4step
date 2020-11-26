class Observer {
  private observers: Array<any>; /* eslint-disable-line */

  constructor() {
    this.observers = [];
  }

  subscribe(fn: unknown): void {
    this.observers.push(fn);
  }

  unsubscribe(fn: unknown): void {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }

  broadcast(type: string, data: number | unknown): void {
    this.observers.forEach((subscriber) => subscriber.update(type, data));
  }
}
export default Observer;
