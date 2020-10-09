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

  constructor(IconfigStep: any, container: HTMLElement | null) {
    this.config = IconfigStep;
    this.min = this.config.min;
    this.max = this.config.max;
    this.step = this.config.step;
    this.orientation = this.config.orientation;

    this.container = container;
  }

  addStepLine(data: any) {
    this.deleteElements();
    let thimbHeight = this.container?.querySelector(".thumb_first");

    if (this.container?.parentElement && thimbHeight instanceof HTMLElement) {
      let stepCount = data["stepCount"];
      let stepSize = data["stepSize"];

      let centerStep = data["centerStep"];
      let leftStep = data["leftStep"];
      let rightStep = data["rightStep"];

      for (let i = 0; i < stepCount + 1; i++) {
        let stepBlock = document.createElement("div");
        stepBlock.classList.add("slider__step-block");
        this.container?.append(stepBlock);

        if (i == 0) stepBlock.innerHTML = this.min + "";
        else if (i == stepCount / 2) {
          stepBlock.innerHTML = centerStep + "";
        } else if (i == stepCount / 4) {
          stepBlock.innerHTML = leftStep + "";
        } else if (i == stepCount - stepCount / 4) {
          stepBlock.innerHTML = rightStep + "";
        } else if (i == stepCount) {
          stepBlock.innerHTML = this.max + "";
        }

        if (this.orientation == "vertical") {
          stepBlock.classList.add("slider__step-block_vertical");
          stepBlock.style.top = stepSize * i - stepBlock.offsetHeight + "px";
        }

        if (this.orientation == "horisontal") {
          stepBlock.style.left = stepSize * i + "px";
          stepBlock.classList.remove("slider__step-block_vertical");
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

  deleteElements() {
    let steps = this.container?.querySelectorAll(".slider__step-block");

    if (steps)
      steps.forEach((elem) => {
        this.container?.removeChild(elem);
      });
  }

  checkOrientation(data: string) {
    this.orientation = data;
  }
}
