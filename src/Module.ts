import { Thumb } from "./Thumb";
import { progressBar } from "./progressBar";

/*export class Module {
  slider: HTMLElement | null;
  input: HTMLElement | null;
  inputRange: HTMLInputElement | null;
  min: number;
  max: number;
  range: boolean;
  handlePosition: Array<number>;
  thumbValue: boolean;

  constructor(
    slider: HTMLElement | null,
    min: number,
    max: number,
    range: boolean,
    handlePosition: Array<number>,
    thumbValue: boolean
  ) {
    this.slider = slider;
    this.input = document.createElement("input");
    this.inputRange = document.createElement("input");
    this.min = min;
    this.max = max;
    this.range = range;
    this.handlePosition = handlePosition;
    this.thumbValue = thumbValue;

    this.init();
  }

  init() {
    if (
      this.input instanceof HTMLInputElement &&
      this.inputRange instanceof HTMLInputElement
    ) {
      if (
        (this.range && this.handlePosition.length == 2) ||
        (!this.range && this.handlePosition.length == 1)
      ) {
        for (let i = 0; i < this.handlePosition.length; i++) {
          let thumb = new Thumb(
           // this.slider,
            this.range,
            //this.max,
            //this.handlePosition[i],
            //i,
            //this.thumbValue
          );
        }
      } else if (
        (this.range && this.handlePosition.length < 2) ||
        (this.range && this.handlePosition.length > 2)
      ) {
        alert("Необходимо указать два начальных интервала");
      } else if (
        (!this.range && this.handlePosition.length < 1) ||
        (!this.range && this.handlePosition.length > 1)
      ) {
        alert("Необходимо указать начальный интервал");
      }
    }

    this.setMaxValue();
  }

  setMaxValue() {
    let thumb = document.querySelector(".thumb");
    if (this.slider instanceof HTMLElement && thumb instanceof HTMLElement)
      this.slider.style.width = this.max + thumb.offsetWidth + "px";
  }

  setMinValue() {}
}
*/
