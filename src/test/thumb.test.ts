import Thumb from '../slider/MVP/View/Thumb';

const config = {
  range: true,
  positionFrom: 15,
  positionTo: 30,
  vertical: false,
  label: false,
};
const $block = $('<div>');
describe('Thumb', () => {
  const thumb: Thumb = new Thumb('first', $block[0], '1');
  beforeAll(function () {
    $block[0].classList.add('slider__block');
    $(document.body).append($block);
    thumb.updateConfig(config);
    spyOn(thumb, 'broadcast');
  });
  const thumbBlock = $block[0].querySelector('.js-slider__thumb_type_first') as HTMLElement;
  it('инициализация класса Thumb', () => {
    expect(thumb).toBeDefined();
  });

  it('метод addFollower вызывает ф-ю subscribe', () => {
    spyOn(thumb, 'subscribe');
    thumb.addFollower({});

    expect(thumb.subscribe).toHaveBeenCalledWith({});
  });

  it('метод setLabelValue вызывает ф-ю setLabelValue в классе Label', () => {
    thumb.setLabelValue(8);
    const elementLabel = $block[0].querySelector('.js-slider__label');

    expect(elementLabel).toHaveText('8');
  });

  it('метод removeThis удаляет бегунок из родительского блока', () => {
    thumb.removeThumb();

    expect($block).not.toContainElement('div.js-slider__thumb_type_first');
    expect(thumbBlock).not.toBeInDOM();
  });

  it('метод addThis добавляет блок бегунка в родительский блок', () => {
    thumb.addThumb();

    expect($block).toContainElement('div.js-slider__thumb_type_first');
    expect(thumbBlock).toBeInDOM();
  });

  describe('метод setPosition', () => {
    it('при vertical = false устанавливает бегунку style.left', () => {
      thumb.updateConfig({
        range: true,
        positionFrom: 15,
        positionTo: 30,
        vertical: false,
        label: false,
      });
      thumb.setPosition(8);

      expect(thumbBlock).toHaveCss({ left: '8px' });
    });

    it('при vertical= true устанавливает бегунку style.top', () => {
      thumb.updateConfig({
        range: true,
        positionFrom: 15,
        positionTo: 30,
        vertical: true,
        label: false,
      });
      thumb.setPosition(8);

      expect(thumbBlock).toHaveCss({ top: '8px' });
    });
  });

  it('при нажатии на бегунок изменяется zIndex контейнера', () => {
    const mousedown = new MouseEvent('mousedown', { bubbles: true });
    thumbBlock.dispatchEvent(mousedown);

    expect(thumbBlock).toHaveClass('slider__thumb_visibility_zIndex-up');
  });

  describe('при перемещении мыши через ф-ю broadcast передаются данные о движении бегунка', () => {
    const mousedown = new MouseEvent('mousedown', { bubbles: true });
    const mousemove = new MouseEvent('mousemove', { bubbles: true });
    thumbBlock.dispatchEvent(mousedown);

    const $thumbTwo = $('<div>');
    $thumbTwo[0].classList.add('js-slider__thumb_type_second');
    $thumbTwo[0].setAttribute('data-num', '2');
    $block.append($thumbTwo);

    let event: MouseEvent;
    beforeEach(function () {
      event = new MouseEvent('mousedown', { clientX: 100, clientY: 105 });
      const thumbFirst = $block[0].querySelector('.js-slider__thumb_type_first') as HTMLElement;
      const thumbSecond = $block[0].querySelector('.js-slider__thumb_type_second') as HTMLElement;

      thumbFirst.style.left = '101px';
      thumbFirst.style.top = '58px';

      thumbSecond.style.left = '10px';
      thumbSecond.style.top = '50px';
    });

    describe('vertical = false', () => {
      it('range = false', () => {
        thumb.updateConfig({
          range: false,
          positionFrom: 15,
          positionTo: 30,
          vertical: false,
          label: false,
        });
        thumbBlock.dispatchEvent(mousedown);
        document.dispatchEvent(mousemove);

        expect(thumb.broadcast).toHaveBeenCalled();
      });

      it('range = true, data-num = 1', () => {
        thumb.updateConfig({
          range: true,
          positionFrom: 15,
          positionTo: 30,
          vertical: false,
          label: false,
        });
        thumbBlock.dataset.num = '1';
        thumbBlock.dispatchEvent(mousedown);
        document.dispatchEvent(mousemove);

        expect(thumb.broadcast).toHaveBeenCalled();
      });

      it('range = true, data-num = 2', () => {
        thumb.updateConfig({
          range: false,
          positionFrom: 15,
          positionTo: 30,
          vertical: false,
          label: false,
        });
        thumbBlock.dataset.num = '2';

        document.dispatchEvent(mousemove);

        expect(thumb.broadcast).toHaveBeenCalled();
      });

      it('range = true, data-num = 3', () => {
        thumb.updateConfig({
          range: true,
          positionFrom: 15,
          positionTo: 30,
          vertical: false,
          label: false,
        });
        thumbBlock.dataset.num = '3';
        thumbBlock.dispatchEvent(mousedown);
        document.dispatchEvent(mousemove);

        expect(thumb.broadcast).toHaveBeenCalled();
      });
    });

    describe('vertical= true', () => {
      it('range = false', () => {
        thumb.updateConfig({
          range: false,
          positionFrom: 15,
          positionTo: 30,
          vertical: true,
          label: false,
        });
        thumbBlock.dataset.num = '1';
        document.dispatchEvent(mousemove);

        expect(thumb.broadcast).toHaveBeenCalled();
      });

      it('range = true, data-num = 1', () => {
        thumb.updateConfig({
          range: true,
          positionFrom: 15,
          positionTo: 30,
          vertical: true,
          label: false,
        });
        thumbBlock.dataset.num = '1';
        document.dispatchEvent(mousemove);

        expect(thumb.broadcast).toHaveBeenCalled();
      });

      it('range = true, data-num = 2', () => {
        thumb.updateConfig({
          range: true,
          positionFrom: 15,
          positionTo: 30,
          vertical: true,
          label: false,
        });
        thumbBlock.dataset.num = '2';
        document.dispatchEvent(mousemove);

        expect(thumb.broadcast).toHaveBeenCalled();
      });

      it('range = true, data-num = 3', () => {
        thumb.updateConfig({
          range: true,
          positionFrom: 15,
          positionTo: 30,
          vertical: true,
          label: false,
        });
        thumbBlock.dataset.num = '3';
        thumbBlock.dispatchEvent(mousedown);
        document.dispatchEvent(mousemove);

        expect(thumb.broadcast).toHaveBeenCalled();
      });
    });
  });

  describe('метод onMouseUp отвязывает обработчики событий, уменьшается zIndex контейнера бегунка, вызывает ф-ию broadcast ', () => {
    const mousedown = new MouseEvent('mousedown', { bubbles: true });
    thumbBlock.dispatchEvent(mousedown);
    const mouseup = new MouseEvent('mouseup', { bubbles: true });

    const $thumbTwo = $('<div>');
    $thumbTwo[0].classList.add('js-slider__thumb_type_second');
    $thumbTwo[0].setAttribute('data-num', '2');
    $block.append($thumbTwo);

    let event: MouseEvent;
    beforeEach(function () {
      const thumbFirst = $block[0].querySelector('.js-slider__thumb_type_first') as HTMLElement;
      const thumbSecond = $block[0].querySelector('.js-slider__thumb_type_second') as HTMLElement;
      thumbFirst.style.left = '101px';
      thumbFirst.style.top = '58px';

      thumbSecond.style.left = '10px';
      thumbSecond.style.top = '50px';
    });

    describe('vertical= false', () => {
      it('range = false', () => {
        thumb.updateConfig({
          range: false,
          positionFrom: 15,
          positionTo: 30,
          vertical: false,
          label: false,
        });
        document.dispatchEvent(mouseup);

        expect(thumb.broadcast).toHaveBeenCalled();
        expect(thumbBlock).not.toHaveClass('slider__thumb_visibility_zIndex-up');
      });

      it('range = true, data-num = 1', () => {
        thumb.updateConfig({
          range: true,
          positionFrom: 15,
          positionTo: 30,
          vertical: false,
          label: false,
        });
        thumbBlock.dataset.num = '1';

        document.dispatchEvent(mouseup);

        expect(thumb.broadcast).toHaveBeenCalled();
        expect(thumbBlock).not.toHaveClass('slider__thumb_visibility_zIndex-up');
      });

      it('range = true, data-num = 2', () => {
        thumb.updateConfig({
          range: true,
          positionFrom: 15,
          positionTo: 30,
          vertical: false,
          label: false,
        });
        thumbBlock.dataset.num = '2';

        document.dispatchEvent(mouseup);

        expect(thumb.broadcast).toHaveBeenCalled();
        expect(thumbBlock).not.toHaveClass('slider__thumb_visibility_zIndex-up');
      });

      it('range = true, data-num = 3', () => {
        thumb.updateConfig({
          range: true,
          positionFrom: 15,
          positionTo: 30,
          vertical: false,
          label: false,
        });
        thumbBlock.dataset.num = '3';

        document.dispatchEvent(mouseup);

        expect(thumb.broadcast).toHaveBeenCalled();
        expect(thumbBlock).not.toHaveClass('slider__thumb_visibility_zIndex-up');
      });
    });

    describe('vertical= true', () => {
      it('range = false', () => {
        thumb.updateConfig({
          range: false,
          positionFrom: 15,
          positionTo: 30,
          vertical: true,
          label: false,
        });
        thumbBlock.dataset.num = '1';

        document.dispatchEvent(mouseup);

        expect(thumb.broadcast).toHaveBeenCalled();
        expect(thumbBlock).not.toHaveClass('slider__thumb_visibility_zIndex-up');
      });

      it('range = true, data-num = 1', () => {
        thumb.updateConfig({
          range: true,
          positionFrom: 15,
          positionTo: 30,
          vertical: true,
          label: false,
        });
        thumbBlock.dataset.num = '1';

        document.dispatchEvent(mouseup);

        expect(thumb.broadcast).toHaveBeenCalled();
        expect(thumbBlock).not.toHaveClass('slider__thumb_visibility_zIndex-up');
      });

      it('range = true, data-num = 2', () => {
        thumb.updateConfig({
          range: true,
          positionFrom: 15,
          positionTo: 30,
          vertical: true,
          label: false,
        });
        thumbBlock.dataset.num = '2';

        document.dispatchEvent(mouseup);

        expect(thumb.broadcast).toHaveBeenCalled();
        expect(thumbBlock).not.toHaveClass('slider__thumb_visibility_zIndex-up');
      });

      it('range = true, data-num = 3', () => {
        thumb.updateConfig({
          range: true,
          positionFrom: 15,
          positionTo: 30,
          vertical: true,
          label: false,
        });
        thumbBlock.dataset.num = '3';

        document.dispatchEvent(mouseup);

        expect(thumb.broadcast).toHaveBeenCalled();
        expect(thumbBlock).not.toHaveClass('slider__thumb_visibility_zIndex-up');
      });
    });
  });

  describe('метод updateConfigThumb обновляет конфиг класса, вызывает ф-цию updateConfig касса Label', () => {
    it('при vertical = true', () => {
      thumb.updateConfig({
        range: false,
        positionFrom: 10,
        positionTo: 15,
        vertical: true,
        label: true,
      });

      expect(thumbBlock).toHaveClass('slider__thumb_vertical');
      expect(thumbBlock).not.toHaveClass('slider__thumb_horizontal');
    });

    it('при vertical= false', () => {
      thumb.updateConfig({
        range: false,
        positionFrom: 10,
        positionTo: 15,
        vertical: false,
        label: true,
      });

      expect(thumbBlock).not.toHaveClass('slider__thumb_vertical');
      expect(thumbBlock).toHaveClass('slider__thumb_horizontal');
    });
  });
});
