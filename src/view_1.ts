import config from "./config";
import { Observer } from "./observer";
import { Thumb } from "./Thumb";
import { Controller } from "./Controller";
import { progressBar } from "./progressBar";
import { Step } from "./Step";
interface IConfigView {
  id: string;
  min?: number;
  max?: number;
  range: boolean;
  position_1: number;
  position_2?: number;
  orientation: string;
  step: number;
}
export class View {
  config: IConfigView;
  id: string;
  range: boolean;
  position_1: number;
  position_2: number;
  orientation: string;
  min: number;
  max: number;
  stepValue: number;

  wrapper: HTMLElement | null | Element;
  panel: HTMLElement | null;
  slider: HTMLElement | null;
  controller: Controller;
  thumbOne: Thumb;
  thumbTwo: Thumb | null;
  observer: Observer;
  step: Step;
  progressBar: progressBar;
  mainSliderBlock: HTMLElement | null;
  subSliderBlock: HTMLElement | null;

  constructor() {
    this.config = config;
    this.id = config.id;
    this.range = config.range;
    this.position_1 = config.position_1;
    this.position_2 = config.position_2;
    this.orientation = config.orientation;
    this.min = config.min;
    this.max = config.max;
    this.stepValue = config.step;

    this.wrapper = document.querySelector(this.id);
    this.wrapper?.classList.add("wrapper");

    this.panel = this.createElement("div", "panel");
    this.slider = this.createElement("div", "slider");

    this.mainSliderBlock = this.createElement("div", "slider__main-block");
    this.subSliderBlock = this.createElement("div", "slider__sub-block");

    this.wrapper?.append(this.panel);
    this.wrapper?.append(this.slider);
    this.slider.append(this.mainSliderBlock);
    this.slider.append(this.subSliderBlock);

    this.thumbOne = new Thumb(
      "thumb_first",
      this.mainSliderBlock,
      this.range,
      1
    );

    this.thumbOne.observer.subscribe(this);

    this.thumbTwo = new Thumb(
      "thumb_second",
      this.mainSliderBlock,
      this.range,
      2
    );
    this.range ? null : this.thumbTwo?.removeThis();
    this.thumbTwo?.observer.subscribe(this);

    this.controller = new Controller(this.panel);
    this.controller.observer.subscribe(this);

    this.observer = new Observer();
    this.progressBar = new progressBar(this.mainSliderBlock);

    this.step = new Step(this.mainSliderBlock);

    this.checkOrientation();
    this.onload();
  }

  checkOrientation() {
    if (this.orientation == "vertical") {
      this.slider?.classList.add("slider_vertical");
    }

    if (this.orientation == "horisontal") {
      this.slider?.classList.remove("slider_vertical");
    }
  }

  createElement(tag: string, className: string) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);

    return element;
  }

  update(type: string, data: any) {
    this.observer.broadcast("mouseMove", data);

    if (type == "range") {
      this.range = data;
      this.checkRange();
      this.observer.broadcast("changeRange", data);
      this.progressBar.checkRange(data);
    }

    if (type == "label") {
      this.thumbOne.checkLabel(data);
      this.thumbTwo?.checkLabel(data);
    }

    if (type == "orientation") {
      this.orientation = data;
      this.checkOrientation();
      this.thumbOne.checkOrientation(data);
      this.thumbTwo?.checkOrientation(data);
      this.observer.broadcast("orientation", data);
    }

    if (type == "updatePositionThumbFirst") {
      this.thumbOne.getPosition(data);
    }

    if (type == "updatePositionThumbSecond") {
      this.thumbTwo?.getPosition(data);
    }

    if (type == "changeMaxValue") {
      //this.step.changeMaxValue(data);
    }

    if (type == "changeMinValue") {
      // this.step.changeMinValue(data);
    }
  }

  checkRange() {
    if (this.thumbTwo) {
      if (this.range) {
        this.thumbTwo.addThis();
      } else if (!this.range) {
        this.thumbTwo.removeThis();
      }
    }
  }

  setPosition_1(data: any) {
    let data_num = data["data_num"];
    let position = data["position"];
    let valueThumb = data["value"];
    if (!this.range) {
      this.thumbOne.getPosition(position);
      this.thumbOne.setLabelValue(valueThumb);
      this.progressBar.setProgressBar(data);
    }
    if (this.range) {
      if (data_num == "1") {
        this.thumbOne.getPosition(position);
        this.thumbOne.setLabelValue(valueThumb);
        this.progressBar.setProgressBar(data);
      } else {
        this.thumbTwo?.getPosition(position);
        this.thumbTwo?.setLabelValue(valueThumb);
        this.progressBar.setProgressBar(data);
      }
    }
    this.controller.updateThumbPosition(data);
  }

  setStep(data: any) {
    this.step.addStepLine(data);
  }

  setOnloadThumbPosition(data: any) {
    let onloadPositionThumbOne = data["onloadPositionThumbOne"];
    let onloadPositionThumbTwo = data["onloadPositionThumbTwo"];

    if (!this.range) {
      this.thumbOne.setPosition(onloadPositionThumbOne);
      this.thumbOne.setLabelValue(this.position_1 + "");
      this.progressBar.setOnloadProgressBarPosition(data);

      this.thumbTwo?.setPosition(onloadPositionThumbTwo);
      this.thumbTwo?.setLabelValue(this.position_2 + "");
    }
    if (this.range) {
      this.thumbOne.setPosition(onloadPositionThumbOne);
      this.thumbOne.setLabelValue(this.position_1 + "");
      this.progressBar.setOnloadProgressBarPosition(data);

      this.thumbTwo?.setPosition(onloadPositionThumbTwo);
      this.thumbTwo?.setLabelValue(this.position_2 + "");
      this.progressBar.setOnloadProgressBarPosition(data);
    }
  }

  onload() {
    window.addEventListener("load", () => {
      this.observer.broadcast("loadData", {
        sliderWidth: this.slider?.offsetWidth,
      });
    });

    /* window.addEventListener("resize", () => {
      this.observer.broadcast("loadData", {
        sliderWidth: this.slider?.offsetWidth,
      });
    });*/
  }
}
