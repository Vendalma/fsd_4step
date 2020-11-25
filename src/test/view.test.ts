import View from '../slider/MVP/View/View';

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

const block = $('<div>');
block[0].classList.add('slider__block');
$(document.body).append(block);
const view: View = new View(config, block[0]);
const observer = jasmine.createSpyObj('observer', ['broadcast', 'subscribe']);
const sliderBlock = jasmine.createSpyObj('sliderBlock', ['addFollower', 'setPositionThumb', 'updateConfig']);
view.observer = observer;
view.sliderBlock = sliderBlock;
describe('View', () => {
  it('Инициализация View', () => {
    expect(view).toBeDefined();
    expect(view.config).toEqual(config);
  });

  it('Инициализация блока div.slider', () => {
    expect(view.wrapper).toBeInstanceOf(HTMLElement);
    expect(view.wrapper).toContainElement('div.slider');
    expect(view.wrapper).toHaveClass('slider__wrapper');

    expect(view.sliderContainer).toBeInstanceOf(HTMLElement);
    expect(view.sliderContainer).toHaveClass('slider');
  });

  it('метод subscribeOnUpdate должен вызывать ф-ю addFollower в sliderBlock', () => {
    view.subscribeOnUpdate();

    expect(view.sliderBlock.addFollower).toHaveBeenCalledWith(view);
  });

  it('метод update вызывает ф-ю broadcast в Observer', () => {
    const data = {
      clientXY: 100,
      sliderClientReact: 5,
      dataNum: '2',
      positionThumbFirst: 30,
      positionThumbSecond: 45,
    };
    view.update('mouse', data);

    expect(view.observer.broadcast).toHaveBeenCalledWith('mouseMove', data);
  });

  describe('метод setPositionThumb', () => {
    let data: IPosition;
    beforeEach(function () {
      data = {
        dataFirstThumb: {
          positionFrom: 50,
          valueFrom: 10,
        },
        dataSecondThumb: {
          positionTo: 100,
          valueTo: 30,
        },
      };
    });

    it('должна вызваться ф-я setPositionThumb в sliderBlock и обновиться атрибуты sliderContainer', () => {
      view.setPositionThumb(data);

      expect(view.sliderBlock.setPositionThumb).toHaveBeenCalledWith(data);
    });
  });

  it('метод addFollower вызывает ф-ю subscribe в Observer', () => {
    view.addFollower({});

    expect(view.observer.subscribe).toHaveBeenCalledWith({});
  });

  describe('метод onloadWindow', () => {
    it('при загрузке окна вызывается observer.broadcast в ф-ции getSliderSize во View', () => {
      const event = new UIEvent('load', { bubbles: true });
      window.dispatchEvent(event);

      expect(view.observer.broadcast).toHaveBeenCalledWith('sliderSize', 1250);
    });
  });

  describe('метод resizeWindow', () => {
    it('при resize окна вызывается observer.broadcast в ф-ции getSliderSize во View ', () => {
      const event = new UIEvent('resize', {});
      window.dispatchEvent(event);

      expect(view.observer.broadcast).toHaveBeenCalledWith('sliderSize', 1250);
    });
  });

  describe('метод getSliderSize', () => {
    it('при orientation = horizontal вызывается observer.broadcast', () => {
      view.config.orientation = 'horizontal';
      view.getSliderSize();

      expect(view.observer.broadcast).toHaveBeenCalledWith('sliderSize', 1250);
    });

    it('при orientation = vertical вызывается observer.broadcast', () => {
      view.config.orientation = 'vertical';
      view.getSliderSize();

      expect(view.observer.broadcast).toHaveBeenCalledWith('sliderSize', 1250);
    });
  });

  it('метод updateConfig обновляет конфиг  View и вызывает ф-ю updateConfig в sliderBlock', () => {
    const newConf = {
      range: false,
      min: -100,
      max: 100,
      positionFrom: 10,
      positionTo: 45,
      label: true,
      step: 0.1,
      orientation: 'vertical',
    };
    view.updateConfig(newConf);

    expect(view.config).toEqual(newConf);
    expect(view.sliderBlock.updateConfig).toHaveBeenCalledWith(newConf);
  });

  it('метод changeOrientation вызывает методы getSliderSize и updateConfig', () => {
    const newConf = {
      min: -5,
      max: 105,
      label: false,
      orientation: 'vertical',
      positionFrom: 5,
      positionTo: 10,
      range: false,
      step: 1,
    };
    spyOn(view, 'getSliderSize');
    spyOn(view, 'updateConfig');
    view.changeOrientationOrRange(newConf);

    expect(view.updateConfig).toHaveBeenCalledWith(newConf);
    expect(view.getSliderSize).toHaveBeenCalledWith();
  });
});
