import { PanelController } from '../../panel/panelController/panelController';
import "../styles.scss";
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
  let sl: any;
  let rangeSlider: any;
  let slider: RangeSlider;
  const methods: MethodsObject = {
    init: function (options: any) {
      return this.each(function (this: HTMLElement) {
        let $this = $(this);
        let data = $this.data('sliderData')
        let instanceSlider = new RangeSlider(this, options)
        let panel = new PanelController(this, options)

        $(this).data('sliderData', {
          slider: slider,
          panel: panel,
          instanceSlider: instanceSlider
        });
      })
    },
    update: function (options: any) {
      return this.each(function (this: HTMLElement) {
        $(this).data('sliderData').instanceSlider.updateConfig(options)
      })
    }
  }

  $.fn.rangeSlider = function (method: string, settings: any = undefined) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    else if (typeof method === "object" || !method) {
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
      return methods.init.call(this, defaultSettings);
    } else {
      $.error("Метод с именем " + method + " не существует");
    }
  }

})(jQuery);
