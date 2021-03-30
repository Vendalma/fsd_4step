import Model from '../slider/MVP/Model/Model';
import Presenter from '../slider/MVP/Presenter/Presenter';
import View from '../slider/MVP/View/View';

const $block = $('<div>');
$(document.body).append($block);
const model: Model = new Model();
const view: View = new View($block[0]);
const thumb = $block[0].querySelector('.js-slider__thumb_type_first') as HTMLElement;

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

  describe('метод subscribeView', () => {
    it('При нажатии на бегунок, view передает данные type === mouseMove, в Model вызывается ф-я findMoveThumbPosition', () => {
      const event = new MouseEvent('click', { bubbles: true });
      spyOn(model, 'findMoveThumbPosition');
      thumb.dispatchEvent(event);

      expect(model.findMoveThumbPosition).toHaveBeenCalled();
    });

    it('При изменении размера окна браузера, view передает данные type === sliderSize, в Model вызывается ф-я calcOnloadPosition', () => {
      spyOn(model, 'calcOnloadPosition');
      presenter.view.broadcast({ value: 135, type: 'sliderSize' });

      expect(model.calcOnloadPosition).toHaveBeenCalled();
    });
  });

  describe('метод subscribeModel', () => {
    it('При обновлении конфига, Model передает данные type === changeConfig, Presenter вызывает ф-ю setConfig во View', () => {
      spyOn(presenter.view, 'setConfig');
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

      expect(presenter.view.setConfig).toHaveBeenCalled();
    });

    it('При нажатии на бегунок, Model передает данные type === positionThumb и вызывается ф-я setPositionThumb во View', () => {
      const event = new MouseEvent('click', { bubbles: true });
      spyOn(presenter.view, 'setPosition');
      thumb.dispatchEvent(event);

      expect(presenter.view.setPosition).toHaveBeenCalled();
    });

    it('При изменении размера окна браузера, Model передает данные type === stepSize и вызывается ф-я addStepLine во View', () => {
      spyOn(presenter.view, 'addStepLine');
      presenter.view.broadcast({ value: 135, type: 'sliderSize' });

      expect(presenter.view.addStepLine).toHaveBeenCalled();
    });
  });
});
