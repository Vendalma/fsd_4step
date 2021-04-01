import Observer from '../../Observer/Observer';
import Label from './Label';
import { IConfigThumb, IDataThumbMove, IThumbValue, IUpdatedThumbPosition } from './viewInterfaces';

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
    this.moveThumb();
  }

  onMouseUp = (e: MouseEvent): void => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.broadcast({ value: this.findPosition(e) });
    this.thumb.classList.remove('slider__thumb_visibility_zIndex-up');
  };

  updatePosition(data: IUpdatedThumbPosition): void {
    if (!this.config.vertical) {
      this.thumb.style.left = `${data.position}px`;
    } else {
      this.thumb.style.top = `${data.position}px`;
    }
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

  private createThumb(): void {
    this.thumb = document.createElement('div');
    this.thumb.classList.add('slider__thumb');
    this.thumb.classList.add(`slider__thumb_type_${this.thumbHtmlClass}`);
    this.thumb.classList.add(`js-slider__thumb_type_${this.thumbHtmlClass}`);
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

  private moveThumb(): void {
    this.thumb.addEventListener('mousedown', this.mouseDown);
  }

  private mouseDown = (e: MouseEvent): void => {
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
    return {
      position: e.clientX - this.slider.getBoundingClientRect().left,
      dataName: this.dataName,
    };
  }

  private findPositionForVertical(e: MouseEvent): IDataThumbMove {
    return {
      position: e.clientY - this.slider.getBoundingClientRect().top,
      dataName: this.dataName,
    };
  }
}

export default Thumb;
