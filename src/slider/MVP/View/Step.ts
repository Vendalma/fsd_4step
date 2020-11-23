interface IConfigStep {
  min: number;
  max: number;
  orientation: string;
}
class Step {
  config: IConfigStep;

  container: HTMLElement;

  constructor(config: IConfigStep, container: HTMLElement) {
    this.config = config;
    this.container = container;
  }

  addStepLine(data: number): void {
    const thumb = this.container.querySelector('.thumb_first') as HTMLElement;
    this.deleteStep();
    const fragment = document.createDocumentFragment();
    const stepSize = data;
    for (let i = 0; i < 21; i += 1) {
      const stepBlock = document.createElement('div');
      stepBlock.classList.add('slider__step-block');
      fragment.append(stepBlock);
      if (i === 0) {
        stepBlock.innerHTML = this.config.min.toString();
        stepBlock.classList.add('slider__step-block_min');
      } else if (i === 20) {
        stepBlock.innerHTML = this.config.max.toString();
        stepBlock.classList.add('slider__step-block_max');
      }

      if (this.config.orientation === 'vertical') {
        stepBlock.classList.add('slider__step-block_vertical');
        stepBlock.style.top = `${stepSize * i}px`;
        if (i === 0) {
          stepBlock.style.top = `${stepSize * i - thumb.offsetWidth}px`;
        } else if (i === 20) {
          stepBlock.style.top = `${stepSize * i - thumb.offsetWidth}px`;
        }
      }
      if (this.config.orientation === 'horizontal') {
        stepBlock.style.left = `${stepSize * i}px`;
        stepBlock.classList.remove('slider__step-block_vertical');
      }
    }
    this.container.append(fragment);
  }

  changeMinValue(): void {
    const blockMin = this.container.querySelector(
      '.slider__step-block_min',
    ) as HTMLElement;
    blockMin.innerHTML = this.config.min.toString();
  }

  changeMaxValue(): void {
    const blockMax = this.container.querySelector(
      '.slider__step-block_max',
    ) as HTMLElement;
    blockMax.innerHTML = this.config.max.toString();
  }

  deleteStep(): void {
    const steps = this.container.querySelectorAll(
      '.slider__step-block',
    ) as NodeListOf<HTMLElement>;
    steps.forEach((elem) => {
      this.container.removeChild(elem);
    });
  }

  updateConfigStep(data: IConfigStep): void {
    this.config = data;
    this.changeMinValue();
    this.changeMaxValue();
  }
}
export default Step;
