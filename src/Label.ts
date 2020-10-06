import config from "./config";
interface IConfigLabel {
  label: boolean;
  min: number;
  max: number;
  step: number;
}
export class Label {
  thumb: HTMLElement | null;
  labelElem: HTMLElement | null;

  config: IConfigLabel;
  label: boolean;
  min: number;
  max: number;
  step: number;

  constructor(IConfigLabel: any, thumb: HTMLElement | null) {
    this.thumb = thumb;
    this.labelElem = document.createElement("div");
    this.labelElem.classList.add("thumb__label");
    this.thumb?.append(this.labelElem);

    this.config = IConfigLabel;
    this.label = this.config.label;
    this.min = this.config.min;
    this.max = this.config.max;
    this.step = this.config.step;

    this.label
      ? (this.labelElem.style.display = "block")
      : (this.labelElem.style.display = "none");
  }

  setLabelValue(value: number) {
    if (this.labelElem) this.labelElem.innerHTML = value + "";
  }

  changeLabelOrientation(orientation: string) {
    if (orientation == "vertical")
      this.labelElem?.classList.add("thumb__label_vertical");

    if (orientation == "horisontal")
      this.labelElem?.classList.remove("thumb__label_vertical");
  }

  checkLabelProp(data: boolean) {
    this.label = data;
    if (this.labelElem)
      this.label
        ? (this.labelElem.style.display = "block")
        : (this.labelElem.style.display = "none");
  }
}
