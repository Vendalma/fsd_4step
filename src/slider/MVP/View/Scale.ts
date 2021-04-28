import { IConfig, IScaleBlockValues } from './types';

class Scale {
  private container: HTMLElement;

  private scaleItems: Array<HTMLElement>;

  protected config: IConfig;

  constructor(container: HTMLElement) {
    this.container = container;
    this.scaleItems = [];
  }

  updateValues(values: IConfig): void {
    this.config = values;
    if (this.scaleItems.length > 0) {
      const min = this.scaleItems[0];
      const max = this.scaleItems[this.scaleItems.length - 1];

      min.textContent = `${this.config.min}`;
      max.textContent = `${this.config.max}`;
    }
  }

  addScale(value: number): void {
    this.removeScale();
    const sliderSize = value;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 11; i += 1) {
      const scaleBlockPosition = (sliderSize / 10) * i;
      let scaleBlockValue = this.findScaleBlockValue(i);
      if (i === 0) {
        scaleBlockValue = this.config.min;
      } else if (i === 10) {
        scaleBlockValue = this.config.max;
      }

      const scaleBlock = this.createScaleBlock({ scaleBlockPosition, scaleBlockValue });
      this.scaleItems.push(scaleBlock);
      fragment.append(scaleBlock);
    }
    this.container.append(fragment);
  }

  getScaleValues(e: MouseEvent): number | undefined {
    let scaleValues;
    this.scaleItems.forEach((elem) => {
      if (e.target === elem) {
        scaleValues = Number(elem.textContent);
      }
    });
    return scaleValues;
  }

  private createScaleBlock(values: IScaleBlockValues): HTMLElement {
    const { scaleBlockPosition, scaleBlockValue } = values;
    const scaleBlock = document.createElement('div');
    scaleBlock.classList.add('slider__scale-block');
    scaleBlock.textContent = `${scaleBlockValue}`;

    if (this.config.vertical) {
      scaleBlock.classList.add('slider__scale-block_vertical');
      scaleBlock.style.top = `${scaleBlockPosition}px`;
    } else {
      scaleBlock.style.left = `${scaleBlockPosition}px`;
    }
    return scaleBlock;
  }

  private removeScale(): void {
    this.scaleItems.forEach((elem) => {
      this.container.removeChild(elem);
    });
    this.scaleItems.length = 0;
  }

  private findScaleBlockValue(value: number): number {
    const scaleBlockStep = Math.abs(this.config.max - this.config.min) / 10;
    const isValuesInteger =
      Number.isInteger(this.config.step) && Number.isInteger(this.config.min) && Number.isInteger(this.config.max);
    if (!isValuesInteger || scaleBlockStep <= 1) {
      return Number((this.config.min + scaleBlockStep * value).toFixed(1));
    }
    return Math.trunc(this.config.min + scaleBlockStep * value);
  }
}

export default Scale;
