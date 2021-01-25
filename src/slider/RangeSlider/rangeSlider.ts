import Model from '../MVP/Model/Model';
import Presenter from '../MVP/Presenter/Presenter';
import View from '../MVP/View/View';
import Observer from '../Observer/Observer';
import { IRangeSlider } from './rangeSliderInterfaces';

class RangeSlider extends Observer implements IRangeSlider {
  private model: Model;

  private presenter: Presenter;

  private view: View;

  private settings: ISettings;

  constructor(container: HTMLElement, settings: ISettings) {
    super();
    this.settings = settings;
    this.model = new Model();
    this.view = new View(container);
    this.presenter = new Presenter(this.model, this.view);

    this.updateConfig(this.settings);
    this.subscribeOnUpdate();
  }

  getConfig(): ISettings | undefined {
    return this.model.getConfig();
  }

  updateConfig(data: IUpdateConfig | ISettings): void {
    this.model.updateConfig(Object.assign(this.settings, data));
  }

  addFollower(follower: unknown): void {
    this.subscribe(follower);
  }

  private subscribeOnUpdate(): void {
    this.model.addFollower(this);
  }

  private update(data: ISettings): void {
    this.broadcast({
      positionFrom: this.getConfig()?.positionFrom,
      positionTo: this.getConfig()?.positionTo,
    });
  }
}
export default RangeSlider;
