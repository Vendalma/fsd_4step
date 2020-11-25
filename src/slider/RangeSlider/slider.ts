import PanelController from '../../panel/panelController/panelController';
import '../styles.scss';
import RangeSlider from './rangeSlider';

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
  [key: string]: Function;
}
interface IUpdateConfig {
  [key: string]: boolean | string | number;
}
(function ($) {
  const methods: MethodsObject = {
    init(options: ISettings) {
      return this.each(function (this: HTMLElement) {
        const $this = $(this);
        const instanceSlider = new RangeSlider(this, options);
        $(this).data('sliderData', {
          instanceSlider,
        });
        const panel = new PanelController(this, options);
      });
    },
    update(options: IUpdateConfig) {
      return this.each(function (this: HTMLElement) {
        $(this).data('sliderData').instanceSlider.updateConfig(options);
      });
    },
  };
  $.fn.rangeSlider = function (method: string, settings: ISettings | IUpdateConfig | undefined) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    if (typeof method === 'object' || !method) {
      const defaultSettings = $.extend(
        {
          min: 0,
          max: 100,
          label: true,
          range: true,
          step: 1,
          orientation: 'horizontal',
          positionFrom: 10,
          positionTo: 50,
        },
        method,
      );
      return methods.init.call(this, defaultSettings);
    }
    $.error(`Метод с именем ${method} не существует`);
  };
})(jQuery);
