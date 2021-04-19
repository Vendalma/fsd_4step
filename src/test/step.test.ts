import Step from '../slider/MVP/View/Step';

interface IConfigStep {
  min: number;
  max: number;
  vertical: boolean;
}

const container = $('<div>');
$(document.body).append(container);

class TestStep extends Step {
  public config: IConfigStep;

  constructor() {
    super(container[0]);
  }
}
const step: TestStep = new TestStep();

describe('Step', () => {
  it('инициализация класса Step', () => {
    expect(step).toBeDefined();
  });

  describe('метод updateValues устанавливает конфиг класса Step и обновляет значения шкалы', () => {
    it('если шкала не добавлена в контейнер слайдера, обновится только конфиг', () => {
      const newConf = {
        min: 0,
        max: 10,
        vertical: true,
      };
      step.updateValues(newConf);

      expect(step.config).toEqual(newConf);
    });

    it('если шкала добавлена в контейнер слайдера, то обновится конфиг и значения шкалы', () => {
      const newConf = {
        min: 1,
        max: 100,
        vertical: false,
      };
      step.addStepLine({ stepSize: 30.5, thumbSize: 17 });
      step.updateValues(newConf);

      const blockMax = container[0].querySelector('.slider__step-block_value-type_max') as HTMLElement;
      const blockMin = container[0].querySelector('.slider__step-block_value-type_min') as HTMLElement;

      expect(blockMax).toContainText('100');
      expect(blockMin).toContainText('1');
    });
  });

  describe('метод addStepLine добавляет шкалу значений', () => {
    beforeEach(function () {
      const blocks = container[0].querySelectorAll('.js-slider__step-block') as NodeListOf<HTMLElement>;
      blocks.forEach((elem) => {
        container[0].removeChild(elem);
      });
    });

    it('если vertical = false, позиции эл-тов рассчитываются по горизонтальной оси', () => {
      step.config = {
        min: 7,
        max: 11,
        vertical: false,
      };

      step.addStepLine({ stepSize: 30.5, thumbSize: 17 });
      const stepBlocks = container[0].querySelectorAll('.js-slider__step-block');

      expect(stepBlocks.length).toEqual(21);
      for (let i = 0; i < stepBlocks.length; i += 1) {
        expect(stepBlocks[i]).not.toHaveClass('slider__step-block_vertical');
        if (i === 0) {
          expect(stepBlocks[i].innerHTML).toEqual('7');
          expect(stepBlocks[i]).toHaveClass('slider__step-block_value-type_min');
        }
        if (i === stepBlocks.length) {
          expect(stepBlocks[i].innerHTML).toEqual('11');
          expect(stepBlocks[i]).toHaveClass('slider__step-block_value-type_max');
        }
      }
    });

    it('vertical = true, позиции эл-тов рассчитываются по вертикальной оси, эл-ты имеют класс slider__step-block_vertical', () => {
      step.config = {
        min: 7,
        max: 11,
        vertical: true,
      };
      step.addStepLine({ stepSize: 30.5, thumbSize: 17 });
      const stepBlocks = container[0].querySelectorAll('.js-slider__step-block') as NodeListOf<HTMLElement>;

      expect(stepBlocks.length).toEqual(21);
      for (let i = 0; i < stepBlocks.length; i += 1) {
        expect(stepBlocks[i]).toHaveClass('slider__step-block_vertical');
        if (i === 0) {
          expect(stepBlocks[i].innerHTML).toEqual('7');
          expect(stepBlocks[i]).toHaveClass('slider__step-block_value-type_min');
        }
        if (i === stepBlocks.length) {
          expect(stepBlocks[i].innerHTML).toEqual('11');
          expect(stepBlocks[i]).toHaveClass('slider__step-block_value-type_max');
        }
      }
    });
  });
});
