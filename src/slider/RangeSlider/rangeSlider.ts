import Model from '../MVP/Model/Model';
import Presenter from '../MVP/Presenter/Presenter';
import View from '../MVP/View/View';
import { IConfig, IUpdatedPosition } from './types';

class RangeSlider {
  private model: Model;

  private presenter: Presenter;

  private view: View;

  private settings: IConfig;

  constructor(container: HTMLElement, settings: IConfig) {
    this.settings = settings;
    this.model = new Model();
    this.view = new View(container);
    this.presenter = new Presenter(this.model, this.view);
    this.updateConfig(this.settings);
  }

  getConfig(): IConfig {
    return this.model.getConfig();
  }

  updateConfig(data: IUpdateConfig | IConfig): void {
    this.model.updateConfig(Object.assign(this.settings, data));
  }

  getUpdatePosition(fn: (value?: IUpdatedPosition) => void): void {
    this.model.subscribe((data) => {
      if (data.type === 'positionThumb') {
        fn({
          positionFrom: this.getConfig().positionFrom,
          positionTo: this.getConfig().positionTo,
        });
      }
    });
  }
}

export default RangeSlider;
