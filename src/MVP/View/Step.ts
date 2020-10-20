interface IconfigStep {
  min: number;
  max: number;
  orientation: string;
}
export class Step implements IconfigStep {
  config: IconfigStep;
  min: number;
  max: number;
  orientation: string;

  container: HTMLElement;

  constructor(IconfigStep: any, container: HTMLElement) {
    this.config = IconfigStep;
    this.min = this.config.min;
    this.max = this.config.max;
    this.orientation = this.config.orientation;

    this.container = container;
  }

  addStepLine(data: any) {
    this.deleteElements();
    let thimbHeight = this.container.querySelector(".thumb_first");

    if (this.container.parentElement && thimbHeight instanceof HTMLElement) {
      let stepCount = data["stepCount"];
      let stepSize = data["stepSize"];

      for (let i = 0; i < stepCount + 1; i++) {
        let stepBlock = document.createElement("div");
        stepBlock.classList.add("slider__step-block");
        this.container.append(stepBlock);

        if (i == 0) {
          stepBlock.innerHTML = this.min + "";
          stepBlock.classList.add('slider__step-block_min')
        }else if (i == stepCount) {
          stepBlock.innerHTML = this.max + "";
          stepBlock.classList.add('slider__step-block_max')
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

  changeMinValue(data: number) {
    this.min = data;
    let blockMin = this.container.querySelector('.slider__step-block_min')
    if (blockMin instanceof HTMLElement) blockMin.innerHTML = data + ''
  }

  changeMaxValue(data: number) {
    this.max = data
    let blockMax = this.container.querySelector('.slider__step-block_max')
    if (blockMax instanceof HTMLElement) blockMax.innerHTML = data + ''
  }

  deleteElements() {
    let steps = this.container.querySelectorAll(".slider__step-block");

    if (steps)
      steps.forEach((elem) => {
        this.container.removeChild(elem);
      });
  }

  checkOrientation(data: string) {
    this.orientation = data;
  }
}
