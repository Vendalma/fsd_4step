import PanelController from './panel/panelController/PanelController';
import './slider/jquerySlider/slider';

$('.js-page__slider-app_type_first').rangeSlider();

$('.js-page__slider-app_type_second').rangeSlider({
  range: false,
  min: -9999,
  max: 9999,
  valueFrom: 1500,
  valueTo: 3000,
  label: true,
  step: 1000,
  vertical: true,
});

$('.js-page__slider-app_type_third').rangeSlider({
  max: 110,
  step: 0.5,
  min: -110,
  valueFrom: 5.5,
  valueTo: 99.5,
  label: false,
});

const panels = document.querySelectorAll('.js-panel');
panels.forEach((panel) => {
  return new PanelController(panel as HTMLElement);
});
