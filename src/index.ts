import "./styles.scss";
import { Presenter } from "./Presenter";

(function ($) {
  $.fn.rangeSlider = function (options: {
    min: number;
    max: number;
    position_1: number;
    position_2?: number;
    range: boolean;
    label?: boolean;
    step: number;
    orientation: string;
  }) {
    const settings = $.extend(
      {
        min: 0,
        max: 10,
        position_1: 0,
        range: false,
        label: true,
        step: 1,
        orientation: "horisontal",
      },
      options
    );

    let slider = new Presenter(settings, this[0]);
  };
})(jQuery);

$("#app").rangeSlider({ range: true, position_2: 5 });
