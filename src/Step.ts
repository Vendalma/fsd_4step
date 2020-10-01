import config from "./config";
interface IconfigStep {
  min: number;
  max: number;
  step: number;
  orientation: string;
}
export class Step implements IconfigStep {
  config: IconfigStep;
  min: number;
  max: number;
  step: number;
  orientation: string;

  container: HTMLElement | null;

  constructor(container: HTMLElement | null) {
    this.config = config;
    this.min = config.min;
    this.max = config.max;
    this.step = config.step;
    this.orientation = config.orientation;

    this.container = container;
  }

  addStepLine(data: any) {
    let thimbHeight = this.container?.querySelector(".thumb_first");
    if (this.container?.parentElement && thimbHeight instanceof HTMLElement) {
      let stepCount = data["stepCount"];
      let stepSize = data["stepSize"];

      let count = this.step;
      let sizeCount = 0;
      for (let i = 0; i < stepCount + 1; i++) {
        let stepBlock = document.createElement("div");
        stepBlock.classList.add("slider__step-block");
        this.container?.append(stepBlock);

        if (this.orientation == "vertical") {
          stepBlock.classList.add("slider__step-block_vertical");
          stepBlock.style.top =
            stepSize * sizeCount - thimbHeight.offsetHeight + "px";
          //stepBlock.style.right = (202 / stepCount) * i + "px";//
        }

        if (this.orientation == "horisontal") {
          stepBlock.style.left = stepSize * sizeCount + "px";
          stepBlock.classList.remove("slider__step-block_vertical");
        }

        sizeCount++;
        if (i == 0) stepBlock.innerHTML = this.min + "";
        else if (i == 1) {
          count = this.min + this.step;
          stepBlock.innerHTML = count + "";
        } else if (i > 1 && i < stepCount + 1) {
          count = count + this.step;
          stepBlock.innerHTML = count + "";
        } else if (i == stepCount + 1) {
          stepBlock.innerHTML = this.max + "";
        }
      }
    }
  }

  changeMinValue(data: string) {
    //if (this.minBlock) this.minBlock.innerHTML = data;
  }

  changeMaxValue(data: string) {
    //if (this.maxBlock) this.maxBlock.innerHTML = data;
  }
}
