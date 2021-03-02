import Observer from '../../Observer/Observer';
import ProgressBar from './ProgressBar';
import Step from './Step';
import Thumb from './Thumb';
import { IConfig, IDataThumbMove, IPosition } from './viewInterfaces';

class SliderBlock extends Observer {
  private config: IConfig;

  private sliderContainer: HTMLElement;

  private sliderBlock: HTMLElement;

  private thumbOne: Thumb;

  private thumbTwo: Thumb | null | undefined;

  private step: Step;

  private progressBar: ProgressBar;

  constructor(sliderContainer: HTMLElement) {
    super();
    this.sliderContainer = sliderContainer;
    this.createSliderBlock();
    this.init();
    this.subscribeOnUpdate();
    this.sliderClick();
  }

  addFollower(follower: unknown): void {
    this.subscribe(follower);
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

  setPositionThumb(data: IPosition): void {
    if (data.stepData !== undefined) {
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

  private createSliderBlock(): void {
    this.sliderBlock = document.createElement('div');
    this.sliderBlock.classList.add('slider__block');
    this.sliderBlock.classList.add('js-slider__block');
    this.sliderContainer.append(this.sliderBlock);
  }

  private init(): void {
    this.thumbOne = new Thumb('first', this.sliderBlock, '1');
    this.thumbTwo = new Thumb('second', this.sliderBlock, '2');
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

  private sliderClick(): void {
    this.sliderBlock.addEventListener('click', this.onSliderClick.bind(this));
  }

  private onSliderClick(e: MouseEvent): void {
    if (!this.config.vertical) {
      this.findClickPlaceHorizon(e);
    } else if (this.config.vertical) {
      this.findClickPlaceVert(e);
    }
  }

  private findClickPlaceHorizon(e: MouseEvent): void {
    const thumbFirst = this.sliderBlock.querySelector('.js-slider__thumb_type_first') as HTMLElement;
    const thumbSecond = this.sliderBlock.querySelector('.js-slider__thumb_type_second') as HTMLElement;
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
    const thumbFirst = this.sliderBlock.querySelector('.js-slider__thumb_type_first') as HTMLElement;
    const thumbSecond = this.sliderBlock.querySelector('.js-slider__thumb_type_second') as HTMLElement;
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
    const secondThumb = this.sliderBlock.querySelector('.js-slider__thumb_type_second') as HTMLElement;
    if (this.config.range) {
      this.thumbTwo?.addThumb();
    } else if (!this.config.range && secondThumb !== null) {
      this.thumbTwo?.removeThumb();
    }
  }

  private update(data: IDataThumbMove): void {
    this.broadcast(data);
  }
}
export default SliderBlock;
