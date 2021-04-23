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
    const stepSize = this.config.step / this.calcPixelSize();
    const positionMove = Math.round(position / stepSize) * stepSize;
    const value = Math.trunc(this.calcValue(positionMove) * 100) / 100;

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

  private calcPixelSize(): number {
    return (this.config.max - this.config.min) / this.sliderSize;
  }

  private calcValue(position: number): number {
    return Math.round((position * this.calcPixelSize() + this.config.min) / this.config.step) * this.config.step;
  }
}

export default SubView;
