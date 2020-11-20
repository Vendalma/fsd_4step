import { Observer } from "../../Observer/Observer";
import { Label } from "./Label";

interface IConfigThumb {
  range: boolean;
  positionFrom: number;
  positionTo: number;
  orientation: string;
  label: boolean;
}
interface IDataThumbMove {
  clientXY: number;
  slider_client_react: number;
  data_num: string;
  positionThumbFirst?: number;
  positionThumbSecond?: number;
}
class Thumb {
  config: IConfigThumb;
  slider: HTMLElement;
  thumb: HTMLElement;
  countThumbs: string;
  observer: Observer;
  data_num: string;
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
    this.data_num = data_num;

    this.thumb = document.createElement("div");
    this.thumb.classList.add("thumb");
    this.thumb.classList.add(this.countThumbs);

    this.thumb.setAttribute("data-num", this.data_num);
    this.slider.append(this.thumb);

    this.observer = new Observer();
    this.label = new Label(this.config, this.thumb);
    this.checkOrientation();
    this.moveThumb();
  }
  addFollower(follower: any) {
    this.observer.subscribe(follower);
  }
  checkOrientation() {
    if (this.config.orientation == "horizontal") {
      this.thumb.classList.add("thumb_horizontal");
      this.thumb.classList.remove("thumb_vertical");
    }

    if (this.config.orientation == "vertical") {
      this.thumb.classList.remove("thumb_horizontal");
      this.thumb.classList.add("thumb_vertical");
    }
  }
  moveThumb() {
    this.thumb.addEventListener("mousedown", this.mouseDown.bind(this));
  }
  mouseDown(e: MouseEvent) {
    e.preventDefault();
    document.onmousemove = (e) => this.onMouseMove(e);
    document.onmouseup = (e) => this.onMouseUp(e);
    this.changeZIndexUp();
    this.observer.broadcast("mouseMove", this.findPosition(e));
  }
  onMouseMove(e: MouseEvent) {
    e.preventDefault();
    this.moveHandle(e);
  }
  moveHandle(e: MouseEvent) {
    this.observer.broadcast("mouseMove", this.findPosition(e));
  }
  onMouseUp(e: MouseEvent) {
    document.onmousemove = null;
    document.onmouseup = null;
    this.observer.broadcast("mouseMove", this.findPosition(e));
    this.changeZIndexDown();
  }
  findPosition(e: MouseEvent) {
    if (this.config.orientation == "horizontal") {
      return this.findPositionForHorizontal(e) as IDataThumbMove;
    }
    if (this.config.orientation == "vertical") {
      return this.findPositionForVertical(e) as IDataThumbMove;
    }
  }
  findPositionForHorizontal(e: MouseEvent) {
    let thumbFirst = this.slider.querySelector(".thumb_first") as HTMLElement;
    let thumbSecond = this.slider.querySelector(".thumb_second") as HTMLElement;
    if (this.thumb.dataset.num == "1") {
      return {
        clientXY: e.clientX,
        slider_client_react: this.slider.getBoundingClientRect().left,
        data_num: this.thumb.dataset.num,
        positionThumbSecond: this.config.range
          ? parseInt(thumbSecond.style.left)
          : null,
      } as IDataThumbMove;
    } else if (this.thumb.dataset.num == "2") {
      return {
        clientXY: e.clientX,
        slider_client_react: this.slider.getBoundingClientRect().left,
        data_num: this.thumb.dataset.num,
        positionThumbFirst: parseInt(thumbFirst.style.left),
      } as IDataThumbMove;
    }
  }
  findPositionForVertical(e: MouseEvent) {
    let thumbFirst = this.slider.querySelector(".thumb_first") as HTMLElement;
    let thumbSecond = this.slider.querySelector(".thumb_second") as HTMLElement;
    if (this.thumb.dataset.num == "1") {
      return {
        clientXY: e.clientY,
        slider_client_react: this.slider.getBoundingClientRect().top,
        data_num: this.thumb.dataset.num,
        positionThumbSecond: this.config.range
          ? parseInt(thumbSecond.style.top)
          : null,
      } as IDataThumbMove;
    } else if (this.thumb.dataset.num == "2") {
      return {
        clientXY: e.clientY,
        slider_client_react: this.slider.getBoundingClientRect().top,
        data_num: this.thumb.dataset.num,
        positionThumbFirst: parseInt(thumbFirst.style.top),
      } as IDataThumbMove;
    }
  }
  setPosition(position: number) {
    if (this.config.orientation == "horizontal") {
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
  changeZIndexUp() {
    this.thumb.classList.add("thumb_zIndex_up");
  }
  changeZIndexDown() {
    this.thumb.classList.remove("thumb_zIndex_up");
  }
  updateConfigThumb(data: IConfigThumb) {
    this.config = data;
    this.label.updateConfig(data);
    this.checkOrientation();
  }
}
export { Thumb };

