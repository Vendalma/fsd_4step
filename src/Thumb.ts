import { progressBar } from "./progressBar";

export class Thumb extends progressBar {
  slider: HTMLElement | null;
  thumb: HTMLElement | null;
  numberPosition: number;
  countThumbs: number;
  thumbs: string | null;
  left: number;
  right: number;
  range: boolean;

  constructor(
    slider: HTMLElement | null,
    range: boolean,
    right: number,
    numberPosition: number,
    countThumbs: number
  ) {
    super(slider, range);
    this.slider = slider;
    this.thumb = document.createElement("div");
    this.numberPosition = numberPosition;
    this.countThumbs = countThumbs;
    this.thumbs = this.thumb.getAttribute("data-num");
    this.left = 0;
    this.right = right;
    this.range = range;

    this.init();
    this.setProgressBar;
  }

  init() {
    if (
      this.slider instanceof HTMLElement &&
      this.thumb instanceof HTMLElement
    ) {
      this.slider.appendChild(this.thumb);
      this.thumb.classList.add("thumb");
      this.thumb.setAttribute("data-num", this.countThumbs + "");
    }
    this.moveThumb(this.thumb);
    this.getCorrectPosition();
  }

  getCorrectPosition() {
    if (this.thumb instanceof HTMLElement)
      if (this.countThumbs >= 0) {
        this.thumb.style.left = this.numberPosition + "px";
      } else {
        this.thumb.style.left = 0 + "px";
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

  mouseDown(e: MouseEvent) {
    e = e || window.event;
    e.preventDefault();

    document.onmousemove = (e) => this.onMouseMove(e);
    document.onmouseup = (e) => this.onMouseUp(e);
  }

  onMouseMove = (e: MouseEvent) => {
    e = e || window.event;
    e.preventDefault();
    this.moveHandle(e);
  };

  moveHandle(e: MouseEvent) {
    if (this.range) {
      if (
        this.thumb instanceof HTMLElement &&
        this.slider instanceof HTMLElement &&
        this.thumb.getAttribute("data-num") == "0" &&
        this.slider.lastElementChild instanceof HTMLElement
      ) {
        let sibling =
          parseInt(this.slider.lastElementChild.style.left) -
          this.slider.lastElementChild.offsetWidth;

        let current = this.thumb.offsetWidth / 3;
        let position =
          e.clientX - this.slider.getBoundingClientRect().left - current;

        if (position < 0) {
          this.thumb.style.left = 0 + "px";
        } else if (position > sibling) {
          this.thumb.style.left = sibling + "px";
        } else {
          this.thumb.style.left = position + "px";
        }
      } else if (
        this.thumb instanceof HTMLElement &&
        this.slider instanceof HTMLElement &&
        this.thumb.getAttribute("data-num") == "1" &&
        this.slider.firstElementChild instanceof HTMLElement
      ) {
        let sibling =
          parseInt(this.slider.firstElementChild.style.left) +
          this.slider.firstElementChild.offsetWidth;

        let current = this.thumb.offsetWidth / 3;
        let position =
          e.clientX - this.slider.getBoundingClientRect().left - current;

        let right = this.slider.offsetWidth - this.thumb.offsetWidth;

        if (position < sibling) {
          this.thumb.style.left = sibling + "px";
        } else if (position > right) {
          this.thumb.style.left = right + "px";
        } else {
          this.thumb.style.left = position + "px";
        }
      }
      this.getCorrectProgressBar();
    } else if (!this.range) {
      if (
        this.thumb instanceof HTMLElement &&
        this.slider instanceof HTMLElement &&
        this.thumb.getAttribute("data-num") == "0"
      ) {
        let current = this.thumb.offsetWidth / 3;
        let position =
          e.clientX - this.slider.getBoundingClientRect().left - current;
        let right = this.slider.offsetWidth - this.thumb.offsetWidth;
        if (position < 0) {
          this.thumb.style.left = 0 + "px";
        } else if (position > right) {
          this.thumb.style.left = right + "px";
        } else {
          this.thumb.style.left = position + "px";
        }
        this.getCorrectProgressBar();
        //console.log(this.setProgressBar(this.range));
      }
    }
  }

  onMouseUp = (e: MouseEvent) => {
    document.onmousemove = null;
    document.onmouseup = null;
  };

  drag(elem: HTMLElement | null) {
    if (elem instanceof HTMLElement) {
      elem.ondragstart = function () {
        return false;
      };
    }
  }
}
