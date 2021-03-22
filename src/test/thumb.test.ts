import Thumb from '../slider/MVP/View/Thumb';

const config = {
  range: true,
  positionFrom: 15,
  positionTo: 30,
  vertical: false,
  label: false,
};
const $block = $('<div>');
$block[0].classList.add('slider__block');
$(document.body).append($block);

const thumb: Thumb = new Thumb('first', $block[0], '1');
const thumbBlock = $block[0].querySelector('.js-slider__thumb_type_first') as HTMLElement;
thumb.updateConfig(config);

describe('Thumb', () => {
  beforeAll(function () {
    spyOn(thumb, 'broadcast');
  });

  it('инициализация класса Thumb', () => {
    expect(thumb).toBeDefined();
  });

  it('метод setLabelValue устанавливает значение лейбла', () => {
    thumb.setLabelValue(8);
    const elementLabel = $block[0].querySelector('.js-slider__label');

    expect(elementLabel).toHaveText('8');
  });

  it('метод removeThis удаляет бегунок из родительского блока', () => {
    thumb.removeThumb();

    expect($block).not.toContainElement('div.js-slider__thumb_type_first');
    expect(thumbBlock).not.toBeInDOM();
  });

  it('метод addThis добавляет бегунок в родительский блок', () => {
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

  it('при нажатии на бегунок ему добавляется класс slider__thumb_visibility_zIndex-up', () => {
    const mousedown = new MouseEvent('mousedown', { bubbles: true });
    thumbBlock.dispatchEvent(mousedown);

    expect(thumbBlock).toHaveClass('slider__thumb_visibility_zIndex-up');
  });

  describe('при перемещении мыши, через ф-ю broadcast передаются данные о движении бегунка', () => {
    const mousedown = new MouseEvent('mousedown', { bubbles: true });
    const mousemove = new MouseEvent('mousemove', { bubbles: true });
    const $thumbTwo = $('<div>');
    $thumbTwo[0].classList.add('js-slider__thumb_type_second');
    $block.append($thumbTwo);

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
        thumbBlock.dispatchEvent(mousedown);
        document.dispatchEvent(mousemove);

        expect(thumb.broadcast).toHaveBeenCalled();
      });

      /* it('range = true, data-num = 3, метод broadcast будет вызван со значением undefined', () => {
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
 
         expect(thumb.broadcast).toHaveBeenCalledWith({ value: undefined });
       }); */
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
        thumbBlock.dispatchEvent(mousedown);
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
        thumbBlock.dispatchEvent(mousedown);
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
        thumbBlock.dispatchEvent(mousedown);
        document.dispatchEvent(mousemove);

        expect(thumb.broadcast).toHaveBeenCalled();
      });

      /* it('range = true, data-num = 3, метод broadcast передаст значение undefined', () => {
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

        expect(thumb.broadcast).toHaveBeenCalledWith({ value: undefined });
      }); */
    });
  });

  describe('метод onMouseUp отвязывает обработчики событий, уменьшается zIndex контейнера бегунка, вызывает ф-ию broadcast, которая передает данные о положении бегунка', () => {
    const mousedown = new MouseEvent('mousedown', { bubbles: true });
    const mouseup = new MouseEvent('mouseup', { bubbles: true });
    describe('vertical= false', () => {
      it('range = false', () => {
        thumb.updateConfig({
          range: false,
          positionFrom: 15,
          positionTo: 30,
          vertical: false,
          label: false,
        });
        thumbBlock.dataset.num = '1';
        thumbBlock.dispatchEvent(mousedown);
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
        thumbBlock.dispatchEvent(mousedown);
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
        thumbBlock.dispatchEvent(mousedown);
        document.dispatchEvent(mouseup);

        expect(thumb.broadcast).toHaveBeenCalled();
        expect(thumbBlock).not.toHaveClass('slider__thumb_visibility_zIndex-up');
      });

      /* it('range = true, data-num = 3, метод broadcast передаст значение undefined', () => {
        thumb.updateConfig({
          range: true,
          positionFrom: 15,
          positionTo: 30,
          vertical: false,
          label: false,
        });
        thumbBlock.dataset.num = '3';
        thumbBlock.dispatchEvent(mousedown);
        document.dispatchEvent(mouseup);

        expect(thumb.broadcast).toHaveBeenCalledWith({ value: undefined });
        expect(thumbBlock).not.toHaveClass('slider__thumb_visibility_zIndex-up');
      }); */
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
        thumbBlock.dispatchEvent(mousedown);
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
        thumbBlock.dispatchEvent(mousedown);
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
        thumbBlock.dispatchEvent(mousedown);
        document.dispatchEvent(mouseup);

        expect(thumb.broadcast).toHaveBeenCalled();
        expect(thumbBlock).not.toHaveClass('slider__thumb_visibility_zIndex-up');
      });

      /* it('range = true, data-num = 3, метод broadcast передаст undefined', () => {
        thumb.updateConfig({
          range: true,
          positionFrom: 15,
          positionTo: 30,
          vertical: true,
          label: false,
        });
        thumbBlock.dataset.num = '3';
        thumbBlock.dispatchEvent(mousedown);
        document.dispatchEvent(mouseup);

        expect(thumb.broadcast).toHaveBeenCalledWith({ value: undefined });
        expect(thumbBlock).not.toHaveClass('slider__thumb_visibility_zIndex-up');
      }); */
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
