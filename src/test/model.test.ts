import Model from '../slider/MVP/Model/Model';
import { IConfig } from '../slider/MVP/Model/types';

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

  describe('метод updateConfig валидирует конфиг и передает его подписчикам класса Model с помощью метода broadcast', () => {
    it('если конфиг проходит валидацию, его значение устанавливается для модели', () => {
      model.updateConfig(config);

      expect(model.config).toEqual(config);
      expect(model.broadcast).toHaveBeenCalled();
    });

    describe('проверка валидации значений min, max', () => {
      it('если max < min, то max равно дефолтному значению', () => {
        const data = {
          max: 9,
          min: 10,
          step: 1,
          positionFrom: 11,
          positionTo: 17,
          range: true,
          label: true,
          vertical: true,
        };
        const expectedValue = {
          max: 100,
          min: 10,
          step: 1,
          positionFrom: 11,
          positionTo: 17,
          range: true,
          label: true,
          vertical: true,
        };

        model.updateConfig(data);

        expect(model.config).toEqual(expectedValue);
      });

      it('если min > max,при max равном дефолтному значению, то min так же равно дефолтному значению', () => {
        const data = {
          max: 100,
          min: 101,
          step: 1,
          positionFrom: 90,
          positionTo: 90,
          range: true,
          label: true,
          vertical: true,
        };
        const expectedValue = {
          max: 100,
          min: 0,
          step: 1,
          positionFrom: 90,
          positionTo: 90,
          range: true,
          label: true,
          vertical: true,
        };

        model.updateConfig(data);

        expect(model.config).toEqual(expectedValue);
      });
    });

    describe('проверка валидации step', () => {
      it('если step <= 0, то step равно дефолтному значению', () => {
        const data = {
          max: 100,
          min: 10,
          step: 0,
          positionFrom: 11,
          positionTo: 17,
          range: true,
          label: true,
          vertical: true,
        };
        const expectedValue = {
          max: 100,
          min: 10,
          step: 1,
          positionFrom: 11,
          positionTo: 17,
          range: true,
          label: true,
          vertical: true,
        };

        model.updateConfig(data);

        expect(model.config).toEqual(expectedValue);
      });

      it('если step > max - min, то step равно дефолтному значению', () => {
        const data = {
          max: 100,
          min: 10,
          step: 91,
          positionFrom: 11,
          positionTo: 17,
          range: true,
          label: true,
          vertical: true,
        };
        const expectedValue = {
          max: 100,
          min: 10,
          step: 1,
          positionFrom: 11,
          positionTo: 17,
          range: true,
          label: true,
          vertical: true,
        };

        model.updateConfig(data);

        expect(model.config).toEqual(expectedValue);
      });
    });

    describe('проверка валидации positionFrom', () => {
      it('если positionFrom < min, то positionFrom равно min', () => {
        const data = {
          max: 100,
          min: 10,
          step: 1,
          positionFrom: 9,
          positionTo: 17,
          range: true,
          label: true,
          vertical: true,
        };
        const expectedValue = {
          max: 100,
          min: 10,
          step: 1,
          positionFrom: 10,
          positionTo: 17,
          range: true,
          label: true,
          vertical: true,
        };

        model.updateConfig(data);

        expect(model.config).toEqual(expectedValue);
      });

      it('если range=false и positionFrom > max, то positionFrom равно max', () => {
        const data = {
          max: 100,
          min: 10,
          step: 1,
          positionFrom: 101,
          positionTo: 17,
          range: false,
          label: true,
          vertical: true,
        };
        const expectedValue = {
          max: 100,
          min: 10,
          step: 1,
          positionFrom: 100,
          positionTo: 17,
          range: false,
          label: true,
          vertical: true,
        };

        model.updateConfig(data);

        expect(model.config).toEqual(expectedValue);
      });

      it('если range = true и positionFrom > max, то positionFrom равно min', () => {
        const data = {
          max: 100,
          min: 10,
          step: 1,
          positionFrom: 101,
          positionTo: 17,
          range: true,
          label: true,
          vertical: true,
        };
        const expectedValue = {
          max: 100,
          min: 10,
          step: 1,
          positionFrom: 10,
          positionTo: 17,
          range: true,
          label: true,
          vertical: true,
        };

        model.updateConfig(data);

        expect(model.config).toEqual(expectedValue);
      });
    });

    describe('проверка валидации positionTo', () => {
      it('если positionTo <= positionFrom и max - min > step, то positionTo = positionFrom, а positionFrom = positionTo - step, при этом positionFrom повторно валидируется', () => {
        const data = {
          max: 100,
          min: 10,
          step: 1,
          positionFrom: 10,
          positionTo: 9,
          range: true,
          label: true,
          vertical: true,
        };
        const expectedValue = {
          max: 100,
          min: 10,
          step: 1,
          positionFrom: 10,
          positionTo: 10,
          range: true,
          label: true,
          vertical: true,
        };

        model.updateConfig(data);

        expect(model.config).toEqual(expectedValue);
      });

      it('если positionTo <= positionFrom и max - min <= step, то positionTo = max', () => {
        const data = {
          max: 100,
          min: 10,
          step: 90,
          positionFrom: 10,
          positionTo: 9,
          range: true,
          label: true,
          vertical: true,
        };
        const expectedValue = {
          max: 100,
          min: 10,
          step: 90,
          positionFrom: 10,
          positionTo: 100,
          range: true,
          label: true,
          vertical: true,
        };

        model.updateConfig(data);

        expect(model.config).toEqual(expectedValue);
      });

      it('если positionTo > max, то positionTo = max', () => {
        const data = {
          max: 100,
          min: 10,
          step: 1,
          positionFrom: 10,
          positionTo: 101,
          range: true,
          label: true,
          vertical: true,
        };
        const expectedValue = {
          max: 100,
          min: 10,
          step: 1,
          positionFrom: 10,
          positionTo: 100,
          range: true,
          label: true,
          vertical: true,
        };

        model.updateConfig(data);

        expect(model.config).toEqual(expectedValue);
      });
    });
  });

  it('метод updatePosition обновляет значения positionFrom, positionTo в конфиге и передает его подписчикам класса Model через метод broadcast', () => {
    model.updatePosition({ positionFrom: 10, positionTo: 20 });

    expect(model.config).toEqual({
      range: true,
      min: 10,
      max: 100,
      positionFrom: 10,
      positionTo: 20,
      step: 1,
      vertical: true,
      label: true,
    });

    expect(model.broadcast).toHaveBeenCalled();
  });
});
