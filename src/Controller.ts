import { Observer } from "./observer";
import config from "./config";
interface IConfigController {
  range: boolean;
  position_1: number;
  position_2?: number;
}
export class Controller {
  valueFirstThumb: HTMLElement | HTMLInputElement | null;
  valueSecondThumb: HTMLElement | HTMLInputElement | null;
  panel: HTMLElement | null;
  rangeWrapper: HTMLElement | null;
  single: HTMLInputElement | null;
  double: HTMLInputElement | null;
  labelSingle: HTMLLabelElement;
  labelDouble: HTMLLabelElement;
  panelWrapper: HTMLElement;

  observer: Observer;

  config: IConfigController;
  range: boolean;
  position_1: number;
  position_2: number;
  constructor(panel: HTMLElement | null) {
    this.observer = new Observer();
    this.config = config;
    this.range = config.range;
    this.position_1 = config.position_1;
    this.position_2 = config.position_2;

    this.panel = panel;
    this.panelWrapper = document.createElement("div");
    this.panelWrapper.classList.add("panel__wrapper");
    this.panel?.append(this.panelWrapper);

    this.rangeWrapper = document.createElement("div");
    this.panelWrapper.append(this.rangeWrapper);

    this.valueFirstThumb = document.createElement("input");
    this.valueFirstThumb.classList.add("panel__input-value");
    this.panelWrapper.append(this.valueFirstThumb);

    this.valueSecondThumb = document.createElement("input");
    this.valueSecondThumb.classList.add("panel__input-value");
    this.range ? this.panel?.append(this.valueSecondThumb) : null;

    this.single = document.createElement("input");
    this.double = document.createElement("input");
    this.single.value = "single";
    this.double.value = "double";
    this.single.id = "single";
    this.double.id = "double";
    this.double.type = "radio";
    this.single.type = "radio";
    this.single.name = "range";
    this.double.name = "range";

    this.labelSingle = document.createElement("label");
    this.labelSingle.htmlFor = "single";
    this.labelSingle.innerHTML = "Одинарный";

    this.labelDouble = document.createElement("label");
    this.labelDouble.htmlFor = "double";
    this.labelDouble.innerHTML = "Двойной";

    this.labelSingle.append(this.single);
    this.rangeWrapper.append(this.labelSingle);
    this.labelDouble.append(this.double);
    this.rangeWrapper.append(this.labelDouble);

    this.init();
    this.setValueInit();
    this.checkRange();
  }
  init() {
    if (this.range && this.double) {
      this.observer.broadcast("range", true);
      this.double.checked = true;
    } else if (!this.range && this.single) {
      this.single.checked = true;
      this.observer.broadcast("range", false);
    }
    this.checkRange;
  }

  setValueInit() {
    if (this.valueFirstThumb instanceof HTMLInputElement)
      this.valueFirstThumb.value = this.position_1 + "";

    if (this.valueSecondThumb instanceof HTMLInputElement)
      this.valueSecondThumb.value = this.position_2 + "";
  }
  setValue(data: any) {
    let data_num = data["data_num"];
    let posit = data["position"];
    if (
      this.valueFirstThumb instanceof HTMLInputElement &&
      this.valueSecondThumb instanceof HTMLInputElement
    )
      if (this.range) {
        if (data_num == "1") this.valueFirstThumb.value = parseInt(posit) + "";
        else if (data_num == "2")
          this.valueSecondThumb.value = parseInt(posit) + "";
      } else if (!this.range) {
        this.valueSecondThumb.style.display = "none";
        this.valueFirstThumb.value = parseInt(posit) + "";
      }
  }
  checkRange() {
    let that = this;
    this.rangeWrapper?.addEventListener("click", function (e) {
      if (that.single?.checked == true) {
        that.observer.broadcast("range", false);
      } else if (that.double?.checked == true) {
        that.observer.broadcast("range", true);
      }
    });
  }
}
