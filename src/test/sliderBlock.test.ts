import SliderBlock from '../slider/MVP/View/sliderBlock';
import Observer from '../slider/Observer/Observer';

const config = {
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
class ChildSliderBlock extends SliderBlock {
  public observer: Observer;
  constructor() {
    super(config, block[0]);
  }
}
describe('Slider Block', () => {
  const sliderBlock: ChildSliderBlock = new ChildSliderBlock();
  const observer = jasmine.createSpyObj('observer', ['subscribe', 'broadcast']);
  sliderBlock.observer = observer;
  let blockSlider: HTMLElement;
  let progressBar: HTMLElement;
  let thumbOne: HTMLElement;
  let thumbSecond: HTMLElement;
  beforeAll(function () {
    blockSlider = block[0].querySelector('.slider__block') as HTMLElement;
    progressBar = blockSlider.querySelector('.slider__progress-bar') as HTMLElement;
    thumbOne = blockSlider.querySelector('.js-slider__thumb-first') as HTMLElement;
    thumbSecond = blockSlider.querySelector('.js-slider__thumb-second') as HTMLElement;
  });
  it('Инициализация Slider Block', () => {
    expect(sliderBlock).toBeDefined();
  });

  it('метод addFollower вызывает observer.subscribe', () => {
    sliderBlock.addFollower({});
    expect(sliderBlock.observer.subscribe).toHaveBeenCalledWith({});
  });

  describe('метод setPositionThumb', () => {
    it('При заданных параметрах устанавливается шкала значений, прогресс бар, позиции бегунков', () => {
      const data = {
        stepData: 30.5,
        dataFirstThumb: {
          positionFrom: 100,
          valueFrom: 5,
        },
        dataSecondThumb: {
          positionTo: 200,
          valueTo: 9,
        },
      };
      sliderBlock.setPositionThumb(data);
      expect(blockSlider).toContainElement('div.slider__step-block');
      expect(blockSlider).toContainElement('div.slider__progress-bar');
      expect(thumbOne).toHaveCss({ left: '100px' });
      expect(thumbSecond).toHaveCss({ left: '200px' });
    });

    it('При указанных параметрах устанавливается шкала значений, прогресс бар', () => {
      const data = {
        stepData: 30,
        dataFirstThumb: undefined,
        dataSecondThumb: undefined,
      };
      sliderBlock.setPositionThumb(data);
      expect(blockSlider).toContainElement('div.slider__step-block');
      expect(blockSlider).toContainElement('div.slider__progress-bar');
    });

    it('При заданных параметрах обновляется позиция первого бегунка и прогресс бар', () => {
      const data = {
        dataFirstThumb: {
          positionFrom: 110,
          valueFrom: 6,
        },
        dataSecondThumb: undefined,
        stepData: undefined,
      };
      sliderBlock.setPositionThumb(data);
      expect(blockSlider).toContainElement('div.slider__progress-bar');
      expect(thumbOne).toHaveCss({ left: '110px' });
    });

    it('При заданных параметрах обновляется позиция второго бегунка и прогресс бар', () => {
      const data = {
        dataSecondThumb: {
          positionTo: 210,
          valueTo: 10,
        },
        dataFirstThumb: undefined,
        stepData: undefined,
      };
      sliderBlock.setPositionThumb(data);
      expect(blockSlider).toContainElement('div.slider__progress-bar');
      expect(thumbSecond).toHaveCss({ left: '210px' });
    });
  });

  describe('метод updateConfig обновляет конфиг, передает новый его классам step, thumbOne, thumbTwo, progressBar', () => {
    describe('При orientation = vertical контейнер слайдера должен иметь класс slider__block_vertical', () => {
      it('если range = false контейнер второго бегунка удаляется', () => {
        const newConf = {
          min: -5,
          max: 40,
          range: false,
          positionFrom: 0,
          positionTo: 10,
          label: false,
          orientation: 'vertical',
        };
        sliderBlock.updateConfig(newConf);
        expect(blockSlider).toHaveClass('slider__block_vertical');
        expect(progressBar).toHaveClass('slider__progress-bar_vertical');
        expect(blockSlider).not.toContainElement('div.js-slider__thumb-second');
      });
      it('если range = true контейнер второго бегунка добавляется в слайдер', () => {
        const newConf = {
          min: -5,
          max: 40,
          range: true,
          positionFrom: 0,
          positionTo: 10,
          label: false,
          orientation: 'vertical',
        };
        sliderBlock.updateConfig(newConf);
        expect(blockSlider).toHaveClass('slider__block_vertical');
        expect(progressBar).toHaveClass('slider__progress-bar_vertical');
        expect(blockSlider).toContainElement('div.js-slider__thumb-second');
      });
    });
    describe('при orientation = horizontal контейнер слайдера не должен иметь класс slider__block_vertical', () => {
      it('если range = true добавляется контейнер второго бегунка', () => {
        const newConf = {
          min: -5,
          max: 40,
          range: true,
          positionFrom: 0,
          positionTo: 10,
          label: false,
          orientation: 'horizontal',
        };
        sliderBlock.updateConfig(newConf);
        expect(blockSlider).not.toHaveClass('slider__block_vertical');
        expect(progressBar).toHaveClass('slider__progress-bar_horizontal');
        expect(blockSlider).toContainElement('div.js-slider__thumb-second');
      });
      it('если range = false второй бегунок удаляется', () => {
        const newConf = {
          min: -5,
          max: 40,
          range: false,
          positionFrom: 0,
          positionTo: 10,
          label: false,
          orientation: 'horizontal',
        };
        sliderBlock.updateConfig(newConf);
        expect(blockSlider).not.toHaveClass('slider__block_vertical');
        expect(progressBar).toHaveClass('slider__progress-bar_horizontal');
        expect(blockSlider).not.toContainElement('div.js-slider__thumb-second');
      });
    });
  });

  describe('метод sliderClick добавляет контейнеру слайдера обработчик событий', () => {
    let event: MouseEvent;
    let spy: unknown;
    beforeEach(function () {
      event = new MouseEvent('click', { bubbles: true });
      spy = spyOnEvent('.slider__block', 'click');
    });

    describe('orientation = horizontal', () => {
      it('range = false', () => {
        sliderBlock.updateConfig({
          range: false,
          min: 0,
          max: 100,
          positionFrom: 15,
          positionTo: 30,
          label: true,
          orientation: 'horizontal',
        });
        blockSlider.dispatchEvent(event);
        expect(spy).toHaveBeenTriggered();
      });

      it('range = true', () => {
        sliderBlock.updateConfig({
          range: true,
          min: 0,
          max: 100,
          positionFrom: 15,
          positionTo: 30,
          label: true,
          orientation: 'horizontal',
        });
        blockSlider.dispatchEvent(event);
        expect(spy).toHaveBeenTriggered();
      });
    });
    describe('при orientation = vertical', () => {
      it('если range = false', () => {
        sliderBlock.updateConfig({
          range: false,
          min: 0,
          max: 100,
          positionFrom: 15,
          positionTo: 30,
          label: true,
          orientation: 'vertical',
        });
        blockSlider.dispatchEvent(event);
        expect(spy).toHaveBeenTriggered();
      });
    });
    it('range = true', () => {
      sliderBlock.updateConfig({
        range: true,
        min: 0,
        max: 100,
        positionFrom: 15,
        positionTo: 30,
        label: true,
        orientation: 'vertical',
      });
      blockSlider.dispatchEvent(event);
      expect(spy).toHaveBeenTriggered();
    });
  });
});
