import config from "./config";
interface IConfigLabel {
  label: boolean;
}
export class Label {
  thumb: HTMLElement | null;
  labelElem: HTMLElement | null;

  config: IConfigLabel;
  label: boolean;

  constructor(thumb: HTMLElement | null) {
    this.thumb = thumb;
    this.labelElem = document.createElement("div");
    this.labelElem.classList.add("thumb__label");
    this.thumb?.append(this.labelElem);

    this.config = config;
    this.label = config.label;

    this.label
      ? (this.labelElem.style.display = "block")
      : (this.labelElem.style.display = "none");
  }

  setLabelValue(value: number) {
    if (this.labelElem) this.labelElem.innerHTML = Math.round(value) + "";
  }

  changeLabelPosition(orientation: string) {
    if (orientation == "vertical")
      this.labelElem?.classList.toggle("thumb__label_vertical");
  }
}
