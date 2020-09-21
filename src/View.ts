/*import { Module } from "./Module";
//import { Constructor } from "./constructor";

export class View {
  container: HTMLElement | null;
  id: string;
  min: number;
  max: number;
  range: boolean;
  handlePosition: Array<number>;
  thumbValue: boolean;
  construct: HTMLElement | null;
  slider: HTMLElement | null;

  constructor(
    id: string,
    min: number,
    max: number,
    range: boolean,
    handlePosition: Array<number>,
    thumbValue: boolean
  ) {
    this.id = id;
    this.container = document.getElementById(this.id);
    this.min = min;
    this.max = max;
    this.range = range;
    this.handlePosition = handlePosition;
    this.thumbValue = thumbValue;
    this.construct = document.createElement("div");
    this.slider = document.createElement("div");
    this.initialization();
  }

  initialization(): void {
    if (
      this.container &&
      this.slider instanceof HTMLElement &&
      this.construct instanceof HTMLElement
    ) {
      this.container.classList.add("wrapper");
      this.container.appendChild(this.construct);
      this.container.appendChild(this.slider);

      this.slider.classList.add("range-slider");
      this.construct.classList.add("constructor");
    }

    let slid = new Module(
      this.slider,
      this.min,
      this.max,
      this.range,
      this.handlePosition,
      this.thumbValue
    );

    //let constr = new Constructor(this.construct, this.range);
  }
}
*/
