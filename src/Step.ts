import config from "./config";
interface IconfigStep {
  min: number;
  max: number;
  step: number;
}
export class Step implements IconfigStep {
  config: IconfigStep;
  min: number;
  max: number;
  step: number;

  container: HTMLElement | null;
  minBlock: HTMLElement | null;
  maxBlock: HTMLElement | null;

  constructor(container: HTMLElement | null) {
    this.config = config;
    this.min = config.min;
    this.max = config.max;
    this.step = config.step;

    this.container = container;

    this.minBlock = document.createElement("div");
    this.minBlock.classList.add("slider__step");
    this.minBlock.classList.add("slider__step_min");
    this.minBlock.innerHTML = this.min + "";
    // this.container?.append(this.minBlock);

    this.maxBlock = document.createElement("div");
    this.maxBlock.classList.add("slider__step");
    this.maxBlock.classList.add("slider__step_max");
    this.maxBlock.innerHTML = this.max + "";
    //this.container?.append(this.maxBlock);
  }

  addStepLine(data: any) {
    if (this.container?.parentElement) {
      let stepCount = data["stepCount"];
      let stepSize = data["stepSize"];

      let count = this.step;
      let sizeCount = 0;
      for (let i = 0; i < stepCount + 1; i++) {
        let stepBlock = document.createElement("div");
        stepBlock.classList.add("step-block");
        this.container?.append(stepBlock);
        stepBlock.classList.add("slider__step");
        stepBlock.style.left = stepSize * sizeCount + "px";
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
    if (this.minBlock) this.minBlock.innerHTML = data;
  }

  changeMaxValue(data: string) {
    if (this.maxBlock) this.maxBlock.innerHTML = data;
  }
}
