interface IconfigStep {
  min: number;
  max: number;
  orientation: string;
}
class Step {
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
    const fragment = document.createDocumentFragment();
    let stepCount = data["stepCount"];
    let stepSize = data["stepSize"];

    for (let i = 0; i < stepCount + 1; i++) {
      let stepBlock = document.createElement("div");
      stepBlock.classList.add("slider__step-block");
      fragment.append(stepBlock);
      if (i == 0) {
        stepBlock.innerHTML = this.min + "";
        stepBlock.classList.add("slider__step-block_min");
      } else if (i == stepCount) {
        stepBlock.innerHTML = this.max + "";
        stepBlock.classList.add("slider__step-block_max");
      }

      if (this.orientation == "vertical") {
        stepBlock.classList.add("slider__step-block_vertical");
        stepBlock.style.top = stepSize * i + "px";
        if (i == 0) {
          stepBlock.style.top = stepSize * i - 17 + "px";
        } else if (i == stepCount) {
          stepBlock.style.top = stepSize * i - 17 + "px";
        }
      }
      if (this.orientation == "horisontal") {
        stepBlock.style.left = stepSize * i + "px";
        stepBlock.classList.remove("slider__step-block_vertical");
      }
    }
    this.container.append(fragment);
  }

  changeMinValue(data: number) {
    this.min = data;
    let blockMin = this.container.querySelector(
      ".slider__step-block_min"
    ) as HTMLElement;
    blockMin.innerHTML = data + "";
  }

  changeMaxValue(data: number) {
    this.max = data;
    let blockMax = this.container.querySelector(
      ".slider__step-block_max"
    ) as HTMLElement;
    blockMax.innerHTML = data + "";
  }

  private deleteElements() {
    let steps = this.container.querySelectorAll(
      ".slider__step-block"
    ) as NodeListOf<HTMLElement>;

    steps.forEach((elem) => {
      this.container.removeChild(elem);
    });
  }

  checkOrientation(data: string) {
    this.orientation = data;
  }
}
export { Step };

