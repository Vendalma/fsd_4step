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
    this.elementLabel = document.createElement('div');
    this.elementLabel.classList.add('slider__label');
    this.thumb.append(this.elementLabel);

    this.config = config;
    this.updateConfig(this.config);
  }

  setLabelValue(value: number): void {
    this.elementLabel.innerHTML = `${value}`;
  }

  changeLabelOrientation(): void {
    if (this.config.orientation === 'vertical') {
      this.elementLabel.classList.add('slider__label_vertical');
    }

    if (this.config.orientation === 'horizontal') {
      this.elementLabel.classList.remove('slider__label_vertical');
    }
  }

  changeVisibleLabel(): void {
    if (this.config.label) {
      this.elementLabel.classList.remove('slider__label_hidden');
    } else {
      this.elementLabel.classList.add('slider__label_hidden');
    }
  }

  updateConfig(data: IConfigLabel): void {
    this.config = data;
    this.changeVisibleLabel();
    this.changeLabelOrientation();
  }
}
export default Label;
