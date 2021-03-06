import SubView from '../slider/MVP/View/SubView';

class TestSubView extends SubView {
  public config: IConfig;

  public sliderSize: number;

  public pixelSize: number;

  public startPosition: number;
}

const subView: TestSubView = new TestSubView();
const config = {
  range: true,
  min: 0,
  max: 100,
  valueFrom: 15,
  valueTo: 30,
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

  it('метод setSliderOptions устанавливает параметры слайдера', () => {
    subView.setSliderOptions({ sliderSize: 400, pixelSize: 0.4 });

    expect(subView.sliderSize).toEqual(400);
    expect(subView.pixelSize).toEqual(0.4);
  });

  it('метод setStartPosition устанавливает начальную точку бегунка на слайдере', () => {
    subView.setStartPosition(30);

    expect(subView.startPosition).toEqual(30);
  });

  it('метод findPositionState рассчитывает позиции и значения бегунков и возвращает объект со значениями', () => {
    expect(subView.findPositionState()).toEqual({
      valueFrom: {
        position: 37.5,
        value: 15,
      },
      valueTo: {
        position: 75,
        value: 30,
      },
    });
  });

  describe('метод findValue рассчитывает новое значение передвинутого бегунка, возвращает объект с границами и именем бегунка', () => {
    it('если изменено положение второго бегунка', () => {
      expect(subView.findValue({ position: 100, dataName: 'to' })).toEqual({
        value: 28,
        leftPointValue: subView.config.valueFrom,
        rightPointValue: subView.config.max,
        nameState: 'valueTo',
      });
    });

    it('если изменено положение первого бегунка и range = true', () => {
      expect(subView.findValue({ position: 3, dataName: 'from' })).toEqual({
        value: 0,
        leftPointValue: subView.config.min,
        rightPointValue: subView.config.valueTo,
        nameState: 'valueFrom',
      });
    });

    it('если изменено положение первого бегунка и range = false', () => {
      subView.config.range = false;

      expect(subView.findValue({ position: 65, dataName: 'from' })).toEqual({
        value: 14,
        leftPointValue: subView.config.min,
        rightPointValue: subView.config.max,
        nameState: 'valueFrom',
      });
    });

    it('если положение бегунка за пределами левой границы слайдера', () => {
      expect(subView.findValue({ position: -10, dataName: 'from' })).toEqual({
        value: subView.config.min,
        leftPointValue: subView.config.min,
        rightPointValue: subView.config.max,
        nameState: 'valueFrom',
      });
    });

    it('если положение бегунка за пределами правой границы слайдера ', () => {
      expect(subView.findValue({ position: 305, dataName: 'to' })).toEqual({
        value: 110,
        leftPointValue: subView.config.valueFrom,
        rightPointValue: subView.config.max,
        nameState: 'valueTo',
      });
    });

    it('если step = 0.1', () => {
      subView.config.step = 0.1;

      expect(subView.findValue({ position: 5, dataName: 'from' })).toEqual({
        value: 0,
        leftPointValue: subView.config.min,
        rightPointValue: subView.config.max,
        nameState: 'valueFrom',
      });
    });
  });
});
