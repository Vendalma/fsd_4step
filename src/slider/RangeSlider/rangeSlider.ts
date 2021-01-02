import Model from '../MVP/Model/Model';
import Presenter from '../MVP/Presenter/Presenter';
import Observer from '../Observer/Observer';

interface ISettings {
  min: number;
  max: number;
  positionFrom: number;
  positionTo: number;
  range: boolean;
  label: boolean;
  step: number;
  orientation: 'vertical' | 'horizontal';
}
interface IPosition {
  dataFirstThumb?: {
    positionFrom: number;
    valueFrom: number;
  };
  dataSecondThumb?: {
    positionTo: number;
    valueTo: number;
  };
  stepData?: number;
}
interface IUpdateConfig {
  [key: string]: boolean | string | number;
}
class RangeSlider {
  model: Model;

  presenter: Presenter;

  observer: Observer;

  constructor(container: HTMLElement, settings: ISettings) {
    this.model = new Model(settings);
    this.presenter = new Presenter(this.model, container);
    this.observer = new Observer();
    this.subscribeOnUpdate();
  }

  getConf() {
    return this.model.getConfig();
  }

  subscribeOnUpdate(): void {
    this.model.addFollower(this);
  }

  updateConfig(data: IUpdateConfig): void {
    this.model.updateConfig(data);
  }

  addFollower(follower: unknown): void {
    this.observer.subscribe(follower);
  }

  update(data: IPosition): void {
    this.observer.broadcast({
      from: this.getConf()?.positionFrom,
      to: this.getConf()?.positionTo,
    });
  }
}
export default RangeSlider;
