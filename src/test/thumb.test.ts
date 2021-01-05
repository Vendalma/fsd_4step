import Thumb from '../slider/MVP/View/Thumb';
import Observer from '../slider/Observer/Observer';

const config = {
  range: true,
  positionFrom: 15,
  positionTo: 30,
  orientation: 'horizontal',
  label: false,
};
const $block = $('<div>');
class TestThumb extends Thumb {
  public observer: Observer;

  constructor() {
    super(config, 'js-slider__thumb-first', $block[0], '1');
  }
}
describe('Thumb', () => {
  const thumb: TestThumb = new TestThumb();
  const observer = jasmine.createSpyObj('observer', ['broadcast', 'subscribe']);
  beforeAll(function () {
    $block[0].classList.add('slider__block');
    $(document.body).append($block);
  });
  thumb.observer = observer;
  const thumbBlock = $block[0].querySelector('.js-slider__thumb-first') as HTMLElement;
  it('инициализация класса Thumb', () => {
    expect(thumb).toBeDefined();
  });

  it('метод addFollower вызывает ф-ю subscribe в классе Observer', () => {
    thumb.addFollower({});

    expect(thumb.observer.subscribe).toHaveBeenCalledWith({});
  });

  it('метод setLabelValue вызывает ф-ю setLabelValue в классе Label', () => {
    thumb.setLabelValue(8);
    const elementLabel = $block[0].querySelector('.slider__label');

    expect(elementLabel).toHaveText('8');
  });

  it('метод removeThis удаляет бегунок из родительского блока', () => {
    thumb.removeThis();

    expect($block).not.toContainElement('div.js-slider__thumb-first');
    expect(thumbBlock).not.toBeInDOM();
  });

  it('метод addThis добавляет блок бегунка в родительский блок', () => {
    thumb.addThis();

    expect($block).toContainElement('div.js-slider__thumb-first');
    expect(thumbBlock).toBeInDOM();
  });

  describe('метод setPosition', () => {
    it('при orientation = horizontal устанавливает бегунку style.left', () => {
      thumb.setPosition(8);

      expect(thumbBlock).toHaveCss({ left: '8px' });
    });

    it('при orientation = vertical устанавливает бегунку style.top', () => {
      thumb.updateConfig({
        range: true,
        positionFrom: 15,
        positionTo: 30,
        orientation: 'vertical',
        label: false,
      });
      thumb.setPosition(8);

      expect(thumbBlock).toHaveCss({ top: '8px' });
    });
  });

  it('при нажатии на бегунок изменяется zIndex контейнера', () => {
    const mousedown = new MouseEvent('mousedown', { bubbles: true });
    thumbBlock.dispatchEvent(mousedown);

    expect(thumbBlock).toHaveClass('slider__thumb_zIndex-up');
  });

  describe('при перемещении мыши, вычисляется позиция бегунка', () => {
    const mousedown = new MouseEvent('mousedown', { bubbles: true });
    const mousemove = new MouseEvent('mousemove', { bubbles: true });
    thumbBlock.dispatchEvent(mousedown);

    const $thumbTwo = $('<div>');
    $thumbTwo[0].classList.add('js-slider__thumb-second');
    $thumbTwo[0].setAttribute('data-num', '2');
    $block.append($thumbTwo);

    let event: MouseEvent;
    beforeEach(function () {
      event = new MouseEvent('mousedown', { clientX: 100, clientY: 105 });
      const thumbFirst = $block[0].querySelector('.js-slider__thumb-first') as HTMLElement;
      const thumbSecond = $block[0].querySelector('.js-slider__thumb-second') as HTMLElement;

      thumbFirst.style.left = '101px';
      thumbFirst.style.top = '58px';

      thumbSecond.style.left = '10px';
      thumbSecond.style.top = '50px';
    });

    describe('horizontal', () => {
      it('range = false', () => {
        thumb.updateConfig({
          range: false,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'horizontal',
          label: false,
        });
        const expectedValue = {
          clientXY: 0,
          sliderClientReact: $block[0].getBoundingClientRect().left,
          dataNum: '1',
          positionThumbSecond: undefined,
        };
        document.dispatchEvent(mousemove);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
      });

      it('range = true, data-num = 1', () => {
        thumb.updateConfig({
          range: true,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'horizontal',
          label: false,
        });
        thumbBlock.dataset.num = '1';

        const expectedValue = {
          clientXY: 0,
          sliderClientReact: $block[0].getBoundingClientRect().left,
          dataNum: '1',
          positionThumbSecond: 10,
        };

        document.dispatchEvent(mousemove);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
      });

      it('range = true, data-num = 2', () => {
        thumb.updateConfig({
          range: false,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'horizontal',
          label: false,
        });
        thumbBlock.dataset.num = '2';

        const expectedValue = {
          clientXY: 0,
          sliderClientReact: $block[0].getBoundingClientRect().left,
          dataNum: '2',
          positionThumbFirst: 101,
        };

        document.dispatchEvent(mousemove);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
      });
    });

    describe('orientation = vertical', () => {
      it('range = false', () => {
        thumb.updateConfig({
          range: false,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'vertical',
          label: false,
        });
        thumbBlock.dataset.num = '1';

        const expectedValue = {
          clientXY: 0,
          sliderClientReact: $block[0].getBoundingClientRect().top,
          dataNum: '1',
          positionThumbSecond: undefined,
        };
        document.dispatchEvent(mousemove);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
      });

      it('range = true, data-num = 1', () => {
        thumb.updateConfig({
          range: true,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'vertical',
          label: false,
        });
        thumbBlock.dataset.num = '1';

        const expectedValue = {
          clientXY: 0,
          sliderClientReact: $block[0].getBoundingClientRect().top,
          dataNum: '1',
          positionThumbSecond: 50,
        };
        document.dispatchEvent(mousemove);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
      });

      it('range = true, data-num = 2', () => {
        thumb.updateConfig({
          range: true,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'vertical',
          label: false,
        });
        thumbBlock.dataset.num = '2';

        const expectedValue = {
          clientXY: 0,
          sliderClientReact: $block[0].getBoundingClientRect().top,
          dataNum: '2',
          positionThumbFirst: 58,
        };
        document.dispatchEvent(mousemove);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
      });
    });
  });

  describe('метод onMouseUp отвязывает обработчики событий, уменьшается zIndex контейнера бегунка, вызывает ф-ии changeZIndexDown и broadcast класса Observer ', () => {
    const mousedown = new MouseEvent('mousedown', { bubbles: true });
    thumbBlock.dispatchEvent(mousedown);
    const mouseup = new MouseEvent('mouseup', { bubbles: true });

    const $thumbTwo = $('<div>');
    $thumbTwo[0].classList.add('js-slider__thumb-second');
    $thumbTwo[0].setAttribute('data-num', '2');
    $block.append($thumbTwo);

    let event: MouseEvent;
    beforeEach(function () {
      const thumbFirst = $block[0].querySelector('.js-slider__thumb-first') as HTMLElement;
      const thumbSecond = $block[0].querySelector('.js-slider__thumb-second') as HTMLElement;
      thumbFirst.style.left = '101px';
      thumbFirst.style.top = '58px';

      thumbSecond.style.left = '10px';
      thumbSecond.style.top = '50px';
    });

    describe('horizontal', () => {
      it('range = false', () => {
        thumb.updateConfig({
          range: false,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'horizontal',
          label: false,
        });
        const expectedValue = {
          clientXY: 0,
          sliderClientReact: $block[0].getBoundingClientRect().left,
          dataNum: '1',
          positionThumbSecond: undefined,
        };
        document.dispatchEvent(mouseup);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
        expect(thumbBlock).not.toHaveClass('slider__thumb_zIndex-up');
      });

      it('range = true, data-num = 1', () => {
        thumb.updateConfig({
          range: true,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'horizontal',
          label: false,
        });
        thumbBlock.dataset.num = '1';

        const expectedValue = {
          clientXY: 0,
          sliderClientReact: $block[0].getBoundingClientRect().left,
          dataNum: '1',
          positionThumbSecond: 10,
        };

        document.dispatchEvent(mouseup);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
        expect(thumbBlock).not.toHaveClass('slider__thumb_zIndex-up');
      });

      it('range = true, data-num = 2', () => {
        thumb.updateConfig({
          range: true,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'horizontal',
          label: false,
        });
        thumbBlock.dataset.num = '2';

        const expectedValue = {
          clientXY: 0,
          sliderClientReact: $block[0].getBoundingClientRect().left,
          dataNum: '2',
          positionThumbFirst: 101,
        };

        document.dispatchEvent(mouseup);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
        expect(thumbBlock).not.toHaveClass('slider__thumb_zIndex-up');
      });
    });

    describe('orientation = vertical', () => {
      it('range = false', () => {
        thumb.updateConfig({
          range: false,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'vertical',
          label: false,
        });
        thumbBlock.dataset.num = '1';

        const expectedValue = {
          clientXY: 0,
          sliderClientReact: $block[0].getBoundingClientRect().top,
          dataNum: '1',
          positionThumbSecond: undefined,
        };
        document.dispatchEvent(mouseup);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
        expect(thumbBlock).not.toHaveClass('slider__thumb_zIndex-up');
      });

      it('range = true, data-num = 1', () => {
        thumb.updateConfig({
          range: true,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'vertical',
          label: false,
        });
        thumbBlock.dataset.num = '1';

        const expectedValue = {
          clientXY: 0,
          sliderClientReact: $block[0].getBoundingClientRect().top,
          dataNum: '1',
          positionThumbSecond: 50,
        };
        document.dispatchEvent(mouseup);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
        expect(thumbBlock).not.toHaveClass('slider__thumb_zIndex-up');
      });

      it('range = true, data-num = 2', () => {
        thumb.updateConfig({
          range: true,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'vertical',
          label: false,
        });
        thumbBlock.dataset.num = '2';

        const expectedValue = {
          clientXY: 0,
          sliderClientReact: $block[0].getBoundingClientRect().top,
          dataNum: '2',
          positionThumbFirst: 58,
        };
        document.dispatchEvent(mouseup);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
        expect(thumbBlock).not.toHaveClass('slider__thumb_zIndex-up');
      });
    });
  });

  it('метод cleanStyleAttr удаляет у контейнера бегунка атрибут style', () => {
    thumb.cleanStyleAttr();

    expect(thumbBlock).not.toHaveAttr('style');
  });

  describe('метод updateConfigThumb обновляет конфиг класса, вызывает ф-цию updateConfig касса Label', () => {
    it('при orientation = vertical', () => {
      thumb.updateConfig({
        range: false,
        positionFrom: 10,
        positionTo: 15,
        orientation: 'vertical',
        label: true,
      });

      expect(thumbBlock).toHaveClass('slider__thumb_vertical');
      expect(thumbBlock).not.toHaveClass('slider__thumb_horizontal');
    });

    it('при orientation = horizontal', () => {
      thumb.updateConfig({
        range: false,
        positionFrom: 10,
        positionTo: 15,
        orientation: 'horizontal',
        label: true,
      });

      expect(thumbBlock).not.toHaveClass('slider__thumb_vertical');
      expect(thumbBlock).toHaveClass('slider__thumb_horizontal');
    });
  });
});
