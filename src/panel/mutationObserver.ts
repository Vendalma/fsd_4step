import { PanelController } from "./panelController/panelController";
class MutationObserverClass {
  container: HTMLElement | null;
  panel: PanelController;
  constructor(
    panel: PanelController,
    container: HTMLElement
  ) {
    this.container = container;
    this.panel = panel;

    this.init();
  }
  private init() {
    let that = this;
    let target = this.container?.lastChild as HTMLElement
    const config = {
      attributes: true,
      subtree: true,
      attributeFilter: [
        "data-from",
        "data-to",
      ],
    };
    const callback = function (mutationsList: any, observer: any) {
      for (let mutation of mutationsList) {
        if (mutation.type === "attributes") {
          let name = mutation.attributeName + "";
          let value = target.getAttribute(name) as string;

          if (name == "data-from") {
            that.panel.updateInputFrom(value);

          }
          if (name == "data-to") {
            that.panel.updateInputTo(value);

          }
        }
      }
    };

    const observer = new MutationObserver(callback);
    if (target) observer.observe(target, config);
  }
}
export { MutationObserverClass };

