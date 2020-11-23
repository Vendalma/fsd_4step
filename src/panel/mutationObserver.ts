import PanelController from './panelController/panelController';

class MutationObserverClass {
  container: HTMLElement | null;

  panel: PanelController;

  constructor(panel: PanelController, container: HTMLElement) {
    this.container = container;
    this.panel = panel;
    this.init();
  }

  private init() {
    const that = this;
    const target = this.container?.lastChild as HTMLElement;
    const config = {
      attributes: true,
      subtree: true,
      attributeFilter: ['data-from', 'data-to'],
    };
    const callback = function (mutationsList: any, observer: any) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
          const name = `${mutation.attributeName}`;
          const value = target.getAttribute(name) as string;

          if (name === 'data-from') {
            that.panel.updateInputFrom(value);
          }
          if (name === 'data-to') {
            that.panel.updateInputTo(value);
          }
        }
      }
    };
    const observer = new MutationObserver(callback);
    if (target) observer.observe(target, config);
  }
}
export default MutationObserverClass;
