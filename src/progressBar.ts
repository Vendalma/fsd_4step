import config from "./config";
interface IConfigProgressBar {
  range: boolean;
  position_1: number;
  position_2?: number;
}
export class progressBar {
  config: IConfigProgressBar;
  range: boolean;
  position_1: number;
  position_2: number;
  slider: HTMLElement | null;
  progressBar: HTMLElement | null;

  constructor(slider: HTMLElement | null) {
    this.config = config;
    this.range = config.range;
    this.position_1 = config.position_1;
    this.position_2 = config.position_2;

    this.slider = slider;
    this.progressBar = document.createElement("div");
    this.progressBar.classList.add("progress-bar");
    this.slider?.prepend(this.progressBar);
  }

  setProgressBar(data: any) {
    let data_num = data["data_num"];
    let position = data["position"];

    if (!this.range && this.progressBar) {
      this.progressBar.style.width = position + 2 + "px";
    } else if (this.range && this.progressBar) {
      if (data_num == "1") {
        let secondThumb = this.slider?.querySelector(".thumb_second");
        if (secondThumb instanceof HTMLElement) {
          this.progressBar.style.left = position + "px";
          this.progressBar.style.width =
            parseInt(secondThumb.style.left) - position + "px";
        }
      } else if (data_num == "2")
        this.progressBar.style.width =
          position - parseInt(this.progressBar.style.left) + 5 + "px";
    }
  }

  checkRange(data: boolean) {
    this.range = data;
    this.changeInit();
  }

  changeInit() {
    let thumbOne = this.slider?.querySelector(".thumb_first");
    let thumbTwo = this.slider?.querySelector(".thumb_second");
    if (
      thumbOne instanceof HTMLElement &&
      thumbTwo instanceof HTMLElement &&
      this.progressBar
    )
      if (!this.range) {
        this.progressBar.style.left = "0px";
        this.progressBar.style.width = thumbOne.style.left;
      } else if (this.range) {
        this.progressBar.style.left = thumbOne.style.left;
        this.progressBar.style.width =
          parseInt(thumbTwo.style.left) -
          parseInt(this.progressBar.style.left) +
          "px";
      }
  }

  setOnloadProgressBarPosition(data: any) {
    let onloadPositionThumbOne = data["onloadPositionThumbOne"];
    let onloadPositionThumbTwo = data["onloadPositionThumbTwo"];

    if (this.progressBar)
      if (!this.range) {
        this.progressBar.style.width = onloadPositionThumbOne + 2 + "px";
      } else if (this.range) {
        this.progressBar.style.left = onloadPositionThumbOne + "px";
        this.progressBar.style.width =
          onloadPositionThumbTwo - onloadPositionThumbOne + "px";
      }
  }
}
