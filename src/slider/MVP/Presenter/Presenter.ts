import Model from '../Model/Model';
import View from '../View/View';

interface IConfig {
  min: number;
  max: number;
  range: boolean;
  positionFrom: number;
  positionTo: number;
  orientation: 'vertical' | 'horizontal';
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
  protected view: View;

  private model: Model;

  constructor(model: Model, container: HTMLElement) {
    this.model = model;
    this.view = new View(this.model.getConfig() as IConfig, container);
    this.subscribeOnUpdate();
  }

  private subscribeOnUpdate(): void {
    this.view.addFollower(this);
    this.model.addFollower(this);
  }

  private update(data: IDataThumbMove | IConfig | IPosition | number, type: string): void {
    if (type === 'mouseMove') {
      this.model.findMoveThumbPosition(data as IDataThumbMove);
    } else if (type === 'positionThumb') {
      this.view.setPositionThumb(data as IPosition);
    } else if (type === 'sliderSize') {
      this.model.calcOnloadPosition(data as number);
    } else if (type === 'changeConfig') {
      this.view.updateConfig(data as IConfig);
    } else if (type === 'changeOrientationOrRange') {
      this.view.changeOrientationOrRange(data as IConfig);
    }
  }
}
export default Presenter;
