import { Observer } from "./Observer";
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
    let sliderHeight = data["slider-height"];
    let data_num = data["data-num"];

    let firstThumbPosition = data["positionThumbFirst"];
    let secondThumbPosition = data["positionThumbSecond"];

    //let stepSizeHorisontal = ((sliderWidth / stepS) * this.step) / 2;

    let onePixelSize = (this.max - this.min) / sliderWidth;
    let stepS = this.step / onePixelSize;
    let stepSizeVertical = ((sliderHeight / stepS) * this.step) / 2;

    if (this.orientation == "horisontal") {
      let position = clientX - sliderLeftPoint;
      let left = Math.round(position / stepS) * stepS;

      let value =
        Math.round((position * onePixelSize + this.min) / this.step) *
        this.step;

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
            value: value,
          });
        }
      } else if (this.range) {
        if (data_num == "1") {
          let right = secondThumbPosition;
          // console.log(right);
          if (position < 0) {
            // console.log(this.min);
            this.observer.broadcast("position", {
              position: 0,
              data_num: data_num,
              value: this.min + "",
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
              value: value,
            });
          }
        }
      }
    } else if (this.orientation == "vertical") {
      let position = clientY - sliderTopPoint;
      let left = Math.round(position / stepSizeVertical) * stepSizeVertical;
      // console.log(left);
      let value = (left / stepSizeVertical) * this.step + this.step;
      if (!this.range) {
        let right = sliderHeight;

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
          let right = sliderHeight;

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
    let sliderSize = loadData["sliderSize"];

    //let stepCount1 = (Math.abs(this.max) + Math.abs(this.min)) / 20;
    let stepCount = 20;
    let onePixelSize = (this.max - this.min) / sliderSize;
    let stepSize = sliderSize / stepCount;

    let onloadPositionThumbOne = (this.position_1 - this.min) / onePixelSize;

    let onloadPositionThumbTwo = (this.position_2 - this.min) / onePixelSize;

    ////

    let centerStep;
    let leftStep;
    let rightStep;
    if (this.isIntegerStep(this.step)) {
      centerStep = Math.round((this.max + this.min) / 2);
      leftStep = centerStep - Math.round((centerStep - this.min) / 2);
      rightStep = centerStep + Math.round((this.max - centerStep) / 2);
    } else if (!this.isIntegerStep(this.step)) {
      centerStep = (this.max + this.min) / 2;
      leftStep = centerStep - Math.round((centerStep - this.min) / 2);
      rightStep = centerStep + Math.round((this.max - centerStep) / 2);
    }

    this.observer.broadcast("stepData", {
      stepCount: stepCount,
      stepSize: stepSize,
      onloadPositionThumbOne: onloadPositionThumbOne,
      onloadPositionThumbTwo: onloadPositionThumbTwo,

      centerStep: centerStep,
      leftStep: leftStep,
      rightStep: rightStep,
    });
  }

  isIntegerStep(step: number) {
    return (step ^ 0) === step;
  }
  stepSize(sliderWidth: number) {
    // console.log(sliderWidth);
  }
}
