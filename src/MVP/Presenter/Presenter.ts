import { Model } from "../Model/Model";
import { View } from "../View/View";

export class Presenter {
  view: View;
  model: Model;
  constructor(view: View, model: Model) {
    this.model = model;
    this.view = view;

    this.view.observer.subscribe(this);
    this.model.observer.subscribe(this);
  }

  update(type: string, data: any) {
    if (type == "mouseMove") this.model.thumbCorrectValue(data);
    else if (type == "position") this.view.setPosition_1(data);
    else if (type == "stepData") {
      this.view.setStep(data);
      this.view.setOnloadThumbPosition(data);
    } else if (type == "loadData") {
      this.model.getStep(data);
    } 
  }
}

export default Presenter;
