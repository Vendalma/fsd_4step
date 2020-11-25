interface IConfigBar {
  range: boolean;
  orientation: string;
}
class ProgressBar {
  config: IConfigBar;

  slider: HTMLElement;

  progressBar: HTMLElement;

  constructor(config: IConfigBar, slider: HTMLElement) {
    this.config = config;
    this.slider = slider;
    this.progressBar = document.createElement('div');
    this.progressBar.classList.add('slider__progress-bar');
    this.slider.prepend(this.progressBar);
    this.checkOrientation();
  }

  addBar(): void {
    const thumbFirst = this.slider.querySelector('.js-slider__thumb-first') as HTMLElement;
    const thumbSecond = this.slider.querySelector('.js-slider__thumb-second') as HTMLElement;
    if (this.config.orientation === 'horizontal') {
      if (!this.config.range) {
        this.progressBar.style.left = '0px';
        this.progressBar.style.width = thumbFirst.style.left;
      } else {
        this.progressBar.style.left = thumbFirst.style.left;
        this.progressBar.style.width = `${
          parseInt(thumbSecond.style.left, 10) - parseInt(thumbFirst.style.left, 10)
        }px`;
      }
    }
    if (this.config.orientation === 'vertical') {
      if (!this.config.range) {
        this.progressBar.style.top = '0px';
        this.progressBar.style.height = thumbFirst.style.top;
      } else {
        this.progressBar.style.top = thumbFirst.style.top;
        this.progressBar.style.height = `${parseInt(thumbSecond.style.top, 10) - parseInt(thumbFirst.style.top, 10)}px`;
      }
    }
  }

  checkOrientation(): void {
    if (this.config.orientation === 'horizontal') {
      this.progressBar.classList.remove('slider__progress-bar_vertical');
      this.progressBar.classList.add('slider__progress-bar_horizontal');
    }
    if (this.config.orientation === 'vertical') {
      this.progressBar.classList.add('slider__progress-bar_vertical');
      this.progressBar.classList.remove('slider__progress-bar_horizontal');
    }
  }

  cleanStyleAttr(): void {
    this.progressBar.removeAttribute('style');
  }

  updateBarConfig(data: IConfigBar): void {
    this.config = data;
    this.checkOrientation();
  }
}
export default ProgressBar;
