import { Observer } from "../../Observer/Observer";
import { SliderBlock } from "./sliderBlock";
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
class View {
  config: IConfigView;
  range: boolean;
  positionFrom: number;
  positionTo: number;
  orientation: string;
  min: number;
  max: number;
  stepValue: number;
  label: boolean;

  wrapper: HTMLElement;

  sliderContainer: HTMLElement;
  observer: Observer;
  sliderBlock: SliderBlock;

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
    this.wrapper.classList.add("wrapper");

    this.sliderContainer = document.createElement("div");
    this.sliderContainer.classList.add("slider");
    this.wrapper.append(this.sliderContainer);

    this.observer = new Observer();
    this.sliderBlock = new SliderBlock(this.config, this.sliderContainer);

    this.changeOrientation(this.orientation);
    this.onloadWindow();
    this.resizeWindow();
    this.subscribeOnUpdate();
    this.init();
  }

  init() {
    this.sliderContainer.setAttribute("data-min", this.min + "");
    this.sliderContainer.setAttribute("data-max", this.max + "");
    this.sliderContainer.setAttribute("data-step", this.stepValue + "");
    this.sliderContainer.setAttribute("data-label", this.label + "");
    this.sliderContainer.setAttribute("data-orientation", this.orientation);
    this.sliderContainer.setAttribute("data-range", this.range + "");
    this.sliderContainer.setAttribute("data-from", this.positionFrom + "");
    if (this.range)
      this.sliderContainer.setAttribute("data-to", this.positionTo + "");
  }

  subscribeOnUpdate() {
    this.sliderBlock.addFollower(this);
  }
  update(type: string, data: any) {
    this.observer.broadcast("mouseMove", data);
  }
  changeOrientation(data: string) {
    this.orientation = data;
    this.sliderBlock.changeOrientation(this.orientation);
    this.getSliderSize();
  }
  changeMin(data: number) {
    this.min = data;
    this.sliderBlock.changeMin(this.min);
  }

  changeMax(data: number) {
    this.max = data;
    this.sliderBlock.changeMax(this.max);
  }

  changeLabel(data: boolean) {
    this.sliderBlock.changeLabel(data);
  }

  changeRange(data: boolean) {
    this.range = data;
    this.sliderBlock.changeRange(this.range);
    this.getSliderSize();
  }

  changePositionFrom(data: number) {
    this.positionFrom = data;
    this.sliderBlock.changePositionFrom(data);
    this.getSliderSize();
  }

  changePositionTo(data: number) {
    this.positionTo = data;
    this.sliderBlock.changePositionTo(data);
    this.getSliderSize();
  }

  setPositionMoveThumb(data: any) {
    this.sliderBlock.setPositionMoveThumb(data);
    let data_num = data["data_num"];
    let valueThumb = data["value"];
    if (!this.range) {
      this.sliderContainer.setAttribute("data-from", valueThumb);
    }
    if (this.range) {
      if (data_num == "1") {
        this.sliderContainer.setAttribute("data-from", valueThumb);
      } else if (data_num == "2") {
        this.sliderContainer.setAttribute("data-to", valueThumb);
      }
    }
  }

  setOnloadView(data: any) {
    this.sliderBlock.setOnloadThumbPosition(data);
    this.sliderBlock.addStep(data);
  }
  addFollower(follower: any) {
    this.observer.subscribe(follower);
  }
  onloadWindow() {
    window.addEventListener("load", this.getSliderSize.bind(this));
  }

  resizeWindow() {
    window.addEventListener("resize", this.getSliderSize.bind(this));
  }

  getSliderSize() {
    if (this.orientation == "horisontal")
      this.observer.broadcast("loadData", {
        sliderSize: this.sliderContainer.offsetWidth,
      });

    if (this.orientation == "vertical")
      this.observer.broadcast("loadData", {
        sliderSize: this.sliderContainer.offsetHeight,
      });
  }
}
export { View };

