export class progressBar {
  slider: HTMLElement | null;
  range: boolean;
  progressBar: HTMLElement | null;

  constructor(slider: HTMLElement | null, range: boolean) {
    this.slider = slider;
    this.range = range;
    this.progressBar = document.createElement("div");

    this.init();
  }

  init() {
    let handlers: NodeListOf<HTMLElement> | null = document.querySelectorAll(
      ".thumb"
    );
    if (
      this.slider instanceof HTMLElement &&
      this.progressBar instanceof HTMLElement
    ) {
      this.progressBar.classList.add("progress-bar");

      if (!this.range) this.slider.prepend(this.progressBar);

      if (this.range) {
        handlers.forEach((elem) => {
          if (
            elem.getAttribute("data-num") == "1" &&
            this.progressBar &&
            this.slider
          ) {
            this.slider.insertBefore(this.progressBar, elem);
          }
        });
      }
    }
    this.setProgressBar(handlers);
  }

  setProgressBar(handlers: NodeListOf<HTMLElement>) {
    if (!this.range && handlers != null) {
      handlers.forEach((element) => {
        let left = parseInt(element.style.left);
        if (this.progressBar instanceof HTMLElement) {
          this.progressBar.style.width = left + 2 + "px";
        }
      });
    } else if (this.range && handlers != null) {
      handlers.forEach((element) => {
        if (element.getAttribute("data-num") == "0" && this.progressBar) {
          this.progressBar.style.left =
            parseInt(element.style.left) + 10 + "px";
        } else if (
          element.getAttribute("data-num") == "1" &&
          this.progressBar
        ) {
          this.progressBar.style.width =
            parseInt(element.style.left) -
            parseInt(this.progressBar.style.left) +
            8 +
            "px";
        }
      });
    }
  }

  getCorrectProgressBar() {
    let handlers = document.querySelectorAll(".thumb");
    let bar = document.querySelector(".progress-bar");
    if (handlers != null)
      handlers.forEach((element) => {
        if (element instanceof HTMLElement && bar instanceof HTMLElement) {
          if (!this.range) {
            let left = parseInt(element.style.left);
            bar.style.width = left + 2 + "px";
          } else if (this.range) {
            if (element.getAttribute("data-num") == "0") {
              bar.style.left = parseInt(element.style.left) + 10 + "px";
            } else if (element.getAttribute("data-num") == "1") {
              bar.style.width =
                parseInt(element.style.left) -
                parseInt(bar.style.left) +
                8 +
                "px";
            }
          }
        }
      });
  }
}
