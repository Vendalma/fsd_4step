import { IConfig } from '../../slider/MVP/Model/types';
import './panelController.scss';

class PanelController {
  private container: HTMLElement;

  private panel: HTMLElement | null;

  private inputFrom: HTMLInputElement | null;

  private inputTo: HTMLInputElement | null;

  private inputMin: HTMLInputElement | null;

  private inputMax: HTMLInputElement | null;

  private inputStep: HTMLInputElement | null;

  private inputLabel: HTMLInputElement | null;

  private inputHorizontal: HTMLInputElement | null;

  private inputVertical: HTMLInputElement | null;

  private inputSingle: HTMLInputElement | null;

  private inputDouble: HTMLInputElement | null;

  private $slider: JQuery<HTMLElement>;

  private config: IConfig;

  constructor(container: HTMLElement) {
    this.container = container;
    this.initElements();
    this.checkConfig();
    this.setConfig();
    this.clickPanel();
    this.checkRange();
  }

  private initElements(): void {
    this.inputFrom = this.container.querySelector('.js-panel__input_type_from');
    this.inputTo = this.container.querySelector('.js-panel__input_type_to');
    this.inputMin = this.container.querySelector('.js-panel__input_type_min');
    this.inputMax = this.container.querySelector('.js-panel__input_type_max');
    this.inputStep = this.container.querySelector('.js-panel__input_type_step');
    this.inputLabel = this.container.querySelector('.js-panel__checkbox_type_label');
    this.inputHorizontal = this.container.querySelector('.js-panel__radio_type_horizontal');
    this.inputVertical = this.container.querySelector('.js-panel__radio_type_vertical');
    this.inputSingle = this.container.querySelector('.js-panel__radio_type_single');
    this.inputDouble = this.container.querySelector('.js-panel__radio_type_double');
    this.$slider = $(this.container).parent().next('.js-page__slider-app');
  }

  private checkConfig(): void {
    this.config = this.$slider.data('sliderData').rangeSlider.getConfig();
    this.$slider.rangeSlider('getPosition', this.updatePosition.bind(this));
  }

  private setConfig(): void {
    if (this.inputFrom) this.inputFrom.value = `${this.config.valueFrom}`;
    if (this.inputTo) this.inputTo.value = `${this.config.valueTo}`;
    if (this.inputMin) this.inputMin.value = `${this.config.min}`;
    if (this.inputMax) this.inputMax.value = `${this.config.max}`;
    if (this.inputStep) this.inputStep.value = `${this.config.step}`;
    if (this.inputLabel) this.inputLabel.checked = !!this.config.label;
    if (this.inputHorizontal && !this.config.vertical) this.inputHorizontal.checked = true;
    if (this.inputVertical && this.config.vertical) this.inputVertical.checked = true;
    if (this.inputDouble && this.config.range) this.inputDouble.checked = true;
    if (this.inputSingle && !this.config.range) this.inputSingle.checked = true;
  }

  private clickPanel(): void {
    this.container.addEventListener('click', this.onClickPanel.bind(this));
  }

  private onClickPanel(e: MouseEvent): void {
    switch (e.target) {
      case this.inputLabel:
        this.clickInputLabel();
        break;
      case this.inputHorizontal:
        this.clickInputHorizontal();
        break;
      case this.inputVertical:
        this.clickInputVertical();
        break;
      case this.inputSingle:
        this.clickInputSingle();
        break;
      case this.inputDouble:
        this.clickInputDouble();
        break;
      case this.inputMin:
        this.inputMin?.addEventListener('blur', this.changeMin.bind(this));
        break;
      case this.inputMax:
        this.inputMax?.addEventListener('blur', this.changeMax.bind(this));
        break;
      case this.inputStep:
        this.inputStep?.addEventListener('blur', this.changeStep.bind(this));
        break;
      case this.inputFrom:
        this.inputFrom?.addEventListener('blur', this.changeValueFrom.bind(this));
        break;
      case this.inputTo:
        this.inputTo?.addEventListener('blur', this.changeValueTo.bind(this));
    }
  }

  private clickInputLabel() {
    if (this.inputLabel) {
      const isLabelVisible = this.inputLabel.checked;
      this.$slider.rangeSlider('setConfig', { label: isLabelVisible });
    }
  }

  private clickInputHorizontal() {
    if (this.inputHorizontal && this.inputHorizontal.checked) {
      this.$slider.rangeSlider('setConfig', { vertical: false });
    }
  }

  private clickInputVertical() {
    if (this.inputVertical && this.inputVertical.checked) {
      this.$slider.rangeSlider('setConfig', { vertical: true });
    }
  }

  private clickInputSingle() {
    if (this.inputSingle && this.inputSingle.checked) {
      this.$slider.rangeSlider('setConfig', { range: false });
      this.checkRange();
    }
  }

  private clickInputDouble() {
    if (this.inputDouble && this.inputDouble.checked) {
      this.$slider.rangeSlider('setConfig', { range: true });
      this.checkRange();
    }
  }

  private changeMin(): void {
    this.$slider.rangeSlider('setConfig', {
      min: Number(this.inputMin?.value),
    });
  }

  private changeMax(): void {
    this.$slider.rangeSlider('setConfig', {
      max: Number(this.inputMax?.value),
    });
  }

  private changeStep(): void {
    this.$slider.rangeSlider('setConfig', {
      step: Number(this.inputStep?.value),
    });
  }

  private changeValueFrom(): void {
    this.$slider.rangeSlider('setConfig', {
      valueFrom: Number(this.inputFrom?.value),
    });
  }

  private changeValueTo(): void {
    this.$slider.rangeSlider('setConfig', {
      valueTo: Number(this.inputTo?.value),
    });
  }

  private checkRange(): void {
    const disabledBlock = this.container?.querySelector<HTMLInputElement>('.js-panel__input_disabled');
    if (disabledBlock) disabledBlock.disabled = !this.config.range;
  }

  private updatePosition(data?: IConfig): void {
    this.config = Object.assign(this.config, data);
    this.setConfig();
  }
}
export default PanelController;
