import Observer from '../../Observer/Observer';
import SliderBlock from './sliderBlock';
import { IConfig, IDataThumbMove, IPosition } from './viewInterfaces';

class View extends Observer {
  private config: IConfig;

  private wrapper: HTMLElement;

  private sliderContainer: HTMLElement;

  protected sliderBlock: SliderBlock;

  constructor(wrapper: HTMLElement) {
    super();
    this.wrapper = wrapper;
    this.createSliderContainer();
    this.subscribeOnUpdate();
  }

  setPositionThumb(data: IPosition): void {
    this.sliderBlock.setPositionThumb(data);
  }

  addFollower(follower: unknown): void {
    this.subscribe(follower);
  }

  setConfig(data: IConfig): void {
    this.config = data;
    this.sliderBlock.updateConfig(this.config);
    this.getSliderSize();
  }

  private createSliderContainer(): void {
    this.wrapper.classList.add('slider__wrapper');
    this.sliderContainer = document.createElement('div');
    this.sliderContainer.classList.add('slider');
    this.wrapper.append(this.sliderContainer);
    this.sliderBlock = new SliderBlock(this.sliderContainer);
    this.resizeWindow();
  }

  private subscribeOnUpdate(): void {
    this.sliderBlock.addFollower(this);
  }

  private update(data: IDataThumbMove): void {
    this.broadcast(data, 'mouseMove');
  }

  private resizeWindow(): void {
    window.addEventListener('resize', this.getSliderSize.bind(this));
  }

  private getSliderSize(): void {
    if (!this.config.vertical) this.broadcast(this.sliderContainer.offsetWidth, 'sliderSize');

    if (this.config.vertical) this.broadcast(this.sliderContainer.offsetHeight, 'sliderSize');
  }
}
export default View;
