import Model from '../MVP/Model/Model';
import Presenter from '../MVP/Presenter/Presenter';
import View from '../MVP/View/View';
import { ISettings, IUpdateConfig, IUpdatedPosition, valueForBroadcast } from './rangeSliderInterfaces';

class RangeSlider {
  private model: Model;

  private presenter: Presenter;

  private view: View;

  private settings: ISettings;

  constructor(container: HTMLElement, settings: ISettings) {
    this.settings = settings;
    this.model = new Model();
    this.view = new View(container);
    this.presenter = new Presenter(this.model, this.view);
    this.updateConfig(this.settings);
  }

  getConfig(): ISettings {
    return this.model.getConfig();
  }

  updateConfig(data: IUpdateConfig | ISettings): void {
    this.model.updateConfig(Object.assign(this.settings, data));
  }

  getUpdatePosition(fn: (value?: unknown) => void): void {
    this.model.subscribe(({ type }: valueForBroadcast) => {
      if (type === 'positionThumb') {
        fn({
          positionFrom: this.getConfig().positionFrom,
          positionTo: this.getConfig().positionTo,
        } as IUpdatedPosition);
      }
    });
  }
}

export default RangeSlider;
