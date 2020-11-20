import { Observer } from "../../Observer/Observer";
import { ProgressBar } from "./progressBar";
import { Step } from "./Step";
import { Thumb } from "./Thumb";

interface IConfig {
  min: number;
  max: number;
  range: boolean;
  positionFrom: number;
  positionTo: number;
  orientation: string;
  label: boolean;
}
interface IDataThumbMove {
  clientXY: number;
  slider_client_react: number;
  data_num: string;
  positionThumbFirst: number;
  positionThumbSecond: number;
}
class SliderBlock {
  config: IConfig;
  sliderContainer: HTMLElement;
  sliderBlock: HTMLElement;
  thumbOne: Thumb;
  thumbTwo: Thumb | null | undefined;
  observer: Observer;
  step: Step;
  progressBar: ProgressBar;
  constructor(IConfig: IConfig, sliderContainer: HTMLElement) {
    this.config = IConfig;
    this.sliderContainer = sliderContainer;
    this.sliderBlock = document.createElement("div");
    this.sliderBlock.classList.add("slider__block");
    this.sliderContainer.append(this.sliderBlock);

    this.observer = new Observer();
    this.thumbOne = new Thumb(
      this.config,
      "thumb_first",
      this.sliderBlock,
      "1"
    );
    this.thumbTwo = new Thumb(
      this.config,
      "thumb_second",
      this.sliderBlock,
      "2"
    );

    this.progressBar = new ProgressBar(this.config, this.sliderBlock);

    this.step = new Step(this.config, this.sliderBlock);
    this.setThumbTwo();
    this.subscribeOnUpdate();
    this.sliderClick();
    this.changeOrientation();
  }

  addFollower(follower: Object) {
    this.observer.subscribe(follower);
  }

  updateConfig(data: IConfig) {
    this.config = data;
    this.changeRange();
    this.changeOrientation();
    this.step.updateConfigStep(data);
    this.thumbOne.updateConfigThumb(data);
    this.thumbTwo?.updateConfigThumb(data);
    this.progressBar.updateBarConfig(data);
  }

  changeRange() {
    const secondThumb = this.sliderBlock.querySelector(
      ".thumb_second"
    ) as HTMLElement;
    if (secondThumb !== null) {
      this.setThumbTwo();
    }
    if (this.config.range) {
      let thumbTwo = this.thumbTwo?.addThis();
    }
  }
  changeOrientation() {
    if (this.config.orientation == "vertical") {
      this.sliderBlock?.classList.add("slider__block_vertical");
    }
    if (this.config.orientation == "horizontal") {
      this.sliderBlock?.classList.remove("slider__block_vertical");
    }
  }
  setPositionThumb(data: any) {
    if (data.dataSecondThumb) {
      this.thumbTwo?.setPosition(data.dataSecondThumb.positionTo);
      this.thumbTwo?.setLabelValue(data.dataSecondThumb.valueTo);
      if (!data.dataFirstThumb)
        this.progressBar.setPositionForThumbTwo(
          data.dataSecondThumb.positionTo
        );
    }
    if (data.dataFirstThumb) {
      this.thumbOne.setPosition(data.dataFirstThumb.positionFrom);
      this.thumbOne.setLabelValue(data.dataFirstThumb.valueFrom);
      this.progressBar.setPositionForThumbOne(data.dataFirstThumb.positionFrom);
    }
    if (data.stepData) {
      this.step.addStepLine(data.stepData);
    }
  }

  sliderClick() {
    this.sliderBlock.addEventListener("click", this.onSliderClick.bind(this));
  }
  onSliderClick(e: MouseEvent) {
    if (this.config.orientation == "horizontal") {
      if (!this.config.range) {
        this.thumbOne.onMouseUp(e);
      } else if (this.config.range) {
        let thumbFirst = Math.abs(
          this.thumbOne.thumb.getBoundingClientRect().x - e.clientX
        );
        let thumbSecond = Math.abs(
          (this.thumbTwo?.thumb.getBoundingClientRect().x as number) - e.clientX
        );
        if (thumbFirst < thumbSecond) {
          this.thumbOne.onMouseUp(e);
        } else {
          this.thumbTwo?.onMouseUp(e);
        }
      }
    }
    if (this.config.orientation == "vertical") {
      if (!this.config.range) {
        this.thumbOne.onMouseUp(e);
      } else if (this.config.range) {
        let thumbFirst = Math.abs(
          this.thumbOne.thumb.getBoundingClientRect().y - e.clientY
        );
        let thumbSecond = Math.abs(
          (this.thumbTwo?.thumb.getBoundingClientRect().y as number) - e.clientY
        );
        if (thumbFirst < thumbSecond) {
          this.thumbOne.onMouseUp(e);
        } else {
          this.thumbTwo?.onMouseUp(e);
        }
      }
    }
  }
  subscribeOnUpdate() {
    this.thumbOne.addFollower(this);
    this.thumbTwo?.addFollower(this);
  }
  setThumbTwo() {
    this.config.range ? null : this.thumbTwo?.removeThis();
  }
  update(type: string, data: IDataThumbMove) {
    this.observer.broadcast("mouseMove", data);
  }
}
export { SliderBlock };

