import ProgressBar from '../slider/MVP/View/progressBar';

describe('ProgressBar', () => {
  const $block = $('<div>');
  const $firstThumb = $('<div>');
  const $secondThumb = $('<div>');
  beforeEach(function () {
    $block[0].classList.add('js-slider__$block');
    $firstThumb[0].classList.add('js-slider__thumb_type_first');
    $secondThumb[0].classList.add('js-slider__thumb_type_second');
    $block.append($firstThumb[0]);
    $block.append($secondThumb[0]);
    $(document.body).append($block);
  });
  const bar: ProgressBar = new ProgressBar($block[0]);
  it('Инициализация ProgressBar', () => {
    expect(bar).toBeDefined();
  });

  describe('метод addBar', () => {
    let thumbFirst: HTMLElement;
    let thumbSecond: HTMLElement;
    const progressBar = $block[0].querySelector('.js-slider__progress-bar');
    beforeEach(function () {
      thumbFirst = $block[0].querySelector('.js-slider__thumb_type_first') as HTMLElement;
      thumbSecond = $block[0].querySelector('.js-slider__thumb_type_second') as HTMLElement;
    });

    describe('vertical = false', () => {
      it('при range = false', () => {
        bar.updateConfig({ range: false, vertical: false });
        thumbFirst.style.left = '50px';
        bar.addBar();

        expect(progressBar).toHaveCss({ left: '0px', width: '50px' });
      });

      it('при range = true', () => {
        bar.updateConfig({ range: true, vertical: false });
        thumbFirst.style.left = '30px';
        thumbSecond.style.left = '100px';
        bar.addBar();

        expect(progressBar).toHaveCss({ left: '30px', width: '70px' });
      });
    });

    describe('vertical = true', () => {
      it('если range = false', () => {
        bar.updateConfig({ range: false, vertical: true });
        thumbFirst.style.top = '50px';
        bar.addBar();

        expect(progressBar).toHaveCss({ top: '0px', height: '50px' });
      });

      it('если range = true', () => {
        bar.updateConfig({ range: true, vertical: true });
        thumbFirst.style.top = '30px';
        thumbSecond.style.top = '100px';
        bar.addBar();

        expect(progressBar).toHaveCss({ top: '30px', height: '70px' });
      });
    });
  });

  it('метод updateConfig обновляет конфиг класса ProgressBar', () => {
    const newConf = {
      range: false,
      vertical: true,
    };
    const progressBar = $block[0].querySelector('.js-slider__progress-bar');
    bar.updateConfig(newConf);

    expect(progressBar).toHaveClass('slider__progress-bar_vertical');
  });
});
