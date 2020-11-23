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
    this.checkOrientation();
  }

  addFollower(follower: Object) {
    this.observer.subscribe(follower);
  }

  updateConfig(data: IConfig) {
    this.config = data;
    this.setThumbTwo();
    this.checkOrientation();
    this.step.updateConfigStep(data);
    this.thumbOne.updateConfigThumb(data);
    this.thumbTwo?.updateConfigThumb(data);
    this.progressBar.updateBarConfig(data);
  }

  checkOrientation() {
    if (this.config.orientation == "vertical") {
      this.sliderBlock?.classList.add("slider__block_vertical");
    }
    if (this.config.orientation == "horizontal") {
      this.sliderBlock?.classList.remove("slider__block_vertical");
    }
  }
  setPositionThumb(data: any) {
    if (data.stepData) {
      this.step.addStepLine(data.stepData);
      this.progressBar.cleanStyleAttr();
      this.thumbOne.cleanStyleAttr();
      this.thumbTwo?.cleanStyleAttr();
    }
    if (data.dataFirstThumb) {
      this.thumbOne.setPosition(data.dataFirstThumb.positionFrom);
      this.thumbOne.setLabelValue(data.dataFirstThumb.valueFrom);
    }

    if (data.dataSecondThumb) {
      this.thumbTwo?.setPosition(data.dataSecondThumb.positionTo);
      this.thumbTwo?.setLabelValue(data.dataSecondThumb.valueTo);
    }
    this.progressBar.addBar();
  }
  sliderClick() {
    this.sliderBlock.addEventListener("click", this.onSliderClick.bind(this));
  }
  onSliderClick(e: MouseEvent) {
    if (this.config.orientation == "horizontal") {
      this.fundClickPlaceHoriz(e)
    }
    if (this.config.orientation == "vertical") {
      this.fundChickPlaceVert(e)
    }
  }
  fundClickPlaceHoriz(e: MouseEvent) {
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
  fundChickPlaceVert(e: MouseEvent) {
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
  subscribeOnUpdate() {
    this.thumbOne.addFollower(this);
    this.thumbTwo?.addFollower(this);
  }
  setThumbTwo() {
    let secondThumb = this.sliderBlock.querySelector(
      ".thumb_second"
    ) as HTMLElement;
    if (this.config.range) {
      this.thumbTwo?.addThis();
    } else if (!this.config.range && secondThumb !== null) {
      this.thumbTwo?.removeThis();
    }
  }
  update(type: string, data: IDataThumbMove) {
    this.observer.broadcast("mouseMove", data);
  }
}
export { SliderBlock };

