import Step from '../slider/MVP/View/Step';

const config = {
  min: 0,
  max: 100,
  step: 1,
  vertical: false,
};

describe('Step', () => {
  const container = $('<div>');
  const step: Step = new Step(config, container[0]);
  const $thumb = $('<div>');
  beforeAll(function () {
    $thumb[0].classList.add('js-slider__thumb-first');
    container.append($thumb);
    $(document.body).append(container);
  });

  it('инициализация класса Step', () => {
    expect(step).toBeDefined();
  });

  describe('метода addStepLine добавляет шкалу значений', () => {
    let stepSize: number;
    beforeAll(function () {
      stepSize = 30.5;
    });

    beforeEach(function () {
      const blocks = container[0].querySelectorAll('.slider__step-block') as NodeListOf<HTMLElement>;
      blocks.forEach((elem) => {
        container[0].removeChild(elem);
      });
    });

    it('vertical = false', () => {
      const conf = {
        min: 7,
        max: 11,
        step: 1,
        vertical: false,
      };
      step.updateConfig(conf);
      step.addStepLine(stepSize);
      const stepBlocks = container[0].querySelectorAll('.slider__step-block');

      expect(stepBlocks.length).toEqual(21);
      for (let i = 0; i < stepBlocks.length; i += 1) {
        expect(stepBlocks[i]).not.toHaveClass('slider__step-block_vertical');
        if (i === 0) {
          expect(stepBlocks[i].innerHTML).toEqual('7');
          expect(stepBlocks[i]).toHaveClass('slider__step-block_min');
        }
        if (i === stepBlocks.length) {
          expect(stepBlocks[i].innerHTML).toEqual('11');
          expect(stepBlocks[i]).toHaveClass('slider__step-block_max');
        }
      }
    });

    it('vertical = true', () => {
      const conf = {
        min: 7,
        max: 11,
        step: 1,
        vertical: true,
      };
      step.updateConfig(conf);
      step.addStepLine(stepSize);
      const stepBlocks = container[0].querySelectorAll('.slider__step-block') as NodeListOf<HTMLElement>;

      expect(stepBlocks.length).toEqual(21);
      for (let i = 0; i < stepBlocks.length; i += 1) {
        expect(stepBlocks[i]).toHaveClass('slider__step-block_vertical');
        if (i === 0) {
          expect(stepBlocks[i].innerHTML).toEqual('7');
          expect(stepBlocks[i]).toHaveClass('slider__step-block_min');
        }
        if (i === stepBlocks.length) {
          expect(stepBlocks[i].innerHTML).toEqual('11');
          expect(stepBlocks[i]).toHaveClass('slider__step-block_max');
        }
      }
    });
  });

  it('метод updateConfig обновляет конфиг, изменяет значения min, max', () => {
    const newConf = {
      min: 0,
      max: 10,
      vertical: true,
    };
    step.updateConfig(newConf);
    const blockMax = container[0].querySelector('.slider__step-block_max') as HTMLElement;
    const blockMin = container[0].querySelector('.slider__step-block_min') as HTMLElement;

    expect(blockMax).toContainText('10');
    expect(blockMin).toContainText('0');
  });
});
