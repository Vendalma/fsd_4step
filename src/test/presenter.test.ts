import Model from '../slider/MVP/Model/Model';
import Presenter from '../slider/MVP/Presenter/Presenter';
import View from '../slider/MVP/View/View';

interface IConfig {
  min: number;
  max: number;
  range: boolean;
  positionFrom: number;
  positionTo: number;
  orientation: 'vertical' | 'horizontal';
  step: number;
  label: boolean;
}
const config: IConfig = {
  range: true,
  min: 0,
  max: 100,
  positionFrom: 15,
  positionTo: 30,
  label: true,
  step: 1,
  orientation: 'horizontal',
};
const block = $('<div>');
$(document.body).append(block);
const model: Model = new Model(config);
class TestPresenter extends Presenter {
  public view: View;

  constructor() {
    super(model, block[0]);
  }
}
describe('Presenter', () => {
  const presenter: TestPresenter = new TestPresenter();
  it('Инициализация Presenter', () => {
    expect(presenter).toBeDefined();
  });

  it('При загрузке окна браузера Presenter вызывает ф-ю calcOnloadPosition класса Model', () => {
    spyOn(model, 'calcOnloadPosition');
    const event = new UIEvent('load', { bubbles: true });
    window.dispatchEvent(event);

    expect(model.calcOnloadPosition).toHaveBeenCalled();
  });

  it('При обновлении конфига Model Presenter вызывает ф-ю updateConfig во View', () => {
    spyOn(presenter.view, 'updateConfig');
    model.updateConfig({ label: false });

    expect(presenter.view.updateConfig).toHaveBeenCalled();
  });

  it('При изменении в конфиге св-в orientation или range в Model Presenter вызывает ф-ю changeOrientationOrRange во View', () => {
    spyOn(presenter.view, 'changeOrientationOrRange');
    model.updateConfig({ orientation: 'vertical' });

    expect(presenter.view.changeOrientationOrRange).toHaveBeenCalled();
  });

  it('При нажатии на бегунок вызывается ф-я findMoveThumbPosition в Model', () => {
    const thumb = block[0].querySelector('.js-slider__thumb-first') as HTMLElement;
    const event = new MouseEvent('click', { bubbles: true });
    spyOn(model, 'findMoveThumbPosition');
    thumb.dispatchEvent(event);

    expect(model.findMoveThumbPosition).toHaveBeenCalled();
  });
});
