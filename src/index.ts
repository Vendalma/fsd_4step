import './index.scss';
import './panel/panelController/panelController';
import './slider/jquerySlider/slider';

$('.js-page__slider-app_type_first').rangeSlider();
$('.js-page__slider-app_type_second').rangeSlider({
  range: false,
  min: -9999,
  max: 9999,
  positionFrom: 1500,
  positionTo: 3000,
  label: true,
  step: 1000,
  vertical: true,
});
$('.js-page__slider-app_type_third').rangeSlider({
  max: 110,
  step: 0.5,
  min: -110,
  positionFrom: 5.5,
  positionTo: 99.5,
  label: false,
});
