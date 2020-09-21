import { Observer } from "./observer";
export class Controller {
  input: HTMLElement | HTMLInputElement | null;
  panel: HTMLElement | null;
  observer: Observer;
  constructor(panel: HTMLElement | null) {
    this.observer = new Observer();

    this.panel = panel;
    this.input = document.createElement("input");
    this.input.classList.add("panel__input-value");
    this.panel?.append(this.input);
  }
  setValue(data: number) {
    if (this.input instanceof HTMLInputElement)
      this.input.value = Math.round(data) + "";
  }
}
