import config from "./config";
import { Observer } from "./observer";
import { Thumb } from "./Thumb";
import { Controller } from "./Controller";
interface IConfigView {
  id: string;
  min?: number;
  max?: number;
  range: boolean;
  position_1?: number;
  position_2?: number;
}
export class View {
  config: IConfigView;
  id: string;
  wrapper: HTMLElement | null | Element;
  panel: HTMLElement | null;
  slider: HTMLElement | null;
  controller: Controller;
  thumb: Thumb;
  observer: Observer;
  constructor() {
    this.config = config;
    this.id = config.id;

    this.wrapper = this.getElement(this.id);
    this.wrapper?.classList.add("wrapper");

    this.panel = this.createElement("div", "panel");
    this.slider = this.createElement("div", "slider");
    this.wrapper?.append(this.panel);
    this.wrapper?.append(this.slider);

    this.thumb = new Thumb(1, this.slider);
    this.thumb.observer.subscribe(this);

    this.controller = new Controller(this.panel);
    this.controller.observer.subscribe(this);

    this.observer = new Observer();

    this.init();
  }

  init() {}

  getElement(selector: string) {
    const element: HTMLElement | null = document.querySelector(selector);
    return element;
  }

  createElement(tag: string, className: string) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);

    return element;
  }

  update(type: string, data: any) {
    this.observer.broadcast("mouseDown", data);
    this.observer.broadcast("mouseUp", data);
    this.observer.broadcast("clientX", data);
  }

  setPosition(position: number) {
    this.thumb.getPosition(position);
    this.controller.setValue(position);
  }
}
