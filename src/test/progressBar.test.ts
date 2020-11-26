import ProgressBar from '../slider/MVP/View/progressBar';

const config = {
  range: true,
  orientation: 'horizontal',
};

describe('ProgressBar', () => {
  const block = $('<div>');
  const firstThumb = $('<div>');
  const secondThumb = $('<div>');
  beforeEach(function () {
    block[0].classList.add('slider__block');
    firstThumb[0].classList.add('js-slider__thumb-first');
    secondThumb[0].classList.add('js-slider__thumb-second');
    block.append(firstThumb[0]);
    block.append(secondThumb[0]);
    $(document.body).append(block);
  });
  const bar: ProgressBar = new ProgressBar(config, block[0]);
  it('Инициализация ProgressBar', () => {
    expect(bar).toBeDefined();
    expect(bar.config).toEqual(config);
    expect(bar.slider).toBeInstanceOf(HTMLElement);
    expect(bar.slider).toContainElement('div.slider__progress-bar');
    expect(bar.progressBar).toBeInstanceOf(HTMLElement);
    expect(bar.progressBar).toHaveClass('slider__progress-bar');
  });

  describe('метод addBar', () => {
    let thumbFirst: HTMLElement;
    let thumbSecond: HTMLElement;
    beforeEach(function () {
      thumbFirst = bar.slider.querySelector('.js-slider__thumb-first') as HTMLElement;
      thumbSecond = bar.slider.querySelector('.js-slider__thumb-second') as HTMLElement;
    });

    describe('orientation = horizontal', () => {
      beforeEach(function () {
        bar.config.orientation = 'horizontal';
      });

      it('при range = false', () => {
        bar.config.range = false;
        thumbFirst.style.left = '50px';
        bar.addBar();

        expect(bar.progressBar).toHaveCss({ left: '0px', width: '50px' });
      });

      it('при range = true', () => {
        bar.config.range = true;
        thumbFirst.style.left = '30px';
        thumbSecond.style.left = '100px';
        bar.addBar();

        expect(bar.progressBar).toHaveCss({ left: '30px', width: '70px' });
      });
    });

    describe('orientation = vertical', () => {
      beforeEach(function () {
        bar.config.orientation = 'vertical';
      });

      it('если range = false', () => {
        bar.config.range = false;
        thumbFirst.style.top = '50px';
        bar.addBar();

        expect(bar.progressBar).toHaveCss({ top: '0px', height: '50px' });
      });

      it('если range = true', () => {
        bar.config.range = true;
        thumbFirst.style.top = '30px';
        thumbSecond.style.top = '100px';
        bar.addBar();

        expect(bar.progressBar).toHaveCss({ top: '30px', height: '70px' });
      });
    });
  });

  describe('метод checkOrientation', () => {
    it('при orientation = vertical устанавливает блоку класс slider__progress-bar_vertical и удаляет класс slider__progress-bar_horizontal', () => {
      bar.config.orientation = 'vertical';
      bar.checkOrientation();

      expect(bar.progressBar).toHaveClass('slider__progress-bar_vertical');
      expect(bar.progressBar).not.toHaveClass('slider__progress-bar_horizontal');
    });

    it('при orientation = horizontal устанавливает блоку класс slider__progress-bar_horizontal и удаляет класс slider__progress-bar_vertical', () => {
      bar.config.orientation = 'horizontal';
      bar.checkOrientation();

      expect(bar.progressBar).not.toHaveClass('slider__progress-bar_vertical');
      expect(bar.progressBar).toHaveClass('slider__progress-bar_horizontal');
    });
  });

  it('метод cleanStyleAttr удаляет у контейнера прогресс бара атрибут style', () => {
    bar.cleanStyleAttr();

    expect(bar.progressBar).not.toHaveAttr('style');
  });

  it('метод updateBarConfig обновляет конфиг и вызывает ф-ю checkOrientation', () => {
    const newConf = {
      range: false,
      orientation: 'vertical',
    };
    spyOn(bar, 'checkOrientation');
    bar.updateConfig(newConf);

    expect(bar.checkOrientation).toHaveBeenCalledWith();
  });
});
