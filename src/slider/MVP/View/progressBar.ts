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
  addBar(data: any) {
    if (this.config.orientation == "horizontal") {
      if (!this.config.range) {
        this.progressBar.style.left = "0px";
        this.progressBar.style.width = data.dataFirstThumb.positionFrom + "px";
      } else {
        this.progressBar.style.left = data.dataFirstThumb.positionFrom + "px";
        this.progressBar.style.width =
          data.dataSecondThumb.positionTo -
          data.dataFirstThumb.positionFrom +
          "px";
      }
    }
    if (this.config.orientation == "vertical") {
      if (!this.config.range) {
        this.progressBar.style.top = "0px";
        this.progressBar.style.height = data.dataFirstThumb.positionFrom + "px";
      } else {
        this.progressBar.style.top = data.dataFirstThumb.positionFrom + "px";
        this.progressBar.style.height =
          data.dataSecondThumb.positionTo -
          data.dataFirstThumb.positionFrom +
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
  removeStyles() {
    this.progressBar.removeAttribute("style");
  }
  updateBarConfig(data: IConfigBar) {
    this.config = data;
    this.checkOrientation();
  }
}
export { ProgressBar };

