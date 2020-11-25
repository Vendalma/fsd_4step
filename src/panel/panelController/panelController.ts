import * as $ from 'jquery';
import Observer from '../../slider/Observer/Observer';
import './panelController.scss';

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

  inputHorizontal: HTMLInputElement;

  inputVertical: HTMLInputElement;

  inputSingle: HTMLInputElement;

  inputDouble: HTMLInputElement;

  $slider: JQuery;

  config: ISettings;

  observer: Observer;

  constructor(parent: HTMLElement, config: ISettings) {
    this.parent = parent;
    this.config = config;
    this.$slider = $(this.parent);

    this.observer = new Observer();
    this.init();
    this.setConfig();
    this.clickPanel();
    this.checkRange();
    this.$slider.data('sliderData').instanceSlider.addFollower(this);
  }

  init(): void {
    this.panel = this.parent.querySelector('.js-panel') as HTMLElement;
    this.inputFrom = this.parent.querySelector('.js-panel__input-from') as HTMLInputElement;
    this.inputTo = this.parent.querySelector('.js-panel__input-to') as HTMLInputElement;
    this.inputMin = this.parent.querySelector('.js-panel__input-min') as HTMLInputElement;
    this.inputMax = this.parent.querySelector('.js-panel__input-max') as HTMLInputElement;
    this.inputStep = this.parent.querySelector('.js-panel__input-step') as HTMLInputElement;
    this.inputLabel = this.parent.querySelector('.js-panel__checkbox-label') as HTMLInputElement;
    this.inputHorizontal = this.parent.querySelector('.js-panel__radio-horizontal') as HTMLInputElement;
    this.inputVertical = this.parent.querySelector('.js-panel__radio-vertical') as HTMLInputElement;
    this.inputSingle = this.parent.querySelector('.js-panel__radio-single') as HTMLInputElement;
    this.inputDouble = this.parent.querySelector('.js-panel__radio-double') as HTMLInputElement;
  }

  setConfig(): void {
    this.inputFrom.value = `${this.config.positionFrom}`;
    this.inputTo.value = `${this.config.positionTo}`;
    this.inputMin.value = `${this.config.min}`;
    this.inputMax.value = `${this.config.max}`;
    this.inputStep.value = `${this.config.step}`;
    if (this.config.label) this.inputLabel.checked = true;
    if (!this.config.label) this.inputLabel.checked = false;
    if (this.config.orientation === 'horizontal') this.inputHorizontal.checked = true;
    if (this.config.orientation === 'vertical') this.inputVertical.checked = true;
    if (this.config.range) this.inputDouble.checked = true;
    if (!this.config.range) this.inputSingle.checked = true;
  }

  clickPanel(): void {
    this.panel.addEventListener('click', this.onClickPanel.bind(this));
  }

  onClickPanel(e: MouseEvent): void {
    if (e.target === this.inputLabel) {
      const isLabelVisible = this.inputLabel.checked;
      this.$slider.rangeSlider('update', { label: isLabelVisible });
    }

    if (e.target === this.inputHorizontal && this.inputHorizontal.checked) {
      this.$slider.rangeSlider('update', { orientation: 'horizontal' });
    }

    if (e.target === this.inputVertical && this.inputVertical.checked) {
      this.$slider.rangeSlider('update', { orientation: 'vertical' });
    }

    if (e.target === this.inputSingle && this.inputSingle.checked) {
      this.$slider.rangeSlider('update', { range: false });
      this.config.range = false;
      this.checkRange();
    }

    if (e.target === this.inputDouble && this.inputDouble.checked) {
      this.$slider.rangeSlider('update', { range: true });
      this.config.range = true;
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

  changeMin(): void {
    this.$slider.rangeSlider('update', {
      min: Number(this.inputMin.value),
    });
  }

  changeMax(): void {
    this.$slider.rangeSlider('update', {
      max: Number(this.inputMax.value),
    });
  }

  changeStep(): void {
    this.$slider.rangeSlider('update', {
      step: Number(this.inputStep.value),
    });
  }

  changePositionFrom(): void {
    this.$slider.rangeSlider('update', {
      positionFrom: Number(this.inputFrom.value),
    });
  }

  changePositionTo(): void {
    this.$slider.rangeSlider('update', {
      positionTo: Number(this.inputTo.value),
    });
  }

  checkRange(): void {
    const disabledBlock = this.parent.querySelector('.js-panel__input_disabled') as HTMLInputElement;
    if (!this.config.range) disabledBlock.disabled = true;
    if (this.config.range) disabledBlock.disabled = false;
  }

  updateInputFrom(data: number): void {
    this.inputFrom.value = `${data}`;
  }

  updateInputTo(data: number): void {
    this.inputTo.value = `${data}`;
  }

  update(type: string, data: number): void {
    if (type === 'firstThumb') {
      this.updateInputFrom(data);
    } else if (type === 'secondThumb') {
      this.updateInputTo(data);
    }
  }
}

export default PanelController;
