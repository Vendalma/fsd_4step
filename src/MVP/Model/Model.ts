import { data } from "jquery";
import { Observer } from "../../Observer/Observer";
//import config from "./config";
interface IConfigModel {
  min: number;
  max: number;
  range: boolean;
  position_1: number;
  position_2: number;
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
  constructor(IConfigModel: any) {
    this.observer = new Observer();

    this.config = IConfigModel;
    this.range = this.config.range;
    this.max = this.config.max;
    this.min = this.config.min;
    this.position_1 = this.config.position_1;
    this.position_2 = this.config.position_2;
    this.orientation = this.config.orientation;
    this.step = this.config.step;
  }

  thumbCorrectValue(data: any) {
    let clientX = data["clientX"];
    let clientY = data["clientY"];
    let sliderLeftPoint = data["slider-left-point"];
    let sliderTopPoint = data["slider-top-point"];
    let sliderWidth = data["slider-width"];
    let sliderHeight = data["slider-height"];
    let data_num = data["data-num"];

    let firstThumbPosition = data["positionThumbFirst"];
    let secondThumbPosition = data["positionThumbSecond"];

    if (this.orientation == "horisontal") {
      let onePixelSizeHorisontal = (this.max - this.min) / sliderWidth;
      let stepSizeHorisontal = this.step / onePixelSizeHorisontal;
      let position = clientX - sliderLeftPoint;
      let positionMove =
        Math.round(position / stepSizeHorisontal) * stepSizeHorisontal;

      let value =
        Math.round((position * onePixelSizeHorisontal + this.min) / this.step) *
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
            position: positionMove,
            data_num: data_num,
            value: value,
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
              // value: Math.round(value) + this.step,
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
          let right = sliderWidth;

          if (position < left) {
            this.observer.broadcast("position", {
              position: left,
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
              position: positionMove,
              data_num: data_num,
              value: value,
            });
          }
        }
      }
    } else if (this.orientation == "vertical") {
      let position = clientY - sliderTopPoint;
      let onePixelSizeVertical = (this.max - this.min) / sliderHeight;
      let stepSizeVertical = this.step / onePixelSizeVertical;
      let positionMove =
        Math.round(position / stepSizeVertical) * stepSizeVertical;
      let value =
        Math.round((position * onePixelSizeVertical + this.min) / this.step) *
        this.step;
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
            position: positionMove,
            data_num: data_num,
            value: value,
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
              position: positionMove,
              data_num: data_num,
              value: value,
            });
          }
        } else if (data_num == "2") {
          let left = firstThumbPosition;
          let right = sliderHeight;

          if (position < left) {
            this.observer.broadcast("position", {
              position: left,
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
              position: positionMove,
              data_num: data_num,
              value: value,
            });
          }
        }
      }
    }
  }

  changeRange(data: boolean) {
    this.range = data;
  }

  changeOrientation(data: string) {
    this.orientation = data;
  }

  changeMin(data:number) {
    this.min = data
  }
  changeMax (data: number) {
    this.max = data
  }
  changeStep(data: number) {
    this.step = data
  }
  changePositionFrom(data: number) {
    this.position_1 = data
  }

  changePositionTo(data: number) {
    this.position_2 = data
  }
  
  getStep(loadData: any) {
    let sliderSize = loadData["sliderSize"];

    let stepCount = 20;
    let onePixelSize = (this.max - this.min) / sliderSize;
    let stepSize = sliderSize / stepCount;

    let onloadPositionThumbOne = (this.position_1 - this.min) / onePixelSize;
    let onloadPositionThumbTwo = (this.position_2 - this.min) / onePixelSize;


    this.observer.broadcast("stepData", {
      stepCount: stepCount,
      stepSize: stepSize,
      onloadPositionThumbOne: onloadPositionThumbOne,
      onloadPositionThumbTwo: onloadPositionThumbTwo,
    });
  }

  isIntegerStep(step: number) {
    return (step ^ 0) === step;
  }
}
