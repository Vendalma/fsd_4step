import { Model } from "../MVP/Model/Model";
import { View } from "../MVP/View/View";
import { Presenter } from "../MVP/Presenter/Presenter";

interface ISettings {
  min: number;
  max: number;
  positionFrom: number;
  positionTo: number;
  range: boolean;
  label: boolean;
  step: number;
  orientation: string;
}
export class RangeSlider {
  model: Model;
  view: View;

  constructor(container: HTMLElement, settings: ISettings) {
    this.model = new Model(settings);
    this.view = new View(settings, container);
    new Presenter(this.view, this.model);
  }

  setLabel(data: boolean) {
    this.view.Label(data);
  }

  change(data: any) {
    console.log(data);
  }
}

export default RangeSlider;
