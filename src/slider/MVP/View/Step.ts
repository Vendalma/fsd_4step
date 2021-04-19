import { IStepValues } from './types';

interface IConfigStep {
  min: number;
  max: number;
  vertical: boolean;
}

class Step {
  protected config: IConfigStep;

  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  updateValues(values: IConfigStep): void {
    this.config = values;
    const min = this.container.querySelector('.slider__step-block_value-type_min') as HTMLElement;
    const max = this.container.querySelector('.slider__step-block_value-type_max') as HTMLElement;
    if (min !== null && max !== null) {
      min.textContent = `${this.config.min}`;
      max.textContent = `${this.config.max}`;
    }
  }

  addStepLine(values: IStepValues): void {
    const { stepSize, thumbSize } = values;
    this.deleteStep();
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 21; i += 1) {
      const stepBlock = document.createElement('div');
      stepBlock.classList.add('js-slider__step-block');
      stepBlock.classList.add('slider__step-block');
      fragment.append(stepBlock);

      if (i === 0) {
        stepBlock.textContent = `${this.config.min}`;
        stepBlock.classList.add('slider__step-block_value-type_min');
      } else if (i === 20) {
        stepBlock.textContent = `${this.config.max}`;
        stepBlock.classList.add('slider__step-block_value-type_max');
      }

      if (this.config.vertical) {
        stepBlock.classList.add('slider__step-block_vertical');
        stepBlock.style.top = `${stepSize * i}px`;
        if (i === 0 || i === 20) {
          stepBlock.style.top = `${stepSize * i - thumbSize}px`;
        }
      } else {
        stepBlock.style.left = `${stepSize * i}px`;
        stepBlock.classList.remove('slider__step-block_vertical');
      }
    }
    this.container.append(fragment);
  }

  private deleteStep(): void {
    const steps = this.container.querySelectorAll('.js-slider__step-block') as NodeListOf<HTMLElement>;
    steps.forEach((elem) => {
      this.container.removeChild(elem);
    });
  }
}

export default Step;
