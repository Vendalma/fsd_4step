import "./RangeSlider/slider";
import * as $ from "jquery";
import "./styles.scss";

$(".app").rangeSlider();
$(".app2").rangeSlider({
  range: false,

  min: 0,
  max: 100,
  positionFrom: 15,
  label: false,
  step: 1,
  orientation: "vertical",
});
