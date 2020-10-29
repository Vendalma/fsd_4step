import { Observer } from "../../Observer/Observer";
import { Label } from "./Label";

interface IConfigThumb {
  range: boolean;
  positionFrom: number;
  positionTo: number;
  orientation: string;
}
class Thumb {
  config: IConfigThumb;
  positionFrom: number;
  positionTo: number;
  orientation: string;

  slider: HTMLElement;
  thumb: HTMLElement;
  countThumbs: string;
  observer: Observer;
  range: boolean;
  data_num: number;
  zIndex: number;
  label: Label;

  constructor(
    IConfigThumb: any,
    countThumbs: string,
    slider: HTMLElement,
    data_num: number
  ) {
    this.config = IConfigThumb;
    this.positionFrom = this.config.positionFrom;
    this.positionTo = this.config.positionTo;
    this.orientation = this.config.orientation;
    this.range = this.config.range;

    this.slider = slider;
    this.countThumbs = countThumbs;

    this.thumb = document.createElement("div");
    this.thumb.classList.add("thumb");
    this.thumb.classList.add(this.countThumbs);

    this.data_num = data_num;
    this.thumb.setAttribute("data-num", data_num + "");
    this.slider.append(this.thumb);

    this.observer = new Observer();
    this.label = new Label(this.config, this.thumb);

    this.zIndex = 1;

    this.checkOrientation(this.orientation);
    this.moveThumb(this.thumb);
  }
  addFollower(follower: any) {
    this.observer.subscribe(follower);
  }
  checkLabel(data: boolean) {
    this.label.checkVisibleLabel(data);
  }
  checkRange(data: boolean) {
    this.range = data;
  }
  checkOrientation(data: string) {
    this.orientation = data;
    this.label.checkLabelOrientation(this.orientation);
    if (this.orientation == "horisontal") {
      this.thumb.style.left = this.thumb.style.top;
      this.thumb.style.top = "-5px";
      this.thumb.classList.remove("thumb_vertical");
    }

    if (this.orientation == "vertical") {
      this.thumb.style.top = this.thumb.style.left;
      this.thumb.style.left = "-5px";
      this.thumb.classList.add("thumb_vertical");
    }
  }

  moveThumb(elem: HTMLElement) {
    let that = this;

    elem.addEventListener("mousedown", (e) => {
      that.mouseDown(e);
    });
  }

  mouseDown(e: any = MouseEvent) {
    if (e instanceof MouseEvent) {
      e = e || window.event;
      e.preventDefault();

      document.onmousemove = (e) => this.onMouseMove(e);
      document.onmouseup = (e) => this.onMouseUp(e);

      this.zIndex++;
      this.thumb.style.zIndex = this.zIndex + "";
      this.observer.broadcast("mouseMove", this.findPosition(e));
    }
  }

  onMouseMove = (e: any = MouseEvent) => {
    if (e instanceof MouseEvent) e = e || window.event;
    e.preventDefault();
    this.moveHandle(e);
  };

  moveHandle(e: any = MouseEvent) {
    this.observer.broadcast("mouseMove", this.findPosition(e));
  }

  onMouseUp = (e: any = MouseEvent) => {
    document.onmousemove = null;
    document.onmouseup = null;
    this.observer.broadcast("mouseMove", this.findPosition(e));
  };

  findPosition(e: any) {
    if (this.orientation == "horisontal") {
      return this.findPositionForHorisontal(e);
    }

    if (this.orientation == "vertical") {
      return this.findPositionForVertical(e);
    }
  }

  private findPositionForHorisontal(e: MouseEvent) {
    let thumbFirst = this.slider.querySelector(".thumb_first") as HTMLElement;
    let thumbSecond = this.slider.querySelector(".thumb_second") as HTMLElement;

    if (!this.range) {
      return {
        clientX: e.clientX,
        "slider-left-point": this.slider.getBoundingClientRect().left,
        "slider-width": this.slider.offsetWidth,
        "data-num": this.thumb.dataset.num,
      };
    } else if (this.range) {
      if (this.thumb.dataset.num == "1") {
        return {
          clientX: e.clientX,
          "slider-left-point": this.slider.getBoundingClientRect().left,
          "slider-width": this.slider.offsetWidth,
          "data-num": this.thumb.dataset.num,
          positionThumbSecond: parseInt(thumbSecond.style.left),
        };
      } else if (this.thumb.dataset.num == "2") {
        return {
          clientX: e.clientX,
          "slider-left-point": this.slider.getBoundingClientRect().left,
          "slider-width": this.slider.offsetWidth,
          "data-num": this.thumb.dataset.num,
          positionThumbFirst: parseInt(thumbFirst.style.left),
        };
      }
    }
  }

  private findPositionForVertical(e: MouseEvent) {
    let thumbFirst = this.slider.querySelector(".thumb_first") as HTMLElement;
    let thumbSecond = this.slider.querySelector(".thumb_second") as HTMLElement;

    if (!this.range) {
      return {
        clientY: e.clientY,
        "slider-top-point": this.slider.getBoundingClientRect().top,
        "slider-height": this.slider.offsetHeight,
        "data-num": this.thumb.dataset.num,
      };
    } else if (this.range) {
      if (this.thumb.dataset.num == "1") {
        return {
          clientY: e.clientY,
          "slider-top-point": this.slider?.getBoundingClientRect().top,
          "slider-height": this.slider?.offsetHeight,
          "data-num": this.thumb.dataset.num,
          positionThumbSecond: parseInt(thumbSecond.style.top),
        };
      } else if (this.thumb.dataset.num == "2") {
        return {
          clientY: e.clientY,
          "slider-top-point": this.slider?.getBoundingClientRect().top,
          "slider-height": this.slider?.offsetHeight,
          "data-num": this.thumb.dataset.num,
          positionThumbFirst: parseInt(thumbFirst.style.top),
        };
      }
    }
  }

  setPosition(position: number = 0) {
    if (this.orientation == "horisontal") {
      this.thumb.style.left = position + "px";
    }
    if (this.orientation == "vertical") {
      this.thumb.style.top = position + "px";
    }
  }

  setLabelValue(value: number) {
    this.label.setLabelValue(value);
  }

  removeThis() {
    this.slider.removeChild(this.thumb);
  }
  addThis() {
    this.slider.append(this.thumb);
  }
}
export { Thumb };

