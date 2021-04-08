import Observer from '../../Observer/Observer';
import PositionCalculator from './PositionCalculator';
import ProgressBar from './ProgressBar';
import Step from './Step';
import Thumb from './Thumb';
import { IConfig, IPosition, IViewValue } from './types';

class View extends Observer<IViewValue> {
  private config: IConfig;

  private wrapper: HTMLElement;

  private sliderBlock: HTMLElement;

  private thumbOne: Thumb;

  private thumbTwo: Thumb;

  private step: Step;

  private positionsCalculator: PositionCalculator;

  private progressBar: ProgressBar;

  constructor(wrapper: HTMLElement) {
    super();
    this.wrapper = wrapper;
    this.wrapper.classList.add('slider');
    this.createSliderBlock();
    this.initComponents();
    this.resizeWindow();
    this.clickSliderBlock();
    this.subscribeOnThumb();
  }

  updateConfig(config: IConfig): void {
    this.config = config;
    this.setThumbTwo();
    this.thumbOne.updateConfig(this.config);
    this.thumbTwo.updateConfig(this.config);
    this.progressBar.updateConfig(this.config);
    this.step.updateConfig(this.config);
    this.checkOrientation();
    this.updateSliderParams();
  }

  private createSliderBlock(): void {
    this.sliderBlock = document.createElement('div');
    this.sliderBlock.classList.add('slider__block');
    this.sliderBlock.classList.add('js-slider__block');
    this.wrapper.append(this.sliderBlock);
  }

  private initComponents(): void {
    this.thumbOne = new Thumb('first', this.sliderBlock, 'from');
    this.thumbTwo = new Thumb('second', this.sliderBlock, 'to');
    this.positionsCalculator = new PositionCalculator();
    this.progressBar = new ProgressBar(this.sliderBlock);
    this.step = new Step(this.sliderBlock);
  }

  private checkOrientation(): void {
    if (this.config.vertical) {
      this.sliderBlock.classList.add('slider__block_vertical');
    } else if (!this.config.vertical) {
      this.sliderBlock.classList.remove('slider__block_vertical');
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

  private subscribeOnThumb(): void {
    this.thumbOne.subscribe(({ value }) => {
      this.updatePosition(this.positionsCalculator.findPosition(value));
    });

    this.thumbTwo.subscribe(({ value }) => {
      this.updatePosition(this.positionsCalculator.findPosition(value));
    });
  }

  private updatePosition(data: IPosition): void {
    this.thumbOne.updatePosition(data.positionFrom);
    this.thumbTwo.updatePosition(data.positionTo);
    this.progressBar.addBar(data);
    this.broadcast({
      value: {
        positionFrom: data.positionFrom.value,
        positionTo: data.positionTo.value,
      },
      type: 'viewChanged',
    });
  }

  private resizeWindow(): void {
    window.addEventListener('resize', this.updateSliderParams.bind(this));
  }

  private getSliderSize(): number {
    if (!this.config.vertical) {
      return this.wrapper.offsetWidth;
    }
    return this.wrapper.offsetHeight;
  }

  private updateSliderParams(): void {
    this.step.addStepLine({
      stepSize: this.getSliderSize() / 20,
      thumbSize: this.thumbOne.getThumbBlock().offsetWidth,
    });

    this.updatePosition(
      this.positionsCalculator.calcOnloadPosition({ config: this.config, sliderSize: this.getSliderSize() }),
    );
  }

  private clickSliderBlock(): void {
    this.sliderBlock.addEventListener('click', this.findClickPlace.bind(this));
  }

  private findClickPlace(e: MouseEvent): void {
    if (!this.config.vertical) {
      this.findClickPlaceHorizon(e);
    } else {
      this.findClickPlaceVert(e);
    }
  }

  private findClickPlaceHorizon(e: MouseEvent): void {
    const thumbFirstPosition = this.thumbOne.getThumbBlock().offsetLeft;
    const thumbSecondPosition = this.thumbTwo.getThumbBlock().offsetLeft;
    const clickPlace = e.clientX - this.sliderBlock.getBoundingClientRect().left;
    const thumbFirstClickDistance = Math.abs(thumbFirstPosition - clickPlace);
    const thumbSecondClickDistance = Math.abs(thumbSecondPosition - clickPlace);

    if (!this.config.range) {
      this.updatePosition(
        this.positionsCalculator.findPosition({
          position: clickPlace,
          dataName: 'from',
        }),
      );
    } else if (this.config.range) {
      if (thumbFirstClickDistance < thumbSecondClickDistance) {
        this.updatePosition(
          this.positionsCalculator.findPosition({
            position: clickPlace,
            dataName: 'from',
          }),
        );
      } else {
        this.updatePosition(
          this.positionsCalculator.findPosition({
            position: clickPlace,
            dataName: 'to',
          }),
        );
      }
    }
  }

  private findClickPlaceVert(e: MouseEvent): void {
    const thumbFirstPosition = this.thumbOne.getThumbBlock().offsetTop;
    const thumbSecondPosition = this.thumbTwo.getThumbBlock().offsetTop;
    const clickPlace = e.clientY - this.sliderBlock.getBoundingClientRect().top;
    const thumbFirstClickDistance = Math.abs(thumbFirstPosition - clickPlace);
    const thumbSecondClickDistance = Math.abs(thumbSecondPosition - clickPlace);

    if (!this.config.range) {
      this.updatePosition(
        this.positionsCalculator.findPosition({
          position: clickPlace,
          dataName: 'from',
        }),
      );
    } else if (this.config.range) {
      if (thumbFirstClickDistance < thumbSecondClickDistance) {
        this.updatePosition(
          this.positionsCalculator.findPosition({
            position: clickPlace,
            dataName: 'from',
          }),
        );
      } else {
        this.updatePosition(
          this.positionsCalculator.findPosition({
            position: clickPlace,
            dataName: 'to',
          }),
        );
      }
    }
  }
}

export default View;
