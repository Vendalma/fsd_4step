import "./panelController.scss";
import * as $ from "jquery";
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
export class PanelController {
  parent: HTMLElement;
  panel: HTMLElement | null;
  inputFrom: HTMLInputElement | null;
  inputTo: HTMLInputElement | null;
  inputMin: HTMLInputElement | null;
  inputMax: HTMLInputElement | null;
  inputStep: HTMLInputElement | null;
  inputLabel: HTMLInputElement | null;
  inputHorisontal: HTMLInputElement | null;
  inputVertical: HTMLInputElement | null;
  inputSingle: HTMLInputElement | null;
  inputDouble: HTMLInputElement | null;
  $slider: JQuery;

  settings: ISettings;
  range: boolean;
  orientation: string;
  min: number;
  max: number;
  positionFrom: number;
  positionTo: number;
  step: number;
  label: boolean;
  constructor(parent: HTMLElement, settings: ISettings) {
    this.parent = parent;

    this.settings = settings;
    this.range = this.settings.range;
    this.orientation = this.settings.orientation;
    this.min = this.settings.min;
    this.max = this.settings.max;
    this.positionFrom = this.settings.positionFrom;
    this.positionTo = this.settings.positionTo;
    this.step = this.settings.step;
    this.label = this.settings.label;

    this.panel = this.parent.querySelector(".panel");
    this.inputFrom = this.parent.querySelector(".panel__input_from");
    this.inputTo = this.parent.querySelector(".panel__input_to");
    this.inputMin = this.parent.querySelector(".panel__input_min");
    this.inputMax = this.parent.querySelector(".panel__input_max");
    this.inputStep = this.parent.querySelector(".panel__input_step");
    this.inputLabel = this.parent.querySelector(".panel__checkbox_label");
    this.inputHorisontal = this.parent.querySelector(
      ".panel__radio_horisontal"
    );
    this.inputVertical = this.parent.querySelector(".panel__radio_vertical");
    this.inputSingle = this.parent.querySelector(".panel__radio_single");
    this.inputDouble = this.parent.querySelector(".panel__radio_double");

    this.$slider = $(this.parent);

    this.init();
    this.change();
    this.checkRange();
  }

  init() {
    if (this.inputFrom) this.inputFrom.value = this.positionFrom + "";
    if (this.inputTo) this.inputTo.value = this.positionTo + "";
    if (this.inputMin) this.inputMin.value = this.min + "";
    if (this.inputMax) this.inputMax.value = this.max + "";
    if (this.inputStep) this.inputStep.value = this.step + "";
    if (this.inputLabel) {
      if (this.label) this.inputLabel.checked = true;
      if (!this.label) this.inputLabel.checked = false;
    }
    if (this.orientation == "horisontal" && this.inputHorisontal)
      this.inputHorisontal.checked = true;
    if (this.orientation == "vertical" && this.inputVertical)
      this.inputVertical.checked = true;

    if (this.range && this.inputDouble)  {
      this.inputDouble.checked = true;
    }
    if (!this.range && this.inputSingle) this.inputSingle.checked = true;

  }

  change() {
    this.panel?.addEventListener("click", (e) => {
      if (e.target == this.inputLabel) {
        let isLabelVisible = this.inputLabel?.checked;
        this.$slider.rangeSlider("labelVisible", isLabelVisible);
      }

      if (e.target == this.inputHorisontal && this.inputHorisontal?.checked) {
        this.$slider.rangeSlider("orientation", "horisontal");
      }

      if (e.target == this.inputVertical && this.inputVertical?.checked) {
        this.$slider.rangeSlider("orientation", "vertical");
      }

      if (e.target == this.inputSingle && this.inputSingle?.checked) {
        this.$slider.rangeSlider("range", false);
        this.range = false
        this.checkRange()
      }

      if (e.target == this.inputDouble && this.inputDouble?.checked) {
        this.$slider.rangeSlider("range", true);
        this.range = true
        this.checkRange()
      }
    this.inputMin?.addEventListener('blur', () => {
      this.$slider.rangeSlider('min', Number(this.inputMin?.value))
    })

    this.inputMax?.addEventListener('blur', ()=> {
      this.$slider.rangeSlider('max', Number(this.inputMax?.value))
    })

      this.inputStep?.addEventListener('blur', ()=> {
        this.$slider.rangeSlider('step', Number(this.inputStep?.value))
      })

      this.inputFrom?.addEventListener('blur', ()=> {
        this.$slider.rangeSlider('position-from', Number(this.inputFrom?.value))
      })
      this.inputTo?.addEventListener('blur', ()=> {
        this.$slider.rangeSlider('position-to', Number(this.inputTo?.value))
      })
    });
  }

  checkRange() {
    let disabledBlock = this.parent.querySelector('.panel__input_disabled')
    if (disabledBlock instanceof HTMLInputElement) {
      if (!this.range) disabledBlock.disabled = true
      if (this.range) disabledBlock.disabled = false
    }
    
  }

  updateInputFrom(data: string) {
    if (this.inputFrom)
    this.inputFrom.value = data
  }

  updateInputTo(data: string) {
    if (this.inputTo)
    this.inputTo.value = data
  }
}

export default PanelController;
