import { Model } from "../MVP/Model/Model";
import { View } from "../MVP/View/View";
import { Presenter } from "../MVP/Presenter/Presenter";
import { htmlPrefilter } from "jquery";

interface ISettings {
  min: number;
  max: number;
  positionFrom: number;
  positionTo: number;
  range: boolean;
  label: boolean;
  step: number;
  orientation: string;
}
export class RangeSlider {
  model: Model;
  view: View;

  container: HTMLElement;

  constructor(container: HTMLElement, settings: ISettings) {
    this.model = new Model(settings);
    this.view = new View(settings, container);
    new Presenter(this.view, this.model);

    this.container = container;
    this.observer();
  }

  setLabel(data: boolean) {
    this.view.Label(data);
  }

  setOrientation(data: string) {
    //console.log(data);
    this.view.checkOrientation(data);
  }
  change(data: any) {
    console.log(data);
  }

  observer() {
    var target = this.container.lastChild;
    let that = this;
    const config = {
      attributes: true,
      subtree: true,
      attributeFilter: ["data-label", "data-orientation"],
    };

    const callback = function (mutationsList: any, observer: any) {
      for (let mutation of mutationsList) {
        if (mutation.type === "attributes" && target instanceof HTMLElement) {
          let name = mutation.attributeName + "";
          let value = target.getAttribute(name);

          if (name == "data-label" && value) {
            that.setLabel(JSON.parse(value));
          }

          if (name == "data-orientation" && value) {
            that.setOrientation(value);
          }
        }
      }
    };

    const observer = new MutationObserver(callback);
    if (target) observer.observe(target, config);
  }
}

export default RangeSlider;
