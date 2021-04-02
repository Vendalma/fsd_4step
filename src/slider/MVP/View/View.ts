import Observer from '../../Observer/Observer';
import ProgressBar from './ProgressBar';
import Step from './Step';
import Thumb from './Thumb';
import { ChangeView, IConfig, IPosition } from './types';

class View extends Observer<ChangeView> {
  private config: IConfig;

  private wrapper: HTMLElement;

  private sliderContainer: HTMLElement;

  private sliderBlock: HTMLElement;

  private thumbOne: Thumb;

  private thumbTwo: Thumb;

  private step: Step;

  private progressBar: ProgressBar;

  constructor(wrapper: HTMLElement) {
    super();
    this.wrapper = wrapper;
    this.createSliderContainer();
    this.createSliderBlock();
    this.init();
    this.subscribeOnThumb();
    this.sliderClick();
  }

  updatePosition(data: IPosition): void {
    this.thumbOne.updatePosition(data.positionFrom);
    this.thumbTwo.updatePosition(data.positionTo);
    this.progressBar.addBar(data);
  }

  addStepLine(value: number): void {
    this.step.addStepLine({ stepSize: value, thumbSize: this.thumbOne.getThumbBlock().offsetWidth });
  }

  updateConfig(data: IConfig): void {
    this.config = data;
    this.setThumbTwo();
    this.checkOrientation();
    this.thumbOne.updateConfig(data);
    this.thumbTwo.updateConfig(data);
    this.progressBar.updateConfig(data);
    this.step.updateConfig(data);
    this.getSliderSize();
  }

  private createSliderContainer(): void {
    this.sliderContainer = document.createElement('div');
    this.sliderContainer.classList.add('slider');
    this.wrapper.append(this.sliderContainer);
    this.resizeWindow();
  }

  private createSliderBlock(): void {
    this.sliderBlock = document.createElement('div');
    this.sliderBlock.classList.add('slider__block');
    this.sliderBlock.classList.add('js-slider__block');
    this.sliderContainer.append(this.sliderBlock);
  }

  private init(): void {
    this.thumbOne = new Thumb('first', this.sliderBlock, 'from');
    this.thumbTwo = new Thumb('second', this.sliderBlock, 'to');
    this.progressBar = new ProgressBar(this.sliderBlock);
    this.step = new Step(this.sliderBlock);
  }

  private subscribeOnThumb() {
    this.thumbOne.subscribe(({ value }) => {
      this.broadcast({ value, type: 'thumbMove' });
    });

    this.thumbTwo.subscribe(({ value }) => {
      this.broadcast({ value, type: 'thumbMove' });
    });
  }

  private resizeWindow(): void {
    window.addEventListener('resize', this.getSliderSize.bind(this));
  }

  private getSliderSize(): void {
    if (!this.config.vertical) {
      this.broadcast({ value: this.sliderContainer.offsetWidth, type: 'sliderSize' });
    } else {
      this.broadcast({ value: this.sliderContainer.offsetHeight, type: 'sliderSize' });
    }
  }

  private checkOrientation(): void {
    if (this.config.vertical) {
      this.sliderBlock.classList.add('slider__block_vertical');
    } else {
      this.sliderBlock.classList.remove('slider__block_vertical');
    }
  }

  private sliderClick(): void {
    this.sliderBlock.addEventListener('click', this.onSliderClick.bind(this));
  }

  private onSliderClick(e: MouseEvent): void {
    if (!this.config.vertical) {
      this.findClickPlaceHorizon(e);
    } else {
      this.findClickPlaceVert(e);
    }
  }

  private findClickPlaceHorizon(e: MouseEvent): void {
    const thumbFirst = this.thumbOne.getThumbBlock();
    const thumbSecond = this.thumbTwo.getThumbBlock();

    if (!this.config.range) {
      this.thumbOne.onMouseUp(e);
    } else if (this.config.range) {
      const thumbFirstPosition = Math.abs(thumbFirst.getBoundingClientRect().x - e.clientX);
      const thumbSecondPosition = Math.abs(thumbSecond.getBoundingClientRect().x - e.clientX);

      if (thumbFirstPosition < thumbSecondPosition) {
        this.thumbOne.onMouseUp(e);
      } else {
        this.thumbTwo.onMouseUp(e);
      }
    }
  }

  private findClickPlaceVert(e: MouseEvent): void {
    const thumbFirst = this.thumbOne.getThumbBlock();
    const thumbSecond = this.thumbTwo.getThumbBlock();

    if (!this.config.range) {
      this.thumbOne.onMouseUp(e);
    } else if (this.config.range) {
      const thumbFirstPosition = Math.abs(thumbFirst.getBoundingClientRect().y - e.clientY);
      const thumbSecondPosition = Math.abs(thumbSecond.getBoundingClientRect().y - e.clientY);

      if (thumbFirstPosition < thumbSecondPosition) {
        this.thumbOne.onMouseUp(e);
      } else {
        this.thumbTwo.onMouseUp(e);
      }
    }
  }

  private setThumbTwo(): void {
    const thumbSecond = this.thumbTwo.getThumbBlock().parentNode;

    if (this.config.range) {
      this.thumbTwo.addThumb();
    } else if (!this.config.range && thumbSecond !== null) {
      this.thumbTwo.removeThumb();
    }
  }
}

export default View;
