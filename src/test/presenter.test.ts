import Model from '../slider/MVP/Model/Model';
import Presenter from '../slider/MVP/Presenter/Presenter';
import View from '../slider/MVP/View/View';

const $block = $('<div>');
$(document.body).append($block);
const model: Model = new Model();
const view: View = new View($block[0]);
const sliderBlock = $block[0].querySelector('.slider__block');

const presenter: Presenter = new Presenter(model, view);

model.updateConfig({
  label: true,
  min: 0,
  max: 100,
  range: false,
  vertical: true,
  step: 1,
  valueFrom: 10,
  valueTo: 100,
});

describe('Presenter', () => {
  it('Инициализация Presenter', () => {
    expect(presenter).toBeDefined();
  });

  it('При изменений позиций бегунков в Model вызывается ф-я checkPositionValues', () => {
    const event = new MouseEvent('mousedown', {
      bubbles: true,
      clientX: 50,
      clientY: 100,
    });
    spyOn(model, 'checkPositionValues');
    sliderBlock?.dispatchEvent(event);

    expect(model.checkPositionValues).toHaveBeenCalled();
  });

  it('При обновлении конфига во View вызывается ф-я setConfig ', () => {
    spyOn(view, 'setConfig');
    model.updateConfig({
      label: true,
      min: 0,
      max: 100,
      range: false,
      vertical: true,
      step: 1,
      valueFrom: 10,
      valueTo: 100,
    });

    expect(view.setConfig).toHaveBeenCalled();
  });
});
