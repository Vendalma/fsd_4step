import Model from '../slider/MVP/Model/Model';
import Presenter from '../slider/MVP/Presenter/Presenter';
import View from '../slider/MVP/View/View';

const $block = $('<div>');
$(document.body).append($block);
const model: Model = new Model();
const view: View = new View($block[0]);
const sliderBlock = $block[0].querySelector('.js-slider__block') as HTMLElement;

class TestPresenter extends Presenter {
  public view: View;

  constructor() {
    super(model, view);
  }
}
const presenter: TestPresenter = new TestPresenter();

model.updateConfig({
  label: true,
  min: 0,
  max: 100,
  range: false,
  vertical: true,
  step: 1,
  positionFrom: 10,
  positionTo: 100,
});

describe('Presenter', () => {
  it('Инициализация Presenter', () => {
    expect(presenter).toBeDefined();
  });

  it('При изменений позиций бегунков, View передает данные type === viewChanged, в Model вызывается ф-я updatePosition', () => {
    const event = new MouseEvent('mousedown', { bubbles: true, clientX: 50, clientY: 100 });
    spyOn(model, 'updatePosition');
    sliderBlock.dispatchEvent(event);

    expect(model.updatePosition).toHaveBeenCalled();
  });

  it('При обновлении конфига, Model передает данные type === configChanged, Presenter вызывает ф-ю updateConfig во View', () => {
    spyOn(presenter.view, 'updateConfig');
    model.updateConfig({
      label: true,
      min: 0,
      max: 100,
      range: false,
      vertical: true,
      step: 1,
      positionFrom: 10,
      positionTo: 100,
    });

    expect(presenter.view.updateConfig).toHaveBeenCalled();
  });
});
