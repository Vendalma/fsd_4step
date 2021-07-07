import Model from '../MVP/Model/Model';
import Presenter from '../MVP/Presenter/Presenter';
import View from '../MVP/View/View';
import { IConfig, IUpdatedConfig, IUpdatedPosition } from './types';

class RangeSlider {
  private model: Model;

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

  subscribeModel(fn: () => void): void {
    this.model.subscribe(fn);
  }

  unsubscribeModel(fn: () => void): void {
    this.model.unsubscribe(fn);
  }

  private init() {
    this.model = new Model();
    this.view = new View(this.container);
    new Presenter(this.model, this.view);
  }
}

export default RangeSlider;
