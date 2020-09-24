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

    this.init();
  }

  init() {
    if (
      this.slider instanceof HTMLElement &&
      this.progressBar instanceof HTMLElement
    ) {
      if (!this.range) {
        this.slider.prepend(this.progressBar);
        this.progressBar.style.width = this.position_1 + "px";
      }

      if (this.range) {
        let lastChild = this.slider.lastElementChild;
        if (lastChild instanceof HTMLElement)
          this.slider.insertBefore(this.progressBar, lastChild);
        this.progressBar.style.width = this.position_2 - this.position_1 + "px";
        this.progressBar.style.left = this.position_1 + 5 + "px";
      }
    }
  }

  setProgressBar(data: any) {
    let data_num = data["data_num"];
    let position = data["position"];
    if (!this.range && this.progressBar) {
      this.progressBar.style.width = position + 2 + "px";
    } else if (this.range && this.progressBar) {
      if (data_num == "1") {
        let secondThumb = this.slider?.lastElementChild;
        if (secondThumb instanceof HTMLElement)
          this.progressBar.style.width =
            parseInt(secondThumb.style.left) - position + "px";
        this.progressBar.style.left = position + 5 + "px";
      } else if (data_num == "2")
        this.progressBar.style.width =
          position - parseInt(this.progressBar.style.left) + 5 + "px";
    }
  }
}
