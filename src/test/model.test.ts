import Model from '../slider/MVP/Model/Model';
import { IConfig, IDataThumbMove } from '../slider/MVP/Model/modelInterfaces';

const config: IConfig = {
  range: true,
  min: 0,
  max: 100,
  positionFrom: 15,
  positionTo: 50,
  step: 1,
  vertical: false,
  label: true,
};

class TestModel extends Model {
  public config: IConfig;
}
const model: TestModel = new TestModel();

describe('Model', () => {
  beforeAll(() => {
    spyOn(model, 'broadcast');
  });

  it('Инициализация класса Model', () => {
    expect(model).toBeDefined();
  });

  it('метод getConfig возвращает конфиг Model', () => {
    model.updateConfig(config);

    expect(model.getConfig()).toEqual(config);
  });

  it('метод updateConfig устанавливает конфиг и передает его подписчикам класса Model с помощью метода broadcast', () => {
    model.updateConfig(config);

    expect(model.config).toEqual(config);
    expect(model.broadcast).toHaveBeenCalled();
  });

  describe('метод findMoveThumbPosition рассчитывает данные для движения бегунка и передает их, вызывая метод broadcast', () => {
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
      describe('dataNum = 1, range = false', () => {
        beforeEach(function () {
          data.dataNum = '1';
          model.updateConfig({
            step: 0.1,
            max: 100,
            min: 0,
            positionFrom: 10,
            positionTo: 20,
            range: false,
            label: true,
            vertical: false,
          });
        });

        it('при position < 0, вызывается ф-я broadcast', () => {
          data.sliderClientReact = 100;
          model.findMoveThumbPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });

        it('при position > sliderSize, вызывается ф-я broadcast', () => {
          data.clientXY = 410;
          model.calcOnloadPosition(300);
          model.findMoveThumbPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });

        it('при position, вызывается ф-я broadcast', () => {
          model.findMoveThumbPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });
      });

      describe('dataNum = 1, range = true', () => {
        beforeEach(function () {
          data.dataNum = '1';
          model.updateConfig({
            step: 0.1,
            max: 100,
            min: 0,
            positionFrom: 10,
            positionTo: 20,
            range: true,
            label: true,
            vertical: false,
          });
        });

        it('если position < 0, вызывается метод broadcast', () => {
          data.sliderClientReact = 110;
          model.findMoveThumbPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });

        it('при position > secondThumbPosition, вызывается ф-я broadcast', () => {
          data.clientXY = 410;
          model.findMoveThumbPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });

        it('при position, вызывается метод broadcast', () => {
          model.findMoveThumbPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });
      });

      describe('dataNum = 2, range = true', () => {
        beforeEach(function () {
          data.dataNum = '2';
          model.updateConfig({
            step: 0.1,
            max: 100,
            min: 0,
            positionFrom: 10,
            positionTo: 20,
            range: true,
            label: true,
            vertical: false,
          });
        });

        it('при position < firstThumbPosition, вызывается ф-я broadcast', () => {
          data.sliderClientReact = 110;
          model.findMoveThumbPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });

        it('если position > sliderSize, вызывается метод broadcast', () => {
          data.clientXY = 410;
          model.calcOnloadPosition(300);
          model.findMoveThumbPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });

        it('если position, вызывается ф-я broadcast', () => {
          model.findMoveThumbPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });
      });

      describe('dataNum = 3, range = true', () => {
        it('dataNum = 3, то вызывается метод broadcast с значением undefined', () => {
          data.dataNum = '3';
          model.updateConfig({
            step: 0.1,
            max: 100,
            min: 0,
            positionFrom: 10,
            positionTo: 20,
            range: true,
            label: true,
            vertical: false,
          });
          model.findMoveThumbPosition(data);

          expect(model.broadcast).toHaveBeenCalledWith({ value: undefined, type: 'positionThumb' });
        });
      });
    });

    describe('step = 1', () => {
      describe('dataNum = 1, range = false', () => {
        beforeEach(function () {
          data.dataNum = '1';
          model.updateConfig({
            step: 1,
            max: 100,
            min: 0,
            positionFrom: 10,
            positionTo: 20,
            range: false,
            label: true,
            vertical: false,
          });
        });

        it('при position < 0, вызывается ф-я broadcast', () => {
          data.sliderClientReact = 110;
          model.findMoveThumbPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });

        it('при position > sliderSize, вызывается ф-я broadcast', () => {
          data.clientXY = 410;
          model.calcOnloadPosition(300);
          model.findMoveThumbPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });

        it('при position, вызывается ф-я broadcast', () => {
          model.findMoveThumbPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });
      });

      describe('dataNum = 1, range = true', () => {
        beforeEach(function () {
          data.dataNum = '1';
          model.updateConfig({
            step: 1,
            max: 100,
            min: 0,
            positionFrom: 10,
            positionTo: 20,
            range: true,
            label: true,
            vertical: false,
          });
        });

        it('если position < 0, вызывается метод broadcast', () => {
          data.sliderClientReact = 110;
          model.findMoveThumbPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });

        it('при position > secondThumbPosition, вызывается ф-я broadcast', () => {
          data.clientXY = 410;
          model.findMoveThumbPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });

        it('при position, вызывается метод broadcast', () => {
          model.findMoveThumbPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });
      });
    });

    describe('dataNum = 2, range = true', () => {
      beforeEach(function () {
        data.dataNum = '2';
        model.updateConfig({
          step: 1,
          max: 100,
          min: 0,
          positionFrom: 10,
          positionTo: 20,
          range: true,
          label: true,
          vertical: false,
        });
      });

      it('при position < firstThumbPosition, вызывается ф-я broadcast', () => {
        data.sliderClientReact = 110;
        model.findMoveThumbPosition(data);

        expect(model.broadcast).toHaveBeenCalled();
      });

      it('если position > sliderSize, вызывается метод broadcast', () => {
        data.clientXY = 410;
        model.calcOnloadPosition(300);
        model.findMoveThumbPosition(data);

        expect(model.broadcast).toHaveBeenCalled();
      });

      it('если position, вызывается broadcast', () => {
        model.findMoveThumbPosition(data);

        expect(model.broadcast).toHaveBeenCalled();
      });
    });
  });

  it('метод calcOnloadPosition принимает размер слайдера, рассчитывает начальные позиции бегунков, передает данные через метод broadcast', () => {
    model.calcOnloadPosition(150);

    expect(model.broadcast).toHaveBeenCalled();
  });
});
