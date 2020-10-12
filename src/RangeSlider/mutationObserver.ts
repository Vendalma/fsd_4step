import {RangeSlider} from './rangeSlider'
import {PanelController} from '../panelController/panelController'
import { Label } from '../MVP/View/Label';
interface IObject {
    [key: string]: any;
  }
interface ISettings extends IObject {
    min: number;
    max: number;
    positionFrom: number;
    positionTo: number;
    range: boolean;
    label: boolean;
    step: number;
    orientation: string;
  }
 
export class MutationObserverClass {
    settings :ISettings;
    min: number;
    max: number;
    positionFrom: number;
    positionTo: number;
    range: boolean;
    label: boolean;
    step: number;
    orientation: string;

    container: HTMLElement | null;
    panel: PanelController;
    slider: RangeSlider
    constructor(container: HTMLElement, settings: ISettings) {
        this.container = container;
        this.panel = new PanelController(container, settings)
        this.slider = new RangeSlider(container,settings)


        this.settings = settings;
        this.min = this.settings.min;
        this.max = this.settings.max;
        this.positionFrom = this.settings.positionFrom;
        this.positionTo = this.settings.positionTo;
        this.range = this.settings.range;
        this.label = this.settings.label;
        this.step = this.settings.step;
        this.orientation = this.settings.orientation;

        this.init()
    }
    init() {
        let that = this;
        let target = this.container?.lastChild
        const config = {
          attributes: true,
          subtree: true,
          attributeFilter: ["data-label", "data-orientation",'data-range', 'data-min', 'data-max', 'data-step','data-from', 'data-to'],
        };
        const callback = function (mutationsList: any, observer: any) {
            for (let mutation of mutationsList) {
              if (mutation.type === "attributes" && target instanceof HTMLElement) {
                let name = mutation.attributeName + "";
                let value = target.getAttribute(name);
                if (name == "data-label" && value) {
                  that.slider.setLabel(JSON.parse(value));
                 
                }
      
                if (name == "data-orientation" && value) {
                  that.slider.setOrientation(value);
                }

                if (name == "data-range" && value) {
                    that.slider.setRange(JSON.parse(value));
                  }
                  if (name == "data-min" && value) {
                    that.slider.changeMin(Number(value));
                    console.log(value)
                  }

                  if (name == "data-max" && value) {
                    that.slider.changeMax(Number(value));
                  }
                  if (name == "data-step" && value) {
                    that.slider.changeStep(Number(value));
                  }
                  if (name == "data-from" && value) {
                    that.slider.changePositionFrom(Number(value));
                  }
                  if (name == "data-to" && value) {
                    that.slider.changePositionTo(Number(value));
                  }
              }
            }
          };
      
          const observer = new MutationObserver(callback);
          if (target) observer.observe(target, config);
        }
    }


