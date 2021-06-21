import { IConfig } from '../MVP/Model/types';
import RangeSlider from '../RangeSlider/RangeSlider';
import '../styles.scss';

(function ($) {
  const methods: MethodsObject = {
    init(options: IConfig) {
      return this.each(function (this: HTMLElement) {
        const $this = $(this);
        const rangeSlider = new RangeSlider(this, options);
        $this.data('sliderData', { rangeSlider });
      });
    },

    getPosition(fn: (data?: IConfig) => void) {
      return this.each(function (this: HTMLElement) {
        $(this).data('sliderData').rangeSlider.getPosition(fn);
      });
    },

    setConfig(options: IUpdatedConfig) {
      return this.each(function (this: HTMLElement) {
        $(this).data('sliderData').rangeSlider.setConfig(options);
      });
    },
  };

  jQuery.fn.rangeSlider = function (method?: string | IConfig | IUpdatedConfig) {
    if (typeof method === 'string' && methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); /* eslint-disable-line */
    }

    if (typeof method === 'object' || !method) {
      const defaultSettings = $.extend(
        {
          min: 0,
          max: 100,
          label: true,
          range: true,
          step: 1,
          vertical: false,
          valueFrom: 10,
          valueTo: 50,
        },
        method,
      );
      return methods.init.call(this, defaultSettings);
    }

    return $.error(`Метод с именем ${method} не существует`);
  };
})(jQuery);
