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

  describe('метод updateValues устанавливает конфиг класса Scale и обновляет значения шкалы', () => {
    let newConf: IConfig;
    beforeAll(() => {
      newConf = {
        range: true,
        min: 0,
        max: 100,
        valueFrom: 15,
        valueTo: 50,
        step: 1,
        vertical: false,
        label: true,
      };
    });

    it('если шкала не добавлена в контейнер слайдера, обновится только конфиг', () => {
      scale.updateValues(newConf);

      expect(scale.config).toEqual(newConf);
    });

    it('если шкала добавлена в контейнер слайдера, то обновится конфиг и значения шкалы', () => {
      scale.addScale(200);
      scale.updateValues(newConf);
      const scaleBlocks = container[0].querySelectorAll('.slider__scale-block');

      expect(scaleBlocks[0]).toContainText(`${scale.config.min}`);
      expect(scaleBlocks[scaleBlocks.length - 1]).toContainText(`${scale.config.max}`);
    });
  });

  describe('метод addScale добавляет шкалу значений', () => {
    it('если vertical = false, позиции эл-тов рассчитываются по горизонтальной оси', () => {
      scale.config.vertical = false;
      scale.config.step = 0.1;
      scale.addScale(200);
      const scaleBlocks = container[0].querySelectorAll('.slider__scale-block');

      expect(scaleBlocks.length).toEqual(11);
      for (let i = 0; i < scaleBlocks.length; i += 1) {
        expect(scaleBlocks[i]).not.toHaveClass('slider__scale-block_vertical');
      }
    });

    it('vertical = true, позиции эл-тов рассчитываются по вертикальной оси, эл-ты имеют класс slider__step-block_vertical', () => {
      scale.config.vertical = true;
      scale.config.step = 1;
      scale.addScale(200);
      const scaleBlocks = container[0].querySelectorAll('.slider__scale-block');

      expect(scaleBlocks.length).toEqual(11);
      for (let i = 0; i < scaleBlocks.length; i += 1) {
        expect(scaleBlocks[i]).toHaveClass('slider__scale-block_vertical');
      }
    });
  });

  describe('метод getScaleValues при клике на шкалу возвращает ее значение', () => {
    const event = new MouseEvent('mousedown', {});

    it('vertical = true', () => {
      scale.config.vertical = true;
      scale.addScale(200);
      const scaleBlocks = container[0].querySelectorAll('.slider__scale-block');
      scaleBlocks[1].dispatchEvent(event);

      expect(scale.getScaleValues(event)).toEqual(10);
    });

    it('vertical = false', () => {
      scale.config.vertical = false;
      scale.addScale(200);

      expect(scale.getScaleValues(event)).toEqual(undefined);
    });
  });
});
