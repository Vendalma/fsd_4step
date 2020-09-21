import { Observer } from "./observer";
import config from "./config";
interface IConfigModel {
  min?: number;
  max?: number;
  range: boolean;
  position_1?: number;
  position_2?: number;
}

export class Model implements IConfigModel {
  observer: Observer;
  range: boolean;
  config: IConfigModel;
  max: number;
  constructor() {
    this.observer = new Observer();
    this.range = config.range;
    this.config = config;
    this.max = config.max;
  }

  thumbCorrectValue(data: any) {
    let thumbWidh = data["thumb-width"];
    let clientX = data["clientX"];
    let sliderLeftPoint = data["slider-left-point"];
    let sliderWidth = data["slider-width"];

    let position = clientX - sliderLeftPoint - thumbWidh;
    let right = sliderWidth - thumbWidh;

    if (position < 0) {
      this.observer.broadcast("thumbPosition", 0);
    } else if (position > right) {
      this.observer.broadcast("thumbPosotoin", right);
    } else {
      this.observer.broadcast("thumbPosition", position);
    }
  }
}
