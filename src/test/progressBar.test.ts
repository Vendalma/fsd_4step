import ProgressBar from '../slider/MVP/View/ProgressBar';

const $block = $('<div>');
const $firstThumb = $('<div>');
const $secondThumb = $('<div>');
$block[0].classList.add('js-slider__block');
$firstThumb[0].classList.add('js-slider__thumb_type_first');
$secondThumb[0].classList.add('js-slider__thumb_type_second');
$block.append($firstThumb[0]);
$block.append($secondThumb[0]);
$(document.body).append($block);

const bar: ProgressBar = new ProgressBar($block[0]);
const progressBarBlock = $block[0].querySelector('.js-slider__progress-bar');
const thumbFirst = $block[0].querySelector('.js-slider__thumb_type_first') as HTMLElement;
const thumbSecond = $block[0].querySelector('.js-slider__thumb_type_second') as HTMLElement;

describe('ProgressBar', () => {
  it('Инициализация ProgressBar', () => {
    expect(bar).toBeDefined();
  });

  describe('метод addBar', () => {
    describe('vertical = false рассчитывается позиционирование эл-та по горизонтали', () => {
      it('при range = false длина progressBar равна позиции первого бегунка, а значение left = 0px', () => {
        bar.updateConfig({ range: false, vertical: false });
        thumbFirst.style.left = '50px';
        bar.addBar();

        expect(progressBarBlock).toHaveCss({ left: '0px', width: '50px' });
      });

      it('при range = true, значение left равно позиции первого бегунка, а длина равна разности позиций бегунков', () => {
        bar.updateConfig({ range: true, vertical: false });
        thumbFirst.style.left = '30px';
        thumbSecond.style.left = '100px';
        bar.addBar();

        expect(progressBarBlock).toHaveCss({ left: '30px', width: '70px' });
      });
    });

    describe('vertical = true рассчитывается позиционирование прогресс бара по вертикали', () => {
      it('если range = false, высота эл-та равна позиции первого бегунка, значение top = 0px', () => {
        bar.updateConfig({ range: false, vertical: true });
        thumbFirst.style.top = '50px';
        bar.addBar();

        expect(progressBarBlock).toHaveCss({ top: '0px', height: '50px' });
      });

      it('если range = true, значение top равно позиции первого бегунка, а высота равна разности позиций бегунков ', () => {
        bar.updateConfig({ range: true, vertical: true });
        thumbFirst.style.top = '30px';
        thumbSecond.style.top = '100px';
        bar.addBar();

        expect(progressBarBlock).toHaveCss({ top: '30px', height: '70px' });
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
