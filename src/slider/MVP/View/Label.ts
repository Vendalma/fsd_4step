interface IConfigLabel {
  label: boolean;
  orientation: string;
}
class Label {
  thumb: HTMLElement;
  elementLabel: HTMLElement;
  config: IConfigLabel;

  constructor(config: IConfigLabel, thumb: HTMLElement) {
    this.thumb = thumb;
    this.elementLabel = document.createElement("div");
    this.elementLabel.classList.add("thumb__label");
    this.thumb.append(this.elementLabel);

    this.config = config;
    this.updateConfig(this.config);
  }

  setLabelValue(value: number) {
    this.elementLabel.innerHTML = value.toString();
  }

  changeLabelOrientation() {
    if (this.config.orientation == "vertical")
      this.elementLabel.classList.add("thumb__label_vertical");

    if (this.config.orientation == "horizontal")
      this.elementLabel.classList.remove("thumb__label_vertical");
  }

  changeVisibleLabel() {
    this.config.label
      ? (this.elementLabel.classList.remove('thumb__label_hidden'))
      : (this.elementLabel.classList.add('thumb__label_hidden'));
  }
  updateConfig(data: IConfigLabel) {
    this.config = data;
    this.changeVisibleLabel();
    this.changeLabelOrientation();
  }
}
export { Label };

