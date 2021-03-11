import Model from '../Model/Model';
import View from '../View/View';
import { IConfig, IDataThumbMove, IPosition, IValuesForSubscribers } from './presenterInterfaces';

class Presenter {
  private model: Model;

  protected view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.subscribeView();
    this.subscribeModel();
  }

  private subscribeView(): void {
    this.view.subscribe(({ value, type }: IValuesForSubscribers) => {
      if (type === 'mouseMove') {
        this.model.findMoveThumbPosition(value as IDataThumbMove);
      } else if (type === 'sliderSize') {
        this.model.calcOnloadPosition(value as number);
      }
    });
  }

  private subscribeModel(): void {
    this.model.subscribe(({ value, type }: IValuesForSubscribers) => {
      if (type === 'positionThumb') {
        this.view.setPosition(value as IPosition);
      } else if (type === 'changeConfig') {
        this.view.setConfig(value as IConfig);
      }
    });
  }
}

export default Presenter;
