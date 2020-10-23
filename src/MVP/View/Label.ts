interface IConfigLabel {
  label: boolean;
  min: number;
  max: number;
  step: number;
  orientation : string
}
export class Label {
  thumb: HTMLElement;
  elementLabel: HTMLElement;

  config: IConfigLabel;
  label: boolean;
  min: number;
  max: number;
  step: number;
  orientation: string;

  constructor(config: any, thumb: HTMLElement ) {
    this.thumb = thumb;
    this.elementLabel = document.createElement("div");
    this.elementLabel.classList.add("thumb__label");
    this.thumb.append(this.elementLabel);

    this.config = config;
    this.label = this.config.label;
    this.min = this.config.min;
    this.max = this.config.max;
    this.step = this.config.step;
    this.orientation = this.config.orientation

   this.checkVisibleLabel(this.label)
   this.checkLabelOrientation(this.orientation)
  }

  setLabelValue(value: number) {
    this.elementLabel.innerHTML = value + "";
  }

  checkLabelOrientation(data: string) {
    this.orientation = data;
    if (this.orientation == "vertical")
      this.elementLabel.classList.add("thumb__label_vertical");

    if (this.orientation == "horisontal")
      this.elementLabel.classList.remove("thumb__label_vertical");
  }

  checkVisibleLabel(data: boolean) {
    this.label = data;
      this.label
        ? (this.elementLabel.style.display = "block")
        : (this.elementLabel.style.display = "none");
  }
}
