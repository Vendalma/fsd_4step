import Observer from '../../Observer/Observer';
import { ICalcMoveThumb, IConfig, IDataThumbMove, IPosition } from './modelInterfaces';
import Validator from './Validator';

class Model extends Observer {
  private sliderSize: number;

  private validator: Validator;

  protected config: IConfig;

  constructor() {
    super();
    this.validator = new Validator();
  }

  addFollower(follower: unknown): void {
    this.subscribe(follower);
  }

  updateConfig(conf: IConfig): void {
    this.config = this.validator.validationConfig(conf);
    this.broadcast(this.config, 'changeConfig');
  }

  getConfig(): IConfig {
    return this.config as IConfig;
  }

  findMoveThumbPosition(data: IDataThumbMove): void {
    this.broadcast(this.calcThumbPosition(data), 'positionThumb');
  }

  calcOnloadPosition(data: number): void {
    this.broadcast(this.calcParams(data), 'positionThumb');
  }

  private calcThumbPosition(data: IDataThumbMove): IPosition | undefined {
    const { clientXY, sliderClientReact, dataNum } = data;
    const firstThumbPosition = data.positionThumbFirst as number;
    const secondThumbPosition = data.positionThumbSecond as number;

    const stepSize = this.config.step / this.calcPixelSize();
    const position = clientXY - sliderClientReact;
    const positionMove = this.checkValueWithSliderSize(Math.round(position / stepSize) * stepSize);
    let value = this.checkValueWithMin(this.checkValueWithMax(this.calcValue(positionMove)));

    if (!this.isIntegerStep()) {
      value = Number(value.toFixed(String(this.config.step).split('.')[1].length));
    }
    if (dataNum === '1') {
      return this.calcPositionThumbOne({
        secondThumbPosition,
        position,
        positionMove,
        value,
      });
    }
    if (dataNum === '2') {
      return this.calcPositionThumbTwo({
        firstThumbPosition,
        position,
        positionMove,
        value,
      });
    }
    return undefined;
  }

  private calcPositionThumbOne(data: ICalcMoveThumb): IPosition {
    const secondThumbPosition = data.secondThumbPosition as number;
    const rightValueForRange = this.calcValue(secondThumbPosition);
    this.config.positionFrom = data.value;
    if (data.position <= 0) {
      return {
        dataFirstThumb: {
          positionFrom: 0,
          valueFrom: this.config.min,
        },
      };
    }
    if (!this.config.range && data.position > this.sliderSize) {
      return {
        dataFirstThumb: {
          positionFrom: this.sliderSize,
          valueFrom: this.config.max,
        },
      };
    }
    if (this.config.range && data.position > secondThumbPosition) {
      this.config.positionFrom = rightValueForRange;
      return {
        dataFirstThumb: {
          positionFrom: secondThumbPosition,
          valueFrom: rightValueForRange,
        },
      };
    }
    return {
      dataFirstThumb: {
        positionFrom: data.positionMove,
        valueFrom: data.value,
      },
    };
  }

  private calcPositionThumbTwo(data: ICalcMoveThumb): IPosition {
    const firstThumbPosition = data.firstThumbPosition as number;
    const leftValueForRange = this.calcValue(firstThumbPosition);
    this.config.positionTo = data.value;
    if (data.position < firstThumbPosition) {
      this.config.positionTo = leftValueForRange;
      return {
        dataSecondThumb: {
          positionTo: firstThumbPosition,
          valueTo: leftValueForRange,
        },
      };
    }
    if (data.position > this.sliderSize) {
      return {
        dataSecondThumb: {
          positionTo: this.sliderSize,
          valueTo: this.config.max,
        },
      };
    }
    return {
      dataSecondThumb: {
        positionTo: data.positionMove,
        valueTo: data.value,
      },
    };
  }

  private calcParams(data: number): IPosition {
    this.sliderSize = data;
    return {
      dataFirstThumb: {
        positionFrom: (this.config.positionFrom - this.config.min) / this.calcPixelSize(),
        valueFrom: this.config.positionFrom,
      },
      dataSecondThumb: {
        positionTo: (this.config.positionTo - this.config.min) / this.calcPixelSize(),
        valueTo: this.config.positionTo,
      },
      stepData: this.sliderSize / 20,
    };
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
