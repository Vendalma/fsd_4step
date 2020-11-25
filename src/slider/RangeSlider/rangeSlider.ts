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
  orientation: string;
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

  subscribeOnUpdate(): void {
    this.model.addFollower(this);
  }

  updateConfig(data: ISettings): void {
    this.model.updateConfig(data);
  }

  addFollower(follower: unknown): void {
    this.observer.subscribe(follower);
  }

  update(type: string, data: IPosition): void {
    if (type === 'positionThumb') {
      if (data.dataFirstThumb) {
        this.observer.broadcast('firstThumb', data.dataFirstThumb.valueFrom);
      }
      if (data.dataSecondThumb) {
        this.observer.broadcast('secondThumb', data.dataSecondThumb.valueTo);
      }
    }
  }
}
export default RangeSlider;
