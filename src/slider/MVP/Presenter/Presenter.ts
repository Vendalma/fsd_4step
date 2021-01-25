import Model from '../Model/Model';
import View from '../View/View';
import { IConfig, IDataThumbMove, IPosition } from './presenterInterfaces';

class Presenter {
  private model: Model;

  protected view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
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
      this.view.setConfig(data as IConfig);
    }
  }
}
export default Presenter;
