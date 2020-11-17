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
  slider: HTMLElement;
  thumb: HTMLElement;
  countThumbs: string;
  observer: Observer;
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

    this.checkOrientation();
    this.moveThumb(this.thumb);
  }
  addFollower(follower: any) {
    this.observer.subscribe(follower);
  }
  private checkOrientation() {
    if (this.config.orientation == "horisontal") {
      this.thumb.classList.add("thumb_horisontal");
      this.thumb.classList.remove("thumb_vertical");
    }

    if (this.config.orientation == "vertical") {
      this.thumb.classList.remove("thumb_horisontal");
      this.thumb.classList.add("thumb_vertical");
    }
  }

  moveThumb(elem: HTMLElement) {
    elem.addEventListener("mousedown", this.mouseDown.bind(this));
  }

  mouseDown(e: any = MouseEvent) {
    if (e instanceof MouseEvent) {
      e = e || window.event;
      e.preventDefault();

      document.onmousemove = (e) => this.onMouseMove(e);
      document.onmouseup = (e) => this.onMouseUp(e);

      this.zIndex++;
      this.thumb.style.zIndex = this.zIndex.toString();
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
    if (this.config.orientation == "horisontal") {
      return this.findPositionForHorisontal(e);
    }

    if (this.config.orientation == "vertical") {
      return this.findPositionForVertical(e);
    }
  }

  private findPositionForHorisontal(e: MouseEvent) {
    let thumbFirst = this.slider.querySelector(".thumb_first") as HTMLElement;
    let thumbSecond = this.slider.querySelector(".thumb_second") as HTMLElement;
    if (this.thumb.dataset.num == "1") {
      return {
        clientXY: e.clientX,
        "slider_client_react": this.slider.getBoundingClientRect().left,
        "data_num": this.thumb.dataset.num,
        positionThumbSecond: this.config.range
          ? parseInt(thumbSecond.style.left)
          : null,
      };
    } else if (this.thumb.dataset.num == "2") {
      return {
        clientXY: e.clientX,
        "slider_client_react": this.slider.getBoundingClientRect().left,
        "data_num": this.thumb.dataset.num,
        positionThumbFirst: parseInt(thumbFirst.style.left),
      };
    }
  }

  private findPositionForVertical(e: MouseEvent) {
    let thumbFirst = this.slider.querySelector(".thumb_first") as HTMLElement;
    let thumbSecond = this.slider.querySelector(".thumb_second") as HTMLElement;
    if (this.thumb.dataset.num == "1") {
      return {
        clientXY: e.clientY,
        "slider_client_react": this.slider.getBoundingClientRect().top,
        "data_num": this.thumb.dataset.num,
        positionThumbSecond: this.config.range
          ? parseInt(thumbSecond.style.top)
          : null,
      };
    } else if (this.thumb.dataset.num == "2") {
      return {
        clientXY: e.clientY,
        "slider_client_react": this.slider.getBoundingClientRect().top,
        "data_num": this.thumb.dataset.num,
        positionThumbFirst: parseInt(thumbFirst.style.top),
      };
    }
  }

  setPosition(position: number) {
    if (this.config.orientation == "horisontal") {
      this.thumb.style.left = position + "px";
    }
    if (this.config.orientation == "vertical") {
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
  updateConfigThumb(data: any) {
    this.config = data;
    this.label.update(data);
    this.checkOrientation();
  }
}
export { Thumb };
