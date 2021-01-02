import Observer from '../../Observer/Observer';
import Label from './Label';

interface IConfigThumb {
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
class Thumb {
  private config: IConfigThumb;

  private slider: HTMLElement;

  public thumb: HTMLElement;

  private thumbHtmlClass: string;

  protected observer: Observer;

  private dataNum: string;

  private label: Label;

  constructor(config: IConfigThumb, thumbHtmlClass: string, slider: HTMLElement, dataNum: string) {
    this.config = config;
    this.slider = slider;
    this.thumbHtmlClass = thumbHtmlClass;
    this.dataNum = dataNum;

    this.thumb = document.createElement('div');
    this.thumb.classList.add('slider__thumb');
    this.thumb.classList.add(this.thumbHtmlClass);

    this.thumb.setAttribute('data-num', this.dataNum);
    this.slider.append(this.thumb);

    this.observer = new Observer();
    this.label = new Label(this.config, this.thumb);
    this.checkOrientation();
    this.moveThumb();
  }

  addFollower(follower: unknown): void {
    this.observer.subscribe(follower);
  }

  private checkOrientation(): void {
    if (this.config.orientation === 'horizontal') {
      this.thumb.classList.add('slider__thumb_horizontal');
      this.thumb.classList.remove('slider__thumb_vertical');
    } else if (this.config.orientation === 'vertical') {
      this.thumb.classList.remove('slider__thumb_horizontal');
      this.thumb.classList.add('slider__thumb_vertical');
    }
  }

  private moveThumb(): void {
    this.thumb.addEventListener('mousedown', this.mouseDown);
  }

  private mouseDown = (e: MouseEvent): void => {
    e.preventDefault();
    document.addEventListener('mousemove', this.moveHandle);
    document.addEventListener('mouseup', this.onMouseUp);
    this.changeZIndexUp();
  };

  private moveHandle = (e: MouseEvent): void => {
    this.observer.broadcast(this.findPosition(e));
  };

  onMouseUp = (e: MouseEvent): void => {
    e.preventDefault;
    document.removeEventListener('mousemove', this.moveHandle);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.observer.broadcast(this.findPosition(e));
    this.changeZIndexDown();
  };

  private findPosition(e: MouseEvent): IDataThumbMove | undefined {
    if (this.config.orientation === 'horizontal') {
      return this.findPositionForHorizontal(e) as IDataThumbMove;
    }
    if (this.config.orientation === 'vertical') {
      return this.findPositionForVertical(e) as IDataThumbMove;
    }
    return undefined;
  }

  private findPositionForHorizontal(e: MouseEvent): IDataThumbMove | undefined {
    const thumbFirst = this.slider.querySelector('.js-slider__thumb-first') as HTMLElement;
    const thumbSecond = this.slider.querySelector('.js-slider__thumb-second') as HTMLElement;
    if (Number(this.thumb.dataset.num) === 1) {
      return {
        clientXY: e.clientX,
        sliderClientReact: this.slider.getBoundingClientRect().left,
        dataNum: this.thumb.dataset.num,
        positionThumbSecond: this.config.range ? parseInt(thumbSecond.style.left, 10) : undefined,
      } as IDataThumbMove;
    }
    if (Number(this.thumb.dataset.num) === 2) {
      return {
        clientXY: e.clientX,
        sliderClientReact: this.slider.getBoundingClientRect().left,
        dataNum: this.thumb.dataset.num,
        positionThumbFirst: parseInt(thumbFirst.style.left, 10),
      } as IDataThumbMove;
    }
    return undefined;
  }

  private findPositionForVertical(e: MouseEvent): IDataThumbMove | undefined {
    const thumbFirst = this.slider.querySelector('.js-slider__thumb-first') as HTMLElement;
    const thumbSecond = this.slider.querySelector('.js-slider__thumb-second') as HTMLElement;
    if (Number(this.thumb.dataset.num) === 1) {
      return {
        clientXY: e.clientY,
        sliderClientReact: this.slider.getBoundingClientRect().top,
        dataNum: this.thumb.dataset.num,
        positionThumbSecond: this.config.range ? parseInt(thumbSecond.style.top, 10) : undefined,
      } as IDataThumbMove;
    }
    if (Number(this.thumb.dataset.num) === 2) {
      return {
        clientXY: e.clientY,
        sliderClientReact: this.slider.getBoundingClientRect().top,
        dataNum: this.thumb.dataset.num,
        positionThumbFirst: parseInt(thumbFirst.style.top, 10),
      } as IDataThumbMove;
    }
    return undefined;
  }

  setPosition(position: number): void {
    if (this.config.orientation === 'horizontal') {
      this.thumb.style.left = `${position}px`;
    }
    if (this.config.orientation === 'vertical') {
      this.thumb.style.top = `${position}px`;
    }
  }

  setLabelValue(value: number): void {
    this.label.setLabelValue(value);
  }

  removeThis(): void {
    if (this.thumb !== null) this.slider.removeChild(this.thumb);
  }

  addThis(): void {
    this.slider.append(this.thumb);
  }

  private changeZIndexUp(): void {
    this.thumb.classList.add('slider__thumb_zIndex-up');
  }

  private changeZIndexDown(): void {
    this.thumb.classList.remove('slider__thumb_zIndex-up');
  }

  cleanStyleAttr(): void {
    this.thumb.removeAttribute('style');
  }

  updateConfig(data: IConfigThumb): void {
    this.config = data;
    this.label.updateConfig(data);
    this.checkOrientation();
  }
}
export default Thumb;
