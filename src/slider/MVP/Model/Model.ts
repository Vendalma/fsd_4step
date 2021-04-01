import Observer from '../../Observer/Observer';
import { ICalcPosition, IConfig, IDataThumbMove, IPosition, IUpdatedPosition, ModelValues } from './modelInterfaces';
import Validator from './Validator';

class Model extends Observer<ModelValues> {
  private sliderSize: number;

  private validator: Validator;

  private config: IConfig;

  protected positionState: IPosition;

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

  findUpdatedPosition(data: IDataThumbMove): void {
    this.broadcast({ value: this.checkTypeParams(data), type: 'positionThumb' });
  }

  findOnloadPosition(data: number): void {
    this.broadcast({ value: this.calcOnloadPosition(data), type: 'positionThumb' });
  }

  private checkTypeParams(data: IDataThumbMove): IPosition {
    const { position, dataName } = data;
    const stepSize = this.config.step / this.calcPixelSize();
    const positionMove = this.checkValueWithSliderSize(Math.round(position / stepSize) * stepSize);

    if (dataName === 'to') {
      return this.calcPosition({
        position: positionMove,
        leftPoint: this.positionState.positionFrom.position,
        leftPointValue: this.calcValue(this.positionState.positionFrom.position),
        rightPoint: this.sliderSize,
        rightPointValue: this.config.max,
        nameState: 'positionTo',
      });
    }

    if (dataName === 'from' && this.config.range) {
      return this.calcPosition({
        position: positionMove,
        leftPoint: 0,
        leftPointValue: this.config.min,
        rightPoint: this.positionState.positionTo.position,
        rightPointValue: this.calcValue(this.positionState.positionTo.position),
        nameState: 'positionFrom',
      });
    }

    return this.calcPosition({
      position: positionMove,
      leftPoint: 0,
      leftPointValue: this.config.min,
      rightPoint: this.sliderSize,
      rightPointValue: this.config.max,
      nameState: 'positionFrom',
    });
  }

  private calcPosition(values: ICalcPosition): IPosition {
    const { position, leftPoint, leftPointValue, rightPoint, rightPointValue, nameState } = values;
    let value = this.checkValueWithMin(this.checkValueWithMax(this.calcValue(position)));
    if (!this.isIntegerStep()) {
      value = Number(value.toFixed(String(this.config.step).split('.')[1].length));
    }

    if (position <= leftPoint) {
      return this.changePositionState({
        [nameState]: {
          position: leftPoint,
          value: leftPointValue,
        },
      });
    }

    if (position > rightPoint) {
      return this.changePositionState({
        [nameState]: {
          position: rightPoint,
          value: rightPointValue,
        },
      });
    }

    return this.changePositionState({
      [nameState]: {
        position,
        value,
      },
    });
  }

  private changePositionState(value: IUpdatedPosition): IPosition {
    Object.assign(this.positionState, value);
    this.config.positionFrom = this.positionState.positionFrom.value;
    this.config.positionTo = this.positionState.positionTo.value;
    return this.positionState;
  }

  private calcOnloadPosition(data: number): IPosition {
    this.sliderSize = data;
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
    this.getStepSize();
    return this.positionState;
  }

  private getStepSize() {
    this.broadcast({ value: this.sliderSize / 20, type: 'stepSize' });
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
