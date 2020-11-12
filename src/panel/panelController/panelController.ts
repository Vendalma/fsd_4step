import * as $ from "jquery";
import "./panelController.scss";
interface ISettings {
  range: boolean;
  orientation: string;
  min: number;
  max: number;
  positionFrom: number;
  positionTo: number;
  step: number;
  label: boolean;
}
class PanelController {
  parent: HTMLElement;
  panel: HTMLElement;
  inputFrom: HTMLInputElement;
  inputTo: HTMLInputElement;
  inputMin: HTMLInputElement;
  inputMax: HTMLInputElement;
  inputStep: HTMLInputElement;
  inputLabel: HTMLInputElement;
  inputHorisontal: HTMLInputElement;
  inputVertical: HTMLInputElement;
  inputSingle: HTMLInputElement;
  inputDouble: HTMLInputElement;
  $slider: JQuery;
  config: ISettings;
  constructor(parent: HTMLElement, config: ISettings) {
    this.parent = parent;
    this.config = config;

    this.panel = this.parent.querySelector(".panel") as HTMLElement;
    this.inputFrom = this.parent.querySelector(
      ".panel__input_from"
    ) as HTMLInputElement;
    this.inputTo = this.parent.querySelector(
      ".panel__input_to"
    ) as HTMLInputElement;
    this.inputMin = this.parent.querySelector(
      ".panel__input_min"
    ) as HTMLInputElement;
    this.inputMax = this.parent.querySelector(
      ".panel__input_max"
    ) as HTMLInputElement;
    this.inputStep = this.parent.querySelector(
      ".panel__input_step"
    ) as HTMLInputElement;
    this.inputLabel = this.parent.querySelector(
      ".panel__checkbox_label"
    ) as HTMLInputElement;
    this.inputHorisontal = this.parent.querySelector(
      ".panel__radio_horisontal"
    ) as HTMLInputElement;
    this.inputVertical = this.parent.querySelector(
      ".panel__radio_vertical"
    ) as HTMLInputElement;
    this.inputSingle = this.parent.querySelector(
      ".panel__radio_single"
    ) as HTMLInputElement;
    this.inputDouble = this.parent.querySelector(
      ".panel__radio_double"
    ) as HTMLInputElement;

    this.$slider = $(this.parent);

    this.init();
    this.change();
    this.checkRange();
  }

  private init() {
    this.inputFrom.value = this.config.positionFrom.toString();
    this.inputTo.value = this.config.positionTo.toString();
    this.inputMin.value = this.config.min.toString();
    this.inputMax.value = this.config.max.toString();
    this.inputStep.value = this.config.step.toString();
    if (this.config.label) this.inputLabel.checked = true;
    if (!this.config.label) this.inputLabel.checked = false;
    if (this.config.orientation == "horisontal")
      this.inputHorisontal.checked = true;
    if (this.config.orientation == "vertical")
      this.inputVertical.checked = true;
    if (this.config.range) this.inputDouble.checked = true;
    if (!this.config.range) this.inputSingle.checked = true;
  }

  private change() {
    this.panel?.addEventListener("click", (e) => {
      if (e.target == this.inputLabel) {
        let isLabelVisible = this.inputLabel.checked;
        this.$slider.rangeSlider("labelVisible", isLabelVisible);
      }

      if (e.target == this.inputHorisontal && this.inputHorisontal.checked) {
        this.$slider.rangeSlider("orientation", "horisontal");
      }

      if (e.target == this.inputVertical && this.inputVertical.checked) {
        this.$slider.rangeSlider("orientation", "vertical");
      }

      if (e.target == this.inputSingle && this.inputSingle.checked) {
        this.$slider.rangeSlider("range", false);
        this.config.range = false;
        this.checkRange();
      }

      if (e.target == this.inputDouble && this.inputDouble.checked) {
        this.$slider.rangeSlider("range", true);
        this.config.range = true;
        this.checkRange();
      }
      this.inputMin.addEventListener("blur", () => {
        this.$slider.rangeSlider("min", Number(this.inputMin.value));
      });

      this.inputMax.addEventListener("blur", () => {
        this.$slider.rangeSlider("max", Number(this.inputMax.value));
      });

      this.inputStep.addEventListener("blur", () => {
        this.$slider.rangeSlider("step", Number(this.inputStep.value));
      });

      this.inputFrom.addEventListener("blur", () => {
        this.$slider.rangeSlider(
          "position-from",
          Number(this.inputFrom.value)
        );
      });
      this.inputTo.addEventListener("blur", () => {
        this.$slider.rangeSlider("position-to", Number(this.inputTo.value));
      });
    });
  }

  private checkRange() {
    let disabledBlock = this.parent.querySelector(".panel__input_disabled") as HTMLInputElement;
    if (!this.config.range) disabledBlock.disabled = true;
    if (this.config.range) disabledBlock.disabled = false;

  }
  updateInputFrom(data: string) {
    this.inputFrom.value = data;
  }
  updateInputTo(data: string) {
    this.inputTo.value = data;
  }
  updateInputMin(data: string) {
    this.inputMin.value = data;
  }
  updateInputMax(data: string) {
    this.inputMax.value = data;
  }
}

export { PanelController };

