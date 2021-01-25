import Label from '../slider/MVP/View/Label';

describe('Label', () => {
  const $block = $('<div>');
  beforeEach(function () {
    $block[0].classList.add('thumb');
    $(document.body).append($block);
  });
  const label: Label = new Label($block[0]);

  it('Инициализация класса Label', () => {
    expect(label).toBeDefined();
  });

  it('метод setLabelValue устанавливает переданное значение для innerHTML блока лейбла', () => {
    label.setLabelValue(4);
    const elementLabel = $block[0].querySelector('.slider__label');

    expect(elementLabel).toHaveText('4');
  });

  describe('метод updateConfig обновляет конфиг для класса Label', () => {
    let elementLabel: HTMLElement;
    beforeAll(() => {
      elementLabel = $block[0].querySelector('.slider__label') as HTMLElement;
    });

    it('при label=false, vertical = true, контейнер лейбла имеет класс slider__label_vertical и slider__label_hidden', () => {
      const newConf = {
        label: false,
        vertical: true,
      };
      label.updateConfig(newConf);

      expect(elementLabel).toHaveClass('slider__label_vertical');
      expect(elementLabel).toHaveClass('slider__label_hidden');
    });

    it('при label=true, vertical = true, у контейнера лейбла отсутствует класс slider__label_hidden', () => {
      const newConf = {
        label: true,
        vertical: true,
      };
      label.updateConfig(newConf);

      expect(elementLabel).toHaveClass('slider__label_vertical');
      expect(elementLabel).not.toHaveClass('slider__label_hidden');
    });

    it('при label=false, vertical = false, у контейнера лейбла отсутствует slider__label_vertical', () => {
      const newConf = {
        label: false,
        vertical: false,
      };
      label.updateConfig(newConf);

      expect(elementLabel).not.toHaveClass('slider__label_vertical');
      expect(elementLabel).toHaveClass('slider__label_hidden');
    });
  });
});
