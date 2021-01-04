import SliderBlock from '../slider/MVP/View/sliderBlock';
import View from '../slider/MVP/View/View';
import Observer from '../slider/Observer/Observer';

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
class TestView extends View {
  public observer: Observer;

  public sliderBlock: SliderBlock;

  constructor() {
    super(config, block[0]);
  }
}

$(document.body).append(block);
const view: TestView = new TestView();
const observer = jasmine.createSpyObj('observer', ['broadcast', 'subscribe']);
const sliderBlock = jasmine.createSpyObj('sliderBlock', ['setPositionThumb', 'updateConfig']);
view.observer = observer;
view.sliderBlock = sliderBlock;
describe('View', () => {
  it('Инициализация View', () => {
    expect(view).toBeDefined();
  });

  describe('метод setPositionThumb', () => {
    let data: IPosition;
    it('должна вызваться ф-я setPositionThumb, которая передает данные в класс sliderBlock', () => {
      data = {
        stepData: 20,
        dataFirstThumb: {
          positionFrom: 50,
          valueFrom: 10,
        },
        dataSecondThumb: {
          positionTo: 100,
          valueTo: 30,
        },
      };
      view.setPositionThumb(data);

      expect(view.sliderBlock.setPositionThumb).toHaveBeenCalled();
    });

    it('должна вызваться ф-я setPositionThumb, которая передает данные в класс sliderBlock', () => {
      data = {
        stepData: 30.5,
        dataFirstThumb: undefined,
        dataSecondThumb: undefined,
      };
      view.setPositionThumb(data);

      expect(view.sliderBlock.setPositionThumb).toHaveBeenCalled();
    });

    it('должна вызваться ф-я setPositionThumb, которая передает данные в класс sliderBlock', () => {
      data = {
        dataFirstThumb: {
          positionFrom: 100,
          valueFrom: 5,
        },
        dataSecondThumb: undefined,
        stepData: undefined,
      };
      view.setPositionThumb(data);

      expect(view.sliderBlock.setPositionThumb).toHaveBeenCalled();
    });

    it('должна вызваться ф-я setPositionThumb, которая передает данные в класс sliderBlock', () => {
      data = {
        dataSecondThumb: {
          positionTo: 100,
          valueTo: 5,
        },
        dataFirstThumb: undefined,
        stepData: undefined,
      };

      view.setPositionThumb(data);

      expect(view.sliderBlock.setPositionThumb).toHaveBeenCalled();
    });
  });

  it('метод addFollower подписывает на обновления класса View', () => {
    view.addFollower({});

    expect(view.observer.subscribe).toHaveBeenCalled();
  });

  describe('метод onloadWindow', () => {
    it('при загрузке окна передает данные о размере контейнера', () => {
      const event = new UIEvent('load', { bubbles: true });
      window.dispatchEvent(event);

      expect(view.observer.broadcast).toHaveBeenCalled();
    });
  });

  describe('метод resizeWindow передает данные о размере контейнера', () => {
    it('при resize ', () => {
      const event = new UIEvent('resize', {});
      window.dispatchEvent(event);

      expect(view.observer.broadcast).toHaveBeenCalled();
    });
  });

  it('метод updateConfig обновляет конфиг View', () => {
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

    expect(view.sliderBlock.updateConfig).toHaveBeenCalled();
  });

  it('метод changeOrientation вызывает метод updateConfig', () => {
    const newConf = {
      min: 0,
      max: 105,
      label: false,
      orientation: 'vertical',
      positionFrom: 5,
      positionTo: 10,
      range: false,
      step: 1,
    };
    spyOn(view, 'updateConfig');
    view.changeOrientationOrRange(newConf);

    expect(view.updateConfig).toHaveBeenCalledWith(newConf);
    expect(view.sliderBlock.updateConfig).toHaveBeenCalled();
  });
});
