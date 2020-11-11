import { PanelController } from "../panelController/panelController";
import { RangeSlider } from "./rangeSlider";

class MutationObserverClass {
  container: HTMLElement | null;
  panel: PanelController;
  slider: RangeSlider;
  constructor(
    panel: PanelController,
    slider: RangeSlider,
    container: HTMLElement
  ) {
    this.container = container;
    this.panel = panel;
    this.slider = slider;

    this.init();
  }
  private init() {
    let that = this;
    let target = this.container?.lastChild as HTMLElement
    const config = {
      attributes: true,
      subtree: true,
      attributeFilter: [
        "data-label",
        "data-orientation",
        "data-range",
        "data-min",
        "data-max",
        "data-step",
        "data-from",
        "data-to",
        'data-from-move',
        'data-to-move'
      ],
    };
    const callback = function (mutationsList: any, observer: any) {
      for (let mutation of mutationsList) {
        if (mutation.type === "attributes") {
          let name = mutation.attributeName + "";
          let value = target.getAttribute(name) as string;
          if (name == "data-label") {
            that.slider.setLabel(JSON.parse(value));
          }

          if (name == "data-orientation") {
            that.slider.setOrientation(value);
          }

          if (name == "data-range") {
            that.slider.setRange(JSON.parse(value));
          }
          if (name == "data-min") {
            that.slider.changeMin(Number(value));
            that.panel.updateInputMin(value);
          }

          if (name == "data-max") {
            that.slider.changeMax(Number(value));
            that.panel.updateInputMax(value);
          }
          if (name == "data-step") {
            that.slider.changeStep(Number(value));
          }
          if (name == "data-from") {
            that.slider.changePositionFrom(Number(value));

          }
          if (name == "data-to") {
            that.slider.changePositionTo(Number(value));

          }
          if (name == 'data-from-move') {
            that.panel.updateInputFrom(value);
            that.slider.changePositionFrom(Number(value));
          }
          if (name == 'data-to-move') {
            that.panel.updateInputTo(value);
            that.slider.changePositionTo(Number(value));
          }
        }
      }
    };

    const observer = new MutationObserver(callback);
    if (target) observer.observe(target, config);
  }
}
export { MutationObserverClass };

