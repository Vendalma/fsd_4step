import Observer from '../../Observer/Observer';
import Label from './Label';
import {
  IConfigThumb,
  IThumbBlockValues,
  IThumbValue,
  IUpdatedThumbPosition,
} from './types';

class Thumb extends Observer<IThumbValue> {
  private config: IConfigThumb;

  private slider: HTMLElement;

  private thumb: HTMLElement;

  private thumbHtmlClass: string;

  private dataName: string;

  private label: Label;

  constructor(thumbHtmlClass: string, slider: HTMLElement, dataName: string) {
    super();
    this.slider = slider;
    this.thumbHtmlClass = thumbHtmlClass;
    this.dataName = dataName;
    this.createThumb();
    this.clickThumb();
  }

  updatePosition(data: IUpdatedThumbPosition): void {
    const side = this.config.vertical ? 'top' : 'left';
    this.thumb.style[side] = `${data.position}px`;
    this.setLabelValue(data.value);
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

  getThumbBlock(): HTMLElement {
    return this.thumb;
  }

  getThumbBlockValues(value: number): IThumbBlockValues {
    const side = this.config.vertical ? 'offsetTop' : 'offsetLeft';

    return {
      distance: Math.abs(this.thumb[side] - value),
      position: this.thumb[side],
    };
  }

  changeZIndex(value: boolean): void {
    if (value) {
      this.thumb.classList.add('slider__thumb_visibility_zIndex-up');
    } else {
      this.thumb.classList.remove('slider__thumb_visibility_zIndex-up');
    }
  }

  private createThumb(): void {
    this.thumb = document.createElement('div');
    this.thumb.classList.add('slider__thumb');
    this.thumb.classList.add(`slider__thumb_type_${this.thumbHtmlClass}`);
    this.thumb.setAttribute('data-name', this.dataName);
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

  private setLabelValue(value: number): void {
    this.label.setLabelValue(value);
  }

  private clickThumb(): void {
    this.thumb.addEventListener('mousedown', this.onMouseDown);
  }

  private onMouseDown = (e: MouseEvent): void => {
    document.addEventListener('mousemove', this.handleDocumentMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    this.broadcast({
      value: { type: 'thumbStart', position: this.findStartValue(e) },
    });
    e.preventDefault();
  };

  private findStartValue(e: MouseEvent): number {
    const target = e.target as HTMLElement;
    const targetLength = this.config.vertical
      ? target.clientHeight
      : target.clientWidth;
    const offset = this.config.vertical ? e.offsetY : e.offsetX;
    const sliderBound = this.config.vertical
      ? this.slider.getBoundingClientRect().y
      : this.slider.getBoundingClientRect().x;
    const shift = sliderBound + offset - targetLength / 2;
    return shift;
  }

  private handleDocumentMouseMove = (e: MouseEvent): void => {
    this.broadcast({
      value: {
        type: 'thumbMoving',
        position: this.config.vertical ? e.clientY : e.clientX,
        dataName: this.dataName,
      },
    });
  };

  private onMouseUp = (): void => {
    document.removeEventListener('mousemove', this.handleDocumentMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };
}

export default Thumb;
