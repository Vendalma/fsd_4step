import SliderBlock from '../slider/MVP/View/SliderBlock';

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
const $block = $('<div>');
$(document.body).append($block);
const sliderBlock: SliderBlock = new SliderBlock($block[0]);
const blockSlider = $block[0].querySelector('.js-slider__block') as HTMLElement;
const progressBar = blockSlider.querySelector('.js-slider__progress-bar') as HTMLElement;
const thumbOne = blockSlider.querySelector('.js-slider__thumb_type_first') as HTMLElement;
const thumbSecond = blockSlider.querySelector('.js-slider__thumb_type_second') as HTMLElement;
sliderBlock.updateConfig(config);

describe('Slider Block', () => {
  it('Инициализация Slider Block', () => {
    expect(sliderBlock).toBeDefined();
  });

  it('метод addFollower вызывает ф-ю subscribe и подписывает на обновления класса SliderBlock', () => {
    spyOn(sliderBlock, 'subscribe');
    sliderBlock.addFollower({});

    expect(sliderBlock.subscribe).toHaveBeenCalledWith({});
  });

  describe('метод setPositionThumb', () => {
    it('при заданных параметрах устанавливается прогресс бар', () => {
      const data = {
        stepData: undefined,
        dataFirstThumb: undefined,
        dataSecondThumb: undefined,
      };
      sliderBlock.setPositionThumb(data);

      expect(blockSlider).toContainElement('div.slider__progress-bar');
    });

    it('при заданных параметрах устанавливается шкала значений, прогресс бар, позиции бегунков', () => {
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
  });

  describe('метод updateConfig обновляет конфиг и передает его классам step, thumbOne, thumbTwo, progressBar', () => {
    describe('при vertical = true контейнер слайдера должен иметь класс slider__block_vertical', () => {
      it('если range = false контейнер второго бегунка удаляется', () => {
        const newConf = {
          min: -5,
          max: 40,
          range: false,
          positionFrom: 0,
          positionTo: 10,
          label: false,
          vertical: true,
          step: 1,
        };
        sliderBlock.updateConfig(newConf);

        expect(blockSlider).toHaveClass('slider__block_vertical');
        expect(progressBar).toHaveClass('slider__progress-bar_vertical');
        expect(blockSlider).not.toContainElement('div.js-slider__thumb_type_second');
      });

      it('если range = true контейнер второго бегунка добавляется в слайдер', () => {
        const newConf = {
          min: -5,
          max: 40,
          range: true,
          positionFrom: 0,
          positionTo: 10,
          label: false,
          vertical: true,
          step: 1,
        };
        sliderBlock.updateConfig(newConf);

        expect(blockSlider).toHaveClass('slider__block_vertical');
        expect(progressBar).toHaveClass('slider__progress-bar_vertical');
        expect(blockSlider).toContainElement('div.js-slider__thumb_type_second');
      });
    });

    describe('при vertical = false контейнер слайдера не должен иметь класс slider__block_vertical', () => {
      it('если range = true добавляется контейнер второго бегунка', () => {
        const newConf = {
          min: -5,
          max: 40,
          range: true,
          positionFrom: 0,
          positionTo: 10,
          label: false,
          vertical: false,
          step: 1,
        };
        sliderBlock.updateConfig(newConf);

        expect(blockSlider).not.toHaveClass('slider__block_vertical');
        expect(progressBar).toHaveClass('slider__progress-bar_horizontal');
        expect(blockSlider).toContainElement('div.js-slider__thumb_type_second');
      });

      it('если range = false второй бегунок удаляется', () => {
        const newConf = {
          min: -5,
          max: 40,
          range: false,
          positionFrom: 0,
          positionTo: 10,
          label: false,
          vertical: false,
          step: 1,
        };
        sliderBlock.updateConfig(newConf);

        expect(blockSlider).not.toHaveClass('slider__block_vertical');
        expect(progressBar).toHaveClass('slider__progress-bar_horizontal');
        expect(blockSlider).not.toContainElement('div.js-slider__thumb_type_second');
      });
    });
  });

  describe('метод sliderClick добавляет контейнеру слайдера обработчик событий', () => {
    let event: MouseEvent;
    beforeEach(function () {
      event = new MouseEvent('click', { clientX: 10, clientY: 10 });
      spyOn(sliderBlock, 'broadcast');
    });

    describe('vertical = false вычисляется место клика по горизонтальной оси', () => {
      it('если range = false, при клике на контейнер слайдера бегунок перемещается в это место,класс SliderBlock вызывает метод broadcast и передает данные о положении бегунка', () => {
        sliderBlock.updateConfig({
          range: false,
          min: 0,
          max: 100,
          positionFrom: 15,
          positionTo: 30,
          label: true,
          vertical: false,
          step: 1,
        });
        blockSlider.dispatchEvent(event);

        expect(sliderBlock.broadcast).toHaveBeenCalled();
      });

      it('range = true и клик был совершен рядом с первым бегунком, то он передвигается на место клика', () => {
        sliderBlock.updateConfig({
          range: true,
          min: 0,
          max: 100,
          positionFrom: 15,
          positionTo: 30,
          label: true,
          vertical: false,
          step: 1,
        });

        thumbOne.style.position = 'relative';
        thumbOne.style.left = '10px';
        blockSlider.dispatchEvent(event);

        expect(sliderBlock.broadcast).toHaveBeenCalled();
      });

      it('range = true, если клик был совершен рядом со вторым бегунком, то он сдвигается', () => {
        sliderBlock.updateConfig({
          range: true,
          min: 0,
          max: 100,
          positionFrom: 15,
          positionTo: 30,
          label: true,
          vertical: false,
          step: 1,
        });

        thumbSecond.style.position = 'relative';
        thumbSecond.style.left = '20px';
        blockSlider.dispatchEvent(event);

        expect(sliderBlock.broadcast).toHaveBeenCalled();
      });
    });

    describe('при vertical = true место клика вычисляется по вертикальной оси', () => {
      it('если range = false, бегунок смещается в место клика, SliderBlock передает данные о его движении вызывая метод broadcast, ', () => {
        sliderBlock.updateConfig({
          range: false,
          min: 0,
          max: 100,
          positionFrom: 15,
          positionTo: 30,
          label: true,
          vertical: true,
          step: 1,
        });

        blockSlider.dispatchEvent(event);

        expect(sliderBlock.broadcast).toHaveBeenCalled();
      });
    });

    it('range = true и клик рядом с первым бегунком, он перемещается в место клика', () => {
      sliderBlock.updateConfig({
        range: true,
        min: 0,
        max: 100,
        positionFrom: 15,
        positionTo: 30,
        label: true,
        vertical: true,
        step: 1,
      });
      thumbOne.style.position = 'relative';
      thumbOne.style.top = '100px';
      blockSlider.dispatchEvent(event);

      expect(sliderBlock.broadcast).toHaveBeenCalled();
    });

    it('range = true, клик рядом со вторым бегунком, то он передвигается в это место', () => {
      sliderBlock.updateConfig({
        range: true,
        min: 0,
        max: 100,
        positionFrom: 15,
        positionTo: 30,
        label: true,
        vertical: true,
        step: 1,
      });
      thumbSecond.style.position = 'relative';
      thumbSecond.style.top = '100px';
      blockSlider.dispatchEvent(event);

      expect(sliderBlock.broadcast).toHaveBeenCalled();
    });
  });
});
