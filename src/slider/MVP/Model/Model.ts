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
class Model {
  observer: Observer;
  config: IConfigModel;
  validator: Validator;
  sliderSize: number;
  constructor(IConfigModel: IConfigModel) {
    this.observer = new Observer();
    this.config = IConfigModel;
    this.validator = new Validator(Object.assign({}, this.config));
    this.sliderSize = 0;
  }
  addFollower(follower: any) {
    this.observer.subscribe(follower);
  }
  updateConfig(data: any) {
    if (this.validator.validationConfig(data) === true) {
      let key = Object.keys(data)[0];
      Object.assign(this.config, data);
      if (key == "orientation") {
        this.observer.broadcast("changeOrientation", this.config);
      } else {
        if (key == "range" || key == "min" || key == "max") {
          this.calcPositionFrom();
          this.calcPositionTo();
          this.calcParams(this.sliderSize);
        } else if (key == "positionFrom") {
          this.calcPositionFrom();
          this.calcParams(this.sliderSize);
        } else if (key == "positionTo") {
          this.calcPositionTo();
          this.calcParams(this.sliderSize);
        }
        this.observer.broadcast("changeConfig", this.config);
      }
    }
  }
  getConfig() {
    if (this.validator.validationConfig(this.config) === true)
      return this.config;
  }
  calcParams(data: number) {
    this.sliderSize = data;
    this.observer.broadcast("onloadPosition", {
      stepData: this.calcStepData(),
      thumbData: this.calcOnloadThumbPosition(),
    });
  }
  fundMoveThumbPosition(data: any) {
    let clientXY = data.clientXY;
    let sliderClientReact = data.slider_client_react;
    let data_num = data.data_num;
    let firstThumbPosition = data.positionThumbFirst;
    let secondThumbPosition = data.positionThumbSecond;

    let stepSize = this.config.step / this.calcPixelSize();
    let position = clientXY - sliderClientReact;
    let positionMove = this.checkSliderSizeMax(
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
        this.observer.broadcast("position", {
          position: 0,
          data_num: data_num,
          value: this.config.min,
        });
      } else if (!this.config.range && position > right) {
        this.observer.broadcast("position", {
          position: right,
          data_num: data_num,
          value: this.config.max,
        });
      } else if (this.config.range && position > right) {
        this.observer.broadcast("position", {
          position: right,
          data_num: data_num,
          value: rightValueForRange,
        });
      } else {
        this.observer.broadcast("position", {
          position: positionMove,
          data_num: data_num,
          value: value,
        });
      }
    } else if (data_num == "2") {
      this.config.positionTo = value;
      if (position < firstThumbPosition) {
        this.observer.broadcast("position", {
          position: firstThumbPosition,
          data_num: data_num,
          value: leftValueForRange,
        });
      } else if (position > this.sliderSize) {
        this.observer.broadcast("position", {
          position: this.sliderSize,
          data_num: data_num,
          value: this.config.max,
        });
      } else {
        this.observer.broadcast("position", {
          position: positionMove,
          data_num: data_num,
          value: value,
        });
      }
    }
  }
  calcPositionFrom() {
    if (this.config.positionFrom < this.config.min) {
      this.config.positionFrom = this.config.min;
    } else if (
      this.config.range &&
      this.config.positionFrom > this.config.positionTo
    ) {
      this.config.positionTo = this.config.positionFrom + this.config.step;
    } else if (
      !this.config.range &&
      this.config.positionFrom > this.config.max
    ) {
      this.config.positionFrom = this.config.max;
    }
  }
  calcPositionTo() {
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
  calcOnloadThumbPosition() {
    return {
      onloadPositionThumbOne:
        (this.config.positionFrom - this.config.min) / this.calcPixelSize(),
      onloadPositionThumbTwo:
        (this.config.positionTo - this.config.min) / this.calcPixelSize(),
    };
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
  checkSliderSizeMax(value: number) {
    if (value <= this.sliderSize) {
      return value;
    }
    return this.sliderSize;
  }
  calcValue(position: number) {
    return (
      Math.round(
        (position * this.calcPixelSize() + this.config.min) / this.config.step
      ) * this.config.step
    );
  }
}
export { Model };

