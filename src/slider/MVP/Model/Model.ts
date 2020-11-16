import { Observer } from "../../Observer/Observer";
import { Validator } from './Validator';
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
  updateConf(data: any) {
    // Object.assign(this.config, data);
    let key = Object.keys(data)[0];
    if (key == "orientation") {
      this.observer.broadcast("changeOrientation", this.config);
    } else {
      if (key == "range") {
        this.changeRange();
      } else if (key == "min") {
        this.changeMin();
      } else if (key == "max") {
        this.changeMax();
      } else if (key == "positionFrom") {
        this.changePositionFrom();
      } else if (key == "positionTo") {
        this.changePositionTo();
      }
      this.observer.broadcast("changeConfig", this.config);
    }

  }
  getConfig() {
    return this.config;
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
  changeRange() {
    this.calcPosotionFrom();
    this.calcPosotionTo();
    this.setOnloadData(this.sliderSize);
  }

  /* changeOrientation(data: string) {
     if (this.validationOrientation(data) === true) {
       this.config.orientation = data;
       
     }
   }*/

  changeMin() {
    this.calcPosotionFrom();
    this.calcPosotionTo();
    this.setOnloadData(this.sliderSize);
  }
  changeMax() {
    this.calcPosotionFrom();
    this.calcPosotionTo();
    this.setOnloadData(this.sliderSize);
  }
  /*changeStep(data: number) {
    if (this.validationStepValue(data) === true) {
      this.config.step = data;
    }
  }*/
  changePositionFrom() {
    this.calcPosotionFrom();
    this.setOnloadData(this.sliderSize);
  }

  changePositionTo() {
    this.calcPosotionTo();
    this.setOnloadData(this.sliderSize);
  }
  private calcPosotionFrom() {
    if (this.config.positionFrom < this.config.min) {
      this.config.positionFrom = this.config.min;
      //this.observer.broadcast("changeConfig", this.getConfig());
    } else if (
      this.config.range &&
      this.config.positionFrom > this.config.positionTo
    ) {
      this.config.positionTo = this.config.positionFrom + this.config.step;
      //this.observer.broadcast("changeConfig", this.getConfig());
    } else if (
      !this.config.range &&
      this.config.positionFrom > this.config.max
    ) {
      this.config.positionFrom = this.config.max;
      //this.observer.broadcast("changeConfig", this.getConfig());
    } else {
      //this.observer.broadcast("changeConfig", this.getConfig());
    }
  }
  private calcPosotionTo() {
    if (this.config.positionTo > this.config.max) {
      this.config.positionTo = this.config.max;
      // this.observer.broadcast("changeConfig", this.getConfig());
    } else if (this.config.positionTo < this.config.positionFrom) {
      this.config.positionTo = this.config.positionFrom + this.config.step;
      //this.observer.broadcast("changeConfig", this.getConfig());
    } else {
      // this.observer.broadcast("changeConfig", this.getConfig());
    }
  }
  setOnloadData(data: number) {
    this.sliderSize = data;
    this.observer.broadcast("onloadData", {
      stepData: this.calcStepData(),
      thumbData: this.calcOnloadThumbPosition(),
    });
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

