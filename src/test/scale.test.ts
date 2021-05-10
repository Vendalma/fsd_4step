import Scale from '../slider/MVP/View/Scale';

const container = $('<div>');
$(document.body).append(container);

class TestScale extends Scale {
  public config: IConfig;

  constructor() {
    super(container[0]);
  }
}
const scale: TestScale = new TestScale();

describe('Scale', () => {
  it('инициализация класса Scale', () => {
    expect(scale).toBeDefined();
  });

  describe('метод initScale устанавливает конфиг, размер слайдера и кол-во пикселей в шаге, добавляет шкалу в контейнер слайдера', () => {
    it('если vertical = false, позиции эл-тов рассчитываются по горизонтальной оси', () => {
      const newConf = {
        range: true,
        min: 0,
        max: 2,
        valueFrom: 15,
        valueTo: 30,
        label: true,
        step: 0.5,
        vertical: false,
      };
      scale.initScale({ config: newConf, sliderSize: 400, pixelSize: 0.4 });
      const scaleBlocks = container[0].querySelectorAll('.slider__scale-block');

      expect(scaleBlocks[0]).toContainText(`${scale.config.min}`);
      expect(scaleBlocks[scaleBlocks.length - 1]).toContainText(`${scale.config.max}`);
    });

    it('vertical = true, позиции эл-тов рассчитываются по вертикальной оси, эл-ты имеют класс slider__step-block_vertical', () => {
      const newConf = {
        range: true,
        min: 0,
        max: 100,
        valueFrom: 15,
        valueTo: 30,
        label: true,
        step: 10,
        vertical: true,
      };
      scale.initScale({ config: newConf, sliderSize: 400, pixelSize: 0.4 });
      const scaleBlocks = container[0].querySelectorAll('.slider__scale-block');

      expect(scaleBlocks[0]).toContainText(`${scale.config.min}`);
      expect(scaleBlocks[scaleBlocks.length - 1]).toContainText(`${scale.config.max}`);
      for (let i = 0; i < scaleBlocks.length; i += 1) {
        expect(scaleBlocks[i]).toHaveClass('slider__scale-block_vertical');
      }
    });
  });

  describe('метод getScaleValues при клике на шкалу возвращает ее значение', () => {
    const event = new MouseEvent('mousedown', {});

    it('vertical = true', () => {
      const newConf = {
        range: true,
        min: 0,
        max: 100,
        valueFrom: 15,
        valueTo: 30,
        label: true,
        step: 10,
        vertical: true,
      };
      scale.initScale({ config: newConf, sliderSize: 400, pixelSize: 0.4 });
      const scaleBlocks = container[0].querySelectorAll('.slider__scale-block');
      scaleBlocks[1].dispatchEvent(event);

      expect(scale.getScaleValue(event)).toEqual(10);
    });

    it('vertical = false', () => {
      const newConf = {
        range: true,
        min: 0,
        max: 100,
        valueFrom: 15,
        valueTo: 30,
        label: true,
        step: 10,
        vertical: false,
      };
      scale.initScale({ config: newConf, sliderSize: 400, pixelSize: 0.4 });

      expect(scale.getScaleValue(event)).toEqual(undefined);
    });
  });
});
