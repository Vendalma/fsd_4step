import Validator from '../slider/MVP/Model/Validator';

interface IConfigValidator {
  min: number;
  max: number;
  range: boolean;
  positionFrom: number;
  positionTo: number;
  orientation: string;
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
  orientation: 'vertical',
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
        orientation: 'vertical',
      };
    });

    it('при заданных значения, ф-я вернет true', () => {
      expect(validator.validationConfig(data)).toBeTrue();
    });

    it('при заданных значения, ф-я вернет false', () => {
      data.max = -100;

      expect(validator.validationConfig(data)).toBeFalse();
    });

    it('при заданных значения, ф-я вернет false', () => {
      data.min = 20;

      expect(validator.validationConfig(data)).toBeFalse();
    });

    it('при заданных значения, ф-я вернет false', () => {
      data.step = 1000;

      expect(validator.validationConfig(data)).toBeFalse();
    });

    it('при заданных значения, ф-я вернет false', () => {
      data.step = 0;

      expect(validator.validationConfig(data)).toBeFalse();
    });

    it('при заданных значения, ф-я вернет false', () => {
      data.step = -10;

      expect(validator.validationConfig(data)).toBeFalse();
    });

    it('при заданных значения, ф-я вернет true', () => {
      data.label = false;

      expect(validator.validationConfig(data)).toBeTrue();
    });

    it('при заданных значения, ф-я вернет true', () => {
      expect(validator.validationConfig({ orientation: 'horizontal' })).toBeTrue();
    });

    it('при заданных значения, ф-я вернет true', () => {
      expect(validator.validationConfig({ positionTo: 5 })).toBeTrue();
    });
  });
});
