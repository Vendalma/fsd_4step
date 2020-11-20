import { Model } from "../Model/Model";
import { View } from "../View/View";
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
class Presenter {
  view: View;
  model: Model;
  constructor(model: Model, container: HTMLElement) {
    this.model = model;
    this.view = new View(this.model.getConfig() as IConfig, container);
    this.subscribeOnUpdate();
  }
  subscribeOnUpdate() {
    this.view.addFollower(this);
    this.model.addFollower(this);
  }
  update(type: string, data: any) {
    if (type == "mouseMove") {
      this.model.fundMoveThumbPosition(data);
    } else if (type == "positionThumb") {
      this.view.setPositionThumb(data);
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

