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
interface IDataThumbMove {
  clientXY: number;
  slider_client_react: number;
  data_num: string;
  positionThumbFirst: number;
  positionThumbSecond: number;
}
class View {
  config: IConfigView;
  wrapper: HTMLElement;
  sliderContainer: HTMLElement;
  observer: Observer;
  sliderBlock: SliderBlock;
  constructor(IConfigView: IConfigView, wrapper: HTMLElement) {
    this.config = IConfigView;
    this.wrapper = wrapper;
    this.wrapper.classList.add("wrapper");
    this.sliderContainer = document.createElement("div");
    this.sliderContainer.classList.add("slider");
    this.wrapper.append(this.sliderContainer);
    this.observer = new Observer();
    this.sliderBlock = new SliderBlock(this.config, this.sliderContainer);

    this.onloadWindow();
    this.resizeWindow();
    this.subscribeOnUpdate();
    this.setAttr();
  }

  setAttr() {
    this.sliderContainer.setAttribute("data-min", String(this.config.min));
    this.sliderContainer.setAttribute("data-max", String(this.config.max));
    this.sliderContainer.setAttribute("data-step", String(this.config.step));
    this.sliderContainer.setAttribute("data-label", String(this.config.label));
    this.sliderContainer.setAttribute(
      "data-orientation",
      String(this.config.orientation)
    );
    this.sliderContainer.setAttribute("data-range", String(this.config.range));
    this.sliderContainer.setAttribute(
      "data-from",
      String(this.config.positionFrom)
    );
    this.sliderContainer.setAttribute(
      "data-to",
      String(this.config.positionTo)
    );
  }
  subscribeOnUpdate() {
    this.sliderBlock.addFollower(this);
  }
  update(type: string, data: IDataThumbMove) {
    this.observer.broadcast("mouseMove", data);
  }
  setPositionThumb(data: any) {
    this.sliderBlock.setPositionThumb(data);
    if (data.dataFirstThumb) {
      this.sliderContainer.setAttribute("data-from", data.dataFirstThumb.valueFrom);
    }
    if (data.dataSecondThumb) {
      this.sliderContainer.setAttribute("data-to", data.dataSecondThumb.valueTo);
    }
  }
  addFollower(follower: Object) {
    this.observer.subscribe(follower);
  }
  onloadWindow() {
    window.addEventListener("load", this.getSliderSize.bind(this));
  }

  resizeWindow() {
    window.addEventListener("resize", this.getSliderSize.bind(this));
  }

  getSliderSize() {
    if (this.config.orientation == "horizontal")
      this.observer.broadcast("sliderSize", this.sliderContainer.offsetWidth);

    if (this.config.orientation == "vertical")
      this.observer.broadcast("sliderSize", this.sliderContainer.offsetHeight);
  }
  updateFromToAttr() {
    if (this.config.positionFrom !== Number(this.sliderContainer.dataset.from)) {
      this.sliderContainer.dataset.from = String(this.config.positionFrom)
    }
    if (this.config.positionTo !== Number(this.sliderContainer.dataset.to)) {
      this.sliderContainer.dataset.to = String(this.config.positionTo)
    }
  }
  updateConfig(data: IConfigView) {
    this.config = data;
    this.sliderBlock.updateConfig(data);
    this.updateFromToAttr()
  }
  changeOrientation(data: IConfigView) {
    this.updateConfig(data);
    this.getSliderSize();
  }
}
export { View };

