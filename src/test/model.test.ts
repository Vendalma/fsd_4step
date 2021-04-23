import Model from '../slider/MVP/Model/Model';
import { IConfig } from '../slider/MVP/Model/types';

const config: IConfig = {
  range: true,
  min: 0,
  max: 100,
  valueFrom: 15,
  valueTo: 50,
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

    describe('метод checkPositionValues проверяет чтобы переданные значения не выходили за пределы допустимых параметров и вызывает метод updateConfig', () => {
      beforeAll(() => {
        spyOn(model, 'updateConfig');
      });

      it('если значение меньше границы с левой стороны', () => {
        model.checkPositionValues({
          value: 5,
          leftPointValue: 10,
          rightPointValue: 100,
          nameState: 'valueFrom',
        });

        expect(model.broadcast).toHaveBeenCalled();
      });

      it('если значение больше границы с правой стороны', () => {
        model.checkPositionValues({
          value: 110,
          leftPointValue: 10,
          rightPointValue: 100,
          nameState: 'valueFrom',
        });

        expect(model.broadcast).toHaveBeenCalled();
      });

      it('если значение не выходит за пределы границ', () => {
        model.checkPositionValues({
          value: 50,
          leftPointValue: 10,
          rightPointValue: 100,
          nameState: 'valueFrom',
        });

        expect(model.broadcast).toHaveBeenCalled();
      });
    });

    describe('проверка валидации значений min, max', () => {
      it('если max < min, то max равно дефолтному значению', () => {
        const data = {
          max: 9,
          min: 10,
          step: 1,
          valueFrom: 11,
          valueTo: 17,
          range: true,
          label: true,
          vertical: true,
        };
        const expectedValue = {
          max: 100,
          min: 10,
          step: 1,
          valueFrom: 11,
          valueTo: 17,
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
          valueFrom: 90,
          valueTo: 90,
          range: true,
          label: true,
          vertical: true,
        };
        const expectedValue = {
          max: 100,
          min: 0,
          step: 1,
          valueFrom: 90,
          valueTo: 90,
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
          valueFrom: 11,
          valueTo: 17,
          range: true,
          label: true,
          vertical: true,
        };
        const expectedValue = {
          max: 100,
          min: 10,
          step: 1,
          valueFrom: 11,
          valueTo: 17,
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
          valueFrom: 11,
          valueTo: 17,
          range: true,
          label: true,
          vertical: true,
        };
        const expectedValue = {
          max: 100,
          min: 10,
          step: 1,
          valueFrom: 11,
          valueTo: 17,
          range: true,
          label: true,
          vertical: true,
        };

        model.updateConfig(data);

        expect(model.config).toEqual(expectedValue);
      });
    });

    describe('проверка валидации valueFrom', () => {
      it('если valueFrom < min, то valueFrom равно min', () => {
        const data = {
          max: 100,
          min: 10,
          step: 1,
          valueFrom: 9,
          valueTo: 17,
          range: true,
          label: true,
          vertical: true,
        };
        const expectedValue = {
          max: 100,
          min: 10,
          step: 1,
          valueFrom: 10,
          valueTo: 17,
          range: true,
          label: true,
          vertical: true,
        };

        model.updateConfig(data);

        expect(model.config).toEqual(expectedValue);
      });

      it('если range=false и valueFrom > max, то valueFrom равно max', () => {
        const data = {
          max: 100,
          min: 10,
          step: 1,
          valueFrom: 101,
          valueTo: 17,
          range: false,
          label: true,
          vertical: true,
        };
        const expectedValue = {
          max: 100,
          min: 10,
          step: 1,
          valueFrom: 100,
          valueTo: 17,
          range: false,
          label: true,
          vertical: true,
        };

        model.updateConfig(data);

        expect(model.config).toEqual(expectedValue);
      });

      it('если range = true и valueFrom > max, то valueFrom равно min', () => {
        const data = {
          max: 100,
          min: 10,
          step: 1,
          valueFrom: 101,
          valueTo: 17,
          range: true,
          label: true,
          vertical: true,
        };
        const expectedValue = {
          max: 100,
          min: 10,
          step: 1,
          valueFrom: 10,
          valueTo: 17,
          range: true,
          label: true,
          vertical: true,
        };

        model.updateConfig(data);

        expect(model.config).toEqual(expectedValue);
      });
    });

    describe('проверка валидации valueTo', () => {
      it('если valueTo <= valueFrom и max - min > step, то valueTo = valueFrom, а valueFrom = valueTo - step, при этом valueFrom повторно валидируется', () => {
        const data = {
          max: 100,
          min: 10,
          step: 1,
          valueFrom: 10,
          valueTo: 9,
          range: true,
          label: true,
          vertical: true,
        };
        const expectedValue = {
          max: 100,
          min: 10,
          step: 1,
          valueFrom: 10,
          valueTo: 10,
          range: true,
          label: true,
          vertical: true,
        };

        model.updateConfig(data);

        expect(model.config).toEqual(expectedValue);
      });

      it('если valueTo <= valueFrom и max - min <= step, то valueTo = max', () => {
        const data = {
          max: 100,
          min: 10,
          step: 90,
          valueFrom: 10,
          valueTo: 9,
          range: true,
          label: true,
          vertical: true,
        };
        const expectedValue = {
          max: 100,
          min: 10,
          step: 90,
          valueFrom: 10,
          valueTo: 100,
          range: true,
          label: true,
          vertical: true,
        };

        model.updateConfig(data);

        expect(model.config).toEqual(expectedValue);
      });

      it('если valueTo > max, то valueTo = max', () => {
        const data = {
          max: 100,
          min: 10,
          step: 1,
          valueFrom: 10,
          valueTo: 101,
          range: true,
          label: true,
          vertical: true,
        };
        const expectedValue = {
          max: 100,
          min: 10,
          step: 1,
          valueFrom: 10,
          valueTo: 100,
          range: true,
          label: true,
          vertical: true,
        };

        model.updateConfig(data);

        expect(model.config).toEqual(expectedValue);
      });
    });
  });
});
