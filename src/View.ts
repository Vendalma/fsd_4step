import { Module } from "./Module";

export class View {
  container: HTMLElement | null;
  id: string;
  displayValue: boolean;
  constructor(id: string, displayValue: boolean) {
    this.id = id;
    this.container = document.getElementById(this.id);
    this.displayValue = displayValue;
    this.initialization();
  }

  initialization(): void {
    this.container?.classList.add("range-slider");
    let thumb = new Module(this.container, this.displayValue);
  }
}
