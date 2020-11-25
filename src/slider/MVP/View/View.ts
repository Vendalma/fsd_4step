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
  config: IConfigView;

  wrapper: HTMLElement;

  sliderContainer: HTMLElement;

  observer: Observer;

  sliderBlock: SliderBlock;

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

  subscribeOnUpdate(): void {
    this.sliderBlock.addFollower(this);
  }

  update(type: string, data: IDataThumbMove): void {
    this.observer.broadcast('mouseMove', data);
  }

  setPositionThumb(data: IPosition): void {
    this.sliderBlock.setPositionThumb(data);
  }

  addFollower(follower: unknown): void {
    this.observer.subscribe(follower);
  }

  onloadWindow(): void {
    window.addEventListener('load', this.getSliderSize.bind(this));
  }

  resizeWindow(): void {
    window.addEventListener('resize', this.getSliderSize.bind(this));
  }

  getSliderSize(): void {
    if (this.config.orientation === 'horizontal')
      this.observer.broadcast('sliderSize', this.sliderContainer.offsetWidth);

    if (this.config.orientation === 'vertical')
      this.observer.broadcast('sliderSize', this.sliderContainer.offsetHeight);
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
