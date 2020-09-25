import { Observer } from "./observer";
import config from "./config";
interface IConfigController {
  range: boolean;
  position_1: number;
  position_2?: number;
}
export class Controller {
  panel: HTMLElement | null;
  panelBlock: HTMLElement;
  inputMinValue: HTMLInputElement | null;
  inputMaxValue: HTMLInputElement | null;
  inputStep: HTMLInputElement | null;
  inputThumbPositionOne: HTMLInputElement | null;
  inputThumbPositionTwo: HTMLInputElement | null;
  horisontal: HTMLInputElement | null;
  vertical: HTMLInputElement | null;
  labelHorisontal: HTMLLabelElement;
  labelVertical: HTMLLabelElement;
  single: HTMLInputElement | null;
  double: HTMLInputElement | null;
  valueLabel: HTMLInputElement | null;

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
    this.panelBlock = document.createElement("div");
    this.panelBlock.classList.add("panel__block");
    this.panel?.append(this.panelBlock);

    this.inputMinValue = document.createElement("input");
    this.inputMinValue.id = "min";
    this.inputMinValue.classList.add("panel__input");
    this.inputMinValue.classList.add("panel__input_medium");

    this.inputMaxValue = document.createElement("input");
    this.inputMaxValue.id = "max";
    this.inputMaxValue.classList.add("panel__input");
    this.inputMaxValue.classList.add("panel__input_medium");

    this.inputStep = document.createElement("input");
    this.inputStep.id = "step";
    this.inputStep.classList.add("panel__input");
    this.inputStep.classList.add("panel__input_medium");

    this.inputThumbPositionOne = document.createElement("input");
    this.inputThumbPositionOne.id = "thumbOnePosition";
    this.inputThumbPositionOne.classList.add("panel__input");
    this.inputThumbPositionOne.classList.add("panel__input_short");

    this.inputThumbPositionTwo = document.createElement("input");
    this.inputThumbPositionTwo.id = "thumbTwoPosition";
    this.inputThumbPositionTwo.classList.add("panel__input");
    this.inputThumbPositionTwo.classList.add("panel__input_short");

    this.single = document.createElement("input");
    this.single.classList.add("panel__radio");
    this.single.value = "single";
    this.single.id = "single";
    this.single.type = "radio";
    this.single.name = "range";

    this.double = document.createElement("input");
    this.double.classList.add("panel__radio");
    this.double.value = "double";
    this.double.id = "double";
    this.double.type = "radio";
    this.double.name = "range";

    this.horisontal = document.createElement("input");
    this.horisontal.classList.add("panel__radio");
    this.horisontal.value = "horisontal";
    this.horisontal.id = "horisontal";
    this.horisontal.type = "radio";
    this.horisontal.name = "orientation";

    this.vertical = document.createElement("input");
    this.vertical.classList.add("panel__radio");
    this.vertical.classList.add("radio_margin-left");
    this.vertical.value = "vertical";
    this.vertical.id = "vertical";
    this.vertical.type = "radio";
    this.vertical.name = "orientation";

    this.labelHorisontal = document.createElement("label");
    this.labelHorisontal.htmlFor = "horisontal";
    this.labelHorisontal.innerHTML = "Горизонтальный";

    this.labelVertical = document.createElement("label");
    this.labelVertical.htmlFor = "vertical";
    this.labelVertical.innerHTML = "Вертикальный";

    this.valueLabel = document.createElement("input");
    this.valueLabel.classList.add("panel__checkbox");
    this.valueLabel.type = "checkbox";
    this.valueLabel.id = "label";

    this.createBlockForRange();
    this.createBlockForSliderOrientation();
    this.createBlockForLabel();
    this.createBlockForMinMax();
    this.createBlockForStep();
    this.createBlockForThumbPosition();
  }

  createBlockForRange() {
    let columnBlock = document.createElement("div");
    columnBlock.innerHTML = "Количество ползунков";
    columnBlock.classList.add("panel__block_column");
    this.panelBlock.append(columnBlock);

    let blockRow = document.createElement("div");
    blockRow.classList.add("panel__block_row");
    columnBlock.append(blockRow);

    let blockForSingle = document.createElement("div");
    blockRow.append(blockForSingle);

    let blockForDouble = document.createElement("div");
    blockRow.append(blockForDouble);

    let labelForSingle = document.createElement("label");
    labelForSingle.innerHTML = "Один";
    labelForSingle.htmlFor = "single";

    let labelForDouble = document.createElement("label");
    labelForDouble.innerHTML = "Два";
    labelForDouble.htmlFor = "double";

    if (this.single && this.double) {
      blockForSingle.append(this.single);
      blockForSingle.append(labelForSingle);

      blockForDouble.append(this.double);
      blockForDouble.append(labelForDouble);
    }
  }

  createBlockForSliderOrientation() {
    let columnBlock = document.createElement("div");
    columnBlock.innerHTML = "Вид слайдера";
    columnBlock.classList.add("panel__block_column");
    this.panelBlock.append(columnBlock);

    let blockRow = document.createElement("div");
    blockRow.classList.add("panel__block_row");
    columnBlock.append(blockRow);

    let blockForHorisontal = document.createElement("div");
    blockRow.append(blockForHorisontal);

    let blockForVertical = document.createElement("div");
    blockForVertical.classList.add("panel__block_margin-l");
    blockRow.append(blockForVertical);

    let labelForHorisontal = document.createElement("label");
    labelForHorisontal.innerHTML = "Горизонтальный";
    labelForHorisontal.htmlFor = "horisontal";

    let labelForVertical = document.createElement("label");
    labelForVertical.innerHTML = "Вертикальный";
    labelForVertical.htmlFor = "vertical";

    if (this.horisontal && this.vertical) {
      blockForHorisontal.append(this.horisontal);
      blockForHorisontal.append(labelForHorisontal);

      blockForVertical.append(this.vertical);
      blockForVertical.append(labelForVertical);
    }
  }

  createBlockForLabel() {
    let columnBlock = document.createElement("div");
    columnBlock.classList.add("panel__block_column");
    this.panelBlock.append(columnBlock);

    let blockForLabel = document.createElement("div");
    blockForLabel.classList.add("panel__block");
    columnBlock.append(blockForLabel);

    let labelForValueLabel = document.createElement("label");
    labelForValueLabel.htmlFor = "label";
    labelForValueLabel.innerHTML = "Показать значение ползунка";

    if (this.valueLabel) {
      blockForLabel.append(this.valueLabel);
      blockForLabel.append(labelForValueLabel);
    }
  }

  createBlockForMinMax() {
    let columnBlock = document.createElement("div");
    columnBlock.classList.add("panel__block_column");
    this.panelBlock.append(columnBlock);

    let blockForMin = document.createElement("div");
    blockForMin.classList.add("panel__block_row");
    columnBlock.append(blockForMin);

    let blockForMax = document.createElement("div");
    blockForMax.classList.add("panel__block_row");
    columnBlock.append(blockForMax);

    let labelForMin = document.createElement("label");
    labelForMin.innerHTML = "Min";
    labelForMin.htmlFor = "min";
    blockForMin.append(labelForMin);

    let labelForMax = document.createElement("label");
    labelForMax.innerHTML = "Max";
    labelForMax.htmlFor = "max";
    blockForMax.append(labelForMax);

    if (this.inputMinValue && this.inputMaxValue) {
      blockForMin.append(this.inputMinValue);
      blockForMax.append(this.inputMaxValue);
    }
  }

  createBlockForStep() {
    let columnBlock = document.createElement("div");
    columnBlock.classList.add("panel__block_column");
    this.panelBlock.append(columnBlock);

    let blockForStep = document.createElement("div");
    blockForStep.classList.add("panel__block_row");
    columnBlock.append(blockForStep);

    let labelForStep = document.createElement("label");
    labelForStep.innerHTML = "Шаг";
    labelForStep.htmlFor = "step";
    blockForStep.append(labelForStep);

    if (this.inputStep) blockForStep.append(this.inputStep);
  }

  createBlockForThumbPosition() {
    let columnBlock = document.createElement("div");
    columnBlock.classList.add("panel__block_column");
    this.panelBlock.append(columnBlock);

    let blockForThumbOne = document.createElement("div");
    blockForThumbOne.classList.add("panel__block_row");
    columnBlock.append(blockForThumbOne);

    let blockForThumbTwo = document.createElement("div");
    blockForThumbTwo.classList.add("panel__block_row");
    columnBlock.append(blockForThumbTwo);

    let labelForThumbOne = document.createElement("label");
    labelForThumbOne.innerHTML = "Ползунок №1";
    labelForThumbOne.htmlFor = "thumbOnePosition";
    blockForThumbOne.append(labelForThumbOne);

    let labelForMax = document.createElement("label");
    labelForMax.innerHTML = "Ползунок №2";
    labelForMax.htmlFor = "thumbTwoPosition";
    blockForThumbTwo.append(labelForMax);

    if (this.inputThumbPositionOne && this.inputThumbPositionTwo) {
      blockForThumbOne.append(this.inputThumbPositionOne);
      blockForThumbTwo.append(this.inputThumbPositionTwo);
    }
  }
}
