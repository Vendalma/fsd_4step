interface Subject {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  broadcast(type: string, data: any): void;
}

export class Observer implements Subject {
  private observers: Array<any>;
  constructor() {
    this.observers = [];
  }
  subscribe(fn: object) {
    this.observers.push(fn);
  }

  unsubscribe(fn: object) {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }

  broadcast(type: string, data: any) {
    this.observers.forEach((subscriber) => subscriber.update(type, data));
  }
}
