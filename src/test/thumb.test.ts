import Thumb from '../slider/MVP/View/Thumb';

const config = {
  range: true,
  positionFrom: 15,
  positionTo: 30,
  orientation: 'horizontal',
  label: false,
};

describe('Thumb', () => {
  const block = $('<div>');
  const thumb: Thumb = new Thumb(config, 'js-slider__thumb-first', block[0], '1');
  const observer = jasmine.createSpyObj('observer', ['broadcast', 'subscribe']);
  const label = jasmine.createSpyObj('label', ['updateConfig', 'setLabelValue']);
  beforeEach(function () {
    block[0].classList.add('slider__block');
    $(document.body).append(block);
  });
  thumb.observer = observer;
  thumb.label = label;
  it('инициализация класса Thumb', () => {
    expect(thumb).toBeDefined();
    expect(thumb.countThumbs).toBeInstanceOf(String);
    expect(thumb.thumb).toBeInstanceOf(HTMLElement);
    expect(thumb.config).toEqual(config);
    expect(thumb.countThumbs).toEqual('js-slider__thumb-first');
    expect(thumb.slider).toBeInstanceOf(HTMLElement);
    expect(thumb.slider).toContainElement('div.js-slider__thumb-first');
    expect(thumb.thumb).toBeInDOM();
    expect(thumb.thumb).toHaveAttr('data-num', '1');
  });

  it('метод addFollower вызывает ф-ю subscribe в классе Observer', () => {
    thumb.addFollower({});

    expect(thumb.observer.subscribe).toHaveBeenCalledWith({});
  });

  it('метод setLabelValue вызывает ф-ю setLabelValue в классе Label', () => {
    thumb.setLabelValue(8);

    expect(thumb.label.setLabelValue).toHaveBeenCalledWith(8);
  });

  it('метод removeThis удаляет бегунок из родительского блока', () => {
    thumb.removeThis();

    expect(thumb.slider).not.toContainElement('div.js-slider__thumb-first');
    expect(thumb.thumb).not.toBeInDOM();
  });

  it('метод addThis добавляет блок бегунка в родительский блок', () => {
    thumb.addThis();

    expect(thumb.slider).toContainElement('div.js-slider__thumb-first');
    expect(thumb.thumb).toBeInDOM();
  });

  describe('метод setPosition', () => {
    it('при orientation = horizontal устанавливает бегунку style.left', () => {
      thumb.config.orientation = 'horizontal';
      thumb.setPosition(8);

      expect(thumb.thumb).toHaveCss({ left: '8px' });
    });

    it('при orientation = vertical устанавливает бегунку style.top', () => {
      thumb.config.orientation = 'vertical';
      thumb.setPosition(8);

      expect(thumb.thumb).toHaveCss({ top: '8px' });
    });
  });

  describe('метод checkOrientation', () => {
    it('при orientation = vertical добавляет контейнеру бегунка класс slider__thumb_vertical и удаляет класс slider__thumb_horizontal', () => {
      thumb.config.orientation = 'vertical';
      thumb.checkOrientation();

      expect(thumb.thumb).toHaveClass('slider__thumb_vertical');
      expect(thumb.thumb).not.toHaveClass('slider__thumb_horizontal');
    });

    it('при orientation = horizontal добавляет контейнеру бегунка класс slider__thumb_horizontal и удаляет класс slider__thumb_vertical', () => {
      thumb.config.orientation = 'horizontal';
      thumb.checkOrientation();

      expect(thumb.thumb).toHaveClass('slider__thumb_horizontal');
      expect(thumb.thumb).not.toHaveClass('slider__thumb_vertical');
    });
  });

  it('метод moveThumb вешает на контейнер бегунка событие mousedown и вызывает ф-ю mouseDown', () => {
    spyOn(thumb, 'mouseDown');
    const mousedown = new MouseEvent('mousedown', { bubbles: true });
    thumb.moveThumb();
    thumb.thumb.dispatchEvent(mousedown);

    expect(thumb.mouseDown).toHaveBeenCalledWith(mousedown);
  });

  it('метод mouseDown вызывает ф-ции onMouseMove, onMouseUp,changeZIndexUp', () => {
    spyOn(thumb, 'onMouseMove');
    spyOn(thumb, 'onMouseUp');
    spyOn(thumb, 'changeZIndexUp');
    const mousedown = new MouseEvent('mousedown', { bubbles: true });
    const mousemove = new MouseEvent('mousemove', { bubbles: true });
    const mouseup = new MouseEvent('mouseup', { bubbles: true });

    thumb.mouseDown(mousedown);
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);

    expect(thumb.onMouseMove).toHaveBeenCalledWith(mousemove);
    expect(thumb.onMouseUp).toHaveBeenCalledWith(mouseup);
    expect(thumb.changeZIndexUp).toHaveBeenCalledWith();
  });

  it('метод onMouseMove вызывает ф-ю moveHandle', () => {
    spyOn(thumb, 'moveHandle');
    const mousemove = new MouseEvent('mousemove', { bubbles: true });
    thumb.onMouseMove(mousemove);

    expect(thumb.moveHandle).toHaveBeenCalledWith(mousemove);
  });

  it('метод moveHandle вызывает метод broadcast класса Observer', () => {
    const mousemove = new MouseEvent('mousemove', { bubbles: true });
    thumb.moveHandle(mousemove);

    expect(thumb.observer.broadcast).toHaveBeenCalledWith(
      'mouseMove',
      Object({ clientXY: 0, sliderClientReact: 8, dataNum: '1', positionThumbSecond: NaN }),
    );
  });

  it('метод onMouseUp отвязывает обработчики событий, вызывает ф-ии changeZIndexDown и broadcast класса Observer ', () => {
    spyOn(thumb, 'changeZIndexDown');
    const mouseup = new MouseEvent('mouseup', { bubbles: true });
    thumb.onMouseUp(mouseup);

    expect(document.onmousemove).toBeNull();
    expect(document.onmouseup).toBeNull();
    expect(thumb.observer.broadcast).toHaveBeenCalledWith(
      'mouseMove',
      Object({ clientXY: 0, sliderClientReact: 8, dataNum: '1', positionThumbSecond: NaN }),
    );

    expect(thumb.changeZIndexDown).toHaveBeenCalledWith();
  });

  describe('проверка метода findPosition', () => {
    const thumbTwo = $('<div>');
    thumbTwo[0].classList.add('js-slider__thumb-second');
    thumbTwo[0].setAttribute('data-num', '2');
    block.append(thumbTwo);

    let event: MouseEvent;
    beforeEach(function () {
      event = new MouseEvent('mousedown', { clientX: 100, clientY: 105 });
      const thumbFirst = thumb.slider.querySelector('.js-slider__thumb-first') as HTMLElement;
      const thumbSecond = thumb.slider.querySelector('.js-slider__thumb-second') as HTMLElement;

      thumbFirst.style.left = '101px';
      thumbFirst.style.top = '58px';

      thumbSecond.style.left = '10px';
      thumbSecond.style.top = '50px';

      spyOn(thumb, 'findPosition').and.callThrough();
    });

    it('orientation = horizontal, range = false', () => {
      thumb.config.range = false;
      thumb.config.orientation = 'horizontal';

      const expectedValue = {
        clientXY: 100,
        sliderClientReact: thumb.slider.getBoundingClientRect().left,
        dataNum: '1',
        positionThumbSecond: undefined,
      };
      thumb.findPosition(event);
      const returnedValue = thumb.findPosition(event);

      expect(returnedValue).toEqual(expectedValue);
    });

    it('orientation = horizontal, range = true, data-num = 1', () => {
      thumb.config.range = true;
      thumb.config.orientation = 'horizontal';
      thumb.thumb.dataset.num = '1';

      const expectedValue = {
        clientXY: 100,
        sliderClientReact: thumb.slider.getBoundingClientRect().left,
        dataNum: '1',
        positionThumbSecond: 10,
      };
      thumb.findPosition(event);
      const returnedValue = thumb.findPosition(event);

      expect(returnedValue).toEqual(expectedValue);
    });

    it('orientation = horizontal, range = true, data-num = 2', () => {
      thumb.config.range = true;
      thumb.config.orientation = 'horizontal';
      thumb.thumb.dataset.num = '2';

      const expectedValue = {
        clientXY: 100,
        sliderClientReact: thumb.slider.getBoundingClientRect().left,
        dataNum: '2',
        positionThumbFirst: 101,
      };
      thumb.findPosition(event);
      const returnedValue = thumb.findPosition(event);

      expect(returnedValue).toEqual(expectedValue);
    });

    it('orientation = vertical, range = false', () => {
      thumb.config.range = false;
      thumb.config.orientation = 'vertical';
      thumb.thumb.dataset.num = '1';

      const expectedValue = {
        clientXY: 105,
        sliderClientReact: thumb.slider.getBoundingClientRect().top,
        dataNum: '1',
        positionThumbSecond: undefined,
      };
      thumb.findPosition(event);
      const returnedValue = thumb.findPosition(event);

      expect(returnedValue).toEqual(expectedValue);
    });

    it('orientation = vertical, range = true, data-num = 1', () => {
      thumb.config.range = true;
      thumb.config.orientation = 'vertical';
      thumb.thumb.dataset.num = '1';

      const expectedValue = {
        clientXY: 105,
        sliderClientReact: thumb.slider.getBoundingClientRect().top,
        dataNum: '1',
        positionThumbSecond: 50,
      };
      thumb.findPosition(event);
      const returnedValue = thumb.findPosition(event);

      expect(returnedValue).toEqual(expectedValue);
    });

    it('orientation = vertical, range = true, data-num = 2', () => {
      thumb.config.range = true;
      thumb.config.orientation = 'vertical';
      thumb.thumb.dataset.num = '2';

      const expectedValue = {
        clientXY: 105,
        sliderClientReact: thumb.slider.getBoundingClientRect().top,
        dataNum: '2',
        positionThumbFirst: 58,
      };
      thumb.findPosition(event);
      const returnedValue = thumb.findPosition(event);

      expect(returnedValue).toEqual(expectedValue);
    });
  });

  it('метод changeZIndexUp добавляет контейнеру бегунка класс slider__thumb_zIndex-up', () => {
    thumb.changeZIndexUp();

    expect(thumb.thumb).toHaveClass('slider__thumb_zIndex-up');
  });

  it('метод changeZIndexDown удаляет у контейнера бегунка класс slider__thumb_zIndex-up', () => {
    thumb.changeZIndexDown();

    expect(thumb.thumb).not.toHaveClass('slider__thumb_zIndex-up');
  });

  it('метод cleanStyleAttr удаляет у контейнера бегунка атрибут style', () => {
    thumb.cleanStyleAttr();

    expect(thumb.thumb).not.toHaveAttr('style');
  });

  it('метод updateConfigThumb обновляет конфиг класса, вызывает ф-ции checkOrientation и updateConfig касса Label', () => {
    const newConf = {
      range: false,
      positionFrom: 10,
      positionTo: 15,
      orientation: 'vertical',
      label: true,
    };
    spyOn(thumb, 'checkOrientation');
    thumb.updateConfigThumb(newConf);

    expect(thumb.label.updateConfig).toHaveBeenCalledWith(newConf);
    expect(thumb.checkOrientation).toHaveBeenCalledWith();
  });
});
