import Label from '../slider/MVP/View/Label';

const config = {
  label: true,
  min: 5,
  max: 10,
  step: 1,
  orientation: 'horizontal',
};

describe('Label', () => {
  const block = $('<div>');
  beforeEach(function () {
    block[0].classList.add('thumb');
    $(document.body).append(block);
  });
  const label: Label = new Label(config, block[0]);

  it('Инициализация класса Label', () => {
    expect(label).toBeDefined();
    expect(label.config).toEqual(config);
    expect(label.thumb).toBeInstanceOf(HTMLElement);
    expect(label.thumb).toContainElement('div.slider__label');
    expect(label.elementLabel).toBeInDOM();
    expect(label.elementLabel).toHaveClass('slider__label');
  });

  it('метод setLabelValue устанавливает переданное значение для innerHTML блока лейбла', () => {
    label.setLabelValue(4);

    expect(label.elementLabel).toContainText('4');
  });

  describe('метод changeLabelOrientation', () => {
    it('при orientation = horizontal у блока удаляется класс slider__label_vertical', () => {
      label.config.orientation = 'horizontal';
      label.changeLabelOrientation();

      expect(label.elementLabel).not.toHaveClass('slider__label_vertical');
    });

    it('при orientation = vertical блоку устанавливается класс slider__label_vertical', () => {
      label.config.orientation = 'vertical';
      label.changeLabelOrientation();

      expect(label.elementLabel).toHaveClass('slider__label_vertical');
    });
  });

  describe('метод changeVisibleLabel', () => {
    it('если config.label = true, то блок не имеет класса slider__label_hidden', () => {
      label.config.label = true;
      label.changeVisibleLabel();

      expect(label.elementLabel).not.toHaveClass('slider__label_hidden');
    });

    it('если config.label = false, то блоку присваивается класс slider__label_hidden', () => {
      label.config.label = false;
      label.changeVisibleLabel();

      expect(label.elementLabel).toHaveClass('slider__label_hidden');
    });
  });

  it('метод update обновляет конфиг, вызывает ф-ции changeVisibleLabel и changeLabelOrientation', () => {
    const newConf = {
      label: false,
      orientation: 'vertical',
    };
    spyOn(label, 'changeLabelOrientation');
    spyOn(label, 'changeVisibleLabel');
    label.updateConfig(newConf);

    expect(label.changeLabelOrientation).toHaveBeenCalledWith();
    expect(label.changeVisibleLabel).toHaveBeenCalledWith();
  });
});
