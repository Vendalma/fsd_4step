interface IConfigBar {
  range: boolean;
  orientation: string;
}
class ProgressBar {
  config: IConfigBar;
  slider: HTMLElement;
  progressBar: HTMLElement;
  constructor(IConfigBar: IConfigBar, slider: HTMLElement) {
    this.config = IConfigBar;
    this.slider = slider;
    this.progressBar = document.createElement("div");
    this.progressBar.classList.add("progress-bar");
    this.slider.prepend(this.progressBar);
    this.checkOrientation();
  }
  addBar() {
    let thumbFirst = this.slider.querySelector(".thumb_first") as HTMLElement;
    let thumbSecond = this.slider.querySelector(".thumb_second") as HTMLElement;
    if (this.config.orientation == "horizontal") {
      if (!this.config.range) {
        this.progressBar.style.left = "0px";
        this.progressBar.style.width = thumbFirst.style.left;
      } else {
        this.progressBar.style.left = thumbFirst.style.left;
        this.progressBar.style.width =
          parseInt(thumbSecond.style.left) -
          parseInt(thumbFirst.style.left) +
          "px";
      }
    }
    if (this.config.orientation == "vertical") {
      if (!this.config.range) {
        this.progressBar.style.top = "0px";
        this.progressBar.style.height = thumbFirst.style.top;
      } else {
        this.progressBar.style.top = thumbFirst.style.top;
        this.progressBar.style.height =
          parseInt(thumbSecond.style.top) -
          parseInt(thumbFirst.style.top) +
          "px";
      }
    }
  }
  checkOrientation() {
    if (this.config.orientation == "horizontal") {
      this.progressBar.classList.remove("progress-bar_vertical");
      this.progressBar.classList.add("progress-bar_horizontal");
    }
    if (this.config.orientation == "vertical") {
      this.progressBar.classList.add("progress-bar_vertical");
      this.progressBar.classList.remove("progress-bar_horizontal");
    }
  }
  cleanStyleAttr() {
    this.progressBar.removeAttribute('style')
  }
  updateBarConfig(data: IConfigBar) {
    this.config = data;
    this.checkOrientation()
  }
}
export { ProgressBar };

