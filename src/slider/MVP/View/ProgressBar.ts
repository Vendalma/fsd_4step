import { IPositionState } from './types';

interface IConfigBar {
  range: boolean;
  vertical: boolean;
}

class ProgressBar {
  private config: IConfigBar;

  private slider: HTMLElement;

  private progressBar: HTMLElement;

  constructor(slider: HTMLElement) {
    this.slider = slider;
    this.createBar();
  }

  addBar(values: IPositionState): void {
    const positionThumbFirst = values.valueFrom.position;
    const positionThumbSecond = values.valueTo.position;
    if (!this.config.vertical) {
      if (!this.config.range) {
        this.progressBar.style.left = '0px';
        this.progressBar.style.width = `${positionThumbFirst}px`;
      } else {
        this.progressBar.style.left = `${positionThumbFirst}px`;
        this.progressBar.style.width = `${positionThumbSecond - positionThumbFirst}px`;
      }
    }

    if (this.config.vertical) {
      if (!this.config.range) {
        this.progressBar.style.top = '0px';
        this.progressBar.style.height = `${positionThumbFirst}px`;
      } else {
        this.progressBar.style.top = `${positionThumbFirst}px`;
        this.progressBar.style.height = `${positionThumbSecond - positionThumbFirst}px`;
      }
    }
  }

  updateConfig(data: IConfigBar): void {
    this.config = data;
    this.progressBar.removeAttribute('style');
    this.checkOrientation();
  }

  private createBar(): void {
    this.progressBar = document.createElement('div');
    this.progressBar.classList.add('slider__progress-bar');
    this.slider.prepend(this.progressBar);
  }

  private checkOrientation(): void {
    if (!this.config.vertical) {
      this.progressBar.classList.remove('slider__progress-bar_vertical');
      this.progressBar.classList.add('slider__progress-bar_horizontal');
    }
    if (this.config.vertical) {
      this.progressBar.classList.add('slider__progress-bar_vertical');
      this.progressBar.classList.remove('slider__progress-bar_horizontal');
    }
  }
}
export default ProgressBar;
