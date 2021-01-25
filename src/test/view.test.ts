import SliderBlock from '../slider/MVP/View/sliderBlock';
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
  vertical: false,
};

const $block = $('<div>');
class TestView extends View {
  public sliderBlock: SliderBlock;

  constructor() {
    super($block[0]);
  }
}

$(document.body).append($block);
const view: TestView = new TestView();
const sliderBlock = jasmine.createSpyObj('sliderBlock', ['setPositionThumb', 'updateConfig']);
view.sliderBlock = sliderBlock;
describe('View', () => {
  beforeAll(() => {
    view.setConfig(config);
  });

  it('Инициализация View', () => {
    expect(view).toBeDefined();
  });

  describe('метод setPositionThumb', () => {
    let data: IPosition;
    it('при заданных параметрах data, вызывается ф-я setPositionThumb, которая передает данные в класс sliderBlock', () => {
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

    it('метод вызывает ф-ю setPositionThumb в классе sliderBlock', () => {
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

    it('вызывается ф-я setPositionThumb, передающая данные в класс sliderBlock', () => {
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
    spyOn(view, 'subscribe');
    view.addFollower({});

    expect(view.subscribe).toHaveBeenCalled();
  });

  describe('метод resizeWindow передает данные о размере контейнера при изменении размера окна браузера', () => {
    it('при resize ', () => {
      spyOn(view, 'broadcast');
      const event = new UIEvent('resize', {});
      window.dispatchEvent(event);

      expect(view.broadcast).toHaveBeenCalled();
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
      vertical: true,
    };
    view.setConfig(newConf);

    expect(view.sliderBlock.updateConfig).toHaveBeenCalled();
  });
});
