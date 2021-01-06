import Validator from '../slider/MVP/Model/Validator';

interface IConfigValidator {
  min: number;
  max: number;
  range: boolean;
  positionFrom: number;
  positionTo: number;
  vertical: boolean;
  step: number;
  label: boolean;
}

const config: IConfigValidator = {
  range: true,
  min: 0,
  max: 100,
  positionFrom: 15,
  positionTo: 30,
  step: 1,
  label: true,
  vertical: true,
};

const validator: Validator = new Validator(config);
describe('Validator', () => {
  it('Инициализация класса Validator', () => {
    expect(validator).toBeDefined();
  });

  describe('метод validationConfig', () => {
    let data: IConfigValidator;
    beforeEach(function () {
      data = {
        max: 10,
        min: 0,
        step: 5,
        positionFrom: 2,
        positionTo: 7,
        range: true,
        label: true,
        vertical: true,
      };
    });

    it('при заданных значения, ф-я вернет true', () => {
      expect(validator.validationConfig(data)).toBeTrue();
    });

    it('если max < min, ф-я вернет false', () => {
      data.max = -100;

      expect(validator.validationConfig(data)).toBeFalse();
    });

    it('если min > max, ф-я вернет false', () => {
      data.min = 20;

      expect(validator.validationConfig(data)).toBeFalse();
    });

    it('если step > max - min, ф-я вернет false', () => {
      data.step = 1000;

      expect(validator.validationConfig(data)).toBeFalse();
    });

    it('если step = 0, ф-я вернет false', () => {
      data.step = 0;

      expect(validator.validationConfig(data)).toBeFalse();
    });

    it('если step < 0, ф-я вернет false', () => {
      data.step = -10;

      expect(validator.validationConfig(data)).toBeFalse();
    });

    it('при изменении параметра label, ф-я вернет true', () => {
      data.label = false;

      expect(validator.validationConfig(data)).toBeTrue();
    });

    it('при изменении параметра vertical, ф-я вернет true', () => {
      expect(validator.validationConfig({ vertical: false })).toBeTrue();
    });

    it('при изменении параметра positionTo, ф-я вернет true', () => {
      expect(validator.validationConfig({ positionTo: 5 })).toBeTrue();
    });
  });
});
