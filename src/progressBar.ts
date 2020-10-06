import { htmlPrefilter } from "jquery";
import config from "./config";
interface IConfigProgressBar {
  range: boolean;
  position_1: number;
  position_2: number;
  orientation: string;
}
export class progressBar {
  config: IConfigProgressBar;
  range: boolean;
  position_1: number;
  position_2: number;
  orientation: string;

  slider: HTMLElement | null;
  progressBar: HTMLElement | null;

  constructor(IConfigProgressBar: any, slider: HTMLElement | null) {
    this.config = IConfigProgressBar;
    this.range = this.config.range;
    this.position_1 = this.config.position_1;
    this.position_2 = this.config.position_2;
    this.orientation = this.config.orientation;

    this.slider = slider;
    this.progressBar = document.createElement("div");
    this.progressBar.classList.add("progress-bar");
    this.slider?.prepend(this.progressBar);

    this.checkOrientation(this.orientation);
  }

  setProgressBar(data: any) {
    let data_num = data["data_num"];
    let position = data["position"];

    if (this.orientation == "horisontal") {
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

    if (this.orientation == "vertical") {
      if (!this.range && this.progressBar) {
        this.progressBar.style.height = position + 2 + "px";
      } else if (this.range && this.progressBar) {
        if (data_num == "1") {
          let secondThumb = this.slider?.querySelector(".thumb_second");
          if (secondThumb instanceof HTMLElement) {
            this.progressBar.style.top = position + "px";
            this.progressBar.style.height =
              parseInt(secondThumb.style.top) - position + "px";
          }
        } else if (data_num == "2")
          this.progressBar.style.height =
            position - parseInt(this.progressBar.style.top) + 5 + "px";
      }
    }
  }

  checkRange(data: boolean) {
    this.range = data;
    this.changeInit();
  }

  checkOrientation(data: string) {
    this.orientation = data;
  }

  changeInit() {
    let thumbOne = this.slider?.querySelector(".thumb_first");
    let thumbTwo = this.slider?.querySelector(".thumb_second");
    if (thumbOne instanceof HTMLElement && this.progressBar)
      if (!this.range) {
        this.progressBar.style.left = "0px";
        this.progressBar.style.width = thumbOne.style.left;
      } else if (this.range && thumbTwo instanceof HTMLElement) {
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

    if (this.orientation == "horisontal") {
      if (this.progressBar)
        if (!this.range) {
          this.progressBar.style.width = onloadPositionThumbOne + 2 + "px";
        } else if (this.range) {
          this.progressBar.style.top = "0px";
          this.progressBar.style.height = "7px";

          this.progressBar.style.left = onloadPositionThumbOne + "px";
          this.progressBar.style.width =
            onloadPositionThumbTwo - onloadPositionThumbOne + "px";
        }
    }

    if (this.orientation == "vertical") {
      if (this.progressBar)
        if (!this.range) {
          console.log(11);
          this.progressBar.style.height = onloadPositionThumbOne + 2 + "px";
          this.progressBar.style.width = "7px";
        } else if (this.range) {
          this.progressBar.style.width = "7px";
          this.progressBar.style.left = "0px";

          this.progressBar.style.top = onloadPositionThumbOne + "px";
          this.progressBar.style.height =
            onloadPositionThumbTwo - onloadPositionThumbOne + "px";
        }
    }
  }
}
