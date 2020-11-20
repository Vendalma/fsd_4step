export class Observer {
  private observers: Array<any>;
  constructor() {
    this.observers = [];
  }
  subscribe(fn: Object) {
    this.observers.push(fn);
  }

  unsubscribe(fn: Object) {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }

  broadcast(type: string, data: any) {
    this.observers.forEach((subscriber) => subscriber.update(type, data));
  }
}
