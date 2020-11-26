import Observer from '../../Observer/Observer';
import Validator from './Validator';

interface IUpdateConfig {
  [key: string]: boolean | string | number;
}
interface IConfigModel {
  min: number;
  max: number;
  range: boolean;
  positionFrom: number;
  positionTo: number;
  orientation: string;
  step: number;
  label: boolean;
}
interface IDataThumbMove {
  clientXY: number;
  sliderClientReact: number;
  dataNum: string;
  positionThumbFirst: number;
  positionThumbSecond: number;
}

class Model {
  config: IConfigModel;

  sliderSize: number;

  observer: Observer;

  validator: Validator;

  constructor(config: IConfigModel) {
    this.config = config;
    this.observer = new Observer();
    this.validator = new Validator({ ...this.config });
  }

  addFollower(follower: unknown): void {
    this.observer.subscribe(follower);
  }

  updateConfig(data: IUpdateConfig): void {
    if (this.validator.validationConfig(data) === true) {
      const key = Object.keys(data)[0];
      Object.assign(this.config, data);
      if (key === 'orientation' || key === 'range') {
        this.calcPositionTo();
        this.observer.broadcast('changeOrientationOrRange', this.config);
      } else {
        const isMinOrMax = key === 'min' || key === 'max';
        const isPosition = key === 'positionFrom' || key === 'positionTo';
        if (isMinOrMax || isPosition) {
          this.calcPositionFrom();
          this.calcPositionTo();
          this.calcParams(this.sliderSize);
        }
        this.observer.broadcast('changeConfig', this.config);
      }
    }
  }

  getConfig(): IConfigModel | undefined {
    if (this.validator.validationConfig(this.config) === true) return this.config as IConfigModel;
    return undefined;
  }

  findMoveThumbPosition(data: IDataThumbMove): void {
    const { clientXY } = data;
    const { sliderClientReact } = data;
    const { dataNum } = data;
    const firstThumbPosition = data.positionThumbFirst;
    const secondThumbPosition = data.positionThumbSecond;

    const stepSize = this.config.step / this.calcPixelSize();
    const position = clientXY - sliderClientReact;
    const positionMove = this.checkValueWithSliderSize(Math.round(position / stepSize) * stepSize);
    let value = this.checkValueWithMin(this.checkValueWithMax(this.calcValue(positionMove)));
    if (!this.isIntegerStep()) {
      value = Number(value.toFixed(String(this.config.step).split('.')[1].length));
    }
    const rightValueForRange = this.calcValue(secondThumbPosition);
    const leftValueForRange = this.calcValue(firstThumbPosition);
    if (dataNum === '1') {
      let right: number;
      if (this.config.range) {
        right = secondThumbPosition;
      } else {
        right = this.sliderSize;
      }
      this.config.positionFrom = value;
      if (position <= 0) {
        this.observer.broadcast('positionThumb', {
          dataFirstThumb: {
            positionFrom: 0,
            valueFrom: this.config.min,
          },
        });
      } else if (!this.config.range && position > right) {
        this.observer.broadcast('positionThumb', {
          dataFirstThumb: {
            positionFrom: right,
            valueFrom: this.config.max,
          },
        });
      } else if (this.config.range && position > right) {
        this.observer.broadcast('positionThumb', {
          dataFirstThumb: {
            positionFrom: right,
            valueFrom: rightValueForRange,
          },
        });
      } else {
        this.observer.broadcast('positionThumb', {
          dataFirstThumb: {
            positionFrom: positionMove,
            valueFrom: value,
          },
        });
      }
    } else if (dataNum === '2') {
      this.config.positionTo = value;
      if (position < firstThumbPosition) {
        this.observer.broadcast('positionThumb', {
          dataSecondThumb: {
            positionTo: firstThumbPosition,
            valueTo: leftValueForRange,
          },
        });
      } else if (position > this.sliderSize) {
        this.observer.broadcast('positionThumb', {
          dataSecondThumb: {
            positionTo: this.sliderSize,
            valueTo: this.config.max,
          },
        });
      } else {
        this.observer.broadcast('positionThumb', {
          dataSecondThumb: {
            positionTo: positionMove,
            valueTo: value,
          },
        });
      }
    }
  }

  calcParams(data: number): void {
    this.sliderSize = data;
    this.observer.broadcast('positionThumb', {
      dataFirstThumb: {
        positionFrom: this.calcOnloadFirstThumbPosition(),
        valueFrom: this.config.positionFrom,
      },
      dataSecondThumb: {
        positionTo: this.calcOnloadSecondThumbPosition(),
        valueTo: this.config.positionTo,
      },
      stepData: this.calcStepData(),
    });
  }

  calcPositionFrom(): void {
    if (this.config.positionFrom < this.config.min) {
      this.config.positionFrom = this.config.min;
    } else if (!this.config.range && this.config.positionFrom > this.config.max) {
      this.config.positionFrom = this.config.max;
    } else if (this.config.range && this.config.positionFrom > this.config.max) {
      this.config.positionFrom = this.config.min;
    }
  }

  calcPositionTo(): void {
    if (this.config.range) {
      if (this.config.positionTo <= this.config.positionFrom && this.config.max - this.config.min > this.config.step) {
        this.config.positionTo = this.config.positionFrom;
        this.config.positionFrom = this.config.positionTo - this.config.step;
        this.calcPositionFrom();
      }
      if (this.config.positionTo <= this.config.positionFrom && this.config.max - this.config.min <= this.config.step) {
        this.config.positionTo = this.config.max;
      }
      if (this.config.positionTo > this.config.max) {
        this.config.positionTo = this.config.max;
      }
    }
  }

  calcPixelSize(): number {
    return (this.config.max - this.config.min) / this.sliderSize;
  }

  calcStepData(): number {
    return this.sliderSize / 20;
  }

  calcOnloadFirstThumbPosition(): number {
    return (this.config.positionFrom - this.config.min) / this.calcPixelSize();
  }

  calcOnloadSecondThumbPosition(): number {
    return (this.config.positionTo - this.config.min) / this.calcPixelSize();
  }

  calcValue(position: number): number {
    return Math.round((position * this.calcPixelSize() + this.config.min) / this.config.step) * this.config.step;
  }

  isIntegerStep(): boolean {
    return Number.isInteger(this.config.step);
  }

  checkValueWithMin(value: number): number {
    if (value >= this.config.min) {
      return value;
    }
    return this.config.min;
  }

  checkValueWithMax(value: number): number {
    if (value <= this.config.max) {
      return value;
    }
    return this.config.max;
  }

  checkValueWithSliderSize(value: number): number {
    if (value <= this.sliderSize) {
      return value;
    }
    return this.sliderSize;
  }
}
export default Model;
