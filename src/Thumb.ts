import { Label } from "./Label";
import { Observer } from "./observer";
import config from "./config";
interface IConfigThumb {
  id?: string;
  range?: boolean;
  position_1: number;
  position_2?: number;
  orientation: string;
}
export class Thumb {
  config: IConfigThumb;
  position_1: number;
  position_2: number;
  orientation: string;
  slider: HTMLElement | null;
  thumb: HTMLElement | null;
  countThumbs: string;
  observer: Observer;
  value: HTMLElement | null;
  range: boolean;
  data_num: number;
  zIndex: number;
  label: Label;

  constructor(
    countThumbs: string,
    slider: HTMLElement | null,
    range: boolean,
    data_num: number
  ) {
    this.config = config;
    this.position_1 = config.position_1;
    this.position_2 = config.position_2;
    this.orientation = config.orientation;
    this.slider = slider;
    this.countThumbs = countThumbs;

    this.thumb = document.createElement("div");
    this.thumb.classList.add("thumb");
    this.thumb.classList.add(this.countThumbs);
    this.range = range;
    this.value = document.createElement("div");
    this.data_num = data_num;
    this.thumb.setAttribute("data-num", data_num + "");
    this.slider?.append(this.thumb);

    this.observer = new Observer();
    this.label = new Label(this.thumb);

    this.zIndex = 1;

    this.checkOrientation();
    this.setPosition();
    this.moveThumb(this.thumb);
  }

  init() {
    if (
      (this.range && this.thumb?.classList.contains("thumb_first")) ||
      this.thumb?.classList.contains("thumb_second")
    ) {
      this.moveThumb(this.thumb);
    } else if (this.range && this.thumb?.classList.contains("thumb_first")) {
      this.moveThumb(this.thumb);
    }
  }

  checkOrientation() {
    this.label.changeLabelPosition(this.orientation);
  }

  setPosition() {
    if (!this.range && this.thumb) {
      this.thumb.style.left = this.position_1 + "px";
      this.label.setLabelValue(this.position_1);
    } else if (this.range) {
      if (this.thumb?.classList.contains("thumb_first")) {
        this.thumb.style.left = this.position_1 + "px";
        this.label.setLabelValue(this.position_1);
      } else if (this.thumb?.classList.contains("thumb_second")) {
        this.thumb.style.left = this.position_2 + "px";
        this.label.setLabelValue(this.position_2);
      }
    }
  }
  moveThumb(elem: HTMLElement | null) {
    let that = this;

    if (elem instanceof HTMLElement) {
      elem.addEventListener("mousedown", (e) => {
        that.mouseDown(e);
      });
    }
  }

  mouseDown(e: any = MouseEvent) {
    if (e instanceof MouseEvent) {
      e = e || window.event;
      e.preventDefault();

      document.onmousemove = (e) => this.onMouseMove(e);
      document.onmouseup = (e) => this.onMouseUp(e);

      this.zIndex++;
      if (this.thumb) this.thumb.style.zIndex = this.zIndex + "";
      return this.observer.broadcast("mouseMove", this.findPosition(e));
    }
    return false;
  }

  onMouseMove = (e: any = MouseEvent) => {
    if (e instanceof MouseEvent) e = e || window.event;
    e.preventDefault();
    this.moveHandle(e);
  };

  moveHandle(e: any = MouseEvent) {
    //this.incrimentZIndex();
    return this.observer.broadcast("mouseMove", this.findPosition(e));
  }

  onMouseUp = (e: any = MouseEvent) => {
    document.onmousemove = null;
    document.onmouseup = null;
    return this.observer.broadcast("mouseMove", this.findPosition(e));
  };

  /* drag(elem: HTMLElement | null) {
    if (elem instanceof HTMLElement) {
      elem.ondragstart = function () {
        return false;
      };
    }
  }*/

  findPosition(e: any) {
    if (this.orientation == "horisontal") {
      if (!this.range && this.thumb != null) {
        return {
          "thumb-width": this.thumb.offsetWidth,
          clientX: e.clientX,
          "slider-left-point": this.slider?.getBoundingClientRect().left,
          "slider-width": this.slider?.offsetWidth,
          "data-num": this.thumb.dataset.num,
        };
      } else if (this.range) {
        if (this.thumb?.dataset.num == "1") {
          let lastChild = this.slider?.lastElementChild;
          if (lastChild instanceof HTMLElement) {
            let lastChildPosition = lastChild.style.left;
            return {
              "thumb-width": this.thumb.offsetWidth,
              clientX: e.clientX,
              "slider-left-point": this.slider?.getBoundingClientRect().left,
              "slider-width": this.slider?.offsetWidth,
              "data-num": this.thumb.dataset.num,

              positionThumbSecond: parseInt(lastChildPosition),
            };
          }
        } else if (this.thumb?.dataset.num == "2") {
          let firstChild = this.slider?.firstElementChild;
          if (firstChild instanceof HTMLElement)
            return {
              "thumb-width": this.thumb.offsetWidth,
              clientX: e.clientX,
              "slider-left-point": this.slider?.getBoundingClientRect().left,
              "slider-width": this.slider?.offsetWidth,
              "data-num": this.thumb.dataset.num,

              positionThumbFirst: parseInt(firstChild.style.left),
            };
        }
      }
    } else if (this.orientation == "vertical") {
      if (!this.range && this.thumb != null) {
        return {
          "thumb-width": this.thumb.offsetWidth,
          clientY: e.clientY,
          "slider-top-point": this.slider?.getBoundingClientRect().top,
          "slider-width": this.slider?.offsetWidth,
          "data-num": this.thumb.dataset.num,
        };
      } else if (this.range) {
        if (this.thumb?.dataset.num == "1") {
          let lastChild = this.slider?.lastElementChild;
          if (lastChild instanceof HTMLElement) {
            let lastChildPosition = lastChild.style.left;
            return {
              "thumb-width": this.thumb.offsetWidth,
              clientY: e.clientY,
              "slider-top-point": this.slider?.getBoundingClientRect().top,
              "slider-width": this.slider?.offsetWidth,
              "data-num": this.thumb.dataset.num,

              positionThumbSecond: parseInt(lastChildPosition),
            };
          }
        } else if (this.thumb?.dataset.num == "2") {
          let firstChild = this.slider?.firstElementChild;
          if (firstChild instanceof HTMLElement)
            return {
              "thumb-width": this.thumb.offsetWidth,
              clientY: e.clientY,
              "slider-top-point": this.slider?.getBoundingClientRect().top,
              "slider-width": this.slider?.offsetWidth,
              "data-num": this.thumb.dataset.num,

              positionThumbFirst: parseInt(firstChild.style.left),
            };
        }
      }
    }

    return "error";
  }

  getPosition(position: number = 0) {
    if (this.thumb instanceof HTMLElement) {
      this.thumb.style.left = position + "px";
      this.label.setLabelValue(position);
    }
  }

  removeThis() {
    if (this.thumb != null) {
      this.slider?.removeChild(this.thumb);
    }
  }
  addThis() {
    if ((this.thumb = null)) this.slider?.appendChild(this.thumb);
    this.moveThumb(this.thumb);
  }
}
