import { Thumb } from "./Thumb";
import { progressBar } from "./progressBar";

export class Module {
  slider: HTMLElement | null;
  input: HTMLElement | null;
  inputRange: HTMLInputElement | null;
  buttonPlus: HTMLElement | null;
  buttonMinus: HTMLElement | null;
  min: number;
  max: number;
  range: boolean;
  handlePosition: Array<number>;

  constructor(
    slider: HTMLElement | null,
    min: number,
    max: number,
    range: boolean,
    handlePosition: Array<number>
  ) {
    this.slider = slider;
    this.input = document.createElement("input");
    this.inputRange = document.createElement("input");
    this.buttonMinus = document.createElement("input");
    this.buttonPlus = document.createElement("input");
    this.min = min;
    this.max = max;
    this.range = range;
    this.handlePosition = handlePosition;

    this.init();
  }

  init() {
    if (
      this.input instanceof HTMLInputElement &&
      this.inputRange instanceof HTMLInputElement &&
      this.buttonMinus instanceof HTMLInputElement &&
      this.buttonPlus instanceof HTMLInputElement
    ) {
      if (
        (this.range && this.handlePosition.length == 2) ||
        (!this.range && this.handlePosition.length == 1)
      ) {
        for (let i = 0; i < this.handlePosition.length; i++) {
          let thumb = new Thumb(
            this.slider,
            this.range,
            this.max,
            this.handlePosition[i],
            i
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
      let bar = new progressBar(this.slider, this.range);
    }

    this.setMaxValue();
  }

  setMaxValue() {
    if (this.slider instanceof HTMLElement)
      this.slider.style.width = this.max + "px";
  }

  setMinValue() {}
}
