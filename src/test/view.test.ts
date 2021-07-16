import View from '../slider/MVP/View/View';

const $block = $('<div>');
$(document.body).append($block);

class TestView extends View {
  public config: IConfig;

  constructor() {
    super($block[0]);
  }
}

const view: TestView = new TestView();
const blockSlider = $block[0].querySelector('.slider__block');
const sliderWrapper = blockSlider?.parentElement as HTMLElement;
const progressBar = blockSlider?.querySelector('.slider__progress-bar');
const thumbFirst = blockSlider?.querySelector('.slider__thumb_type_first') as HTMLElement;
const thumbSecond = blockSlider?.querySelector('.slider__thumb_type_second') as HTMLElement;
const label = thumbFirst?.querySelector('.slider__label');

describe('View', () => {
  it('Инициализация View', () => {
    expect(view).toBeDefined();
  });

  describe('метод setConfig обновляет конфиг View', () => {
    it('vertical = true, компонентам слайдера добавляются классы для отображения вертикального положения ', () => {
      view.setConfig({
        range: true,
        min: 0,
        max: 100,
        valueFrom: 15,
        valueTo: 30,
        label: true,
        step: 1,
        vertical: true,
      });

      expect(blockSlider).toHaveClass('slider__block_vertical');
      expect(progressBar).toHaveClass('slider__progress-bar_vertical');
      expect(thumbFirst).toHaveClass('slider__thumb_vertical');
      expect(thumbSecond).toHaveClass('slider__thumb_vertical');
    });

    it('vertical = false, бегункам и прогресс бару добавляются классы для отображения горизонтального положения', () => {
      view.config.vertical = true;
      view.setConfig({
        range: false,
        min: 0,
        max: 100,
        valueFrom: 15,
        valueTo: 30,
        label: true,
        step: 1,
        vertical: false,
      });

      expect(blockSlider).not.toHaveClass('slider__block_vertical');
      expect(progressBar).toHaveClass('slider__progress-bar_horizontal');
      expect(thumbFirst).toHaveClass('slider__thumb_horizontal');
      expect(thumbSecond).toHaveClass('slider__thumb_horizontal');
    });

    it('если меняются значения valueFrom или valueTo, то обновляется лейбл', () => {
      view.setConfig({
        range: false,
        min: 0,
        max: 100,
        valueFrom: 11,
        valueTo: 30,
        label: true,
        step: 1,
        vertical: false,
      });

      expect(label?.textContent).toEqual(`${view.config.valueFrom}`);
    });
  });

  describe('при изменении позиции бегунка, View передает новые данны через метод broadcast', () => {
    const mousedown = new MouseEvent('mousedown', { bubbles: true });
    const mousemove = new MouseEvent('mousemove', { bubbles: true });
    beforeEach(() => {
      spyOn(view, 'broadcast');
    });

    it('range= false', () => {
      view.config.range = false;
      thumbFirst?.dispatchEvent(mousedown);
      document.dispatchEvent(mousemove);

      expect(view.broadcast).toHaveBeenCalled();
    });

    it('range= true', () => {
      view.config.range = true;
      thumbSecond?.dispatchEvent(mousedown);
      document.dispatchEvent(mousemove);

      expect(view.broadcast).toHaveBeenCalled();
    });
  });

  describe('при нажатии на контейнер слайдера, бегунок перемещается в место клика, новые данные передаются через метод broadcast', () => {
    let event: MouseEvent;
    beforeEach(function () {
      event = new MouseEvent('mousedown', { clientX: 100, clientY: 100 });
      spyOn(view, 'broadcast');
    });

    describe('vertical = false вычисляется место клика по горизонтальной оси', () => {
      it('range = false', () => {
        view.setConfig({
          range: false,
          min: 0,
          max: 100,
          valueFrom: 15,
          valueTo: 30,
          label: true,
          vertical: false,
          step: 1,
        });
        blockSlider?.dispatchEvent(event);

        expect(view.broadcast).toHaveBeenCalled();
      });

      it('range = true и клик был совершен рядом с первым бегунком, то он передвигается на место клика', () => {
        view.setConfig({
          range: true,
          min: 0,
          max: 100,
          valueFrom: 10,
          valueTo: 100,
          label: true,
          vertical: false,
          step: 1,
        });

        event = new MouseEvent('mousedown', { clientX: -300 });
        blockSlider?.dispatchEvent(event);

        expect(view.broadcast).toHaveBeenCalled();
      });

      it('range = true, если клик был совершен рядом со вторым бегунком, то он сдвигается', () => {
        view.setConfig({
          range: true,
          min: 0,
          max: 100,
          valueFrom: 15,
          valueTo: 30,
          label: true,
          vertical: false,
          step: 1,
        });
        event = new MouseEvent('mousedown', { clientX: 300 });
        blockSlider?.dispatchEvent(event);

        expect(view.broadcast).toHaveBeenCalled();
      });

      it('если позиция 1 бегунка = 0, а позиция 2 бегунка = размеру слайдера, то при клике на минимальное значение перемещается второй бегунок', () => {
        view.setConfig({
          range: true,
          min: 99,
          max: 100,
          valueFrom: 99,
          valueTo: 100,
          label: true,
          vertical: false,
          step: 1,
        });

        sliderWrapper.style.width = '40px';
        thumbFirst.style.position = 'absolute';
        thumbFirst.style.left = '0px';
        thumbSecond.style.position = 'absolute';
        thumbSecond.style.left = '40px';
        event = new MouseEvent('mousedown', { clientX: 0 });

        blockSlider?.dispatchEvent(event);

        expect(view.broadcast).toHaveBeenCalled();
      });
    });

    describe('при vertical = true место клика вычисляется по вертикальной оси', () => {
      it('range = false, ', () => {
        view.setConfig({
          range: false,
          min: 0,
          max: 100,
          valueFrom: 15,
          valueTo: 30,
          label: true,
          vertical: true,
          step: 1,
        });
        blockSlider?.dispatchEvent(event);

        expect(view.broadcast).toHaveBeenCalled();
      });
    });

    it('range = true и клик рядом с первым бегунком, он перемещается в место клика', () => {
      view.setConfig({
        range: true,
        min: 0,
        max: 100,
        valueFrom: 15,
        valueTo: 30,
        label: true,
        vertical: true,
        step: 1,
      });
      blockSlider?.dispatchEvent(event);

      expect(view.broadcast).toHaveBeenCalled();
    });

    it('range = true, клик рядом со вторым бегунком, то он передвигается в это место', () => {
      view.setConfig({
        range: true,
        min: 99,
        max: 100,
        valueFrom: 99,
        valueTo: 100,
        label: true,
        vertical: true,
        step: 1,
      });
      event = new MouseEvent('mousedown', { clientY: 400 });
      blockSlider?.dispatchEvent(event);

      expect(view.broadcast).toHaveBeenCalled();
    });

    it('если позиция 1 бегунка = 0, а позиция 2 бегунка = размеру слайдера, то при клике на максимальное значение перемещается первый бегунок', () => {
      view.setConfig({
        range: true,
        min: -99,
        max: -98,
        valueFrom: -99,
        valueTo: -98,
        label: true,
        vertical: true,
        step: 1,
      });

      sliderWrapper.style.height = '40px';
      thumbFirst.style.position = 'absolute';
      thumbFirst.style.top = '0px';
      thumbSecond.style.position = 'absolute';
      thumbSecond.style.top = '40px';
      event = new MouseEvent('mousedown', { clientY: 40 });
      blockSlider?.dispatchEvent(event);

      expect(view.broadcast).toHaveBeenCalled();
    });

    it('если клик на бегунок, то он не передвигается', () => {
      view.setConfig({
        range: true,
        min: 99,
        max: 100,
        valueFrom: 99,
        valueTo: 100,
        label: true,
        vertical: true,
        step: 1,
      });
      event = new MouseEvent('mousedown', { clientY: -400 });
      thumbFirst?.dispatchEvent(event);

      expect(view.broadcast).not.toHaveBeenCalled();
    });
  });
});
