import Model from '../slider/MVP/Model/Model';
import Observer from '../slider/Observer/Observer';

interface IDataThumbMove {
  clientXY: number;
  sliderClientReact: number;
  dataNum: string;
  positionThumbFirst?: number;
  positionThumbSecond?: number;
}
interface IConfigModel {
  min: number;
  max: number;
  range: boolean;
  positionFrom: number;
  positionTo: number;
  orientation: 'vertical' | 'horizontal';
  step: number;
  label: boolean;
}
const config: IConfigModel = {
  range: true,
  min: 0,
  max: 100,
  positionFrom: 15,
  positionTo: 50,
  step: 1,
  orientation: 'horizontal',
  label: true,
};
class TestModel extends Model {
  public observer: Observer;

  public config: IConfigModel;

  constructor() {
    super(config);
  }
}
describe('Model', () => {
  const model: TestModel = new TestModel();
  const observer = jasmine.createSpyObj('observer', ['broadcast', 'subscribe']);
  model.observer = observer;
  it('Инициализация класса Model', () => {
    expect(model).toBeDefined();
    expect(model.observer).toEqual(observer);
  });

  it('метод addFollower вызывает ф-ю subscribe в кассе Observer', () => {
    model.addFollower({});

    expect(model.observer.subscribe).toHaveBeenCalledWith({});
  });

  describe('метод updateConfig обновляет конфиг модели', () => {
    it('если в принимаемом объекте key = orientation, то вызывается ф-я broadcast класса Observer', () => {
      const data = {
        orientation: 'vertical',
      };
      model.updateConfig(data);

      expect(model.observer.broadcast).toHaveBeenCalled();
    });

    it('если в принимаемом объекте key = orientation, вызывается ф-я broadcast класса Observer, при не корректном значении positionTo, оно пересчитывается', () => {
      const data = {
        orientation: 'vertical',
      };
      model.config.positionTo = 101;
      model.updateConfig(data);

      expect(model.observer.broadcast).toHaveBeenCalled();
    });

    it('если в принимаемом объекте key = range, то вызывается ф-я broadcast класса Observer', () => {
      const data = {
        range: false,
      };
      model.updateConfig(data);

      expect(model.observer.broadcast).toHaveBeenCalled();
    });

    it('если в принимаемом объекте key = positionFrom, вызывается ф-я broadcast класса Observer', () => {
      const data = {
        positionFrom: 45,
      };
      model.updateConfig(data);

      expect(model.observer.broadcast).toHaveBeenCalled();
    });

    it('если в принимаемом объекте key = positionFrom, при не корректном значении, оно пересчитывается, затем вызывается ф-я broadcast класса Observer', () => {
      const data = {
        positionFrom: -5,
      };
      model.updateConfig(data);

      expect(model.observer.broadcast).toHaveBeenCalled();
    });

    it('если key = positionFrom, при не корректном значении, оно пересчитывается и вызывается ф-я broadcast класса Observer', () => {
      model.config.range = true;
      model.config.max = 30;
      const data = {
        positionFrom: 40,
      };
      model.updateConfig(data);

      expect(model.observer.broadcast).toHaveBeenCalled();
    });

    it('если в принимаемом объекте key = positionTo, то вызывается ф-я broadcast класса Observer', () => {
      const data = {
        positionTo: 50,
      };
      model.updateConfig(data);

      expect(model.observer.broadcast).toHaveBeenCalled();
    });

    it('если в принимаемом объекте key = positionTo, при не корректном значении, оно пересчитывается, затем вызывается ф-я broadcast класса Observer', () => {
      model.config.positionFrom = 30;
      model.config.step = 1000;
      const data = {
        positionTo: 25,
      };
      model.updateConfig(data);

      expect(model.observer.broadcast).toHaveBeenCalled();
    });

    it('если в принимаемом объекте key = label, то вызываются ф-я  broadcast класса Observer', () => {
      const data = {
        label: false,
      };
      model.updateConfig(data);

      expect(model.observer.broadcast).toHaveBeenCalled();
    });
  });

  describe('метод getConfig валидирует конфиг модели', () => {
    it('если конфиг проходит валидацию, то метод возвращает его', () => {
      const expectConfig: IConfigModel = {
        range: true,
        min: 0,
        max: 100,
        positionFrom: 15,
        positionTo: 50,
        step: 1,
        orientation: 'horizontal',
        label: true,
      };
      model.updateConfig(expectConfig);
      const result = model.getConfig();

      expect(result).toEqual(expectConfig);
    });
  });

  describe('проверка метода findMoveThumbPosition', () => {
    let data: IDataThumbMove;
    beforeEach(function () {
      data = {
        clientXY: 100,
        sliderClientReact: 5,
        dataNum: '1',
        positionThumbFirst: 10,
        positionThumbSecond: 21,
      };
    });

    describe('step = 0.1', () => {
      model.updateConfig({ step: 0.1 });
      describe('dataNum = 1, range = false', () => {
        beforeEach(function () {
          data.dataNum = '1';
          model.updateConfig({ range: false });
        });

        it('при position < 0, вызывается ф-я broadcast класса Observer', () => {
          data.sliderClientReact = 100;
          model.findMoveThumbPosition(data);

          expect(model.observer.broadcast).toHaveBeenCalled();
        });

        it('при position > sliderSize, вызывается ф-я broadcast класса Observer', () => {
          data.clientXY = 410;
          model.calcOnloadPosition(300);
          model.findMoveThumbPosition(data);

          expect(model.observer.broadcast).toHaveBeenCalled();
        });

        it('при position, вызывается ф-я broadcast класса Observer', () => {
          model.findMoveThumbPosition(data);

          expect(model.observer.broadcast).toHaveBeenCalled();
        });
      });

      describe('dataNum = 1, range = true', () => {
        beforeEach(function () {
          data.dataNum = '1';
          model.updateConfig({ range: true });
        });

        it('если position < 0, вызывается метод broadcast класса Observer', () => {
          data.sliderClientReact = 110;
          model.findMoveThumbPosition(data);

          expect(model.observer.broadcast).toHaveBeenCalled();
        });

        it('при position > secondThumbPosition, вызывается ф-я broadcast класса Observer', () => {
          data.clientXY = 410;
          model.findMoveThumbPosition(data);

          expect(model.observer.broadcast).toHaveBeenCalled();
        });

        it('при position, вызывается метод broadcast класса Observer', () => {
          model.findMoveThumbPosition(data);

          expect(model.observer.broadcast).toHaveBeenCalled();
        });
      });

      describe('dataNum = 2, range = true', () => {
        beforeEach(function () {
          data.dataNum = '2';
          model.updateConfig({ range: true });
        });

        it('при position < firstThumbPosition, вызывается ф-я broadcast класса Observer', () => {
          data.sliderClientReact = 110;
          model.findMoveThumbPosition(data);

          expect(model.observer.broadcast).toHaveBeenCalled();
        });

        it('если position > sliderSize, вызывается метод broadcast класса Observer', () => {
          data.clientXY = 410;
          model.calcOnloadPosition(300);
          model.findMoveThumbPosition(data);

          expect(model.observer.broadcast).toHaveBeenCalled();
        });

        it('если position, вызывается ф-я broadcast класса Observer', () => {
          model.findMoveThumbPosition(data);

          expect(model.observer.broadcast).toHaveBeenCalled();
        });
      });
    });

    describe('step = 1', () => {
      describe('dataNum = 1, range = false', () => {
        model.updateConfig({ step: 1 });
        beforeEach(function () {
          data.dataNum = '1';
          model.updateConfig({ range: false });
        });

        it('при position < 0, вызывается ф-я broadcast класса Observer', () => {
          data.sliderClientReact = 110;
          model.findMoveThumbPosition(data);

          expect(model.observer.broadcast).toHaveBeenCalled();
        });

        it('при position > sliderSize, вызывается ф-я broadcast класса Observer', () => {
          data.clientXY = 410;
          model.calcOnloadPosition(300);
          model.findMoveThumbPosition(data);

          expect(model.observer.broadcast).toHaveBeenCalled();
        });

        it('при position, вызывается ф-я broadcast класса Observer', () => {
          model.findMoveThumbPosition(data);

          expect(model.observer.broadcast).toHaveBeenCalled();
        });
      });

      describe('dataNum = 1, range = true', () => {
        beforeEach(function () {
          data.dataNum = '1';
          model.updateConfig({ range: true });
        });

        it('если position < 0, вызывается метод broadcast класса Observer', () => {
          data.sliderClientReact = 110;
          model.findMoveThumbPosition(data);

          expect(model.observer.broadcast).toHaveBeenCalled();
        });

        it('при position > secondThumbPosition, вызывается ф-я broadcast класса Observer', () => {
          data.clientXY = 410;
          model.findMoveThumbPosition(data);

          expect(model.observer.broadcast).toHaveBeenCalled();
        });

        it('при position, вызывается метод broadcast класса Observer', () => {
          model.findMoveThumbPosition(data);

          expect(model.observer.broadcast).toHaveBeenCalled();
        });
      });
    });

    describe('dataNum = 2, range = true', () => {
      beforeEach(function () {
        data.dataNum = '2';
        model.updateConfig({ range: true });
      });

      it('при position < firstThumbPosition, вызывается ф-я broadcast класса Observer', () => {
        data.sliderClientReact = 110;
        model.findMoveThumbPosition(data);

        expect(model.observer.broadcast).toHaveBeenCalled();
      });

      it('если position > sliderSize, вызывается метод broadcast класса Observer', () => {
        data.clientXY = 410;
        model.calcOnloadPosition(300);
        model.findMoveThumbPosition(data);

        expect(model.observer.broadcast).toHaveBeenCalled();
      });

      it('если position, вызывается ф-я broadcast класса Observer', () => {
        model.findMoveThumbPosition(data);

        expect(model.observer.broadcast).toHaveBeenCalled();
      });
    });
  });

  it('метод calcOnloadPosition принимает размер слайдера и вызывает ф-ю broadcast класса Observer', () => {
    model.calcOnloadPosition(150);

    expect(model.observer.broadcast).toHaveBeenCalled();
  });
});
