import View from '../slider/MVP/View/View';

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

const view: View = new View($block[0]);
const blockSlider = $block[0].querySelector('.js-slider__block') as HTMLElement;
const progressBar = blockSlider.querySelector('.js-slider__progress-bar') as HTMLElement;
const thumbOne = blockSlider.querySelector('.js-slider__thumb_type_first') as HTMLElement;
const thumbSecond = blockSlider.querySelector('.js-slider__thumb_type_second') as HTMLElement;

describe('View', () => {
  beforeEach(() => {
    view.updateConfig(config);
  });

  it('Инициализация View', () => {
    expect(view).toBeDefined();
  });

  describe('метод updateConfig обновляет конфиг View, обновляет положения бегунков на слайдере', () => {
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
        view.updateConfig(newConf);

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
        view.updateConfig(newConf);

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
        view.updateConfig(newConf);

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
        view.updateConfig(newConf);

        expect(blockSlider).not.toHaveClass('slider__block_vertical');
        expect(blockSlider).not.toContainElement('div.js-slider__thumb_type_second');
        expect(progressBar).toHaveClass('slider__progress-bar_horizontal');
      });
    });
  });

  describe('при изменении позиции бегунка, View передает новые данны через метод broadcast', () => {
    const mousedown = new MouseEvent('mousedown', { bubbles: true });
    const mousemove = new MouseEvent('mousemove', { bubbles: true });
    beforeEach(() => {
      spyOn(view, 'broadcast');
    });

    it('range= false', () => {
      view.updateConfig({
        min: -5,
        max: 40,
        range: false,
        positionFrom: 0,
        positionTo: 10,
        label: false,
        vertical: false,
        step: 1,
      });

      thumbOne.dispatchEvent(mousedown);
      document.dispatchEvent(mousemove);

      expect(view.broadcast).toHaveBeenCalled();
    });

    it('range= true', () => {
      view.updateConfig({
        min: -5,
        max: 40,
        range: true,
        positionFrom: 0,
        positionTo: 10,
        label: false,
        vertical: false,
        step: 1,
      });

      thumbSecond.dispatchEvent(mousedown);
      document.dispatchEvent(mousemove);

      expect(view.broadcast).toHaveBeenCalled();
    });
  });

  it('при изменении размера окна браузера, View пересчитывает позиции бегунков и сообщает об изменениях через метод broadcast', () => {
    spyOn(view, 'broadcast');
    const event = new UIEvent('resize', {});
    window.dispatchEvent(event);

    expect(view.broadcast).toHaveBeenCalled();
  });

  describe('при нажатии на контейнер слайдера, бегунок перемещается в место клика, новые данные передаются через метод broadcast', () => {
    let event: MouseEvent;
    beforeEach(function () {
      event = new MouseEvent('click', { clientX: 10, clientY: 10 });
      spyOn(view, 'broadcast');
    });

    describe('vertical = false вычисляется место клика по горизонтальной оси', () => {
      it('range = false', () => {
        view.updateConfig({
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

        expect(view.broadcast).toHaveBeenCalled();
      });

      it('range = true и клик был совершен рядом с первым бегунком, то он передвигается на место клика', () => {
        view.updateConfig({
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

        expect(view.broadcast).toHaveBeenCalled();
      });

      it('range = true, если клик был совершен рядом со вторым бегунком, то он сдвигается', () => {
        view.updateConfig({
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

        expect(view.broadcast).toHaveBeenCalled();
      });
    });

    describe('при vertical = true место клика вычисляется по вертикальной оси', () => {
      it('range = false, ', () => {
        view.updateConfig({
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

        expect(view.broadcast).toHaveBeenCalled();
      });
    });

    it('range = true и клик рядом с первым бегунком, он перемещается в место клика', () => {
      view.updateConfig({
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

      expect(view.broadcast).toHaveBeenCalled();
    });

    it('range = true, клик рядом со вторым бегунком, то он передвигается в это место', () => {
      view.updateConfig({
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

      expect(view.broadcast).toHaveBeenCalled();
    });
  });
});
