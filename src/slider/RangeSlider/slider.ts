import { PanelController } from "../../panel/panelController/panelController";
import "../styles.scss";
import { MutationObserverClass } from "./mutationObserver";
import { RangeSlider } from "./rangeSlider";
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

interface MethodsObject {
  [key: string]: any;
}
(function ($) {
  const methods: MethodsObject = {
    init: function ($: any, options: any) {
      let panel = new PanelController($[0], options);
      let slider = new RangeSlider($[0], options);
      let mutationObserver = new MutationObserverClass(panel, slider, $[0]);
    },
    labelVisible: function ($: any, options: boolean) {
      $.attr("data-label", options);
    },
    orientation: function ($: any, options: string) {
      $.attr("data-orientation", options);
    },
    range: function ($: any, options: string) {
      $.attr("data-range", options);
    },
    min: function ($: any, options: number) {
      $.attr("data-min", options);
    },
    max: function ($: any, options: number) {
      $.attr("data-max", options);
    },
    step: function ($: any, options: number) {
      $.attr("data-step", options);
    },
    "position-from": function ($: any, options: number) {
      $.attr("data-from", options);
    },
    "position-to": function ($: any, options: number) {
      $.attr("data-to", options);
    },
  };

  $.fn.rangeSlider = function (method: any, settings: any = undefined) {
    if (methods[method]) {
      let slider = this.children(".slider");
      return methods[method].apply(
        this,
        Array.prototype.slice.call([slider, settings])
      );
    } else if (typeof method === "object" || !method) {
      let defaultSettings = $.extend(
        {
          min: 0,
          max: 100,
          label: true,
          range: true,
          step: 1,
          orientation: "horisontal",
          positionFrom: 10,
          positionTo: 50,
        },
        method
      );
      return methods.init.apply(this, [this, defaultSettings]);
    } else {
      $.error("Метод с именем " + method + " не существует");
    }
  };
})(jQuery);
