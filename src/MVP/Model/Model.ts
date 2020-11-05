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

class Model extends Validator {
  observer: Observer;
  config: IConfigModel;

  validator: Validator;
  constructor(IConfigModel: any) {
    super(IConfigModel);
    this.observer = new Observer();

    this.config = IConfigModel;
    this.validator = new Validator(this.config);
  }
  addFollower(follower: any) {
    this.observer.subscribe(follower);
  }
  fundThumbPosition(data: any) {
    if (this.config.orientation == "horisontal") {
      this.fundThumbPositionHorisontal(data);
    } else if (this.config.orientation == "vertical") {
      this.fundThumbPositionVertical(data);
    }
  }
  getConfig() {
    if (this.validation()) return this.config;
    console.log(this.config)
  }
  private fundThumbPositionHorisontal(data: any) {
    let clientX = data["clientX"];
    let sliderLeftPoint = data["slider-left-point"];
    let sliderWidth = data["slider-width"];
    let data_num = data["data-num"];
    let firstThumbPosition = data["positionThumbFirst"];
    let secondThumbPosition = data["positionThumbSecond"];

    let onePixelSizeHorisontal = (this.config.max - this.config.min) / sliderWidth;
    let stepSizeHorisontal = this.config.step / onePixelSizeHorisontal;
    let position = clientX - sliderLeftPoint;
    let positionMove =
      Math.round(position / stepSizeHorisontal) * stepSizeHorisontal;

    let value =
      Math.round((position * onePixelSizeHorisontal + this.config.min) / this.config.step) *
      this.config.step;

    let rightValueForRange =
      Math.round(
        (secondThumbPosition * onePixelSizeHorisontal + this.config.min) / this.config.step
      ) * this.config.step;
    let leftValueForRange =
      Math.round(
        (firstThumbPosition * onePixelSizeHorisontal + this.config.min) / this.config.step
      ) * this.config.step;
    if (!this.config.range) {
      let right = sliderWidth;

      if (position < 0) {
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
        if (position < 0) {
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
        let right = sliderWidth;

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

  private fundThumbPositionVertical(data: any) {
    let clientY = data["clientY"];
    let sliderTopPoint = data["slider-top-point"];
    let sliderHeight = data["slider-height"];
    let data_num = data["data-num"];
    let firstThumbPosition = data["positionThumbFirst"];
    let secondThumbPosition = data["positionThumbSecond"];

    let position = clientY - sliderTopPoint;
    let onePixelSizeVertical = (this.config.max - this.config.min) / sliderHeight;
    let stepSizeVertical = this.config.step / onePixelSizeVertical;
    let positionMove =
      Math.round(position / stepSizeVertical) * stepSizeVertical;
    let value = (Math.round(position * onePixelSizeVertical + this.config.min) / this.config.step) *
      this.config.step;
    let rightValueForRange =
      Math.round(
        (secondThumbPosition * onePixelSizeVertical + this.config.min) / this.config.step
      ) * this.config.step;

    let leftValueForRange =
      Math.round(
        (firstThumbPosition * onePixelSizeVertical + this.config.min) / this.config.step
      ) * this.config.step;
    if (!this.config.range) {
      let right = sliderHeight;

      if (position < 0) {
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

        if (position < 0) {
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
        let right = sliderHeight;

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
  changeLabel(data: boolean) {
    if (this.validationLabel(data) === true) {
      this.config.label = data;
      this.observer.broadcast("changeConfig", this.getConfig());
    }
  }

  changeRange(data: boolean) {

    if (this.validationRange(data) === true) {
      this.config.range = data;
      this.observer.broadcast("changeConfig", this.getConfig());
      this.calcPosotionFrom();
      this.calcPosotionTo();
    }
  }

  changeOrientation(data: string) {

    if (this.validationOrientation(data) === true) {
      this.config.orientation = data;
      this.observer.broadcast("changeConfig", this.getConfig());
    }
  }

  changeMin(data: number) {
    if (this.validationMinValue(data) === true) {
      this.config.min = data;
      this.observer.broadcast("changeConfig", this.getConfig());
      // this.calcPosotionFrom();
      // this.calcPosotionTo();
    }
  }
  changeMax(data: number) {
    if (this.validationMaxValue(data) === true) {
      this.config.max = data;
      this.observer.broadcast("changeConfig", this.getConfig());
      // this.calcPosotionFrom();
      // this.calcPosotionTo();
    }
  }
  changeStep(data: number) {
    if (this.validationStepValue(data) === true) {
      this.config.step = data
      this.observer.broadcast("changeConfig", this.getConfig());
      //this.calckStep();
    }
  }
  changePositionFrom(data: number) {

    if (this.validationPositionFrom(data) === true) {
      this.config.positionFrom = data;
      this.observer.broadcast("changeConfig", this.getConfig());
      this.calcPosotionFrom();
    }
  }

  changePositionTo(data: number) {
    if (this.validationPositionTo(data) === true) {
      this.config.positionTo = data
      this.observer.broadcast("changeConfig", this.getConfig());
      this.calcPosotionTo();
    }
  }
  calcPosotionFrom() {
    if (this.config.positionFrom < this.config.min) {
      this.config.positionFrom = this.config.min;
      this.observer.broadcast("changeConfig", this.getConfig());
    } else if (this.config.range && this.config.positionFrom > this.config.positionTo) {
      this.config.positionFrom = this.config.positionTo - this.config.step;
      this.observer.broadcast("changeConfig", this.getConfig());
    } else if (!this.config.range && this.config.positionFrom > this.config.max) {
      this.config.positionFrom = this.config.max;
      this.observer.broadcast("changeConfig", this.getConfig());
    } else {
      this.observer.broadcast("changeConfig", this.getConfig());
    }
  }
  calcPosotionTo() {
    if (this.config.positionTo > this.config.max) {
      this.config.positionTo = this.config.max;
      this.observer.broadcast("changeConfig", this.getConfig());
    } else if (this.config.positionTo < this.config.positionFrom) {
      this.config.positionTo = this.config.positionFrom + this.config.step;
      this.observer.broadcast("changeConfig", this.getConfig());
    } else {
      this.observer.broadcast("changeConfig", this.getConfig());
    }
  }
  calckStep() {
    if (this.config.step <= 0) {
      this.config.step = 1;
    } else if (this.config.step > this.config.max - this.config.min) {
      this.config.step = this.config.max;
    }
  }
  getStep(loadData: any) {
    let sliderSize = loadData["sliderSize"];

    let stepCount = 20;
    let onePixelSize = (this.config.max - this.config.min) / sliderSize;
    let stepSize = sliderSize / stepCount;
    let onloadPositionThumbOne = (this.config.positionFrom - this.config.min) / onePixelSize;
    let onloadPositionThumbTwo = (this.config.positionTo - this.config.min) / onePixelSize;

    this.observer.broadcast("stepData", {
      stepCount: stepCount,
      stepSize: stepSize,
      onloadPositionThumbOne: onloadPositionThumbOne,
      onloadPositionThumbTwo: onloadPositionThumbTwo,
    });
  }
}
export { Model };

