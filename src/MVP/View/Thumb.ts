import { Label } from "./Label";
import { Observer } from "../../Observer/Observer";

interface IConfigThumb {
  range: boolean;
  positionFrom: number;
  positionTo: number;
  orientation: string;
}
export class Thumb {
  config: IConfigThumb;
  positionFrom: number;
  positionTo: number;
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
    IConfigThumb: any,
    countThumbs: string,
    slider: HTMLElement | null,
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

    this.value = document.createElement("div");
    this.data_num = data_num;
    this.thumb.setAttribute("data-num", data_num + "");
    this.slider?.append(this.thumb);

    this.observer = new Observer();
    this.label = new Label(this.config, this.thumb);

    this.zIndex = 1;

    this.checkOrientation(this.orientation);

    this.moveThumb(this.thumb);
  }

  checkLabel(data: boolean) {
    this.label.checkLabelProp(data);
  }

  checkRange(data: boolean) {
    this.range = data;
  }
  checkOrientation(data: string) {
    this.orientation = data;
    this.label.checkLabelOrientation(this.orientation);
    if (this.orientation == "vertical") {
      if (this.thumb) {
        this.thumb.style.top = this.thumb?.style.left;
        this.thumb.style.left = "-5px";
      }
      this.thumb?.classList.add("thumb_vertical");
    }

    if (this.orientation == "horisontal") {
      if (this.thumb) {
        this.thumb.style.left = this.thumb?.style.top;
        this.thumb.style.top = "-5px";
      }

      this.thumb?.classList.remove("thumb_vertical");
    }
  }

  setPosition(position: number) {
    if (this.orientation == "horisontal") {
      if (!this.range && this.thumb) {
        this.thumb.style.left = position + "px";
      } else if (this.range) {
        if (this.thumb?.classList.contains("thumb_first")) {
          this.thumb.style.left = position + "px";
        } else if (this.thumb?.classList.contains("thumb_second")) {
          this.thumb.style.left = position + "px";
        }
      }
    }

    if (this.orientation == "vertical") {
      if (!this.range && this.thumb) {
        this.thumb.style.top = position + "px";
      } else if (this.range) {
        if (this.thumb?.classList.contains("thumb_first")) {
          this.thumb.style.top = position + "px";
        } else if (this.thumb?.classList.contains("thumb_second")) {
          this.thumb.style.top = position + "px";
        }
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
    return this.observer.broadcast("mouseMove", this.findPosition(e));
  }

  onMouseUp = (e: any = MouseEvent) => {
    document.onmousemove = null;
    document.onmouseup = null;
    return this.observer.broadcast("mouseMove", this.findPosition(e));
  };

  findPosition(e: any) {
    let thumbFirst = this.slider?.querySelector(".thumb_first");
    let thumbSecond = this.slider?.querySelector(".thumb_second");
   
    if (this.orientation == "horisontal") {
      if (!this.range && this.thumb == thumbFirst) {
        return {
          clientX: e.clientX,
          "slider-left-point": this.slider?.getBoundingClientRect().left,
          "slider-width": this.slider?.offsetWidth,
          "data-num": this.thumb?.dataset.num,
        };
      } else if (this.range) {
        if (this.thumb?.dataset.num == "1") {
          if (thumbSecond != null)
            if (thumbSecond instanceof HTMLElement) {
              return {
                "thumb-width": this.thumb.offsetWidth,
                clientX: e.clientX,
                "slider-left-point": this.slider?.getBoundingClientRect().left,
                "slider-width": this.slider?.offsetWidth,
                "data-num": this.thumb.dataset.num,

                positionThumbSecond: parseInt(thumbSecond.style.left),
              };
            }
        } else if (this.thumb?.dataset.num == "2") {
          if (thumbFirst instanceof HTMLElement)
            return {
              "thumb-width": this.thumb.offsetWidth,
              clientX: e.clientX,
              "slider-left-point": this.slider?.getBoundingClientRect().left,
              "slider-width": this.slider?.offsetWidth,
              "data-num": this.thumb.dataset.num,

              positionThumbFirst: parseInt(thumbFirst.style.left),
            };
        }
      }
    } else if (this.orientation == "vertical") {
      if (!this.range && this.thumb != null) {
        return {
          "thumb-width": this.thumb.offsetWidth,
          clientY: e.clientY,
          "slider-top-point": this.slider?.getBoundingClientRect().top,
          "slider-height": this.slider?.offsetHeight,
          "data-num": this.thumb.dataset.num,
        };
      } else if (this.range) {
        if (this.thumb?.dataset.num == "1") {
        
          if (thumbSecond instanceof HTMLElement) {
           
            return {
              "thumb-width": this.thumb.offsetWidth,
              clientY: e.clientY,
              "slider-top-point": this.slider?.getBoundingClientRect().top,
              "slider-height": this.slider?.offsetHeight,
              "data-num": this.thumb.dataset.num,

              
              positionThumbSecond: parseInt(thumbSecond?.style.top),
            };
          }
        } else if (this.thumb?.dataset.num == "2") {
          if (thumbFirst instanceof HTMLElement)
            return {
              "thumb-width": this.thumb.offsetWidth,
              clientY: e.clientY,
              "slider-top-point": this.slider?.getBoundingClientRect().top,
              "slider-height": this.slider?.offsetHeight,
              "data-num": this.thumb.dataset.num,

              positionThumbFirst: parseInt(thumbFirst.style.top),
            };
        }
      }
    }

    return "error";
  }

  getPosition(position: number = 0) {
    if (this.thumb instanceof HTMLElement) {
      if (this.orientation == "horisontal") {
        this.thumb.style.left = position + "px";
      }

      if (this.orientation == "vertical") {
        this.thumb.style.top = position + "px";
      }
    }
  }

  setLabelValue(value: number) {
    this.label.setLabelValue(value);
  }

  removeThis() {
    if (this.thumb) this.slider?.removeChild(this.thumb);
  }
  addThis() {
    if (this.thumb) this.slider?.append(this.thumb);
  }
}
