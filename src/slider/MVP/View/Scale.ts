import { IConfig, IScaleBlockValues, IScaleOptions, IScalePositionParams, IScaleValues } from './types';

class Scale {
  private container: HTMLElement;

  private scaleItems: NodeListOf<HTMLElement>;

  private sliderSize: number;

  private pixelSize: number;

  protected config: IConfig;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  initScale(values: IScaleOptions): void {
    this.config = values.config;
    this.sliderSize = values.sliderSize;
    this.pixelSize = values.pixelSize;
    this.checkStepSize();
  }

  getScaleValue(e: MouseEvent): number | undefined {
    let scaleValue;
    this.scaleItems.forEach((elem) => {
      if (e.target === elem) {
        scaleValue = Number(elem.textContent);
      }
    });
    return scaleValue;
  }

  private checkStepSize(): void {
    let stepSize = this.config.step / this.pixelSize;
    let segmentsNumber = this.sliderSize / stepSize;
    let updatedStep = this.config.step;
    while (segmentsNumber / stepSize > 1) {
      updatedStep += this.config.step;
      stepSize = updatedStep / this.pixelSize;
      segmentsNumber = this.sliderSize / stepSize;
    }
    this.addScale({ segmentsNumber, updatedStep });
  }

  private addScale(values: IScaleValues): void {
    if (this.scaleItems) this.removeScale();
    const fragment = document.createDocumentFragment();
    const { updatedStep } = values;
    let { segmentsNumber } = values;
    for (let i = 0; i <= segmentsNumber; i += 1) {
      let scalePosition = this.calcScalePosition({ value: i, updatedStep });
      let scaleBlockValue = this.calcScaleValue(scalePosition);

      if (i === 0) {
        scaleBlockValue = this.config.min;
        scalePosition = 0;
      } else if (i === segmentsNumber) {
        scaleBlockValue = this.config.max;
        scalePosition = this.sliderSize;
      }

      const scaleBlock = this.createScaleBlock({ scalePosition, scaleBlockValue });

      if (i === Math.trunc(segmentsNumber) && scalePosition < this.sliderSize) {
        segmentsNumber = Math.trunc(segmentsNumber) + 1;
      }

      if (!(i !== segmentsNumber && scalePosition >= this.sliderSize - 15)) {
        fragment.append(scaleBlock);
      }
    }
    this.container.append(fragment);
    this.scaleItems = this.container.querySelectorAll<HTMLElement>('.slider__scale-block');
  }

  private calcScalePosition(values: IScalePositionParams): number {
    const { updatedStep, value } = values;
    if (typeof updatedStep !== 'undefined') {
      return (value * updatedStep) / this.pixelSize;
    }
    return (value * this.config.step) / this.pixelSize;
  }

  private calcScaleValue(value: number): number {
    const isValuesInteger =
      Number.isInteger(this.config.step) && Number.isInteger(this.config.min) && Number.isInteger(this.config.max);
    if (!isValuesInteger) {
      return Number((this.config.min + this.pixelSize * value).toFixed(1));
    }
    return Math.round(this.config.min + this.pixelSize * value);
  }

  private createScaleBlock(values: IScaleBlockValues): HTMLElement {
    const { scalePosition, scaleBlockValue } = values;
    const scaleBlock = document.createElement('div');
    scaleBlock.classList.add('slider__scale-block');
    scaleBlock.textContent = `${scaleBlockValue}`;

    if (this.config.vertical) {
      scaleBlock.classList.add('slider__scale-block_vertical');
      scaleBlock.style.top = `${scalePosition}px`;
    } else {
      scaleBlock.style.left = `${scalePosition}px`;
    }
    return scaleBlock;
  }

  private removeScale(): void {
    this.scaleItems.forEach((elem) => {
      this.container.removeChild(elem);
    });
  }
}

export default Scale;
