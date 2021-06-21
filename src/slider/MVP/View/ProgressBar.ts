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
    const dimension = this.config.vertical ? 'height' : 'width';
    const side = this.config.vertical ? 'top' : 'left';

    if (!this.config.range) {
      this.progressBar.style[side] = '0px';
      this.progressBar.style[dimension] = `${positionThumbFirst}px`;
    } else {
      this.progressBar.style[side] = `${positionThumbFirst}px`;
      this.progressBar.style[dimension] = `${positionThumbSecond - positionThumbFirst}px`;
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
    } else {
      this.progressBar.classList.add('slider__progress-bar_vertical');
      this.progressBar.classList.remove('slider__progress-bar_horizontal');
    }
  }
}
export default ProgressBar;
