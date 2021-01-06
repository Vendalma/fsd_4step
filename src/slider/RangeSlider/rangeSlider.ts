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
  vertical: boolean;
}
interface IPosition {
  dataFirstThumb?: {
    positionFrom: number;
    valueFrom: number;
  };
  dataSecondThumb?: {
    positionTo?: number;
    valueTo?: number;
  };
  stepData?: number;
}
interface IUpdateConfig {
  [key: string]: boolean | number;
}
class RangeSlider {
  private model: Model;

  private presenter: Presenter;

  private observer: Observer;

  constructor(container: HTMLElement, settings: ISettings) {
    this.model = new Model(settings);
    this.presenter = new Presenter(this.model, container);
    this.observer = new Observer();
    this.subscribeOnUpdate();
  }

  getConfig(): ISettings | undefined {
    return this.model.getConfig();
  }

  updateConfig(data: IUpdateConfig): void {
    this.model.updateConfig(data);
  }

  addFollower(follower: unknown): void {
    this.observer.subscribe(follower);
  }

  private subscribeOnUpdate(): void {
    this.model.addFollower(this);
  }

  private update(data: IPosition): void {
    this.observer.broadcast({
      positionFrom: this.getConfig()?.positionFrom,
      positionTo: this.getConfig()?.positionTo,
    });
  }
}
export default RangeSlider;
