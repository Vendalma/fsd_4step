interface IConfigProgressBar {
  range: boolean;
  orientation: string;
}
class progressBar {
  config: IConfigProgressBar;
  slider: HTMLElement;
  progressBar: HTMLElement;
  constructor(IConfigProgressBar: any, slider: HTMLElement) {
    this.config = IConfigProgressBar;
    this.slider = slider;
    this.progressBar = document.createElement("div");
    this.progressBar.classList.add("progress-bar");
    this.slider.prepend(this.progressBar);
    this.checkOrientation();
  }

  setPositionForThumbOne(position: number) {
    if (this.config.orientation == "horizontal") {
      if (!this.config.range) {
        this.progressBar.style.width = position + 2 + "px";
      } else {
        let secondThumb = this.slider.querySelector(
          ".thumb_second"
        ) as HTMLElement;
        this.progressBar.style.left = position + "px";
        this.progressBar.style.width =
          parseInt(secondThumb.style.left) - position + "px";
      }
    }

    if (this.config.orientation == "vertical") {
      if (!this.config.range) {
        this.progressBar.style.height = position + 2 + "px";
      } else {
        let secondThumb = this.slider.querySelector(
          ".thumb_second"
        ) as HTMLElement;
        this.progressBar.style.top = position + "px";
        this.progressBar.style.height =
          parseInt(secondThumb.style.top) - position + "px";
      }
    }
  }
  setPositionForThumbTwo(position: number) {
    if (this.config.orientation == "horizontal") {
      this.progressBar.style.width =
        position - parseInt(this.progressBar.style.left) + 7 + "px";
    }
    if (this.config.orientation == "vertical") {
      this.progressBar.style.height =
        position - parseInt(this.progressBar.style.top) + 5 + "px";
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

  setOnloadProgressBarPosition(data: any) {
    let onloadPositionThumbOne = data.thumbData.onloadPositionThumbOne;
    let onloadPositionThumbTwo = data.thumbData.onloadPositionThumbTwo;
    if (this.config.orientation == "horizontal") {
      this.progressBar.removeAttribute("style");
      if (!this.config.range) {
        this.progressBar.style.left = "0px";
        this.progressBar.style.width = onloadPositionThumbOne + 2 + "px";
      } else if (this.config.range) {
        this.progressBar.style.left = onloadPositionThumbOne + "px";
        this.progressBar.style.width =
          onloadPositionThumbTwo - onloadPositionThumbOne + "px";
      }
    }

    if (this.config.orientation == "vertical") {
      this.progressBar.removeAttribute("style");
      if (!this.config.range) {
        this.progressBar.style.top = "-1px";
        this.progressBar.style.height = onloadPositionThumbOne + 2 + "px";
      } else if (this.config.range) {
        this.progressBar.style.top = onloadPositionThumbOne + "px";
        this.progressBar.style.height =
          onloadPositionThumbTwo - onloadPositionThumbOne + "px";
      }
    }
  }
  updateBarConfig(data: any) {
    this.config = data;
    this.checkOrientation();
  }
}
export { progressBar };

