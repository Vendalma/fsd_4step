import { IConfig, IMovingThumbValues, IPositionState, IPositionValues } from './types';

class SubView {
  private positionState: IPositionState;

  protected sliderSize: number;

  protected config: IConfig;

  updateConfig(value: IConfig): void {
    this.config = value;
  }

  setSliderSize(value: number): void {
    this.sliderSize = value;
  }

  findPositionState(): IPositionState {
    this.positionState = {
      valueFrom: {
        position: (this.config.valueFrom - this.config.min) / this.calcPixelSize(),
        value: this.config.valueFrom,
      },
      valueTo: {
        position: (this.config.valueTo - this.config.min) / this.calcPixelSize(),
        value: this.config.valueTo,
      },
    };
    return this.positionState;
  }

  findValue(data: IMovingThumbValues): IPositionValues {
    const { position, dataName } = data;
    const positionMove = this.calcPosition(position);
    const value = typeof data.value === 'undefined' ? this.calcValue(positionMove) : data.value;
    if (dataName === 'to') {
      return {
        value,
        leftPointValue: this.config.valueFrom,
        rightPointValue: this.config.max,
        nameState: 'valueTo',
      };
    }

    if (dataName === 'from' && this.config.range) {
      return {
        value,
        leftPointValue: this.config.min,
        rightPointValue: this.config.valueTo,
        nameState: 'valueFrom',
      };
    }

    return {
      value,
      leftPointValue: this.config.min,
      rightPointValue: this.config.max,
      nameState: 'valueFrom',
    };
  }

  private calcPosition(position: number): number {
    const stepSize = this.config.step / this.calcPixelSize();
    if (position <= 0) {
      return 0;
    }

    if (position >= this.sliderSize) {
      return this.sliderSize * 10;
    }

    return Math.round(position / stepSize) * stepSize;
  }

  private calcValue(position: number): number {
    const isValuesInteger =
      Number.isInteger(this.config.step) && Number.isInteger(this.config.min) && Number.isInteger(this.config.max);
    const value = this.config.min + this.calcPixelSize() * position;

    return isValuesInteger ? Math.trunc(value) : Number(value.toFixed(1));
  }

  private calcPixelSize(): number {
    return (this.config.max - this.config.min) / this.sliderSize;
  }
}

export default SubView;
