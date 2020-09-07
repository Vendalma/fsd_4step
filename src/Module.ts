export class Module {
  slider: HTMLElement | null;
  thumb: HTMLElement | null;
  progressBar: HTMLElement | null;
  input: HTMLElement | null;
  inputRange: HTMLInputElement | null;
  buttonPlus: HTMLElement | null;
  buttonMinus: HTMLElement | null;
  min: number;
  max: number;

  constructor(slider: HTMLElement | null, min: number, max: number) {
    this.slider = slider;
    this.thumb = document.createElement("div");
    this.progressBar = document.createElement("div");
    this.input = document.createElement("input");
    this.inputRange = document.createElement("input");
    this.buttonMinus = document.createElement("input");
    this.buttonPlus = document.createElement("input");
    this.min = min;
    this.max = max;

    this.init();
  }

  init() {
    if (
      this.thumb instanceof HTMLElement &&
      this.progressBar instanceof HTMLElement &&
      this.input instanceof HTMLInputElement &&
      this.inputRange instanceof HTMLInputElement &&
      this.buttonMinus instanceof HTMLInputElement &&
      this.buttonPlus instanceof HTMLInputElement
    ) {
      this.progressBar?.classList.add("progress-bar");
      this.slider?.appendChild(this.progressBar);

      this.thumb?.classList.add("thumb");
      this.slider?.appendChild(this.thumb);

      this.input?.classList.add("input");
      this.input.value = "0";
      this.slider?.parentElement?.appendChild(this.input);

      this.inputRange.classList.add("input-range");
      this.inputRange.placeholder = "Укажите шаг";
      this.slider?.parentElement?.appendChild(this.inputRange);

      this.slider?.parentElement?.appendChild(this.buttonMinus);
      this.slider?.parentElement?.appendChild(this.buttonPlus);
      this.buttonPlus.type = "button";
      this.buttonMinus.type = "button";
      this.buttonMinus.value = "Минус";
      this.buttonPlus.value = "Плюс";
    }
    this.moveThumb();

    this.setMinValue();
    this.setMaxValue();
    this.getProgressBar();

    this.setInputValue();
    this.setRangeValue();
    this.getInputValue();
    this.clickOnSlider();
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

  setInputValue() {
    let thumb = this.thumb;
    let input = this.input;
    let that = this;
    if (this.input instanceof HTMLInputElement)
      this.input.addEventListener("blur", function () {
        if (input instanceof HTMLInputElement && thumb instanceof HTMLElement) {
          if (that.checkThumbPosition()) {
            thumb.style.left = input.value + "px";
            that.getProgressBar();
          } else {
            alert("Указанное значение больше/меньше указанных интервалов");
            input.value = `${parseInt(thumb?.style.left) + ""}`;
          }
        }
      });
  }

  setMinValue() {
    if (this.thumb instanceof HTMLElement) {
      this.thumb.style.left = this.min + "px";
    }
  }

  setMaxValue() {
    if (
      this.slider instanceof HTMLElement &&
      this.thumb instanceof HTMLElement
    ) {
      this.slider.style.width = this.max + this.thumb.offsetWidth + "px";
    }
  }

  setRangeValue() {
    let range = this.inputRange;
    let buttonMinus = this.buttonMinus;
    let buttonPlus = this.buttonPlus;
    let thumb = this.thumb;
    let max = this.max;
    let that = this;
    let result: number;

    if (
      buttonMinus instanceof HTMLElement &&
      buttonPlus instanceof HTMLElement
    ) {
      buttonMinus.addEventListener("click", function () {
        if (
          thumb instanceof HTMLElement &&
          range instanceof HTMLInputElement &&
          range.value != undefined &&
          that.checkThumbPosition()
        ) {
          result = parseInt(thumb.style.left) - parseInt(range.value);
          if (result >= 0 && result <= max) {
            thumb.style.left = result + "px";
            that.getInputValue();
            that.getProgressBar();
          }
        }
      });

      buttonPlus.addEventListener("click", function () {
        if (
          thumb instanceof HTMLElement &&
          range instanceof HTMLInputElement &&
          range.value != undefined &&
          that.checkThumbPosition()
        ) {
          result = parseInt(thumb.style.left) + parseInt(range.value);
          if (result >= 0 && result <= max) {
            thumb.style.left = result + "px";
            that.getInputValue();
            that.getProgressBar();
          }
        }
      });
    }
  }

  checkThumbPosition() {
    if (
      this.thumb instanceof HTMLElement &&
      this.input instanceof HTMLInputElement
    ) {
      if (
        parseInt(this.thumb.style.left) >= 0 &&
        parseInt(this.thumb.style.left) <= this.max &&
        parseInt(this.input.value) >= 0 &&
        parseInt(this.input.value) <= this.max
      ) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  clickOnSlider() {
    let slider = this.slider;
    let thumb = this.thumb;
    let that = this;
    let max = this.max;
    let result;
    if (slider instanceof HTMLElement) {
      slider.addEventListener("click", function (e) {
        if (slider instanceof HTMLElement && thumb instanceof HTMLElement) {
          result = e.clientX - slider.offsetLeft - thumb.offsetWidth;
          if (result >= 0 && result <= max) {
            thumb.style.left = result + "px";
            that.getProgressBar();
            that.getInputValue();
          }
        }
      });
    }
  }
}
