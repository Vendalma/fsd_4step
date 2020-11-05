import "./RangeSlider/slider";
import "./styles.scss";

$(".app").rangeSlider();
$(".app2").rangeSlider({
  range: false,
  min: 10,
  max: 100,
  positionFrom: 15,
  positionTo: 30,
  label: false,
  step: 1,
  orientation: "vertical",
});