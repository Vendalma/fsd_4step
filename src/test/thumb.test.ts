import Thumb from '../slider/MVP/View/Thumb';

const $block = $('<div>');
$(document.body).append($block);

const thumb: Thumb = new Thumb('first', $block[0], '1');
const thumbBlock = thumb.getThumbBlock();
const elementLabel = $block[0].querySelector('.slider__label');
thumb.updateConfig({
  range: true,
  valueFrom: 15,
  valueTo: 30,
  vertical: false,
  label: false,
});

describe('Thumb', () => {
  beforeAll(function () {
    spyOn(thumb, 'broadcast');
  });

  it('инициализация класса Thumb', () => {
    expect(thumb).toBeDefined();
  });

  it('метод removeThis удаляет бегунок из родительского блока', () => {
    thumb.removeThumb();

    expect($block).not.toContainElement('div.slider__thumb_type_first');
    expect(thumbBlock).not.toBeInDOM();
  });

  it('метод addThis добавляет бегунок в родительский блок', () => {
    thumb.addThumb();

    expect($block).toContainElement('div.slider__thumb_type_first');
    expect(thumbBlock).toBeInDOM();
  });

  it('метод getThumbBlock возвращает эл-т бегунка', () => {
    expect(thumb.getThumbBlock()).toEqual(thumbBlock);
  });

  describe('метод updatePosition, устанавливает позицию бегунка и значение лейбла', () => {
    it('при vertical = false устанавливает бегунку style.left', () => {
      thumb.updateConfig({
        range: true,
        valueFrom: 15,
        valueTo: 30,
        vertical: false,
        label: false,
      });
      thumb.updatePosition({
        position: 10,
        value: 5,
      });

      expect(thumbBlock).toHaveCss({ left: '10px' });
      expect(elementLabel).toHaveText('5');
    });

    it('при vertical= true устанавливает бегунку style.top', () => {
      thumb.updateConfig({
        range: true,
        valueFrom: 15,
        valueTo: 30,
        vertical: true,
        label: false,
      });
      thumb.updatePosition({
        position: 20,
        value: 10,
      });

      expect(thumbBlock).toHaveCss({ top: '20px' });
      expect(elementLabel).toHaveText('10');
    });
  });

  describe('при перемещении мыши, через ф-ю broadcast передаются данные о движении бегунка', () => {
    const mousedown = new MouseEvent('mousedown', { bubbles: true });
    const mousemove = new MouseEvent('mousemove', { bubbles: true });

    describe('vertical = false', () => {
      it('range = false', () => {
        thumb.updateConfig({
          range: false,
          valueFrom: 15,
          valueTo: 30,
          vertical: false,
          label: false,
        });
        thumbBlock.dispatchEvent(mousedown);
        document.dispatchEvent(mousemove);

        expect(thumb.broadcast).toHaveBeenCalled();
      });

      it('range = true', () => {
        thumb.updateConfig({
          range: true,
          valueFrom: 15,
          valueTo: 30,
          vertical: false,
          label: false,
        });
        thumbBlock.dispatchEvent(mousedown);
        document.dispatchEvent(mousemove);

        expect(thumb.broadcast).toHaveBeenCalled();
      });
    });

    describe('vertical= true', () => {
      it('range = false', () => {
        thumb.updateConfig({
          range: false,
          valueFrom: 15,
          valueTo: 30,
          vertical: true,
          label: false,
        });
        thumbBlock.dispatchEvent(mousedown);
        document.dispatchEvent(mousemove);

        expect(thumb.broadcast).toHaveBeenCalled();
      });

      it('range = true', () => {
        thumb.updateConfig({
          range: true,
          valueFrom: 15,
          valueTo: 30,
          vertical: true,
          label: false,
        });
        thumbBlock.dispatchEvent(mousedown);
        document.dispatchEvent(mousemove);

        expect(thumb.broadcast).toHaveBeenCalled();
      });
    });
  });

  describe('при отпускании кнопки мыши, от бегунка отвязываются обработчики событий, вызывается ф-ия broadcast, которая передает данные о положении бегунка', () => {
    const mousedown = new MouseEvent('mousedown', { bubbles: true });
    const mouseup = new MouseEvent('mouseup', { bubbles: true });
    describe('vertical= false', () => {
      it('range = false', () => {
        thumb.updateConfig({
          range: false,
          valueFrom: 15,
          valueTo: 30,
          vertical: false,
          label: false,
        });
        thumbBlock.dispatchEvent(mousedown);
        document.dispatchEvent(mouseup);

        expect(thumb.broadcast).toHaveBeenCalled();
      });

      it('range = true', () => {
        thumb.updateConfig({
          range: true,
          valueFrom: 15,
          valueTo: 30,
          vertical: false,
          label: false,
        });
        thumbBlock.dispatchEvent(mousedown);
        document.dispatchEvent(mouseup);

        expect(thumb.broadcast).toHaveBeenCalled();
      });
    });

    describe('vertical= true', () => {
      it('range = false', () => {
        thumb.updateConfig({
          range: false,
          valueFrom: 15,
          valueTo: 30,
          vertical: true,
          label: false,
        });
        thumbBlock.dispatchEvent(mousedown);
        document.dispatchEvent(mouseup);

        expect(thumb.broadcast).toHaveBeenCalled();
      });

      it('range = true', () => {
        thumb.updateConfig({
          range: true,
          valueFrom: 15,
          valueTo: 30,
          vertical: true,
          label: false,
        });
        thumbBlock.dispatchEvent(mousedown);
        document.dispatchEvent(mouseup);

        expect(thumb.broadcast).toHaveBeenCalled();
      });
    });
  });

  describe('метод updateConfigThumb обновляет конфиг класса, вызывает ф-цию updateConfig касса Label', () => {
    it('при vertical = true', () => {
      thumb.updateConfig({
        range: false,
        valueFrom: 10,
        valueTo: 15,
        vertical: true,
        label: true,
      });

      expect(thumbBlock).toHaveClass('slider__thumb_vertical');
      expect(thumbBlock).not.toHaveClass('slider__thumb_horizontal');
    });

    it('при vertical= false', () => {
      thumb.updateConfig({
        range: false,
        valueFrom: 10,
        valueTo: 15,
        vertical: false,
        label: true,
      });

      expect(thumbBlock).not.toHaveClass('slider__thumb_vertical');
      expect(thumbBlock).toHaveClass('slider__thumb_horizontal');
    });
  });

  describe('метод getThumbBlockValues возвращает позицию бегунка и расстояние от заданного значения до бегунка', () => {
    it('vertical = false', () => {
      thumb.updateConfig({
        range: false,
        valueFrom: 10,
        valueTo: 15,
        vertical: false,
        label: true,
      });

      expect(thumb.getThumbBlockValues(100)).toEqual({
        position: 8,
        distance: 92,
      });
    });
  });

  it('vertical = true', () => {
    thumb.updateConfig({
      range: false,
      valueFrom: 10,
      valueTo: 15,
      vertical: true,
      label: true,
    });

    expect(thumb.getThumbBlockValues(150)).toEqual({
      position: 358,
      distance: 208,
    });
  });

  describe('метод changeZIndex повышает z-index бегунка', () => {
    it('если методу передается значение true, то бегунку добавляется класс slider__thumb_visibility_zIndex-up', () => {
      thumb.changeZIndex(true);

      expect(thumbBlock).toHaveClass('slider__thumb_visibility_zIndex-up');
    });

    it('если методу передается false, то класс slider__thumb_visibility_zIndex-up удаляется', () => {
      thumb.changeZIndex(false);

      expect(thumbBlock).not.toHaveClass('slider__thumb_visibility_zIndex-up');
    });
  });
});
