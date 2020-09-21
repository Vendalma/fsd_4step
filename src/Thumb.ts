import { progressBar } from "./progressBar";
import { Observer } from "./observer";
export class Thumb {
  slider: HTMLElement | null;
  thumb: HTMLElement | null;
  countThumbs: number;
  thumbs: string | null;
  observer: Observer;
  value: HTMLElement | null;

  constructor(countThumbs: number = 1, slider: HTMLElement | null) {
    (this.slider = slider), (this.countThumbs = countThumbs);
    this.observer = new Observer();
    this.thumb = document.createElement("div");
    this.thumb.classList.add("thumb");

    this.thumbs = this.thumb.getAttribute("data-num");

    this.value = document.createElement("div");

    this.slider?.append(this.thumb);
    this.moveThumb(this.thumb);
    this.init();
  }

  init() {
    if (this.thumb instanceof HTMLElement) {
      this.thumb.classList.add("thumb");
      this.thumb.setAttribute("data-num", this.countThumbs + "");
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

      return this.observer.broadcast("mouseDown", this.findPosition(e));
    }
    return false;
  }

  onMouseMove = (e: any = MouseEvent) => {
    if (e instanceof MouseEvent) e = e || window.event;
    e.preventDefault();
    this.moveHandle(e);
  };

  moveHandle(e: any = MouseEvent) {
    return this.observer.broadcast("mouseDown", this.findPosition(e));
  }

  onMouseUp = (e: any = MouseEvent) => {
    document.onmousemove = null;
    document.onmouseup = null;
    return this.observer.broadcast("mouseDown", this.findPosition(e));
  };

  /*drag(elem: HTMLElement | null) {
    if (elem instanceof HTMLElement) {
      elem.ondragstart = function () {
        return false;
      };
    }
  }*/

  findPosition(e: any) {
    return {
      "thumb-width": this.thumb?.offsetWidth,
      clientX: e.clientX,
      "slider-left-point": this.slider?.getBoundingClientRect().left,
      "slider-width": this.slider?.offsetWidth,
    };
  }
  getPosition(position: number | undefined = 0) {
    if (this.thumb instanceof HTMLElement) {
      this.thumb.style.left = position + "px";
    }
  }
}
