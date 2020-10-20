interface Subject {
  // Присоединяет наблюдателя к издателю.
  subscribe(observer: Observer): void;

  // Отсоединяет наблюдателя от издателя.
  unsubscribe(observer: Observer): void;

  // Уведомляет всех наблюдателей о событии.
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
