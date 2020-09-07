import { Module } from "./Module";

export class View {
  container: HTMLElement | null;
  id: string;
  min: number;
  max: number;

  constructor(id: string, min: number, max: number) {
    this.id = id;
    this.container = document.getElementById(this.id);
    this.min = min;
    this.max = max;

    this.initialization();
  }

  initialization(): void {
    this.container?.classList.add("range-slider");
    let thumb = new Module(this.container, this.min, this.max);
  }
}
