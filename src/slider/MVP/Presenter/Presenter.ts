import Model from '../Model/Model';
import View from '../View/View';

class Presenter {
  private model: Model;

  protected view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.subscribeModel();
    this.subscribeView();
  }

  private subscribeView(): void {
    this.view.subscribe((data) => {
      switch (data.type) {
        case 'viewChanged':
          this.model.checkPositionValues(data.value);
          break;
      }
    });
  }

  private subscribeModel(): void {
    this.model.subscribe((data) => {
      switch (data.type) {
        case 'configChanged':
          this.view.setConfig(data.value);
          break;
      }
    });
  }
}

export default Presenter;
