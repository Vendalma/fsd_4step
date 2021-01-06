import * as $ from 'jquery';
import Observer from '../../slider/Observer/Observer';
import './panelController.scss';

interface ISettings {
  range: boolean;
  vertical: boolean;
  min: number;
  max: number;
  positionFrom: number;
  positionTo: number;
  step: number;
  label: boolean;
}
interface IPositionFromTo {
  positionFrom: number;
  positionTo: number;
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

  $slider: JQuery<HTMLElement>;

  config: ISettings;

  observer: Observer;

  container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.observer = new Observer();
    this.init();
    this.setConfig();
    this.clickPanel();
    this.checkRange();
  }

  init(): void {
    this.parent = this.container.parentElement as HTMLElement;
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
    this.$slider = $(this.parent);
    this.config = this.$slider.data('sliderData').rangeSlider.getConfig();
    this.$slider.rangeSlider('returnPosition', this);
  }

  setConfig(): void {
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

  clickPanel(): void {
    this.panel.addEventListener('click', this.onClickPanel.bind(this));
  }

  onClickPanel(e: MouseEvent): void {
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

  changeMin(): void {
    this.$slider.rangeSlider('updateConfig', {
      min: Number(this.inputMin.value),
    });
  }

  changeMax(): void {
    this.$slider.rangeSlider('updateConfig', {
      max: Number(this.inputMax.value),
    });
  }

  changeStep(): void {
    this.$slider.rangeSlider('updateConfig', {
      step: Number(this.inputStep.value),
    });
  }

  changePositionFrom(): void {
    this.$slider.rangeSlider('updateConfig', {
      positionFrom: Number(this.inputFrom.value),
    });
  }

  changePositionTo(): void {
    this.$slider.rangeSlider('updateConfig', {
      positionTo: Number(this.inputTo.value),
    });
  }

  checkRange(): void {
    const disabledBlock = this.parent.querySelector('.js-panel__input_disabled') as HTMLInputElement;
    if (!this.config.range) disabledBlock.disabled = true;
    if (this.config.range) disabledBlock.disabled = false;
  }

  updateConfigInputFrom(data: number): void {
    this.inputFrom.value = `${data}`;
  }

  updateConfigInputTo(data: number): void {
    this.inputTo.value = `${data}`;
  }

  update(data: IPositionFromTo): void {
    this.updateConfigInputFrom(data.positionFrom);
    if (data.positionTo) this.updateConfigInputTo(data.positionTo);
  }
}

export default PanelController;

function initPanelClass() {
  const panels = document.querySelectorAll('.js-panel');
  panels.forEach((panel) => {
    const sliderPanel = new PanelController(panel as HTMLElement);
  });
}
window.addEventListener('load', initPanelClass.bind(this));
