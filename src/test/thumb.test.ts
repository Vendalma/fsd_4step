import Thumb from '../slider/MVP/View/Thumb';
import Observer from '../slider/Observer/Observer';

const config = {
  range: true,
  positionFrom: 15,
  positionTo: 30,
  orientation: 'horizontal',
  label: false,
};
const block = $('<div>');
class ChildThumb extends Thumb {
  public observer: Observer;

  constructor() {
    super(config, 'js-slider__thumb-first', block[0], '1');
  }
}
describe('Thumb', () => {
  const thumb: ChildThumb = new ChildThumb();
  const observer = jasmine.createSpyObj('observer', ['broadcast', 'subscribe']);
  beforeAll(function () {
    block[0].classList.add('slider__block');
    $(document.body).append(block);
  });
  const slider = block[0];
  thumb.observer = observer;
  it('инициализация класса Thumb', () => {
    expect(thumb).toBeDefined();
    expect(thumb.thumb).toBeInstanceOf(HTMLElement);
    expect(thumb.thumb).toBeInDOM();
    expect(thumb.thumb).toHaveAttr('data-num', '1');
  });

  it('метод addFollower вызывает ф-ю subscribe в классе Observer', () => {
    thumb.addFollower({});

    expect(thumb.observer.subscribe).toHaveBeenCalledWith({});
  });

  it('метод setLabelValue вызывает ф-ю setLabelValue в классе Label', () => {
    thumb.setLabelValue(8);
    const elementLabel = block[0].querySelector('.slider__label');

    expect(elementLabel).toHaveText('8');
  });

  it('метод removeThis удаляет бегунок из родительского блока', () => {
    thumb.removeThis();

    expect(slider).not.toContainElement('div.js-slider__thumb-first');
    expect(thumb.thumb).not.toBeInDOM();
  });

  it('метод addThis добавляет блок бегунка в родительский блок', () => {
    thumb.addThis();

    expect(slider).toContainElement('div.js-slider__thumb-first');
    expect(thumb.thumb).toBeInDOM();
  });

  describe('метод setPosition', () => {
    it('при orientation = horizontal устанавливает бегунку style.left', () => {
      thumb.setPosition(8);

      expect(thumb.thumb).toHaveCss({ left: '8px' });
    });

    it('при orientation = vertical устанавливает бегунку style.top', () => {
      const config = {
        range: true,
        positionFrom: 15,
        positionTo: 30,
        orientation: 'vertical',
        label: false,
      };
      thumb.updateConfig(config);
      thumb.setPosition(8);

      expect(thumb.thumb).toHaveCss({ top: '8px' });
    });
  });

  it('при нажатии на бегунок изменяется zIndex контейнера', () => {
    const mousedown = new MouseEvent('mousedown', { bubbles: true });
    thumb.thumb.dispatchEvent(mousedown);

    expect(thumb.thumb).toHaveClass('slider__thumb_zIndex-up');
  });

  describe('при перемещении мыши, вычисляется позиция бегунка', () => {
    const mousedown = new MouseEvent('mousedown', { bubbles: true });
    const mousemove = new MouseEvent('mousemove', { bubbles: true });
    thumb.thumb.dispatchEvent(mousedown);

    const thumbTwo = $('<div>');
    thumbTwo[0].classList.add('js-slider__thumb-second');
    thumbTwo[0].setAttribute('data-num', '2');
    block.append(thumbTwo);

    let event: MouseEvent;
    beforeEach(function () {
      event = new MouseEvent('mousedown', { clientX: 100, clientY: 105 });
      const thumbFirst = slider.querySelector('.js-slider__thumb-first') as HTMLElement;
      const thumbSecond = slider.querySelector('.js-slider__thumb-second') as HTMLElement;

      thumbFirst.style.left = '101px';
      thumbFirst.style.top = '58px';

      thumbSecond.style.left = '10px';
      thumbSecond.style.top = '50px';
    });

    describe('horizontal', () => {
      it('range = false', () => {
        const config = {
          range: false,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'horizontal',
          label: false,
        };
        thumb.updateConfig(config);
        const expectedValue = {
          clientXY: 0,
          sliderClientReact: slider.getBoundingClientRect().left,
          dataNum: '1',
          positionThumbSecond: undefined,
        };
        document.dispatchEvent(mousemove);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
      });

      it('range = true, data-num = 1', () => {
        const config = {
          range: true,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'horizontal',
          label: false,
        };
        thumb.updateConfig(config);
        thumb.thumb.dataset.num = '1';

        const expectedValue = {
          clientXY: 0,
          sliderClientReact: slider.getBoundingClientRect().left,
          dataNum: '1',
          positionThumbSecond: 10,
        };

        document.dispatchEvent(mousemove);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
      });

      it('range = true, data-num = 2', () => {
        const config = {
          range: false,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'horizontal',
          label: false,
        };
        thumb.updateConfig(config);
        thumb.thumb.dataset.num = '2';

        const expectedValue = {
          clientXY: 0,
          sliderClientReact: slider.getBoundingClientRect().left,
          dataNum: '2',
          positionThumbFirst: 101,
        };

        document.dispatchEvent(mousemove);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
      });
    });

    describe('orientation = vertical', () => {
      it('range = false', () => {
        const config = {
          range: false,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'vertical',
          label: false,
        };
        thumb.updateConfig(config);
        thumb.thumb.dataset.num = '1';

        const expectedValue = {
          clientXY: 0,
          sliderClientReact: slider.getBoundingClientRect().top,
          dataNum: '1',
          positionThumbSecond: undefined,
        };
        document.dispatchEvent(mousemove);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
      });

      it('range = true, data-num = 1', () => {
        const config = {
          range: true,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'vertical',
          label: false,
        };
        thumb.updateConfig(config);
        thumb.thumb.dataset.num = '1';

        const expectedValue = {
          clientXY: 0,
          sliderClientReact: slider.getBoundingClientRect().top,
          dataNum: '1',
          positionThumbSecond: 50,
        };
        document.dispatchEvent(mousemove);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
      });

      it('range = true, data-num = 2', () => {
        const config = {
          range: true,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'vertical',
          label: false,
        };
        thumb.updateConfig(config);
        thumb.thumb.dataset.num = '2';

        const expectedValue = {
          clientXY: 0,
          sliderClientReact: slider.getBoundingClientRect().top,
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
    thumb.thumb.dispatchEvent(mousedown);
    const mouseup = new MouseEvent('mouseup', { bubbles: true });

    const thumbTwo = $('<div>');
    thumbTwo[0].classList.add('js-slider__thumb-second');
    thumbTwo[0].setAttribute('data-num', '2');
    block.append(thumbTwo);

    let event: MouseEvent;
    beforeEach(function () {
      const thumbFirst = slider.querySelector('.js-slider__thumb-first') as HTMLElement;
      const thumbSecond = slider.querySelector('.js-slider__thumb-second') as HTMLElement;
      thumbFirst.style.left = '101px';
      thumbFirst.style.top = '58px';

      thumbSecond.style.left = '10px';
      thumbSecond.style.top = '50px';
    });

    describe('horizontal', () => {
      it('range = false', () => {
        const config = {
          range: false,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'horizontal',
          label: false,
        };
        thumb.updateConfig(config);
        const expectedValue = {
          clientXY: 0,
          sliderClientReact: slider.getBoundingClientRect().left,
          dataNum: '1',
          positionThumbSecond: undefined,
        };
        document.dispatchEvent(mouseup);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
        expect(thumb.thumb).not.toHaveClass('slider__thumb_zIndex-up');
      });

      it('range = true, data-num = 1', () => {
        const config = {
          range: true,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'horizontal',
          label: false,
        };
        thumb.updateConfig(config);
        thumb.thumb.dataset.num = '1';

        const expectedValue = {
          clientXY: 0,
          sliderClientReact: slider.getBoundingClientRect().left,
          dataNum: '1',
          positionThumbSecond: 10,
        };

        document.dispatchEvent(mouseup);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
        expect(thumb.thumb).not.toHaveClass('slider__thumb_zIndex-up');
      });

      it('range = true, data-num = 2', () => {
        const config = {
          range: true,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'horizontal',
          label: false,
        };
        thumb.updateConfig(config);
        thumb.thumb.dataset.num = '2';

        const expectedValue = {
          clientXY: 0,
          sliderClientReact: slider.getBoundingClientRect().left,
          dataNum: '2',
          positionThumbFirst: 101,
        };

        document.dispatchEvent(mouseup);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
        expect(thumb.thumb).not.toHaveClass('slider__thumb_zIndex-up');
      });
    });

    describe('orientation = vertical', () => {
      it('range = false', () => {
        const config = {
          range: false,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'vertical',
          label: false,
        };
        thumb.updateConfig(config);
        thumb.thumb.dataset.num = '1';

        const expectedValue = {
          clientXY: 0,
          sliderClientReact: slider.getBoundingClientRect().top,
          dataNum: '1',
          positionThumbSecond: undefined,
        };
        document.dispatchEvent(mouseup);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
        expect(thumb.thumb).not.toHaveClass('slider__thumb_zIndex-up');
      });

      it('range = true, data-num = 1', () => {
        const config = {
          range: true,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'vertical',
          label: false,
        };
        thumb.updateConfig(config);
        thumb.thumb.dataset.num = '1';

        const expectedValue = {
          clientXY: 0,
          sliderClientReact: slider.getBoundingClientRect().top,
          dataNum: '1',
          positionThumbSecond: 50,
        };
        document.dispatchEvent(mouseup);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
        expect(thumb.thumb).not.toHaveClass('slider__thumb_zIndex-up');
      });

      it('range = true, data-num = 2', () => {
        const config = {
          range: true,
          positionFrom: 15,
          positionTo: 30,
          orientation: 'vertical',
          label: false,
        };
        thumb.updateConfig(config);
        thumb.thumb.dataset.num = '2';

        const expectedValue = {
          clientXY: 0,
          sliderClientReact: slider.getBoundingClientRect().top,
          dataNum: '2',
          positionThumbFirst: 58,
        };
        document.dispatchEvent(mouseup);

        expect(thumb.observer.broadcast).toHaveBeenCalledWith(expectedValue);
        expect(thumb.thumb).not.toHaveClass('slider__thumb_zIndex-up');
      });
    });
  });

  it('метод cleanStyleAttr удаляет у контейнера бегунка атрибут style', () => {
    thumb.cleanStyleAttr();

    expect(thumb.thumb).not.toHaveAttr('style');
  });

  describe('метод updateConfigThumb обновляет конфиг класса, вызывает ф-цию updateConfig касса Label', () => {
    it('при orientation = vertical', () => {
      const newConf = {
        range: false,
        positionFrom: 10,
        positionTo: 15,
        orientation: 'vertical',
        label: true,
      };
      thumb.updateConfig(newConf);

      expect(thumb.thumb).toHaveClass('slider__thumb_vertical');
      expect(thumb.thumb).not.toHaveClass('slider__thumb_horizontal');
    });

    it('при orientation = horizontal', () => {
      const newConf = {
        range: false,
        positionFrom: 10,
        positionTo: 15,
        orientation: 'horizontal',
        label: true,
      };
      thumb.updateConfig(newConf);

      expect(thumb.thumb).not.toHaveClass('slider__thumb_vertical');
      expect(thumb.thumb).toHaveClass('slider__thumb_horizontal');
    });
  });
});
