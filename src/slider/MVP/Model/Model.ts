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
  fundThumbPosition(data: any) {
    this.calcThumbPosition(data);
  }
  updateConfig(data: any) {
    if (this.validator.validation(data) === true) {
      Object.assign(this.config, data);
      let key = Object.keys(data)[0];
      if (key == "orientation") {
        this.observer.broadcast("changeOrientation", this.config);
      } else {
        if (key == "range" || key == "min" || key == "max") {
          this.recalcPosition();
        } else if (key == "positionFrom") {
          this.changePositionFrom();
        } else if (key == "positionTo") {
          this.changePositionTo();
        }
        this.observer.broadcast("changeConfig", this.config);
      }
    }
  }
  getConfig() {
    if (this.validator.validation(this.config) === true) return this.config;
  }
  setOnloadData(data: number) {
    this.sliderSize = data;
    this.observer.broadcast("onloadData", {
      stepData: this.calcStepData(),
      thumbData: this.calcOnloadThumbPosition(),
    });
  }
  private calcThumbPosition(data: any) {
    let clientX = data.clientXY;
    let sliderClientReact = data.slider_client_react;
    let data_num = data.data_num;
    let firstThumbPosition = data.positionThumbFirst;
    let secondThumbPosition = data.positionThumbSecond;

    let stepSize = this.config.step / this.calcPixelSize();
    let position = clientX - sliderClientReact;
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

    if (!this.config.range) {
      let right = this.sliderSize;
      this.config.positionTo = value
      if (position <= 0) {
        this.observer.broadcast("position", {
          position: 0,
          data_num: data_num,
          value: this.config.min,
        });
      } else if (position > right) {
        this.observer.broadcast("position", {
          position: right,
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
    } else if (this.config.range) {
      if (data_num == "1") {
        let right = secondThumbPosition;
        this.config.positionFrom = value
        if (position <= 0) {
          this.observer.broadcast("position", {
            position: 0,
            data_num: data_num,
            value: this.config.min,
          });
        } else if (position > right) {
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
        let left = firstThumbPosition;
        let right = this.sliderSize;
        this.config.positionTo = value
        if (position < left) {
          this.observer.broadcast("position", {
            position: left,
            data_num: data_num,
            value: leftValueForRange,
          });
        } else if (position > right) {
          this.observer.broadcast("position", {
            position: right,
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
  }
  private recalcPosition() {
    this.calcPosotionFrom();
    this.calcPosotionTo();
    this.setOnloadData(this.sliderSize);
  }
  private changePositionFrom() {
    this.calcPosotionFrom();
    this.setOnloadData(this.sliderSize);
  }
  private changePositionTo() {
    this.calcPosotionTo();
    this.setOnloadData(this.sliderSize);
  }
  private calcPosotionFrom() {
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
  private calcPosotionTo() {
    if (this.config.positionTo > this.config.max) {
      this.config.positionTo = this.config.max;
    } else if (this.config.positionTo < this.config.positionFrom) {
      this.config.positionTo = this.config.positionFrom + this.config.step;
    }
  }
  private calcPixelSize() {
    return (this.config.max - this.config.min) / this.sliderSize;
  }
  private calcStepData() {
    return this.sliderSize / 20;
  }
  private calcOnloadThumbPosition() {
    return {
      onloadPositionThumbOne:
        (this.config.positionFrom - this.config.min) / this.calcPixelSize(),
      onloadPositionThumbTwo:
        (this.config.positionTo - this.config.min) / this.calcPixelSize(),
    };
  }
  private isIntegerStep() {
    return (this.config.step ^ 0) === this.config.step;
  }
  private checkValueWithMin(value: number) {
    if (value >= this.config.min) {
      return value;
    } else {
      return this.config.min;
    }
  }
  private checkValueWithMax(value: number) {
    if (value <= this.config.max) {
      return value;
    } else {
      return this.config.max;
    }
  }
  private checkSliderSizeMax(value: number) {
    if (value <= this.sliderSize - 3) {
      return value;
    } else {
      return this.sliderSize;
    }
  }
  private calcValue(position: number) {
    return (
      Math.round(
        (position * this.calcPixelSize() + this.config.min) / this.config.step
      ) * this.config.step
    );
  }
}
export { Model };

