import { Module } from "./Module";

export class View {
  container: HTMLElement | null;
  id: string;
  min: number;
  max: number;
  range: boolean;
  handlePosition: Array<number>;

  constructor(
    id: string,
    min: number,
    max: number,
    range: boolean,
    handlePosition: Array<number>
  ) {
    this.id = id;
    this.container = document.getElementById(this.id);
    this.min = min;
    this.max = max;
    this.range = range;
    this.handlePosition = handlePosition;

    this.initialization();
  }

  initialization(): void {
    this.container?.classList.add("range-slider");
    let slid = new Module(
      this.container,
      this.min,
      this.max,
      this.range,
      this.handlePosition
    );
  }
}
