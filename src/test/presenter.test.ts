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

describe('Presenter', () => {
  it('Инициализация Presenter', () => {
    expect(presenter).toBeDefined();
  });

  describe('метод update', () => {
    it('При обновлении конфига Model, Presenter вызывает ф-ю setConfig во View', () => {
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

    it('При нажатии на бегунок, вызывается ф-я findMoveThumbPosition в Model', () => {
      presenter.view.setConfig({
        label: true,
        min: 0,
        max: 100,
        range: false,
        vertical: true,
        step: 1,
        positionFrom: 10,
        positionTo: 100,
      });
      const event = new MouseEvent('click', { bubbles: true });
      spyOn(model, 'findMoveThumbPosition');
      thumb.dispatchEvent(event);

      expect(model.findMoveThumbPosition).toHaveBeenCalled();
    });

    it('При нажатии на бегунок, Model передает вычисления в Presenter и вызывается ф-я setPositionThumb во View', () => {
      presenter.view.setConfig({
        label: true,
        min: 0,
        max: 100,
        range: false,
        vertical: true,
        step: 1,
        positionFrom: 10,
        positionTo: 100,
      });
      const event = new MouseEvent('click', { bubbles: true });
      spyOn(presenter.view, 'setPositionThumb');
      thumb.dispatchEvent(event);

      expect(presenter.view.setPositionThumb).toHaveBeenCalled();
    });
  });
});
