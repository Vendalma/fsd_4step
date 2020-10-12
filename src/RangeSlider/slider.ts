import { RangeSlider } from "./rangeSlider";
import { PanelController } from "../panelController/panelController";
import {MutationObserverClass} from './mutationObserver'
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
      let sliderInstance = new MutationObserverClass($[0], options) 
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
    min: function($:any, options: number) {
      $.attr('data-min', options)
    },
    max: function($:any, options: number) {
      $.attr('data-max', options)
    },
    step: function ($:any, options: number) {
      $.attr('data-step', options)
    },
    'position-from': function ($:any, options: number) {
      $.attr('data-from', options)
    },
    'position-to': function ($:any, options: number) {
      $.attr('data-to', options)
    }
  };
  $.fn.rangeSlider = function (method: any, settings: any = undefined) {
    if (methods[method]) {
      let slider = this.children(".slider");
      console.log(slider);
      return methods[method].apply(
        this,
        Array.prototype.slice.call([slider, settings])
      );
    } else if (typeof method === "object" || !method) {
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
        method
      );
      return methods.init.apply(this, [this, defaultSettings]);
    } else {
      $.error("Метод с именем " + method + " не существует");
    }
  };
})(jQuery);
