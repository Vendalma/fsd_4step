import { Observer } from "../../Observer/Observer";
import { Validator } from "./Validator";
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
  slider_client_react: number;
  data_num: string;
  positionThumbFirst: number;
  positionThumbSecond: number;
}
class Model {
  config: IConfigModel;
  sliderSize: number;
  observer: Observer;
  validator: Validator;

  constructor(IConfigModel: IConfigModel) {
    this.config = IConfigModel;
    this.sliderSize = 0;
    this.observer = new Observer();
    this.validator = new Validator(Object.assign({}, this.config));
  }
  addFollower(follower: Object) {
    this.observer.subscribe(follower);
  }
  updateConfig(data: Object) {
    if (this.validator.validationConfig(data) === true) {
      let key = Object.keys(data)[0];
      Object.assign(this.config, data);
      if (key == "orientation" || key == "range") {
        this.calcPositionTo();
        this.observer.broadcast("changeOrientationOrRange", this.config);
      } else {
        if (
          key == "min" ||
          key == "max" ||
          key == "positionFrom" ||
          key == "positionTo"
        ) {
          this.calcPositionTo();
          this.calcPositionFrom();
          this.calcParams(this.sliderSize);
        }
        this.observer.broadcast("changeConfig", this.config);
      }
    }
  }
  getConfig() {
    if (this.validator.validationConfig(this.config) === true)
      return this.config as IConfigModel;
  }
  fundMoveThumbPosition(data: IDataThumbMove) {
    let clientXY = data.clientXY;
    let sliderClientReact = data.slider_client_react;
    let data_num = data.data_num;
    let firstThumbPosition = data.positionThumbFirst;
    let secondThumbPosition = data.positionThumbSecond;

    let stepSize = this.config.step / this.calcPixelSize();
    let position = clientXY - sliderClientReact;
    let positionMove = this.checkValueWithSliderSize(
      Math.round(position / stepSize) * stepSize
    );
    let value = this.checkValueWithMin(
      this.checkValueWithMax(this.calcValue(positionMove))
    );
    if (!this.isIntegerStep()) {
      value = Number(
        value.toFixed(String(this.config.step).split(".")[1].length)
      );
    }
    let rightValueForRange = this.calcValue(secondThumbPosition);
    let leftValueForRange = this.calcValue(firstThumbPosition);
    if (data_num == "1") {
      let right: number;
      this.config.range
        ? (right = secondThumbPosition)
        : (right = this.sliderSize);
      this.config.positionFrom = value;
      if (position <= 0) {
        this.observer.broadcast("positionThumb", {
          dataFirstThumb: {
            positionFrom: 0,
            valueFrom: this.config.min,
          },
        });
      } else if (!this.config.range && position > right) {
        this.observer.broadcast("positionThumb", {
          dataFirstThumb: {
            positionFrom: right,
            valueFrom: this.config.max,
          },
        });
      } else if (this.config.range && position > right) {
        this.observer.broadcast("positionThumb", {
          dataFirstThumb: {
            positionFrom: right,
            valueFrom: rightValueForRange,
          },
        });
      } else {
        this.observer.broadcast("positionThumb", {
          dataFirstThumb: {
            positionFrom: positionMove,
            valueFrom: value,
          },
        });
      }
    } else if (data_num == "2") {
      this.config.positionTo = value;
      if (position < firstThumbPosition) {
        this.observer.broadcast("positionThumb", {
          dataSecondThumb: {
            positionTo: firstThumbPosition,
            valueTo: leftValueForRange,
          },
        });
      } else if (position > this.sliderSize) {
        this.observer.broadcast("positionThumb", {
          dataSecondThumb: {
            positionTo: this.sliderSize,
            valueTo: this.config.max,
          },
        });
      } else {
        this.observer.broadcast("positionThumb", {
          dataSecondThumb: {
            positionTo: positionMove,
            valueTo: value,
          },
        });
      }
    }
  }
  calcParams(data: number) {
    this.sliderSize = data;
    this.observer.broadcast("positionThumb", {
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
  calcPositionFrom() {
    if (this.config.positionFrom < this.config.min) {
      this.config.positionFrom = this.config.min;
    } else if (
      !this.config.range &&
      this.config.positionFrom > this.config.max
    ) {
      this.config.positionFrom = this.config.max;
    }
  }
  calcPositionTo() {
    if (this.config.range && this.config.positionTo <= this.config.positionFrom) {
      this.config.positionTo = this.config.positionFrom;
      this.config.positionFrom = this.config.positionTo - this.config.step;
      this.calcPositionFrom()
    }
    if (this.config.range && this.config.positionTo > this.config.max) {
      this.config.positionTo = this.config.max;
    }
  }
  calcPixelSize() {
    return (this.config.max - this.config.min) / this.sliderSize;
  }
  calcStepData() {
    return this.sliderSize / 20;
  }
  calcOnloadFirstThumbPosition() {
    return (this.config.positionFrom - this.config.min) / this.calcPixelSize();
  }
  calcOnloadSecondThumbPosition() {
    return (this.config.positionTo - this.config.min) / this.calcPixelSize();
  }
  calcValue(position: number) {
    return (
      Math.round(
        (position * this.calcPixelSize() + this.config.min) / this.config.step
      ) * this.config.step
    );
  }
  isIntegerStep() {
    return (this.config.step ^ 0) === this.config.step;
  }
  checkValueWithMin(value: number) {
    if (value >= this.config.min) {
      return value;
    }
    return this.config.min;
  }
  checkValueWithMax(value: number) {
    if (value <= this.config.max) {
      return value;
    }
    return this.config.max;
  }
  checkValueWithSliderSize(value: number) {
    if (value <= this.sliderSize) {
      return value;
    }
    return this.sliderSize;
  }
}
export { Model };

