import SliderBlock from '../slider/MVP/View/sliderBlock';

interface IPosition {
  dataFirstThumb?: {
    positionFrom: number;
    valueFrom: number;
  };
  dataSecondThumb?: {
    positionTo: number;
    valueTo: number;
  };
  stepData?: number;
}
const config = {
  range: true,
  min: 0,
  max: 100,
  positionFrom: 15,
  positionTo: 30,
  label: true,
  step: 1,
  orientation: 'horizontal',
};

describe('Slider Block', () => {
  const block = $('<div>');
  const secondThumb = $('<div>');
  beforeEach(function () {
    secondThumb[0].classList.add('js-slider__thumb-second');
    block.append(secondThumb);
    block[0].classList.add('slider__container');
    $(document.body).append(block);
  });
  const sliderBlock: SliderBlock = new SliderBlock(config, block[0]);
  const observer = jasmine.createSpyObj('observer', ['subscribe', 'broadcast']);
  const progressBar = jasmine.createSpyObj('progressBar', ['addBar', 'cleanStyleAttr', 'updateBarConfig']);
  const step = jasmine.createSpyObj('step', ['updateConfigStep', 'addStepLine']);
  const thumbOne = jasmine.createSpyObj('thumbOne', [
    'addFollower',
    'setPosition',
    'setLabelValue',
    'updateConfigThumb',
    'onMouseUp',
    'cleanStyleAttr',
  ]);
  const thumbTwo = jasmine.createSpyObj('thumbTwo', [
    'addFollower',
    'setPosition',
    'setLabelValue',
    'addThis',
    'removeThis',
    'updateConfigThumb',
    'onMouseUp',
    'cleanStyleAttr',
  ]);

  sliderBlock.observer = observer;
  sliderBlock.progressBar = progressBar;
  sliderBlock.step = step;
  sliderBlock.thumbOne = thumbOne;
  sliderBlock.thumbTwo = thumbTwo;
  it('Инициализация Slider Block', () => {
    expect(sliderBlock).toBeDefined();
    expect(sliderBlock.config).toEqual(config);
    expect(sliderBlock.sliderBlock).toBeInDOM();
    expect(sliderBlock.sliderBlock).toHaveClass('slider__block');
  });

  it('метод addFollower вызывает observer.subscribe', () => {
    sliderBlock.addFollower({});

    expect(sliderBlock.observer.subscribe).toHaveBeenCalledWith({});
  });

  it('метод updateConfig обновляет конфиг, вызывает методы changeRange, changeOrientation, передает новый конфиг классам step, thumbOne, thumbTwo, progressBar', () => {
    const newConf = {
      min: -5,
      max: 40,
      range: false,
      positionFrom: 0,
      positionTo: 10,
      label: false,
      orientation: 'vertical',
    };
    spyOn(sliderBlock, 'checkOrientation');
    spyOn(sliderBlock, 'setThumbTwo');
    sliderBlock.updateConfig(newConf);

    expect(sliderBlock.checkOrientation).toHaveBeenCalledWith();
    expect(sliderBlock.setThumbTwo).toHaveBeenCalledWith();
    expect(step.updateConfigStep).toHaveBeenCalledWith(newConf);
    expect(thumbOne.updateConfigThumb).toHaveBeenCalledWith(newConf);
    expect(thumbTwo?.updateConfigThumb).toHaveBeenCalledWith(newConf);
    expect(progressBar.updateBarConfig).toHaveBeenCalledWith(newConf);
  });

  describe('метод checkOrientation', () => {
    it('при orientation = vertical блоку присваивается класс slider__block_vertical', () => {
      sliderBlock.config.orientation = 'vertical';
      sliderBlock.checkOrientation();

      expect(sliderBlock.sliderBlock).toHaveClass('slider__block_vertical');
    });

    it('при orientation = horizontal у блока удаляется класс slider__block_vertical', () => {
      sliderBlock.config.orientation = 'horizontal';
      sliderBlock.checkOrientation();

      expect(sliderBlock.sliderBlock).not.toHaveClass('slider__block_vertical');
    });
  });

  describe('метод setPositionThumb всегда вызывает ф-ю addBar класса progressBar', () => {
    it('при data.stepData !== undefined вызываются ф-ции addStepLine класса Step и cleanStyleAttr в классах thumbOne, thumbTwo, progressBar', () => {
      const data = {
        stepData: 30.5,
      };
      sliderBlock.setPositionThumb(data);

      expect(sliderBlock.step.addStepLine).toHaveBeenCalledWith(data.stepData);
      expect(sliderBlock.thumbOne.cleanStyleAttr).toHaveBeenCalledWith();
      expect(sliderBlock.thumbTwo?.cleanStyleAttr).toHaveBeenCalledWith();
      expect(sliderBlock.progressBar.cleanStyleAttr).toHaveBeenCalledWith();
      expect(sliderBlock.progressBar.addBar).toHaveBeenCalledWith();
    });

    it('при data.dataFirstThumb !== undefined вызываются ф-ции setPosition,setLabelValue класса thumbOne', () => {
      const data = {
        dataFirstThumb: {
          positionFrom: 100,
          valueFrom: 5,
        },
      };
      sliderBlock.setPositionThumb(data);

      expect(sliderBlock.thumbOne.setPosition).toHaveBeenCalledWith(data.dataFirstThumb.positionFrom);
      expect(sliderBlock.thumbOne.setLabelValue).toHaveBeenCalledWith(data.dataFirstThumb.valueFrom);
      expect(sliderBlock.progressBar.addBar).toHaveBeenCalledWith();
    });

    it('при data.dataSecondThumb !== undefined вызываются ф-ции setPosition,setLabelValue класса thumbTwo', () => {
      const data = {
        dataSecondThumb: {
          positionTo: 100,
          valueTo: 5,
        },
      };
      sliderBlock.setPositionThumb(data);

      expect(sliderBlock.thumbTwo?.setPosition).toHaveBeenCalledWith(data.dataSecondThumb.positionTo);
      expect(sliderBlock.thumbTwo?.setLabelValue).toHaveBeenCalledWith(data.dataSecondThumb.valueTo);
      expect(sliderBlock.progressBar.addBar).toHaveBeenCalledWith();
    });
  });

  it('метод subscribeOnUpdate вызывает ф-ю addFollower в классах thumbOne, thumbTwo', () => {
    sliderBlock.subscribeOnUpdate();

    expect(sliderBlock.thumbOne.addFollower).toHaveBeenCalledWith(sliderBlock);
    expect(sliderBlock.thumbTwo?.addFollower).toHaveBeenCalledWith(sliderBlock);
  });

  describe('метод setThumbTwo', () => {
    let thumbSecond: HTMLElement;
    beforeAll(function () {
      thumbSecond = sliderBlock.sliderBlock.querySelector('.js-slider__thumb-second') as HTMLElement;
    });

    it('при range = true вызывает ф-ю addThis в классе thumbTwo', () => {
      sliderBlock.config.range = true;
      sliderBlock.setThumbTwo();

      expect(sliderBlock.thumbTwo?.addThis).toHaveBeenCalledWith();
    });

    it('при range = false вызывает ф-ю removeThis в классе thumbTwo', () => {
      sliderBlock.config.range = false;
      sliderBlock.setThumbTwo();

      expect(sliderBlock.thumbTwo?.removeThis).toHaveBeenCalledWith();
    });
  });

  it('метод update вызывает ф-ю broadcast класса observer', () => {
    const data = {
      clientXY: 100,
      sliderClientReact: 5,
      dataNum: '2',
      positionThumbFirst: 30,
      positionThumbSecond: 45,
    };
    sliderBlock.update('mouse', data);

    expect(sliderBlock.observer.broadcast).toHaveBeenCalledWith('mouseMove', data);
  });

  describe('метод sliderClick добавляет контейнеру обработчик событий', () => {
    let event: MouseEvent;
    beforeEach(function () {
      event = new MouseEvent('click', { bubbles: true });
    });

    it('при orientation = horizontal вызывается ф-я fundClickPlaceHorizon', () => {
      sliderBlock.config.orientation = 'horizontal';
      spyOn(sliderBlock, 'fundClickPlaceHorizon');

      sliderBlock.sliderClick();
      sliderBlock.sliderBlock.dispatchEvent(event);

      expect(sliderBlock.fundClickPlaceHorizon).toHaveBeenCalledWith(event);
    });

    it('при orientation = vertical вызывается ф-я fundClickPlaceVert', () => {
      sliderBlock.config.orientation = 'vertical';
      spyOn(sliderBlock, 'fundClickPlaceVert');
      sliderBlock.sliderBlock.dispatchEvent(event);

      expect(sliderBlock.fundClickPlaceVert).toHaveBeenCalledWith(event);
    });
  });

  describe('метод onSliderClick', () => {
    let event: MouseEvent;
    beforeEach(function () {
      event = new MouseEvent('click', { bubbles: true });
    });

    it('если orientation = horizontal вызывается ф-я fundClickPlaceHorizon', () => {
      sliderBlock.config.orientation = 'horizontal';
      spyOn(sliderBlock, 'fundClickPlaceHorizon');
      sliderBlock.onSliderClick(event);

      expect(sliderBlock.fundClickPlaceHorizon).toHaveBeenCalledWith(event);
    });

    it('при orientation = vertical вызывается метод fundClickPlaceVert', () => {
      sliderBlock.config.orientation = 'vertical';
      spyOn(sliderBlock, 'fundClickPlaceVert');
      sliderBlock.onSliderClick(event);

      expect(sliderBlock.fundClickPlaceVert).toHaveBeenCalledWith(event);
    });
  });

  describe('метод fundClickPlaceHorizon', () => {
    let event: MouseEvent;
    beforeAll(function () {
      event = new MouseEvent('click', { bubbles: true });
      sliderBlock.config.orientation = 'horizontal';
      sliderBlock.thumbOne.thumb = sliderBlock.sliderBlock.querySelector('.js-slider__thumb-first') as HTMLElement;
      if (sliderBlock.thumbTwo)
        sliderBlock.thumbTwo.thumb = sliderBlock.sliderBlock.querySelector('.js-slider__thumb-second') as HTMLElement;
    });

    it('при range = false вызывается метод onMouseUp класса thumbOne', () => {
      sliderBlock.config.range = false;
      sliderBlock.fundClickPlaceHorizon(event);

      expect(sliderBlock.thumbOne.onMouseUp).toHaveBeenCalledWith(event);
    });

    it('при range = true thumbFirst < thumbSecond вызывается метод onMouseUp класса thumbOne', () => {
      sliderBlock.config.range = true;
      const thumbFirst = 40;
      const thumbSecond = 100;
      sliderBlock.fundClickPlaceHorizon(event);

      expect(sliderBlock.thumbOne.onMouseUp).toHaveBeenCalledWith(event);
    });

    it('при range = true thumbFirst > thumbSecond вызывается метод onMouseUp класса thumbTwo', () => {
      sliderBlock.config.range = true;
      const thumbFirst = 100;
      const thumbSecond = 30;
      sliderBlock.fundClickPlaceHorizon(event);

      expect(sliderBlock.thumbTwo?.onMouseUp).toHaveBeenCalledWith(event);
    });
  });

  describe('метод fundChickPlaceVert', () => {
    let event: MouseEvent;
    beforeAll(function () {
      event = new MouseEvent('click', { bubbles: true });
      sliderBlock.config.orientation = 'vertical';
      sliderBlock.thumbOne.thumb = sliderBlock.sliderBlock.querySelector('.js-slider__thumb-first') as HTMLElement;
      if (sliderBlock.thumbTwo)
        sliderBlock.thumbTwo.thumb = sliderBlock.sliderBlock.querySelector('.js-slider__thumb-second') as HTMLElement;
    });

    it('если range = false вызывается метод onMouseUp класса thumbOne', () => {
      sliderBlock.config.range = false;
      sliderBlock.fundClickPlaceHorizon(event);

      expect(sliderBlock.thumbOne.onMouseUp).toHaveBeenCalledWith(event);
    });

    it('если range = true thumbFirst < thumbSecond вызывается метод onMouseUp класса thumbOne', () => {
      sliderBlock.config.range = true;
      const thumbFirst = 40;
      const thumbSecond = 100;
      sliderBlock.fundClickPlaceHorizon(event);

      expect(sliderBlock.thumbOne.onMouseUp).toHaveBeenCalledWith(event);
    });

    it('если range = true thumbFirst > thumbSecond вызывается метод onMouseUp класса thumbTwo', () => {
      sliderBlock.config.range = true;
      const thumbFirst = 100;
      const thumbSecond = 30;
      sliderBlock.fundClickPlaceHorizon(event);

      expect(sliderBlock.thumbTwo?.onMouseUp).toHaveBeenCalledWith(event);
    });
  });
});
