import { RangeSlider } from "./rangeSlider";
import { PanelController } from "../panelController/panelController";
import * as $ from "jquery";

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
      console.log(options);
      /*
        options
      );*/
      let slider = new RangeSlider($[0], options);
      let panel = new PanelController($[0], options);
    },
  };
  $.fn.rangeSlider = function (method: any, settings: any = undefined) {
    let defaultSettings = $.extend(
      {
        min: 0,
        max: 10,
        label: true,
        range: true,
        step: 1,
        orientation: "horisontal",
        positionFrom: 0,
        positionTo: 5,
      },
      settings
    );
    let $elem = $(this);
    for (method in methods) {
      if (methods.hasOwnProperty(method)) {
        if (method == "init") {
          return methods[method].call(this, $elem, defaultSettings);
        }
      } else if (typeof method === "object" || !method) {
      } else {
        $.error(
          "Метод с именем " + method + " не существует для jQuery.tooltip"
        );
      }
    }
  };
})(jQuery);
