import { Observer } from "../../Observer/Observer";
import { Thumb } from "./Thumb";
import { progressBar } from "./progressBar";
import { Step } from "./Step";
interface IConfigView {
  min: number;
  max: number;
  range: boolean;
  positionFrom: number;
  positionTo: number;
  orientation: string;
  step: number;
  label: boolean;
}
export class View {
  config: IConfigView;
  range: boolean;
  positionFrom: number;
  positionTo: number;
  orientation: string;
  min: number;
  max: number;
  stepValue: number;
  label: boolean;

  wrapper: HTMLElement | null;

  slider: HTMLElement | null;
  thumbOne: Thumb;
  thumbTwo: Thumb | null | undefined;
  observer: Observer;
  step: Step;
  progressBar: progressBar;
  sliderBlock: HTMLElement | null;

  constructor(IConfigView: any, wrapper: HTMLElement) {
    this.config = IConfigView;
    this.range = this.config.range;
    this.positionFrom = this.config.positionFrom;
    this.positionTo = this.config.positionTo;
    this.orientation = this.config.orientation;
    this.min = this.config.min;
    this.max = this.config.max;
    this.stepValue = this.config.step;
    this.label = this.config.label;

    this.wrapper = wrapper;
    this.wrapper?.classList.add("wrapper");

    this.slider = this.createElement("div", "slider");

    this.sliderBlock = this.createElement("div", "slider__block");

    this.wrapper?.append(this.slider);
    this.slider.append(this.sliderBlock);

    this.thumbOne = new Thumb(this.config, "thumb_first", this.sliderBlock, 1);

    this.thumbOne.observer.subscribe(this);

    this.thumbTwo = new Thumb(this.config, "thumb_second", this.sliderBlock, 2);
    this.range ? null : this.thumbTwo?.removeThis();
    this.thumbTwo?.observer.subscribe(this);

    this.observer = new Observer();
    this.progressBar = new progressBar(this.config, this.sliderBlock);

    this.step = new Step(this.config, this.sliderBlock);

    this.init();
    this.checkOrientation(this.orientation);
    this.onloadWindow();
  }
  init() {
    this.slider?.setAttribute("data-min", this.min + "");
    this.slider?.setAttribute("data-max", this.max + "");
    this.slider?.setAttribute("data-step", this.stepValue + "");
    this.slider?.setAttribute("data-label", this.label + "");
    this.slider?.setAttribute("data-orientation", this.orientation);
    this.slider?.setAttribute("data-range", this.range + "");
    this.slider?.setAttribute("data-from", this.positionFrom + "");
    if (this.range) this.slider?.setAttribute("data-to", this.positionTo + "");
  }
  checkOrientation(data: string) {
    this.orientation = data;
    this.thumbOne.checkOrientation(data);
    this.thumbTwo?.checkOrientation(data);
    this.observer.broadcast("orientation", data);
    if (this.orientation == "vertical") {
      this.sliderBlock?.classList.add("slider__block_vertical");
    }

    if (this.orientation == "horisontal") {
      this.sliderBlock?.classList.remove("slider__block_vertical");
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
      this.thumbOne.checkRange(data);
      this.thumbTwo?.checkRange(data);
      this.observer.broadcast("changeRange", data);
      this.progressBar.checkRange(data);
    }

    if (type == "label") {
      this.thumbOne.checkLabel(data);
      this.thumbTwo?.checkLabel(data);
    }

    if (type == "orientation") {
      this.orientation = data;
      //this.checkOrientation();

      this.step.checkOrientation(this.orientation);
      this.getSliderSize();
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

  Label(data: boolean) {
    this.thumbOne.checkLabel(data);
    this.thumbTwo?.checkLabel(data);
  }
  checkRange() {
    if (this.range) {
      let thumbTwo = this.thumbTwo?.addThis();
    } else if (!this.range && this.thumbTwo) {
      this.thumbTwo.removeThis();
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
    // this.controller.updateThumbPosition(data);
  }

  setStep(data: any) {
    this.step.addStepLine(data);
  }

  setOnloadThumbPosition(data: any) {
    let onloadPositionThumbOne = data["onloadPositionThumbOne"];
    let onloadPositionThumbTwo = data["onloadPositionThumbTwo"];

    if (!this.range) {
      this.thumbOne.setPosition(onloadPositionThumbOne);
      this.thumbOne.setLabelValue(this.positionFrom);
      this.progressBar.setOnloadProgressBarPosition(data);

      this.thumbTwo?.setPosition(onloadPositionThumbTwo);
      this.thumbTwo?.setLabelValue(this.positionTo);
    }
    if (this.range) {
      this.thumbOne.setPosition(onloadPositionThumbOne);
      this.thumbOne.setLabelValue(this.positionFrom);
      this.progressBar.setOnloadProgressBarPosition(data);

      this.thumbTwo?.setPosition(onloadPositionThumbTwo);
      this.thumbTwo?.setLabelValue(this.positionTo);
      this.progressBar.setOnloadProgressBarPosition(data);
    }
  }

  onloadWindow() {
    window.addEventListener("load", () => {
      this.getSliderSize();
      this.resizeWindow();
    });
  }

  resizeWindow() {
    window.addEventListener("resize", () => {
      this.getSliderSize();
    });
  }
  getSliderSize() {
    if (this.orientation == "horisontal")
      return this.observer.broadcast("loadData", {
        sliderSize: this.slider?.offsetWidth,
      });

    if (this.orientation == "vertical")
      return this.observer.broadcast("loadData", {
        sliderSize: this.slider?.offsetHeight,
      });
  }
}
