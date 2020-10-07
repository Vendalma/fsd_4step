import "./styles.scss";
import { RangeSlider } from "./RangeSlider/rangeSlider";
import * as $ from "jquery";

(function ($) {
  $.fn.rangeSlider = function (options: any) {
    return this.each(function () {
      let obj = $(this);
      new RangeSlider(obj, options);
    });
  };
})(jQuery);

$(".app").rangeSlider({
  range: true,
  positionTo: 15,
  min: 0,
  max: 10,
  positionFrom: 5,

  label: true,
  step: 1,
  orientation: "horisontal",
});
$(".app2").rangeSlider({
  range: false,

  min: 0,
  max: 10,
  positionFrom: 110,
  positionTo: 150,
  label: false,
  step: 1,
  orientation: "vertical",
});
