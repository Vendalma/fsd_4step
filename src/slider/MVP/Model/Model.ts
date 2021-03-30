import Observer from '../../Observer/Observer';
import { ICalcMoveThumb, IConfig, IDataThumbMove, IPosition, IUpdatePosition, ModelValues } from './modelInterfaces';
import Validator from './Validator';

class Model extends Observer<ModelValues> {
  private sliderSize: number;

  private validator: Validator;

  private positionState: IPosition;

  protected config: IConfig;

  constructor() {
    super();
    this.validator = new Validator();
  }

  updateConfig(data: IConfig): void {
    this.config = this.validator.validationConfig(data);
    this.broadcast({ value: this.config, type: 'changeConfig' });
  }

  getConfig(): IConfig {
    return this.config;
  }

  findMoveThumbPosition(data: IDataThumbMove): void {
    this.broadcast({ value: this.calcThumbPosition(data), type: 'positionThumb' });
  }

  calcOnloadPosition(data: number): void {
    this.broadcast({ value: this.calcParams(data), type: 'positionThumb' });
  }

  private calcThumbPosition(data: IDataThumbMove): IPosition {
    const { clientXY, sliderClientReact, dataNum } = data;
    const position = clientXY - sliderClientReact;
    const stepSize = this.config.step / this.calcPixelSize();
    const positionMove = this.checkValueWithSliderSize(Math.round(position / stepSize) * stepSize);
    let value = this.checkValueWithMin(this.checkValueWithMax(this.calcValue(positionMove)));

    if (!this.isIntegerStep()) {
      value = Number(value.toFixed(String(this.config.step).split('.')[1].length));
    }

    if (dataNum === '2') {
      return this.calcPositionThumbTwo({
        position,
        positionMove,
        value,
      });
    }

    return this.calcPositionThumbOne({
      position,
      positionMove,
      value,
    });
  }

  private calcPositionThumbOne(data: ICalcMoveThumb): IPosition {
    const secondThumbPosition = this.positionState.dataSecondThumb.positionTo;
    const rightValueForRange = this.calcValue(secondThumbPosition);
    this.config.positionFrom = data.value;

    if (data.position <= 0) {
      return this.changePositionState({
        dataFirstThumb: {
          positionFrom: 0,
          valueFrom: this.config.min,
        },
      });
    }

    if (!this.config.range && data.position > this.sliderSize) {
      return this.changePositionState({
        dataFirstThumb: {
          positionFrom: this.sliderSize,
          valueFrom: this.config.max,
        },
      });
    }

    if (this.config.range && data.position > secondThumbPosition) {
      this.config.positionFrom = rightValueForRange;
      return this.changePositionState({
        dataFirstThumb: {
          positionFrom: secondThumbPosition,
          valueFrom: rightValueForRange,
        },
      });
    }

    return this.changePositionState({
      dataFirstThumb: {
        positionFrom: data.positionMove,
        valueFrom: data.value,
      },
    });
  }

  private calcPositionThumbTwo(data: ICalcMoveThumb): IPosition {
    const firstThumbPosition = data.firstThumbPosition as number;
    const leftValueForRange = this.calcValue(firstThumbPosition);
    this.config.positionTo = data.value;

    if (data.position < firstThumbPosition) {
      this.config.positionTo = leftValueForRange;

      return this.changePositionState({
        dataSecondThumb: {
          positionTo: firstThumbPosition,
          valueTo: leftValueForRange,
        },
      });
    }

    if (data.position > this.sliderSize) {
      return this.changePositionState({
        dataSecondThumb: {
          positionTo: this.sliderSize,
          valueTo: this.config.max,
        },
      });
    }

    return this.changePositionState({
      dataSecondThumb: {
        positionTo: data.positionMove,
        valueTo: data.value,
      },
    });
  }

  private calcParams(data: number): IPosition {
    this.sliderSize = data;
    this.positionState = {
      dataFirstThumb: {
        positionFrom: (this.config.positionFrom - this.config.min) / this.calcPixelSize(),
        valueFrom: this.config.positionFrom,
      },

      dataSecondThumb: {
        positionTo: (this.config.positionTo - this.config.min) / this.calcPixelSize(),
        valueTo: this.config.positionTo,
      },
    };
    this.getStepSize();
    return this.positionState;
  }

  private getStepSize() {
    this.broadcast({ value: this.sliderSize / 20, type: 'stepSize' });
  }

  private changePositionState(value: IUpdatePosition): IPosition {
    return Object.assign(this.positionState, value);
  }

  private calcPixelSize(): number {
    return (this.config.max - this.config.min) / this.sliderSize;
  }

  private calcValue(position: number): number {
    return Math.round((position * this.calcPixelSize() + this.config.min) / this.config.step) * this.config.step;
  }

  private isIntegerStep(): boolean {
    return Number.isInteger(this.config.step);
  }

  private checkValueWithMin(value: number): number {
    if (value >= this.config.min) {
      return value;
    }

    return this.config.min;
  }

  private checkValueWithMax(value: number): number {
    if (value <= this.config.max) {
      return value;
    }

    return this.config.max;
  }

  private checkValueWithSliderSize(value: number): number {
    if (value <= this.sliderSize) {
      return value;
    }

    return this.sliderSize;
  }
}

export default Model;
