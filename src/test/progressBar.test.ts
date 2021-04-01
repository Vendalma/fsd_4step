import ProgressBar from '../slider/MVP/View/ProgressBar';
import { IPosition } from '../slider/MVP/View/viewInterfaces';

const $block = $('<div>');
const bar: ProgressBar = new ProgressBar($block[0]);
const progressBarBlock = $block[0].querySelector('.js-slider__progress-bar');

describe('ProgressBar', () => {
  it('Инициализация ProgressBar', () => {
    expect(bar).toBeDefined();
  });

  describe('метод addBar', () => {
    let data: IPosition;
    beforeAll(() => {
      data = {
        positionFrom: {
          position: 10,
          value: 25,
        },
        positionTo: {
          position: 30,
          value: 35,
        },
      };
    });

    describe('vertical = false рассчитывается позиционирование эл-та по горизонтали', () => {
      it('при range = false длина progressBar равна позиции первого бегунка, а значение left = 0px', () => {
        bar.updateConfig({ range: false, vertical: false });
        bar.addBar(data);

        expect(progressBarBlock).toHaveCss({ left: '0px', width: '10px' });
      });

      it('при range = true, значение left равно позиции первого бегунка, а длина равна разности позиций бегунков', () => {
        bar.updateConfig({ range: true, vertical: false });
        bar.addBar(data);

        expect(progressBarBlock).toHaveCss({ left: '10px', width: '20px' });
      });
    });

    describe('vertical = true рассчитывается позиционирование прогресс бара по вертикали', () => {
      it('если range = false, высота эл-та равна позиции первого бегунка, значение top = 0px', () => {
        bar.updateConfig({ range: false, vertical: true });
        bar.addBar(data);

        expect(progressBarBlock).toHaveCss({ top: '0px', height: '10px' });
      });

      it('если range = true, значение top равно позиции первого бегунка, а высота равна разности позиций бегунков ', () => {
        bar.updateConfig({ range: true, vertical: true });
        bar.addBar(data);

        expect(progressBarBlock).toHaveCss({ top: '10px', height: '20px' });
      });
    });
  });

  it('метод updateConfig обновляет конфиг класса ProgressBar', () => {
    const newConf = {
      range: false,
      vertical: true,
    };
    bar.updateConfig(newConf);

    expect(progressBarBlock).toHaveClass('slider__progress-bar_vertical');
  });
});
