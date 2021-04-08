import Model from '../MVP/Model/Model';
import Presenter from '../MVP/Presenter/Presenter';
import View from '../MVP/View/View';
import { IConfig, IUpdatedConfig, IUpdatedPosition } from './types';

class RangeSlider {
  private model: Model;

  private presenter: Presenter;

  private view: View;

  private settings: IConfig;

  private container: HTMLElement;

  constructor(container: HTMLElement, settings: IConfig) {
    this.settings = settings;
    this.container = container;
    this.init();
    this.setConfig(settings);
  }

  setConfig(data: IUpdatedConfig | IConfig): void {
    this.model.updateConfig(Object.assign(this.settings, data));
  }

  getConfig(): IConfig {
    this.model.subscribe((data) => {
      if (data.type === 'configChanged') {
        this.settings = data.value;
      }
    });
    return this.settings;
  }

  getPosition(fn: (value?: IUpdatedPosition) => void): void {
    this.model.subscribe((data) => {
      if (data.type === 'positionChanged') {
        fn(data.value);
      }
    });
  }

  private init() {
    this.model = new Model();
    this.view = new View(this.container);
    this.presenter = new Presenter(this.model, this.view);
  }
}

export default RangeSlider;
