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
  wrapper: HTMLElement;
  sliderContainer: HTMLElement;
  observer: Observer;
  sliderBlock: SliderBlock;

  constructor(IConfigView: any, wrapper: HTMLElement) {
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

  private setAttr() {
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
      "data-from-move",
      String(this.config.positionFrom)
    );
    this.sliderContainer.setAttribute(
      "data-to",
      String(this.config.positionTo)
    );
    this.sliderContainer.setAttribute(
      "data-to-move",
      String(this.config.positionTo)
    );
  }

  private updateAttrToMove() {
    if (
      Number(this.sliderContainer.getAttribute("data-to-move")) !==
      this.config.positionTo
    ) {
      this.sliderContainer.setAttribute(
        "data-to-move",
        String(this.config.positionTo)
      );
    }
  }
  private updateAttrFromMove() {
    if (
      Number(this.sliderContainer.getAttribute("data-from-move")) !==
      this.config.positionFrom
    ) {
      this.sliderContainer.setAttribute(
        "data-from-move",
        String(this.config.positionFrom)
      );
    }
  }
  private subscribeOnUpdate() {
    this.sliderBlock.addFollower(this);
  }
  private update(type: string, data: any) {
    this.observer.broadcast("mouseMove", data);
  }

  setPositionMoveThumb(data: any) {
    this.sliderBlock.setPositionMoveThumb(data);
    let data_num = data.data_num;
    let valueThumb = data.value;
    if (data_num == "1") {
      this.sliderContainer.setAttribute("data-from-move", valueThumb);
    }

    if (data_num == "2") {
      this.sliderContainer.setAttribute("data-to-move", valueThumb);
    }
  }

  setOnloadView(data: any) {
    this.sliderBlock.setOnloadThumbPosition(data);
    this.sliderBlock.addStep(data);
  }
  addFollower(follower: any) {
    this.observer.subscribe(follower);
  }
  private onloadWindow() {
    window.addEventListener("load", this.getSliderSize.bind(this));
  }

  private resizeWindow() {
    window.addEventListener("resize", this.getSliderSize.bind(this));
  }

  private getSliderSize() {
    if (this.config.orientation == "horisontal")
      this.observer.broadcast("loadData", this.sliderContainer.offsetWidth);

    if (this.config.orientation == "vertical")
      this.observer.broadcast("loadData", this.sliderContainer.offsetHeight);
  }

  updateConfig(data: any) {
    this.config = data;
    this.sliderBlock.updateConfig(data);
    this.updateAttrFromMove();
    this.updateAttrToMove();
  }
  changeOrientaion(data: any) {
    this.updateConfig(data);
    this.getSliderSize();
  }
}
export { View };

