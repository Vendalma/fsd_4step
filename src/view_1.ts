import config from "./config";
import { Observer } from "./observer";
import { Thumb } from "./Thumb";
import { Controller } from "./Controller";
import { progressBar } from "./progressBar";
interface IConfigView {
  id: string;
  min?: number;
  max?: number;
  range: boolean;
  position_1: number;
  position_2?: number;
  orientation: string;
}
export class View {
  config: IConfigView;
  id: string;
  range: boolean;
  position_1: number;
  orientation: string;
  wrapper: HTMLElement | null | Element;
  panel: HTMLElement | null;
  slider: HTMLElement | null;
  controller: Controller;
  thumbOne: Thumb;
  thumbTwo: Thumb | null;
  observer: Observer;
  progressBar: progressBar;
  constructor() {
    this.config = config;
    this.id = config.id;
    this.range = config.range;
    this.position_1 = config.position_1;
    this.orientation = config.orientation;

    this.wrapper = document.querySelector(this.id);
    this.wrapper?.classList.add("wrapper");

    this.panel = this.createElement("div", "panel");
    this.slider = this.createElement("div", "slider");
    this.wrapper?.append(this.panel);
    this.wrapper?.append(this.slider);
    this.thumbOne = new Thumb("thumb_first", this.slider, this.range, 1);
    this.thumbOne.observer.subscribe(this);

    this.thumbTwo = this.range
      ? new Thumb("thumb_second", this.slider, this.range, 2)
      : null;
    this.thumbTwo?.observer.subscribe(this);

    this.controller = new Controller(this.panel);
    this.controller.observer.subscribe(this);

    this.observer = new Observer();
    this.progressBar = new progressBar(this.slider);

    this.checkOrientation();
  }

  checkOrientation() {
    if (this.orientation == "vertical")
      this.slider?.classList.toggle("slider_vertical");
  }

  createElement(tag: string, className: string) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);

    return element;
  }

  update(type: string, data: any) {
    this.observer.broadcast("mouseMove", data);

    if (type == "range") {
      //.range = data;
      this.checkRange();
      this.observer.broadcast("changeRange", data);
      console.log(this.config);
    }
  }

  checkRange() {
    let secondThumb = document.querySelector(".thumb_second");
    if (this.range && secondThumb == null) {
      this.thumbTwo = new Thumb("thumb_second", this.slider, this.range, 2);
      this.thumbTwo.addThis();
    } else if (!this.range && this.thumbTwo !== null) {
      this.thumbTwo.removeThis();
    }
  }

  setPosition_1(data: any) {
    let data_num = data["data_num"];
    let position = data["position"];

    if (!this.range) {
      this.thumbOne.getPosition(position);
      this.progressBar.setProgressBar(data);
    }
    if (this.range) {
      if (data_num == "1") {
        this.thumbOne.getPosition(position);
        this.progressBar.setProgressBar(data);
      } else {
        this.thumbTwo?.getPosition(position);
        this.progressBar.setProgressBar(data);
      }
    }
    // this.controller.setValue(data);
  }
}
