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

  broadcast(data: number | unknown, type?: string): void {
    this.observers.forEach((subscriber) => subscriber.update(data, type));
  }
}
export default Observer;
