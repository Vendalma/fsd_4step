class Observer<T> {
  private observers: ((data: T) => void)[];

  constructor() {
    this.observers = [];
  }

  subscribe(fn: (data: T) => void): void {
    this.observers.push(fn);
  }

  broadcast(data: T): void {
    this.observers.forEach((subscriber) => subscriber(data));
  }
}
export default Observer;
