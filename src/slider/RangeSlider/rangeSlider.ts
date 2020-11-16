import { Model } from "../MVP/Model/Model";
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
class RangeSlider {
  model: Model;
  constructor(container: HTMLElement, settings: ISettings) {
    this.model = new Model(settings);
    new Presenter(this.model, container);
  }
  updateConfig(data: any) {
    this.model.updateConf(data)
    console.log(data)
  }
}
export { RangeSlider };

