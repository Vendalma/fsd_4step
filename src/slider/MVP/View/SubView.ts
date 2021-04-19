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
      positionFrom: {
        position: (this.config.positionFrom - this.config.min) / this.calcPixelSize(),
        value: this.config.positionFrom,
      },
      positionTo: {
        position: (this.config.positionTo - this.config.min) / this.calcPixelSize(),
        value: this.config.positionTo,
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
        leftPointValue: this.config.positionFrom,
        rightPointValue: this.config.max,
        nameState: 'positionTo',
      };
    }

    if (dataName === 'from' && this.config.range) {
      return {
        value,
        leftPointValue: this.config.min,
        rightPointValue: this.config.positionTo,
        nameState: 'positionFrom',
      };
    }

    return {
      value,
      leftPointValue: this.config.min,
      rightPointValue: this.config.max,
      nameState: 'positionFrom',
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
