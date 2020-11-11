import { Observer } from "../../Observer/Observer";
import { progressBar } from "./progressBar";
import { Step } from "./Step";
import { Thumb } from "./Thumb";

interface IConfig {
  min: number;
  max: number;
  range: boolean;
  positionFrom: number;
  positionTo: number;
  orientation: string;
  step: number;
  label: boolean;
}
class SliderBlock {
  config: IConfig;

  sliderContainer: HTMLElement;
  sliderBlock: HTMLElement;
  thumbOne: Thumb;
  thumbTwo: Thumb | null | undefined;
  observer: Observer;
  step: Step;
  progressBar: progressBar;
  constructor(IConfig: any, sliderContainer: HTMLElement) {
    this.config = IConfig;

    this.sliderContainer = sliderContainer;

    this.sliderBlock = document.createElement("div");
    this.sliderBlock.classList.add("slider__block");
    this.sliderContainer.append(this.sliderBlock);

    this.observer = new Observer();
    this.thumbOne = new Thumb(this.config, "thumb_first", this.sliderBlock, 1);
    this.thumbTwo = new Thumb(this.config, "thumb_second", this.sliderBlock, 2);

    this.progressBar = new progressBar(this.config, this.sliderBlock);

    this.step = new Step(this.config, this.sliderBlock);
    this.setThumbTwo();
    this.subscribeOnUpdate();
    this.sliderClick();
    this.changeOrientation();
  }

  addFollower(follower: any) {
    this.observer.subscribe(follower);
  }
  addStep(data: any) {
    this.step.addStepLine(data);
  }
  updateConfig(data: any) {
    this.config = data;
    this.changeRange();
    this.changeOrientation();
    this.step.updateConfigStep(data);
    this.thumbOne.updateConfigThumb(data);
    this.thumbTwo?.updateConfigThumb(data);
    this.progressBar.updateBarConfig(data);
  }

  private changeRange() {
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
  private changeOrientation() {
    if (this.config.orientation == "vertical") {
      this.sliderBlock?.classList.add("slider__block_vertical");
    }
    if (this.config.orientation == "horisontal") {
      this.sliderBlock?.classList.remove("slider__block_vertical");
    }
  }

  setOnloadThumbPosition(data: any) {
    let onloadPositionThumbOne = data.thumbData.onloadPositionThumbOne;
    let onloadPositionThumbTwo = data.thumbData.onloadPositionThumbTwo;

    if (!this.config.range) {
      this.thumbOne.setPosition(onloadPositionThumbOne);
      this.thumbOne.setLabelValue(this.config.positionFrom);
      this.progressBar.setOnloadProgressBarPosition(data);
    }
    if (this.config.range) {
      this.thumbOne.setPosition(onloadPositionThumbOne);
      this.thumbOne.setLabelValue(this.config.positionFrom);
      this.progressBar.setOnloadProgressBarPosition(data);

      this.thumbTwo?.setPosition(onloadPositionThumbTwo);
      this.thumbTwo?.setLabelValue(this.config.positionTo);
    }
  }
  setPositionMoveThumb(data: any) {
    let data_num = data.data_num;
    let position = data.position;
    let valueThumb = data.value;
    if (data_num == "1") {
      this.thumbOne.setPosition(position);
      this.thumbOne.setLabelValue(valueThumb);
      this.progressBar.setPositionForThumbOne(position);
    } else if (data_num == "2") {
      this.thumbTwo?.setPosition(position);
      this.thumbTwo?.setLabelValue(valueThumb);
      this.progressBar.setPositionForThumbTwo(position);
    }
  }

  private sliderClick() {
    this.sliderBlock?.addEventListener("click", this.onSliderClick.bind(this));
  }
  private onSliderClick(e: MouseEvent): any {
    if (this.config.orientation == "horisontal") {
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
        } else if (thumbFirst > thumbSecond) {
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
        } else if (thumbFirst > thumbSecond) {
          this.thumbTwo?.onMouseUp(e);
        }
      }
    }
  }
  private subscribeOnUpdate() {
    this.thumbOne.addFollower(this);
    this.thumbTwo?.addFollower(this);
  }
  private setThumbTwo() {
    this.config.range ? null : this.thumbTwo?.removeThis();
  }
  private update(type: string, data: any) {
    this.observer.broadcast("mouseMove", data);
  }
}
export { SliderBlock };

