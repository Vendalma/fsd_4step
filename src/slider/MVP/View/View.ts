import Observer from '../../Observer/Observer';
import SliderBlock from './sliderBlock';

interface IConfigView {
  min: number;
  max: number;
  range: boolean;
  positionFrom: number;
  positionTo: number;
  orientation: string;
  step: number;
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
class View {
  private config: IConfigView;

  private wrapper: HTMLElement;

  private sliderContainer: HTMLElement;

  protected observer: Observer;

  protected sliderBlock: SliderBlock;

  constructor(config: IConfigView, wrapper: HTMLElement) {
    this.config = config;
    this.wrapper = wrapper;
    this.wrapper.classList.add('slider__wrapper');
    this.sliderContainer = document.createElement('div');
    this.sliderContainer.classList.add('slider');
    this.wrapper.append(this.sliderContainer);
    this.observer = new Observer();
    this.sliderBlock = new SliderBlock(this.config, this.sliderContainer);

    this.onloadWindow();
    this.resizeWindow();
    this.subscribeOnUpdate();
  }

  private subscribeOnUpdate(): void {
    this.sliderBlock.addFollower(this);
  }

  private update(data: IDataThumbMove): void {
    this.observer.broadcast(data, 'mouseMove');
  }

  setPositionThumb(data: IPosition): void {
    this.sliderBlock.setPositionThumb(data);
  }

  addFollower(follower: unknown): void {
    this.observer.subscribe(follower);
  }

  private onloadWindow(): void {
    window.addEventListener('load', this.getSliderSize.bind(this));
  }

  private resizeWindow(): void {
    window.addEventListener('resize', this.getSliderSize.bind(this));
  }

  private getSliderSize(): void {
    if (this.config.orientation === 'horizontal')
      this.observer.broadcast(this.sliderContainer.offsetWidth, 'sliderSize');

    if (this.config.orientation === 'vertical')
      this.observer.broadcast(this.sliderContainer.offsetHeight, 'sliderSize');
  }

  updateConfig(data: IConfigView): void {
    this.config = data;
    this.sliderBlock.updateConfig(data);
  }

  changeOrientationOrRange(data: IConfigView): void {
    this.updateConfig(data);
    this.getSliderSize();
  }
}
export default View;
