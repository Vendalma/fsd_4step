import Label from '../slider/MVP/View/Label';

const config = {
  label: true,
  min: 5,
  max: 10,
  step: 1,
  vertical: false,
};

describe('Label', () => {
  const $block = $('<div>');
  beforeEach(function () {
    $block[0].classList.add('thumb');
    $(document.body).append($block);
  });
  const label: Label = new Label(config, $block[0]);

  it('Инициализация класса Label', () => {
    expect(label).toBeDefined();
  });

  it('метод setLabelValue устанавливает переданное значение для innerHTML блока лейбла', () => {
    label.setLabelValue(4);
    const elementLabel = $block[0].querySelector('.slider__label');

    expect(elementLabel).toHaveText('4');
  });

  it('метод update обновляет конфиг', () => {
    const newConf = {
      label: false,
      vertical: true,
    };
    const elementLabel = $block[0].querySelector('.slider__label');
    label.updateConfig(newConf);

    expect(elementLabel).toHaveClass('slider__label_vertical');
  });
});
