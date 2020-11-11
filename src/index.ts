import "./RangeSlider/slider";
import "./styles.scss";

$(".app").rangeSlider({
  max: 110,
  step: 0.2,
  min: -110,
  positionFrom: 10,
  positionTo: 55
});
$(".app2").rangeSlider({
  range: false,
  min: -9999,
  max: 9999,
  positionFrom: 1500,
  positionTo: 3000,
  label: false,
  step: 105,
  orientation: "vertical",
});
$(".app3").rangeSlider({
});