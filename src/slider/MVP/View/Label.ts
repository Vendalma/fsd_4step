interface IConfigLabel {
  label: boolean;
  vertical: boolean;
}

class Label {
  private thumb: HTMLElement;

  private elementLabel: HTMLElement;

  private config: IConfigLabel;

  constructor(thumb: HTMLElement) {
    this.thumb = thumb;
    this.createLabel();
  }

  setLabelValue(value: number): void {
    this.elementLabel.textContent = `${value}`;
  }

  updateConfig(data: IConfigLabel): void {
    this.config = data;
    this.changeVisibleLabel();
    this.checkOrientation();
  }

  private createLabel(): void {
    this.elementLabel = document.createElement('div');
    this.elementLabel.classList.add('slider__label');
    this.elementLabel.classList.add('js-slider__label');
    this.thumb.append(this.elementLabel);
  }

  private checkOrientation(): void {
    if (this.config.vertical) {
      this.elementLabel.classList.add('slider__label_vertical');
    } else {
      this.elementLabel.classList.remove('slider__label_vertical');
    }
  }

  private changeVisibleLabel(): void {
    if (this.config.label) {
      this.elementLabel.classList.remove('slider__label_hidden');
    } else {
      this.elementLabel.classList.add('slider__label_hidden');
    }
  }
}

export default Label;
