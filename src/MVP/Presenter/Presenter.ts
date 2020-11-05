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
      this.model.fundThumbPosition(data);
    } else if (type == "position") {
      this.view.setPositionMoveThumb(data);
    } else if (type == "stepData") {
      this.view.setOnloadView(data);
    } else if (type == "loadData") {
      this.model.getStep(data);
    } else if (type == "changeConfig") {
      this.view.updateConfig(data);
    }
  }
}

export { Presenter };

