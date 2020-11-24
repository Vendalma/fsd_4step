import Model from '../Model/Model';
import View from '../View/View';

interface IConfig {
  min: number;
  max: number;
  range: boolean;
  positionFrom: number;
  positionTo: number;
  orientation: string;
  step: number;
  label: boolean;
}
interface IDataThumbMove {
  clientXY: number;
  sliderClientReact: number;
  dataNum: string;
  positionThumbFirst: number;
  positionThumbSecond: number;
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
class Presenter {
  view: View;

  model: Model;

  constructor(model: Model, container: HTMLElement) {
    this.model = model;
    this.view = new View(this.model.getConfig() as IConfig, container);
    this.subscribeOnUpdate();
  }

  subscribeOnUpdate(): void {
    this.view.addFollower(this);
    this.model.addFollower(this);
  }

  update(type: string, data: IDataThumbMove | IConfig | IPosition | number): void {
    if (type === 'mouseMove') {
      this.model.fundMoveThumbPosition(data as IDataThumbMove);
    } else if (type === 'positionThumb') {
      this.view.setPositionThumb(data as IPosition);
    } else if (type === 'sliderSize') {
      this.model.calcParams(data as number);
    } else if (type === 'changeConfig') {
      this.view.updateConfig(data as IConfig);
    } else if (type === 'changeOrientationOrRange') {
      this.view.changeOrientationOrRange(data as IConfig);
    }
  }
}
export default Presenter;
