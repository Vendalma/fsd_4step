import { boundMethod } from 'autobind-decorator';

import Observer from '../../Observer/Observer';
import ProgressBar from './ProgressBar';
import Scale from './Scale';
import SubView from './SubView';
import Thumb from './Thumb';
import {
  IConfig,
  IMovingThumbPosition,
  IPositionState,
  IPositionValues,
  ISliderBlockValues,
  ISliderOptions,
  IViewValue,
} from './types';

class View extends Observer<IViewValue> {
  private wrapper: HTMLElement;

  private sliderBlock: HTMLElement;

  private thumbOne: Thumb;

  private thumbTwo: Thumb;

  private scale: Scale;

  private progressBar: ProgressBar;

  private subView: SubView;

  protected config: IConfig;

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

  setConfig(config: IConfig): void {
    const params = {};
    const isVerticalChanged =
      this.config && this.config.vertical !== config.vertical;
    const isMaxChanged = this.config && this.config.max !== config.max;
    const isMinChanged = this.config && this.config.min !== config.min;
    const isStepChanged = this.config && this.config.step !== config.step;
    const isDefinedParamsChanged =
      isMaxChanged || isMinChanged || isVerticalChanged || isStepChanged;

    if (!this.config || isDefinedParamsChanged) {
      this.updateConfig(Object.assign(params, config));
      this.checkOrientation();
      this.updateSliderParams();
    } else {
      this.updateConfig(Object.assign(params, config));
      this.setUpdatedPosition(this.subView.findPositionState());
    }
  }

  private updateConfig(value: IConfig): void {
    this.config = value;
    this.setThumbTwo();
    this.thumbOne.updateConfig(this.config);
    this.thumbTwo.updateConfig(this.config);
    this.progressBar.updateConfig(this.config);
    this.subView.updateConfig(this.config);
  }

  private createSliderBlock(): void {
    this.sliderBlock = document.createElement('div');
    this.sliderBlock.classList.add('slider__block');
    this.wrapper.append(this.sliderBlock);
  }

  private initComponents(): void {
    this.thumbOne = new Thumb('first', this.sliderBlock, 'from');
    this.thumbTwo = new Thumb('second', this.sliderBlock, 'to');
    this.progressBar = new ProgressBar(this.sliderBlock);
    this.scale = new Scale(this.sliderBlock);
    this.subView = new SubView();
  }

  private checkOrientation(): void {
    if (this.config.vertical) {
      this.sliderBlock.classList.add('slider__block_vertical');
    } else {
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
      switch (value.type) {
        case 'thumbStart':
          this.subView.setStartPosition(value.position);
          break;
        case 'thumbMoving':
          this.broadcastUpdates(this.subView.findValue(value));
      }
    });

    this.thumbTwo.subscribe(({ value }) => {
      switch (value.type) {
        case 'thumbStart':
          this.subView.setStartPosition(value.position);
          break;
        case 'thumbMoving':
          this.broadcastUpdates(this.subView.findValue(value));
      }
    });
  }

  private broadcastUpdates(value: IPositionValues): void {
    this.broadcast({ value, type: 'viewChanged' });
  }

  private setUpdatedPosition(data: IPositionState): void {
    this.thumbOne.updatePosition(data.valueFrom);
    this.thumbTwo.updatePosition(data.valueTo);
    this.progressBar.addBar(data);
    this.checkThumbOnePosition(data.valueFrom.position);
  }

  private resizeWindow(): void {
    window.addEventListener('resize', this.updateSliderParams);
  }

  private getSliderSize(): number {
    return this.config.vertical
      ? this.wrapper.offsetHeight
      : this.wrapper.offsetWidth;
  }

  private calcSliderOptions(): ISliderOptions {
    return {
      sliderSize: this.getSliderSize(),
      pixelSize: (this.config.max - this.config.min) / this.getSliderSize(),
    };
  }

  @boundMethod
  private updateSliderParams(): void {
    const options = { config: this.config };
    this.scale.initScale(Object.assign(options, this.calcSliderOptions()));
    this.subView.setSliderOptions(this.calcSliderOptions());
    this.setUpdatedPosition(this.subView.findPositionState());
  }

  private mouseDownOnSliderBlock(): void {
    this.sliderBlock.addEventListener('mousedown', this.onMouseDown);
  }

  @boundMethod
  private onMouseDown(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    const isCurrentTargetOrProgressBar =
      target === e.currentTarget ||
      target.classList.contains('slider__scale-block') ||
      target.classList.contains('slider__progress-bar');

    const side = this.config.vertical
      ? this.sliderBlock.getBoundingClientRect().top
      : this.sliderBlock.getBoundingClientRect().left;

    const client = this.config.vertical ? e.clientY : e.clientX;

    if (isCurrentTargetOrProgressBar)
      this.checkMouseDownPosition({
        eventPosition: client - side,
        value: this.scale.getScaleValue(e),
      });
  }

  private checkMouseDownPosition(data: ISliderBlockValues): void {
    const { eventPosition, value } = data;
    const thumbFirstPosition = this.thumbOne.getThumbBlockValues(eventPosition)
      .position;
    const thumbFirstClickDistance = this.thumbOne.getThumbBlockValues(
      eventPosition,
    ).distance;
    const thumbSecondPosition = this.thumbTwo.getThumbBlockValues(eventPosition)
      .position;
    const thumbSecondClickDistance = this.thumbTwo.getThumbBlockValues(
      eventPosition,
    ).distance;
    const isThumbFirstNearest =
      eventPosition < thumbFirstPosition ||
      thumbFirstClickDistance < thumbSecondClickDistance;
    const isThumbSecondNearest =
      eventPosition > thumbSecondPosition ||
      thumbSecondClickDistance < thumbFirstClickDistance;

    const positionFrom = { dataName: 'from', position: eventPosition, value };
    const positionTo = { dataName: 'to', position: eventPosition, value };

    const isDistanceEqualOneStep =
      thumbFirstPosition === 0 &&
      thumbSecondPosition === this.getSliderSize() &&
      this.config.max - this.config.min === this.config.step;

    if (isDistanceEqualOneStep) {
      if (this.config.range && isThumbFirstNearest) {
        this.findThumbPosition(positionTo);
      } else if (isThumbSecondNearest) {
        this.findThumbPosition(positionFrom);
      }
    }

    if (!this.config.range || isThumbFirstNearest) {
      this.findThumbPosition(positionFrom);
    } else if (isThumbSecondNearest) {
      this.findThumbPosition(positionTo);
    }
  }

  private findThumbPosition(data: IMovingThumbPosition): void {
    const { position, dataName, value } = data;
    this.broadcastUpdates(
      this.subView.findValue({
        position,
        dataName,
        evtType: 'click',
        value,
      }),
    );
  }

  private checkThumbOnePosition(value: number): void {
    const thumbFirstPosition = value;
    const isThumbsPositionMatched =
      thumbFirstPosition >=
      this.getSliderSize() - this.thumbTwo.getThumbBlock().offsetWidth;
    this.thumbOne.changeZIndex(isThumbsPositionMatched && this.config.range);
  }
}

export default View;
