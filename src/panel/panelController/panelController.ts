import { IConfig } from '../../slider/MVP/Model/modelInterfaces';
import './panelController.scss';

class PanelController {
  private parent: HTMLElement;

  private panel: HTMLElement;

  private inputFrom: HTMLInputElement;

  private inputTo: HTMLInputElement;

  private inputMin: HTMLInputElement;

  private inputMax: HTMLInputElement;

  private inputStep: HTMLInputElement;

  private inputLabel: HTMLInputElement;

  private inputHorizontal: HTMLInputElement;

  private inputVertical: HTMLInputElement;

  private inputSingle: HTMLInputElement;

  private inputDouble: HTMLInputElement;

  private slider: HTMLElement;

  private $slider: JQuery<HTMLElement>;

  private config: IConfig;

  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.init();
    this.setConfig();
    this.clickPanel();
    this.checkRange();
  }

  private init(): void {
    this.parent = this.container.parentElement as HTMLElement;
    this.panel = this.parent.querySelector('.js-panel') as HTMLElement;
    this.inputFrom = this.parent.querySelector('.js-panel__input_type_from') as HTMLInputElement;
    this.inputTo = this.parent.querySelector('.js-panel__input_type_to') as HTMLInputElement;
    this.inputMin = this.parent.querySelector('.js-panel__input_type_min') as HTMLInputElement;
    this.inputMax = this.parent.querySelector('.js-panel__input_type_max') as HTMLInputElement;
    this.inputStep = this.parent.querySelector('.js-panel__input_type_step') as HTMLInputElement;
    this.inputLabel = this.parent.querySelector('.js-panel__checkbox_type_label') as HTMLInputElement;
    this.inputHorizontal = this.parent.querySelector('.js-panel__radio_type_horizontal') as HTMLInputElement;
    this.inputVertical = this.parent.querySelector('.js-panel__radio_type_vertical') as HTMLInputElement;
    this.inputSingle = this.parent.querySelector('.js-panel__radio_type_single') as HTMLInputElement;
    this.inputDouble = this.parent.querySelector('.js-panel__radio_type_double') as HTMLInputElement;
    this.slider = this.parent.nextElementSibling as HTMLElement;
    this.$slider = $(this.slider);
    this.$slider.rangeSlider('returnPosition', this.updateConfig.bind(this));
    this.config = this.$slider.data('sliderData').rangeSlider.getConfig();
  }

  private setConfig(): void {
    this.inputFrom.value = `${this.config.positionFrom}`;
    this.inputTo.value = `${this.config.positionTo}`;
    this.inputMin.value = `${this.config.min}`;
    this.inputMax.value = `${this.config.max}`;
    this.inputStep.value = `${this.config.step}`;
    if (this.config.label) this.inputLabel.checked = true;
    if (!this.config.label) this.inputLabel.checked = false;
    if (!this.config.vertical) this.inputHorizontal.checked = true;
    if (this.config.vertical) this.inputVertical.checked = true;
    if (this.config.range) this.inputDouble.checked = true;
    if (!this.config.range) this.inputSingle.checked = true;
  }

  private clickPanel(): void {
    this.panel.addEventListener('click', this.onClickPanel.bind(this));
  }

  private onClickPanel(e: MouseEvent): void {
    if (e.target === this.inputLabel) {
      const isLabelVisible = this.inputLabel.checked;
      this.$slider.rangeSlider('updateConfig', { label: isLabelVisible });
    }

    if (e.target === this.inputHorizontal && this.inputHorizontal.checked) {
      this.$slider.rangeSlider('updateConfig', { vertical: false });
    }

    if (e.target === this.inputVertical && this.inputVertical.checked) {
      this.$slider.rangeSlider('updateConfig', { vertical: true });
    }

    if (e.target === this.inputSingle && this.inputSingle.checked) {
      this.$slider.rangeSlider('updateConfig', { range: false });
      this.checkRange();
    }

    if (e.target === this.inputDouble && this.inputDouble.checked) {
      this.$slider.rangeSlider('updateConfig', { range: true });
      this.checkRange();
    }

    if (e.target === this.inputMin) {
      this.inputMin.addEventListener('blur', this.changeMin.bind(this));
    }

    if (e.target === this.inputMax) {
      this.inputMax.addEventListener('blur', this.changeMax.bind(this));
    }

    if (e.target === this.inputStep) {
      this.inputStep.addEventListener('blur', this.changeStep.bind(this));
    }

    if (e.target === this.inputFrom) {
      this.inputFrom.addEventListener('blur', this.changePositionFrom.bind(this));
    }

    if (e.target === this.inputTo) {
      this.inputTo.addEventListener('blur', this.changePositionTo.bind(this));
    }
  }

  private changeMin(): void {
    this.$slider.rangeSlider('updateConfig', {
      min: Number(this.inputMin.value),
    });
  }

  private changeMax(): void {
    this.$slider.rangeSlider('updateConfig', {
      max: Number(this.inputMax.value),
    });
  }

  private changeStep(): void {
    this.$slider.rangeSlider('updateConfig', {
      step: Number(this.inputStep.value),
    });
  }

  private changePositionFrom(): void {
    this.$slider.rangeSlider('updateConfig', {
      positionFrom: Number(this.inputFrom.value),
    });
  }

  private changePositionTo(): void {
    this.$slider.rangeSlider('updateConfig', {
      positionTo: Number(this.inputTo.value),
    });
  }

  private checkRange(): void {
    const disabledBlock = this.parent.querySelector('.js-panel__input_disabled') as HTMLInputElement;
    if (!this.config.range) disabledBlock.disabled = true;
    if (this.config.range) disabledBlock.disabled = false;
  }

  private updateConfig(data?: IConfig): void {
    this.setConfig();
  }
}
export default PanelController;
