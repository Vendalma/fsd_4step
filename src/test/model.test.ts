import Model from '../slider/MVP/Model/Model';
import { IConfig, IDataThumbMove, IPosition } from '../slider/MVP/Model/modelInterfaces';

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
  public positionState: IPosition;
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

    expect(model.broadcast).toHaveBeenCalled();
  });

  it('метод findOnloadPosition принимает размер слайдера, рассчитывает начальные позиции бегунков, передает данные через метод broadcast', () => {
    model.findOnloadPosition(150);

    expect(model.broadcast).toHaveBeenCalled();
  });

  describe('метод findUpdatedPosition рассчитывает данные для движения бегунка и передает их, вызывая метод broadcast', () => {
    let data: IDataThumbMove;
    beforeEach(function () {
      data = {
        position: 95,
        dataName: 'from',
      };
    });

    describe('step = 0.1', () => {
      describe('dataName = from, range = false', () => {
        beforeEach(function () {
          data.dataName = 'from';
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

        it('при position <= leftPoint, вызывается ф-я broadcast', () => {
          data.position = -100;
          model.findUpdatedPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });

        it('при position > rightPoint, вызывается ф-я broadcast', () => {
          data.position = 410;
          model.findOnloadPosition(300);
          model.findUpdatedPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });

        it('при position, вызывается ф-я broadcast', () => {
          model.findUpdatedPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });
      });

      describe('dataName = from, range = true', () => {
        beforeEach(function () {
          data.dataName = 'from';
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

        it('если position <= leftPoint, вызывается метод broadcast', () => {
          data.position = -110;
          model.findUpdatedPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });

        it('при position > rightPoint, вызывается ф-я broadcast', () => {
          data.position = 410;
          model.positionState.positionTo.position = 390;
          model.findUpdatedPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });

        it('при position, вызывается метод broadcast', () => {
          model.findUpdatedPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });
      });

      describe('dataName = to, range = true', () => {
        beforeEach(function () {
          data.dataName = 'to';
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

        it('при position <= leftPoint, вызывается ф-я broadcast', () => {
          data.position = 110;
          model.positionState.positionFrom.position = 150;
          model.findUpdatedPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });

        it('если position > rightPoint, вызывается метод broadcast', () => {
          data.position = 410;
          model.findOnloadPosition(300);
          model.findUpdatedPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });

        it('если position, вызывается ф-я broadcast', () => {
          model.findUpdatedPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });
      });
    });

    describe('step = 1', () => {
      describe('dataName = from, range = false', () => {
        beforeEach(function () {
          data.dataName = 'from';
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

        it('при position <= leftPoint, вызывается ф-я broadcast', () => {
          data.position = -110;
          model.findUpdatedPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });

        it('при position > rightPoint, вызывается ф-я broadcast', () => {
          data.position = 410;
          model.findOnloadPosition(300);
          model.findUpdatedPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });

        it('при position, вызывается ф-я broadcast', () => {
          model.findUpdatedPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });
      });

      describe('dataName = from, range = true', () => {
        beforeEach(function () {
          data.dataName = 'from';
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

        it('если position <= leftPoint, вызывается метод broadcast', () => {
          data.position = -110;
          model.findUpdatedPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });

        it('при position > rightPoint, вызывается ф-я broadcast', () => {
          data.position = 410;
          model.findUpdatedPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });

        it('при position, вызывается метод broadcast', () => {
          model.findUpdatedPosition(data);

          expect(model.broadcast).toHaveBeenCalled();
        });
      });
    });

    describe('dataName = to, range = true', () => {
      beforeEach(function () {
        data.dataName = 'to';
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

      it('при position <= leftPoint, вызывается ф-я broadcast', () => {
        data.position = 110;
        model.findUpdatedPosition(data);

        expect(model.broadcast).toHaveBeenCalled();
      });

      it('если position > rightPoint, вызывается метод broadcast', () => {
        data.position = 410;
        model.findOnloadPosition(300);
        model.findUpdatedPosition(data);

        expect(model.broadcast).toHaveBeenCalled();
      });

      it('если position, вызывается broadcast', () => {
        model.findUpdatedPosition(data);

        expect(model.broadcast).toHaveBeenCalled();
      });
    });
  });
});
