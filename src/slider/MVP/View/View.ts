import Observer from '../../Observer/Observer';
import ProgressBar from './ProgressBar';
import Scale from './Scale';
import SubView from './SubView';
import Thumb from './Thumb';
import { IConfig, IPositionState, IPositionValues, ISliderBlockValues, IViewValue } from './types';

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
    const isVerticalChanged = this.config && this.config.vertical !== config.vertical;
    const isMaxChanged = this.config && this.config.max !== config.max;
    const isMinChanged = this.config && this.config.min !== config.min;
    const isDefinedParamsChanged = isMaxChanged || isMinChanged || isVerticalChanged;

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
    this.scale.updateValues(this.config);
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
      this.broadcastUpdates(this.subView.findValue(value));
    });

    this.thumbTwo.subscribe(({ value }) => {
      this.broadcastUpdates(this.subView.findValue(value));
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
    window.addEventListener('resize', this.updateSliderParams.bind(this));
  }

  private getSliderSize(): number {
    return this.config.vertical ? this.wrapper.offsetHeight : this.wrapper.offsetWidth;
  }

  private updateSliderParams(): void {
    this.scale.addScale(this.getSliderSize());
    this.subView.setSliderSize(this.getSliderSize());
    this.setUpdatedPosition(this.subView.findPositionState());
  }

  private mouseDownOnSliderBlock(): void {
    this.sliderBlock.addEventListener('mousedown', this.onMouseDown.bind(this));
  }

  private onMouseDown(e: MouseEvent): void {
    if (this.config.vertical) {
      this.checkMouseDownPosition({
        eventPosition: e.clientY - this.sliderBlock.getBoundingClientRect().top,
        value: this.scale.getScaleValues(e),
      });
    } else {
      this.checkMouseDownPosition({
        eventPosition: e.clientX - this.sliderBlock.getBoundingClientRect().left,
        value: this.scale.getScaleValues(e),
      });
    }
  }

  private checkMouseDownPosition(data: ISliderBlockValues): void {
    const { eventPosition, value } = data;
    const thumbFirstPosition = this.thumbOne.getThumbBlockValues(eventPosition).position;
    const thumbFirstClickDistance = this.thumbOne.getThumbBlockValues(eventPosition).distance;
    const thumbSecondPosition = this.thumbTwo.getThumbBlockValues(eventPosition).position;
    const thumbSecondClickDistance = this.thumbTwo.getThumbBlockValues(eventPosition).distance;
    const isThumbFirstNearest =
      eventPosition < thumbFirstPosition || thumbFirstClickDistance < thumbSecondClickDistance;
    const isThumbSecondNearest =
      eventPosition > thumbSecondPosition || thumbSecondClickDistance < thumbFirstClickDistance;

    if (!this.config.range || isThumbFirstNearest) {
      this.broadcastUpdates(
        this.subView.findValue({
          position: eventPosition,
          dataName: 'from',
          value,
        }),
      );
    } else if (isThumbSecondNearest) {
      this.broadcastUpdates(
        this.subView.findValue({
          position: eventPosition,
          dataName: 'to',
          value,
        }),
      );
    }
  }

  private checkThumbOnePosition(value: number): void {
    const thumbFirstPosition = value;
    const isThumbsPositionMatched =
      thumbFirstPosition >= this.getSliderSize() - this.thumbTwo.getThumbBlock().offsetWidth;
    this.thumbOne.changeZIndex(isThumbsPositionMatched && this.config.range);
  }
}

export default View;
