import RangeSlider from '../RangeSlider/rangeSlider';
import '../styles.scss';

(function ($) {
  const methods: MethodsObject = {
    init(options: ISettings) {
      return this.each(function (this: HTMLElement) {
        const $this = $(this);
        const rangeSlider = new RangeSlider(this, options);
        $this.data('sliderData', { rangeSlider });
      });
    },
    returnPosition(subscriber: unknown) {
      return this.each(function (this: HTMLElement) {
        $(this).data('sliderData').rangeSlider.addFollower(subscriber);
      });
    },
    updateConfig(options: IUpdateConfig) {
      return this.each(function (this: HTMLElement) {
        $(this).data('sliderData').rangeSlider.updateConfig(options);
      });
    },
  };
  jQuery.fn.rangeSlider = function (
    /* eslint-disable-line */
    method?: string | unknown | undefined,
    settings?: ISettings | IUpdateConfig | unknown | undefined,
  ) {
    if (methods[method as string]) {
      return methods[method as string].apply(this, Array.prototype.slice.call(arguments, 1)); /* eslint-disable-line */
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
          positionFrom: 10,
          positionTo: 50,
        },
        method,
      );
      return methods.init.call(this, defaultSettings);
    }
    return $.error(`Метод с именем ${method} не существует`);
  };
})(jQuery);
