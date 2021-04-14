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
    this.mouseDownOnSliderBlock();
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

  private mouseDownOnSliderBlock(): void {
    this.sliderBlock.addEventListener('mousedown', this.onMouseDown.bind(this));
  }

  private onMouseDown(e: MouseEvent): void {
    if (!this.config.vertical) {
      this.checkMouseDownPosition(e.clientX - this.sliderBlock.getBoundingClientRect().left);
    } else {
      this.checkMouseDownPosition(e.clientY - this.sliderBlock.getBoundingClientRect().top);
    }
  }

  private checkMouseDownPosition(value: number): void {
    const eventPosition = value;
    const thumbFirstPosition = this.thumbOne.getThumbBlockValues(eventPosition).position;
    const thumbFirstClickDistance = this.thumbOne.getThumbBlockValues(eventPosition).distance;
    const thumbSecondPosition = this.thumbTwo.getThumbBlockValues(eventPosition).position;
    const thumbSecondClickDistance = this.thumbTwo.getThumbBlockValues(eventPosition).distance;
    const isThumbFirstNearest =
      eventPosition < thumbFirstPosition || thumbFirstClickDistance < thumbSecondClickDistance;
    const isThumbSecondNearest =
      eventPosition > thumbSecondPosition || thumbSecondClickDistance < thumbFirstClickDistance;

    if (!this.config.range || isThumbFirstNearest) {
      this.updatePosition(
        this.positionsCalculator.findPosition({
          position: eventPosition,
          dataName: 'from',
        }),
      );
    } else if (isThumbSecondNearest) {
      this.updatePosition(
        this.positionsCalculator.findPosition({
          position: eventPosition,
          dataName: 'to',
        }),
      );
    }
  }
}

export default View;
