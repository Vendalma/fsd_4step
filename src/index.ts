import "./RangeSlider/slider";
import * as $ from "jquery";
import "./styles.scss";

$(".app").rangeSlider("init");
$(".app2").rangeSlider("init", {
  range: false,

  min: 0,
  max: 10,
  positionFrom: 110,
  positionTo: 150,
  label: false,
  step: 1,
  orientation: "vertical",
});
