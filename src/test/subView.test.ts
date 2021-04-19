import SubView from '../slider/MVP/View/SubView';

class TestSubView extends SubView {
  public config: IConfig;

  public sliderSize: number;
}

const subView: TestSubView = new TestSubView();
const config = {
  range: true,
  min: 0,
  max: 100,
  positionFrom: 15,
  positionTo: 30,
  label: true,
  step: 1,
  vertical: false,
};

describe('SubView', () => {
  it('Инициализация класса SubView', () => {
    expect(subView).toBeDefined();
  });

  it('метод updateConfig устанавливает значение конфига для класса SubView', () => {
    subView.updateConfig(config);

    expect(subView.config).toEqual(config);
  });

  it('метод setSliderSize устанавливает значение размера слайдера', () => {
    subView.setSliderSize(300);

    expect(subView.sliderSize).toEqual(300);
  });

  it('метод findPositionState рассчитывает позиции и значения бегунков и возвращает объект со значениями', () => {
    expect(subView.findPositionState()).toEqual({
      positionFrom: {
        position: 45,
        value: 15,
      },
      positionTo: {
        position: 90,
        value: 30,
      },
    });
  });

  describe('метод findValue рассчитывает новое значение передвинутого бегунка, возвращает объект с границами и именем бегунка', () => {
    it('если изменено положение второго бегунка', () => {
      expect(subView.findValue({ position: 100, dataName: 'to' })).toEqual({
        value: 33,
        leftPointValue: subView.config.positionFrom,
        rightPointValue: subView.config.max,
        nameState: 'positionTo',
      });
    });

    it('если изменено положение первого бегунка и range = true', () => {
      expect(subView.findValue({ position: 50, dataName: 'from' })).toEqual({
        value: 17,
        leftPointValue: subView.config.min,
        rightPointValue: subView.config.positionTo,
        nameState: 'positionFrom',
      });
    });

    it('если изменено положение первого бегунка и range = false', () => {
      subView.config.range = false;

      expect(subView.findValue({ position: 55, dataName: 'from' })).toEqual({
        value: 18,
        leftPointValue: subView.config.min,
        rightPointValue: subView.config.max,
        nameState: 'positionFrom',
      });
    });
  });
});
