export class Label {
  thumb: HTMLElement | null;
  label: HTMLElement | null;

  constructor(thumb: HTMLElement | null) {
    this.thumb = thumb;
    this.label = document.createElement("div");
    this.label.classList.add("thumb__label");
    this.thumb?.append(this.label);
  }

  setLabelValue(value: number) {
    if (this.label) this.label.innerHTML = Math.round(value) + "";
  }

  changeLabelPosition(orientation: string) {
    if (orientation == "vertical")
      this.label?.classList.toggle("thumb__label_vertical");

    if (orientation == "horisontal")
      this.label?.classList.toggle("thumb__label_vertical");
  }
}
