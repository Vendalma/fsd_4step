import Model from '../MVP/Model/Model';
import Presenter from '../MVP/Presenter/Presenter';

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
  presenter: Presenter;
  constructor(container: HTMLElement, settings: ISettings) {
    this.model = new Model(settings);
    this.presenter = new Presenter(this.model, container);
  }

  updateConfig(data: ISettings): void {
    this.model.updateConfig(data);
  }
}
export default RangeSlider;
