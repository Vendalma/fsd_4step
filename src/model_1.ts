import { Observer } from "./observer";
import config from "./config";
interface IConfigModel {
  min: number;
  max: number;
  range: boolean;
  position_1?: number;
  position_2?: number;
  orientation: string;
  step: number;
}

export class Model implements IConfigModel {
  observer: Observer;
  range: boolean;
  config: IConfigModel;
  max: number;
  min: number;
  position_1: number;
  position_2: number;
  orientation: string;
  step: number;
  constructor() {
    this.observer = new Observer();
    this.range = config.range;
    this.config = config;
    this.max = config.max;
    this.min = config.min;
    this.position_1 = config.position_1;
    this.position_2 = config.position_2;
    this.orientation = config.orientation;
    this.step = config.step;
  }

  thumbCorrectValue(data: any) {
    let thumbWidh = data["thumb-width"];
    let clientX = data["clientX"];
    let clientY = data["clientY"];
    let sliderLeftPoint = data["slider-left-point"];
    let sliderTopPoint = data["slider-top-point"];
    let sliderWidth = data["slider-width"];
    let data_num = data["data-num"];

    let firstThumbPosition = data["positionThumbFirst"];
    let secondThumbPosition = data["positionThumbSecond"];

    let stepCount = (this.max - this.min) / this.step;
    let stepSize = sliderWidth / stepCount;

    if (this.orientation == "horisontal") {
      let position = clientX - sliderLeftPoint;
      let left = Math.round(position / stepSize) * stepSize;
      let value = (left / stepSize) * this.step + this.step;
      if (!this.range) {
        let right = sliderWidth;
        if (position < 0) {
          this.observer.broadcast("position", {
            position: 0,
            data_num: data_num,
            value: this.min,
          });
        } else if (position > right) {
          this.observer.broadcast("position", {
            position: right,
            data_num: data_num,
            value: this.max,
          });
        } else {
          this.observer.broadcast("position", {
            position: left,
            data_num: data_num,
            value: Math.round(value),
          });
        }
      } else if (this.range) {
        if (data_num == "1") {
          let right = secondThumbPosition;
          console.log(right);
          if (position < 0) {
            this.observer.broadcast("position", {
              position: 0,
              data_num: data_num,
              value: this.min,
            });
          } else if (position > right) {
            this.observer.broadcast("position", {
              position: right,
              data_num: data_num,
              // value: Math.round(value) + this.step,
            });
          } else {
            this.observer.broadcast("position", {
              position: left,
              data_num: data_num,
              value: Math.round(value),
            });
          }
        } else if (data_num == "2") {
          let lf = firstThumbPosition;
          let right = sliderWidth;

          if (position < lf) {
            this.observer.broadcast("position", {
              position: lf,
              data_num: data_num,
            });
          } else if (position > right) {
            this.observer.broadcast("position", {
              position: right,
              data_num: data_num,
              value: this.max,
            });
          } else {
            this.observer.broadcast("position", {
              position: left,
              data_num: data_num,
              value: Math.round(value),
            });
          }
        }
      }
    } else if (this.orientation == "vertical") {
      let position = clientY - sliderTopPoint;
      if (!this.range) {
        let right = sliderWidth - thumbWidh;

        if (position < 0) {
          this.observer.broadcast("position", {
            position: 0,
            data_num: data_num,
          });
        } else if (position > right) {
          this.observer.broadcast("position", {
            position: right,
            data_num: data_num,
          });
        } else {
          this.observer.broadcast("position", {
            position: position,
            data_num: data_num,
          });
        }
      } else if (this.range) {
        if (data_num == "1") {
          let right = secondThumbPosition;

          if (position < 0) {
            this.observer.broadcast("position", {
              position: 0,
              data_num: data_num,
            });
          } else if (position > right) {
            this.observer.broadcast("position", {
              position: right,
              data_num: data_num,
            });
          } else {
            this.observer.broadcast("position", {
              position: position,
              data_num: data_num,
            });
          }
        } else if (data_num == "2") {
          let left = firstThumbPosition;
          let right = sliderWidth - thumbWidh;

          if (position < left) {
            this.observer.broadcast("position", {
              position: left,
              data_num: data_num,
            });
          } else if (position > right) {
            this.observer.broadcast("position", {
              position: right,
              data_num: data_num,
            });
          } else {
            this.observer.broadcast("position", {
              position: position,
              data_num: data_num,
            });
          }
        }
      }
    }

    //this.getStep(sliderWidth, thumbWidh)
  }

  changeRange(data: boolean) {
    this.range = data;
  }

  changeOrientation(data: string) {
    this.orientation = data;
  }

  getStep(loadData: any) {
    let sliderWidth = loadData["sliderWidth"];

    let stepCount = (this.max - this.min) / this.step;
    let stepSize = sliderWidth / stepCount;
    let onloadPositionThumbOne = stepSize * (this.position_1 / this.step - 1);

    let onloadPositionThumbTwo = stepSize * (this.position_2 / this.step - 1);

    this.observer.broadcast("stepData", {
      stepCount: stepCount,
      stepSize: stepSize,
      onloadPositionThumbOne: onloadPositionThumbOne,
      onloadPositionThumbTwo: onloadPositionThumbTwo,
    });
  }

  stepSize(sliderWidth: number) {
    // console.log(sliderWidth);
  }
}
