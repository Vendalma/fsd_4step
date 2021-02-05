import Step from '../slider/MVP/View/Step';

describe('Step', () => {
  const container = $('<div>');
  const step: Step = new Step(container[0]);
  const $thumb = $('<div>');
  beforeAll(function () {
    $thumb[0].classList.add('js-slider__thumb_type_first');
    container.append($thumb);
    $(document.body).append(container);
  });

  it('инициализация класса Step', () => {
    expect(step).toBeDefined();
  });

  describe('метод addStepLine добавляет шкалу значений', () => {
    let stepSize: number;
    beforeAll(function () {
      stepSize = 30.5;
    });

    beforeEach(function () {
      const blocks = container[0].querySelectorAll('.js-slider__step-block') as NodeListOf<HTMLElement>;
      blocks.forEach((elem) => {
        container[0].removeChild(elem);
      });
    });

    it('vertical = false', () => {
      const conf = {
        min: 7,
        max: 11,
        vertical: false,
      };
      step.updateConfig(conf);
      step.addStepLine(stepSize);
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

    it('vertical = true', () => {
      const conf = {
        min: 7,
        max: 11,
        vertical: true,
      };
      step.updateConfig(conf);
      step.addStepLine(stepSize);
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

  it('метод updateConfig обновляет конфиг класса Step', () => {
    const newConf = {
      min: 0,
      max: 10,
      vertical: true,
    };
    step.updateConfig(newConf);
    step.addStepLine(30);
    const blockMax = container[0].querySelector('.slider__step-block_value-type_max') as HTMLElement;
    const blockMin = container[0].querySelector('.slider__step-block_value-type_min') as HTMLElement;

    expect(blockMax).toContainText('10');
    expect(blockMin).toContainText('0');
  });
});
