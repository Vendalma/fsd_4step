import { IConfig, IMovingThumbPosition, IPositionState, IPositionValues, ISliderOptions } from './types';

class SubView {
  private positionState: IPositionState;

  protected sliderSize: number;

  protected pixelSize: number;

  protected config: IConfig;

  protected startPosition: number;

  updateConfig(value: IConfig): void {
    this.config = value;
  }

  setSliderOptions(values: ISliderOptions): void {
    this.sliderSize = values.sliderSize;
    this.pixelSize = values.pixelSize;
  }

  setStartPosition(value: number): void {
    this.startPosition = value;
  }

  findPositionState(): IPositionState {
    this.positionState = {
      valueFrom: {
        position: (this.config.valueFrom - this.config.min) / this.pixelSize,
        value: this.config.valueFrom,
      },
      valueTo: {
        position: (this.config.valueTo - this.config.min) / this.pixelSize,
        value: this.config.valueTo,
      },
    };
    return this.positionState;
  }

  findValue(data: IMovingThumbPosition): IPositionValues {
    const { position, dataName, evtType } = data;
    const positionMove =
      evtType === 'click' ? this.calcPosition(position) : this.calcPosition(position - this.startPosition);
    const value = data.value ?? this.calcValue(positionMove);
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
    const stepSize = this.config.step / this.pixelSize;
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
    const value = this.config.min + this.pixelSize * position;
    return isValuesInteger ? Math.round(value) : Number(value.toFixed(1));
  }
}

export default SubView;
