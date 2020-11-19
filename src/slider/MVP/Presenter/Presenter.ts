import { Model } from "../Model/Model";
import { View } from "../View/View";

class Presenter {
  view: View;
  model: Model;
  constructor(model: Model, container: HTMLElement) {
    this.model = model;
    this.view = new View(this.model.getConfig(), container);
    this.subscribeOnUpdate();
  }
  subscribeOnUpdate() {
    this.view.addFollower(this);
    this.model.addFollower(this);
  }
  update(type: string, data: any) {
    if (type == "mouseMove") {
      this.model.fundMoveThumbPosition(data);
    } else if (type == "position") {
      this.view.setPositionMoveThumb(data);
    } else if (type == "onloadPosition") {
      this.view.setOnloadView(data);
    } else if (type == "sliderSize") {
      this.model.calcParams(data);
    } else if (type == "changeConfig") {
      this.view.updateConfig(data);
    } else if (type == "changeOrientation") {
      this.view.changeOrientation(data);
    }
  }
}
export { Presenter };

