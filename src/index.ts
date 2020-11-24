import './slider/RangeSlider/slider';

$('.js-app').rangeSlider({});
$('.js-app2').rangeSlider({
  range: false,
  min: -9999,
  max: 9999,
  positionFrom: 1500,
  positionTo: 3000,
  label: true,
  step: 1000,
  orientation: 'vertical',
});
$('.js-app3').rangeSlider({
  max: 110,
  step: 0.5,
  min: -110,
  positionFrom: 5.5,
  positionTo: 99.5,
  label: false,
});
