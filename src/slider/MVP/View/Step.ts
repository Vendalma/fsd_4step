interface IConfigStep {
  min: number;
  max: number;
  vertical: boolean;
}
class Step {
  private config: IConfigStep;

  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  addStepLine(data: number): void {
    const thumb = this.container.querySelector('.js-slider__thumb-first') as HTMLElement;
    this.deleteStep();
    const fragment = document.createDocumentFragment();
    const stepSize = data;
    for (let i = 0; i < 21; i += 1) {
      const stepBlock = document.createElement('div');
      stepBlock.classList.add('slider__step-block');
      fragment.append(stepBlock);
      if (i === 0) {
        stepBlock.innerHTML = `${this.config.min}`;
        stepBlock.classList.add('slider__step-block_min');
      } else if (i === 20) {
        stepBlock.innerHTML = `${this.config.max}`;
        stepBlock.classList.add('slider__step-block_max');
      }

      if (this.config.vertical) {
        stepBlock.classList.add('slider__step-block_vertical');
        stepBlock.style.top = `${stepSize * i}px`;
        if (i === 0) {
          stepBlock.style.top = `${stepSize * i - thumb.offsetWidth}px`;
        } else if (i === 20) {
          stepBlock.style.top = `${stepSize * i - thumb.offsetWidth}px`;
        }
      }
      if (!this.config.vertical) {
        stepBlock.style.left = `${stepSize * i}px`;
        stepBlock.classList.remove('slider__step-block_vertical');
      }
    }
    this.container.append(fragment);
  }

  updateConfig(data: IConfigStep): void {
    this.config = data;
  }

  private deleteStep(): void {
    const steps = this.container.querySelectorAll('.slider__step-block') as NodeListOf<HTMLElement>;
    steps.forEach((elem) => {
      this.container.removeChild(elem);
    });
  }
}
export default Step;
