interface IConfigLabel {
  label: boolean;
  min: number;
  max: number;
  step: number;
  orientation : string
}
export class Label {
  thumb: HTMLElement | null;
  labelElem: HTMLElement | null;

  config: IConfigLabel;
  label: boolean;
  min: number;
  max: number;
  step: number;
  orientation: string;

  constructor(config: any, thumb: HTMLElement ) {
    this.thumb = thumb;
    this.labelElem = document.createElement("div");
    this.labelElem.classList.add("thumb__label");
    this.thumb.append(this.labelElem);

    this.config = config;
    this.label = this.config.label;
    this.min = this.config.min;
    this.max = this.config.max;
    this.step = this.config.step;
    this.orientation = this.config.orientation

   this.checkLabelProp(this.label)
   this.checkLabelOrientation(this.orientation)
  }

  setLabelValue(value: number) {
    if (this.labelElem) this.labelElem.innerHTML = value + "";
  }

  checkLabelOrientation(data: string) {
    this.orientation = data;
    if (this.orientation == "vertical")
      this.labelElem?.classList.add("thumb__label_vertical");

    if (this.orientation == "horisontal")
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
