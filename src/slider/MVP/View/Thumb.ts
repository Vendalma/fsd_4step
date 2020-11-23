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
  config: IConfigThumb;

  slider: HTMLElement;

  thumb: HTMLElement;

  countThumbs: string;

  observer: Observer;

  dataNum: string;

  label: Label;

  constructor(
    IConfigThumb: IConfigThumb,
    countThumbs: string,
    slider: HTMLElement,
    data_num: string
  ) {
    this.config = IConfigThumb;
    this.slider = slider;
    this.countThumbs = countThumbs;
    this.dataNum = data_num;

    this.thumb = document.createElement('div');
    this.thumb.classList.add('thumb');
    this.thumb.classList.add(this.countThumbs);

    this.thumb.setAttribute('data-num', this.dataNum);
    this.slider.append(this.thumb);

    this.observer = new Observer();
    this.label = new Label(this.config, this.thumb);
    this.checkOrientation();
    this.moveThumb();
  }

  addFollower(follower: any): void {
    this.observer.subscribe(follower);
  }

  checkOrientation(): void {
    if (this.config.orientation === 'horizontal') {
      this.thumb.classList.add('thumb_horizontal');
      this.thumb.classList.remove('thumb_vertical');
    }
    if (this.config.orientation === 'vertical') {
      this.thumb.classList.remove('thumb_horizontal');
      this.thumb.classList.add('thumb_vertical');
    }
  }

  moveThumb(): void {
    this.thumb.addEventListener('mousedown', this.mouseDown.bind(this));
  }

  mouseDown(e: MouseEvent): void {
    e.preventDefault();
    document.onmousemove = (e) => this.onMouseMove(e);
    document.onmouseup = (e) => this.onMouseUp(e);
    this.changeZIndexUp();
  }

  onMouseMove(e: MouseEvent): void {
    e.preventDefault();
    this.moveHandle(e);
  }

  moveHandle(e: MouseEvent): void {
    this.observer.broadcast('mouseMove', this.findPosition(e));
  }

  onMouseUp(e: MouseEvent): void {
    document.onmousemove = null;
    document.onmouseup = null;
    this.observer.broadcast('mouseMove', this.findPosition(e));
    this.changeZIndexDown();
  }

  findPosition(e: MouseEvent): IDataThumbMove | undefined {
    if (this.config.orientation === 'horizontal') {
      return this.findPositionForHorizontal(e) as IDataThumbMove;
    }
    if (this.config.orientation === 'vertical') {
      return this.findPositionForVertical(e) as IDataThumbMove;
    }
  }

  findPositionForHorizontal(e: MouseEvent): IDataThumbMove | undefined {
    const thumbFirst = this.slider.querySelector('.thumb_first') as HTMLElement;
    const thumbSecond = this.slider.querySelector(
      '.thumb_second'
    ) as HTMLElement;
    if (this.thumb.dataset.num === '1') {
      return {
        clientXY: e.clientX,
        sliderClientReact: this.slider.getBoundingClientRect().left,
        dataNum: this.thumb.dataset.num,
        positionThumbSecond: this.config.range
          ? parseInt(thumbSecond.style.left)
          : undefined,
      } as IDataThumbMove;
    }
    if (this.thumb.dataset.num === '2') {
      return {
        clientXY: e.clientX,
        sliderClientReact: this.slider.getBoundingClientRect().left,
        dataNum: this.thumb.dataset.num,
        positionThumbFirst: parseInt(thumbFirst.style.left),
      } as IDataThumbMove;
    }
  }

  findPositionForVertical(e: MouseEvent): IDataThumbMove | undefined {
    const thumbFirst = this.slider.querySelector('.thumb_first') as HTMLElement;
    const thumbSecond = this.slider.querySelector(
      '.thumb_second'
    ) as HTMLElement;
    if (this.thumb.dataset.num === '1') {
      return {
        clientXY: e.clientY,
        sliderClientReact: this.slider.getBoundingClientRect().top,
        dataNum: this.thumb.dataset.num,
        positionThumbSecond: this.config.range
          ? parseInt(thumbSecond.style.top)
          : undefined,
      } as IDataThumbMove;
    }
    if (this.thumb.dataset.num === '2') {
      return {
        clientXY: e.clientY,
        sliderClientReact: this.slider.getBoundingClientRect().top,
        dataNum: this.thumb.dataset.num,
        positionThumbFirst: parseInt(thumbFirst.style.top),
      } as IDataThumbMove;
    }
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

  changeZIndexUp(): void {
    this.thumb.classList.add('thumb_zIndex_up');
  }

  changeZIndexDown(): void {
    this.thumb.classList.remove('thumb_zIndex_up');
  }

  cleanStyleAttr(): void {
    this.thumb.removeAttribute('style');
  }

  updateConfigThumb(data: IConfigThumb): void {
    this.config = data;
    this.label.updateConfig(data);
    this.checkOrientation();
  }
}
export default Thumb;
