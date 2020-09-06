export class Module {
  slider: HTMLElement | null;
  thumb: HTMLElement | null;
  progressBar: HTMLElement | null;
  input: HTMLElement | null;

  constructor(slider: HTMLElement | null, displayValue: boolean) {
    this.slider = slider;
    this.thumb = document.createElement("div");
    this.progressBar = document.createElement("div");
    this.input = document.createElement("input");
    this.init();
  }

  init() {
    if (
      this.thumb instanceof HTMLElement &&
      this.progressBar instanceof HTMLElement &&
      this.input instanceof HTMLInputElement
    ) {
      this.progressBar?.classList.add("progress-bar");
      this.slider?.appendChild(this.progressBar);

      this.thumb?.classList.add("thumb");
      this.slider?.appendChild(this.thumb);

      this.input?.classList.add("input");
      this.input.value = `${parseInt("0") + ""}`;
      this.slider?.parentElement?.appendChild(this.input);
      console.log(this.input.value);
    }
    this.moveThumb();
    this.getProgressBar();
    this.getInputValue();
  }

  moveThumb() {
    if (
      this.thumb instanceof HTMLElement &&
      this.slider instanceof HTMLElement
    ) {
      let thumb = this.thumb;
      let slider = this.slider;
      let that = this;
      thumb.onmousedown = function (e: MouseEvent) {
        e.preventDefault();

        let shiftX = e.clientX - thumb.getBoundingClientRect().left;

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);

        function onMouseMove(e: MouseEvent) {
          let newLeft =
            e.clientX - shiftX - slider.getBoundingClientRect().left;

          if (newLeft < 0) {
            newLeft = 0;
          }

          let rightEdge = slider.offsetWidth - thumb.offsetWidth;

          if (newLeft > rightEdge) {
            newLeft = rightEdge;
          }

          thumb.style.left = newLeft + "px";
          that.getProgressBar();
          that.getInputValue();
        }

        function onMouseUp() {
          document.removeEventListener("mouseup", onMouseUp);
          document.removeEventListener("mousemove", onMouseMove);
        }
      };

      thumb.ondragstart = function () {
        return false;
      };
    }
  }

  getProgressBar() {
    if (
      this.progressBar instanceof HTMLElement &&
      this.thumb instanceof HTMLElement
    ) {
      let left = parseInt(this.thumb?.style.left);

      this.progressBar.style.width = left + 2 + "px";
    }
  }

  getInputValue() {
    if (
      this.input instanceof HTMLInputElement &&
      this.thumb instanceof HTMLElement
    ) {
      this.input.value = `${parseInt(this.thumb?.style.left) + ""}`;
    }
  }
}
