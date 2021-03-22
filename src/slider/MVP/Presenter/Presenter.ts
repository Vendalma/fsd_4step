import Model from '../Model/Model';
import View from '../View/View';

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
    this.view.subscribe((data) => {
      switch (data.type) {
        case 'sliderSize':
          this.model.calcOnloadPosition(data.value);
          break;
        case 'thumbMove':
          this.model.findMoveThumbPosition(data.value);
          break;
      }
    });
  }

  private subscribeModel(): void {
    this.model.subscribe((data) => {
      switch (data.type) {
        case 'positionThumb':
          this.view.setPosition(data.value);
          break;
        case 'changeConfig':
          this.view.setConfig(data.value);
          break;
      }
    });
  }
}

export default Presenter;
