import { Model } from "../MVP/Model/Model";
import { View } from "../MVP/View/View";
import { Presenter } from "../MVP/Presenter/Presenter";
import { PanelController } from "../panelController/panelController";

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

  constructor(container: JQuery<HTMLElement>, settings: ISettings) {
    this.model = new Model(settings);
    this.view = new View(settings, container[0]);
    new Presenter(this.view, this.model);

    new PanelController(container[0], settings);
  }
}

export default RangeSlider;
