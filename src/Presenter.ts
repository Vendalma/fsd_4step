import { Model } from "./Model";
import { View } from "./View";

export class Presenter {
  view: View;
  model: Model;
  constructor(config: any, conteiner: HTMLElement) {
    this.model = new Model(config);
    this.view = new View(config, conteiner);

    this.view.observer.subscribe(this);
    this.model.observer.subscribe(this);
  }

  update(type: string, data: any) {
    if (type == "mouseMove") this.model.thumbCorrectValue(data);
    else if (type == "position") this.view.setPosition_1(data);
    else if (type == "changeRange") this.model.changeRange(data);
    else if (type == "orientation") this.model.changeOrientation(data);
    else if (type == "stepData") {
      this.view.setStep(data);
      this.view.setOnloadThumbPosition(data);
    } else if (type == "loadData") {
      this.model.getStep(data);
    } else if (type == "sliderWidth") {
      //this.model.stepSize(data);
    }
  }
}

export default Presenter;
