import Observer from '../../Observer/Observer';
import Validator from './Validator';

interface IConfigModel {
  min: number;
  max: number;
  range: boolean;
  positionFrom: number;
  positionTo: number;
  vertical: boolean;
  step: number;
  label: boolean;
}
interface IUpdateConfig {
  [key: string]: boolean | number;
}
interface IDataThumbMove {
  clientXY: number;
  sliderClientReact: number;
  dataNum: string;
  positionThumbFirst?: number;
  positionThumbSecond?: number;
}

interface IPosition {
  dataFirstThumb?: {
    positionFrom: number;
    valueFrom: number;
  };
  dataSecondThumb?: {
    positionTo: number;
    valueTo: number;
  };
  stepData?: number;
}
class Model {
  private sliderSize: number;

  private validator: Validator;

  protected config: IConfigModel;

  protected observer: Observer;

  constructor(config: IConfigModel) {
    this.config = config;
    this.observer = new Observer();
    this.createValidator();
  }

  addFollower(follower: unknown): void {
    this.observer.subscribe(follower);
  }

  updateConfig(data: IUpdateConfig | IConfigModel): void | undefined {
    if (this.validator.validationConfig(data) === true) {
      const key = Object.keys(data)[0];
      Object.assign(this.config, data);
      if (key === 'vertical' || key === 'range') {
        this.calcPositionTo();
        this.observer.broadcast(this.config, 'changeOrientationOrRange');
      } else {
        const isMinOrMax = key === 'min' || key === 'max';
        const isPosition = key === 'positionFrom' || key === 'positionTo';
        if (isMinOrMax || isPosition) {
          this.calcPositionFrom();
          this.calcPositionTo();
          this.calcOnloadPosition(this.sliderSize);
        }
        this.observer.broadcast(this.config, 'changeConfig');
      }
    }
    return undefined;
  }

  getConfig(): IConfigModel | undefined {
    if (this.validator.validationConfig(this.config) === true) {
      return this.config as IConfigModel;
    }
    return undefined;
  }

  findMoveThumbPosition(data: IDataThumbMove): void {
    this.observer.broadcast(this.calcThumbPosition(data), 'positionThumb');
  }

  calcOnloadPosition(data: number): void {
    this.observer.broadcast(this.calcParams(data), 'positionThumb');
  }

  private createValidator(): void {
    const copyConf = {};
    this.validator = new Validator(Object.assign(copyConf, this.config));
  }

  private calcThumbPosition(data: IDataThumbMove): IPosition | undefined {
    const { clientXY } = data;
    const { sliderClientReact } = data;
    const { dataNum } = data;
    const firstThumbPosition = data.positionThumbFirst as number;
    const secondThumbPosition = data.positionThumbSecond as number;
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
        return {
          dataFirstThumb: {
            positionFrom: 0,
            valueFrom: this.config.min,
          },
        };
      }
      if (!this.config.range && position > right) {
        return {
          dataFirstThumb: {
            positionFrom: right,
            valueFrom: this.config.max,
          },
        };
      }
      if (this.config.range && position > right) {
        return {
          dataFirstThumb: {
            positionFrom: right,
            valueFrom: rightValueForRange,
          },
        };
      }
      return {
        dataFirstThumb: {
          positionFrom: positionMove,
          valueFrom: value,
        },
      };
    }
    if (dataNum === '2') {
      this.config.positionTo = value;
      if (position < firstThumbPosition) {
        return {
          dataSecondThumb: {
            positionTo: firstThumbPosition,
            valueTo: leftValueForRange,
          },
        };
      }
      if (position > this.sliderSize) {
        return {
          dataSecondThumb: {
            positionTo: this.sliderSize,
            valueTo: this.config.max,
          },
        };
      }
      return {
        dataSecondThumb: {
          positionTo: positionMove,
          valueTo: value,
        },
      };
    }
    return undefined;
  }

  private calcParams(data: number): IPosition {
    this.sliderSize = data;
    return {
      dataFirstThumb: {
        positionFrom: this.calcOnloadFirstThumbPosition(),
        valueFrom: this.config.positionFrom,
      },
      dataSecondThumb: {
        positionTo: this.calcOnloadSecondThumbPosition(),
        valueTo: this.config.positionTo,
      },
      stepData: this.calcStep(),
    };
  }

  private calcPositionFrom(): void {
    if (this.config.positionFrom < this.config.min) {
      this.config.positionFrom = this.config.min;
    } else if (!this.config.range && this.config.positionFrom > this.config.max) {
      this.config.positionFrom = this.config.max;
    } else if (this.config.range && this.config.positionFrom > this.config.max) {
      this.config.positionFrom = this.config.min;
    }
  }

  private calcPositionTo(): void {
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

  private calcPixelSize(): number {
    return (this.config.max - this.config.min) / this.sliderSize;
  }

  private calcStep(): number {
    return this.sliderSize / 20;
  }

  private calcOnloadFirstThumbPosition(): number {
    return (this.config.positionFrom - this.config.min) / this.calcPixelSize();
  }

  private calcOnloadSecondThumbPosition(): number {
    return (this.config.positionTo - this.config.min) / this.calcPixelSize();
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
