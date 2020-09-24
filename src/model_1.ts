import { Observer } from "./observer";
import config from "./config";
interface IConfigModel {
  min?: number;
  max?: number;
  range: boolean;
  position_1?: number;
  position_2?: number;
  orientation: string;
}

export class Model implements IConfigModel {
  observer: Observer;
  range: boolean;
  config: IConfigModel;
  max: number;
  position_1: number;
  position_2: number;
  orientation: string;
  constructor() {
    this.observer = new Observer();
    this.range = config.range;
    this.config = config;
    this.max = config.max;
    this.position_1 = config.position_1;
    this.position_2 = config.position_2;
    this.orientation = config.orientation;
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

    if (this.orientation == "horisontal") {
      let position = clientX - sliderLeftPoint;

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
          let right = secondThumbPosition - thumbWidh;

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
          let left = firstThumbPosition + thumbWidh;
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
  }

  changeRange(data: any) {
    this.range = data;
  }
}
