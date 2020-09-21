export class Event {
  listeners: Array<any>;
  constructor() {
    this.listeners = [];
  }

  addListener(listener: any) {
    this.listeners.push(listener);
  }

  trigger(params: any) {
    this.listeners.forEach((listener) => {
      listener(params);
    });
  }
}
