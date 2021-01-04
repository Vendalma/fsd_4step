import Observer from '../../Observer/Observer';
import ProgressBar from './progressBar';
import Step from './Step';
import Thumb from './Thumb';

interface IConfig {
  min: number;
  max: number;
  range: boolean;
  positionFrom: number;
  positionTo: number;
  orientation: string;
  label: boolean;
}
interface IDataThumbMove {
  clientXY: number;
  sliderClientReact: number;
  dataNum: string;
  positionThumbFirst?: number;
  positionThumbSecond?: number;
}
interface IPosition {
  dataFirstThumb?: {
    positionFrom: number;
    valueFrom: number;
  };
  dataSecondThumb?: {
    positionTo: number;
    valueTo: number;
  };
  stepData?: number;
}
class SliderBlock {
  private config: IConfig;

  private sliderContainer: HTMLElement;

  private sliderBlock: HTMLElement;

  private thumbOne: Thumb;

  private thumbTwo: Thumb | null | undefined;

  protected observer: Observer;

  private step: Step;

  private progressBar: ProgressBar;

  constructor(config: IConfig, sliderContainer: HTMLElement) {
    this.config = config;
    this.sliderContainer = sliderContainer;
    this.sliderBlock = document.createElement('div');
    this.sliderBlock.classList.add('slider__block');
    this.sliderContainer.append(this.sliderBlock);

    this.observer = new Observer();
    this.thumbOne = new Thumb(this.config, 'js-slider__thumb-first', this.sliderBlock, '1');
    this.thumbTwo = new Thumb(this.config, 'js-slider__thumb-second', this.sliderBlock, '2');

    this.progressBar = new ProgressBar(this.config, this.sliderBlock);

    this.step = new Step(this.config, this.sliderBlock);
    this.setThumbTwo();
    this.subscribeOnUpdate();
    this.sliderClick();
    this.checkOrientation();
  }

  addFollower(follower: unknown): void {
    this.observer.subscribe(follower);
  }

  updateConfig(data: IConfig): void {
    this.config = data;
    this.setThumbTwo();
    this.checkOrientation();
    this.thumbOne.updateConfig(data);
    this.thumbTwo?.updateConfig(data);
    this.progressBar.updateConfig(data);
    this.step.updateConfig(data);
  }

  private checkOrientation(): void {
    if (this.config.orientation === 'vertical') {
      this.sliderBlock.classList.add('slider__block_vertical');
    } else if (this.config.orientation === 'horizontal') {
      this.sliderBlock.classList.remove('slider__block_vertical');
    }
  }

  setPositionThumb(data: IPosition): void {
    if (data.stepData !== undefined) {
      this.progressBar.cleanStyleAttr();
      this.thumbOne.cleanStyleAttr();
      this.thumbTwo?.cleanStyleAttr();
      this.step.addStepLine(data.stepData);
    }
    if (data.dataFirstThumb !== undefined) {
      this.thumbOne.setPosition(data.dataFirstThumb.positionFrom);
      this.thumbOne.setLabelValue(data.dataFirstThumb.valueFrom);
    }

    if (data.dataSecondThumb !== undefined) {
      this.thumbTwo?.setPosition(data.dataSecondThumb.positionTo);
      this.thumbTwo?.setLabelValue(data.dataSecondThumb.valueTo);
    }
    this.progressBar.addBar();
  }

  private sliderClick(): void {
    this.sliderBlock.addEventListener('click', this.onSliderClick.bind(this));
  }

  private onSliderClick(e: MouseEvent): void {
    if (this.config.orientation === 'horizontal') {
      this.findClickPlaceHorizon(e);
    } else if (this.config.orientation === 'vertical') {
      this.findClickPlaceVert(e);
    }
  }

  private findClickPlaceHorizon(e: MouseEvent): void {
    const thumbFirst = this.sliderBlock.querySelector('.js-slider__thumb-first') as HTMLElement;
    const thumbSecond = this.sliderBlock.querySelector('.js-slider__thumb-second') as HTMLElement;
    if (!this.config.range) {
      this.thumbOne.onMouseUp(e);
    } else if (this.config.range) {
      const thumbFirstPosition = Math.abs(thumbFirst.getBoundingClientRect().x - e.clientX);
      const thumbSecondPosition = Math.abs(thumbSecond.getBoundingClientRect().x - e.clientX);
      if (thumbFirstPosition < thumbSecondPosition) {
        this.thumbOne.onMouseUp(e);
      } else {
        this.thumbTwo?.onMouseUp(e);
      }
    }
  }

  private findClickPlaceVert(e: MouseEvent): void {
    const thumbFirst = this.sliderBlock.querySelector('.js-slider__thumb-first') as HTMLElement;
    const thumbSecond = this.sliderBlock.querySelector('.js-slider__thumb-second') as HTMLElement;
    if (!this.config.range) {
      this.thumbOne.onMouseUp(e);
    } else if (this.config.range) {
      const thumbFirstPosition = Math.abs(thumbFirst.getBoundingClientRect().y - e.clientY);
      const thumbSecondPosition = Math.abs(thumbSecond.getBoundingClientRect().y - e.clientY);
      if (thumbFirstPosition < thumbSecondPosition) {
        this.thumbOne.onMouseUp(e);
      } else {
        this.thumbTwo?.onMouseUp(e);
      }
    }
  }

  private subscribeOnUpdate(): void {
    this.thumbOne.addFollower(this);
    this.thumbTwo?.addFollower(this);
  }

  private setThumbTwo(): void {
    const secondThumb = this.sliderBlock.querySelector('.js-slider__thumb-second') as HTMLElement;
    if (this.config.range) {
      this.thumbTwo?.addThis();
    } else if (!this.config.range && secondThumb !== null) {
      this.thumbTwo?.removeThis();
    }
  }

  private update(data: IDataThumbMove): void {
    this.observer.broadcast(data);
  }
}
export default SliderBlock;
