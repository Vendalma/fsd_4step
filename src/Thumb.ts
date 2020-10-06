import { Label } from "./Label";
import { Observer } from "./Observer";

interface IConfigThumb {
  range: boolean;
  position_1: number;
  position_2: number;
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
    IConfigThumb: any,
    countThumbs: string,
    slider: HTMLElement | null,
    data_num: number
  ) {
    this.config = IConfigThumb;
    this.position_1 = this.config.position_1;
    this.position_2 = this.config.position_2;
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
    //this.setPosition();
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
  checkLabel(data: boolean) {
    this.label.checkLabelProp(data);
  }

  checkOrientation(data: string) {
    this.orientation = data;
    this.label.changeLabelOrientation(this.orientation);
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
        //this.label.setLabelValue(this.position_1);
      } else if (this.range) {
        if (this.thumb?.classList.contains("thumb_first")) {
          this.thumb.style.left = position + "px";
          // this.label.setLabelValue(this.position_1);
        } else if (this.thumb?.classList.contains("thumb_second")) {
          this.thumb.style.left = position + "px";
          // this.label.setLabelValue(this.position_2);
        }
      }
    }

    if (this.orientation == "vertical") {
      if (!this.range && this.thumb) {
        this.thumb.style.left = position + "px";
        //this.label.setLabelValue(this.position_1);
      } else if (this.range) {
        if (this.thumb?.classList.contains("thumb_first")) {
          this.thumb.style.top = position + "px";
          // this.label.setLabelValue(this.position_1);
        } else if (this.thumb?.classList.contains("thumb_second")) {
          this.thumb.style.top = position + "px";
          // this.label.setLabelValue(this.position_2);
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
    let thumbSecond = this.slider?.querySelector(".thumb_second");
    let thumbFirst = this.slider?.querySelector(".thumb_first");
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
        //console.log(this.thumb?.offsetWidth);
        if (this.thumb?.dataset.num == "1") {
          if (thumbSecond != null)
            if (thumbSecond instanceof HTMLElement) {
              //console.log(thumbSecond, thumbSecond.style.left);
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
    if (this.thumb) this.thumb.style.display = "none";
  }
  addThis() {
    if (this.thumb) this.thumb.style.display = "block";
  }
}
