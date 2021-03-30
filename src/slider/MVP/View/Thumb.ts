import Observer from '../../Observer/Observer';
import Label from './Label';
import { IConfigThumb, IDataThumbMove, ThumbValue } from './viewInterfaces';

class Thumb extends Observer<ThumbValue> {
  private config: IConfigThumb;

  private slider: HTMLElement;

  private thumb: HTMLElement;

  private thumbHtmlClass: string;

  private dataNum: string;

  private label: Label;

  constructor(thumbHtmlClass: string, slider: HTMLElement, dataNum: string) {
    super();
    this.slider = slider;
    this.thumbHtmlClass = thumbHtmlClass;
    this.dataNum = dataNum;
    this.createThumb();
    this.moveThumb();
  }

  onMouseUp = (e: MouseEvent): void => {
    e.preventDefault; /* eslint-disable-line */
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.broadcast({ value: this.findPosition(e) });
    this.thumb.classList.remove('slider__thumb_visibility_zIndex-up');
  };

  setPosition(position: number): void {
    if (!this.config.vertical) {
      this.thumb.style.left = `${position}px`;
    } else {
      this.thumb.style.top = `${position}px`;
    }
  }

  setLabelValue(value: number): void {
    this.label.setLabelValue(value);
  }

  removeThumb(): void {
    if (this.thumb !== null) this.slider.removeChild(this.thumb);
  }

  addThumb(): void {
    this.slider.append(this.thumb);
  }

  updateConfig(data: IConfigThumb): void {
    this.config = data;
    this.thumb.removeAttribute('style');
    this.label.updateConfig(data);
    this.checkOrientation();
  }

  private createThumb(): void {
    this.thumb = document.createElement('div');
    this.thumb.classList.add('slider__thumb');
    this.thumb.classList.add(`slider__thumb_type_${this.thumbHtmlClass}`);
    this.thumb.classList.add(`js-slider__thumb_type_${this.thumbHtmlClass}`);
    this.thumb.setAttribute('data-num', this.dataNum);
    this.slider.append(this.thumb);
    this.label = new Label(this.thumb);
  }

  private checkOrientation(): void {
    if (!this.config.vertical) {
      this.thumb.classList.add('slider__thumb_horizontal');
      this.thumb.classList.remove('slider__thumb_vertical');
    } else {
      this.thumb.classList.remove('slider__thumb_horizontal');
      this.thumb.classList.add('slider__thumb_vertical');
    }
  }

  private moveThumb(): void {
    this.thumb.addEventListener('mousedown', this.mouseDown);
  }

  private mouseDown = (e: MouseEvent): void => {
    e.preventDefault();
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    this.thumb.classList.add('slider__thumb_visibility_zIndex-up');
  };

  private onMouseMove = (e: MouseEvent): void => {
    this.broadcast({ value: this.findPosition(e) });
  };

  private findPosition(e: MouseEvent): IDataThumbMove {
    if (!this.config.vertical) {
      return this.findPositionForHorizontal(e);
    }

    return this.findPositionForVertical(e);
  }

  private findPositionForHorizontal(e: MouseEvent): IDataThumbMove {
    if (this.thumb.dataset.num === '2') {
      return {
        clientXY: e.clientX,
        sliderClientReact: this.slider.getBoundingClientRect().left,
        dataNum: '2',
      };
    }

    return {
      clientXY: e.clientX,
      sliderClientReact: this.slider.getBoundingClientRect().left,
      dataNum: '1',
    };
  }

  private findPositionForVertical(e: MouseEvent): IDataThumbMove {
    if (this.thumb.dataset.num === '2') {
      return {
        clientXY: e.clientY,
        sliderClientReact: this.slider.getBoundingClientRect().top,
        dataNum: '2',
      };
    }

    return {
      clientXY: e.clientY,
      sliderClientReact: this.slider.getBoundingClientRect().top,
      dataNum: '1',
    };
  }
}

export default Thumb;
