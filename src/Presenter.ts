import { Model } from "./model_1";
import { View } from "./view_1";

export class Presenter {
  view: View;
  model: Model;
  constructor() {
    this.view = new View();
    this.model = new Model();

    this.view.observer.subscribe(this);
    this.model.observer.subscribe(this);
  }

  update(type: string, data: any) {
    if (type == "mouseMove") this.model.thumbCorrectValue(data);
    else if (type == "position") this.view.setPosition_1(data);
    else if (type == "changeRange") this.model.changeRange(data);
  }
}
