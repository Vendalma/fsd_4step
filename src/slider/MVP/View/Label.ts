interface IConfigLabel {
  label: boolean;
  orientation: string;
}
class Label {
  thumb: HTMLElement;
  elementLabel: HTMLElement;
  config: IConfigLabel;

  constructor(config: any, thumb: HTMLElement) {
    this.thumb = thumb;
    this.elementLabel = document.createElement("div");
    this.elementLabel.classList.add("thumb__label");
    this.thumb.append(this.elementLabel);

    this.config = config;
    this.changeVisibleLabel();
    this.changeLabelOrientation();
    this.update(this.config);
  }

  setLabelValue(value: number) {
    this.elementLabel.innerHTML = value.toString();
  }

  changeLabelOrientation() {
    if (this.config.orientation == "vertical")
      this.elementLabel.classList.add("thumb__label_vertical");

    if (this.config.orientation == "horisontal")
      this.elementLabel.classList.remove("thumb__label_vertical");
  }

  changeVisibleLabel() {
    this.config.label
      ? (this.elementLabel.style.display = "block")
      : (this.elementLabel.style.display = "none");
  }
  update(data: any) {
    this.config = data;
    this.changeVisibleLabel();
    this.changeLabelOrientation();
  }
}
export { Label };

