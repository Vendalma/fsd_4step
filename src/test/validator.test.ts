import { Validator } from "../slider/MVP/Model/Validator";
const config = {
  range: true,
  min: 0,
  max: 100,
  positionFrom: 15,
  positionTo: 30,
  step: 1,
};
const validator: Validator = new Validator(config);
describe("Validator", () => {
  it("Инициализация класса Validator", () => {
    expect(validator).toBeDefined();
    expect(validator.config).toEqual(config);
  });
  describe("метод validationMaxValue", () => {
    beforeEach(function () {
      validator.config = config;
    })
    it("если max > min, ф-я вернет true", () => {
      validator.config.max = 100;
      validator.config.min = 10;
      expect(validator.validationMaxValue()).toBeTrue();
    });
    it("если max <= min, ф-я вернет false", () => {
      validator.config.max = 1;
      validator.config.min = 10;
      expect(validator.validationMaxValue()).toBeFalse();
    });
  });
  describe("метод validationMinValue", () => {
    beforeEach(function () {
      validator.config = config;
    })
    it("если min < max, ф-я вернет true", () => {
      validator.config.min = 0;
      validator.config.max = 10;
      expect(validator.validationMinValue()).toBeTrue();
    });
    it("если min > max, ф-я вернет false", () => {
      validator.config.min = 11;
      validator.config.max = 10;
      expect(validator.validationMinValue()).toBeFalse();
    });
  });
  describe("метод validationPositionFrom", () => {
    beforeEach(function () {
      validator.config = config;
    })
    it("если positionFrom < min, ф-я вернет false", () => {
      validator.config.positionFrom = 0;
      validator.config.min = 10;
      expect(validator.validationPositionFrom()).toBeFalse();
    });
    it("если range = true и positionFrom > positionTo, ф-я вернет false", () => {
      validator.config.range = true;
      validator.config.positionFrom = 10;
      validator.config.positionTo = 1;
      expect(validator.validationPositionFrom()).toBeFalse();
    });
    it("если range = false и positionFrom > max, ф-я вернет false", () => {
      validator.config.range = true;
      validator.config.positionFrom = 10;
      validator.config.max = 1;
      expect(validator.validationPositionFrom()).toBeFalse();
    });
    it("при заданных параметрах, ф-я вернет true", () => {
      validator.config.range = true;
      validator.config.min = 0;
      validator.config.max = 100;
      validator.config.positionFrom = 10;
      validator.config.positionTo = 20;
      expect(validator.validationPositionFrom()).toBeTrue();
    });
    it("при заданных параметрах, ф-я вернет true", () => {
      validator.config.range = false;
      validator.config.min = 0;
      validator.config.max = 100;
      validator.config.positionFrom = 10;
      expect(validator.validationPositionFrom()).toBeTrue();
    });
  });
  describe("метод validationPositionTo", () => {
    beforeEach(function () {
      validator.config = config;
    })
    it("если range = true и positionTo > max, ф-я вернет false", () => {
      validator.config.range = true;
      validator.config.positionTo = 10;
      validator.config.max = 1;
      expect(validator.validationPositionTo()).toBeFalse();
    });
    it("если range = true и positionTo < positionFrom, ф-я вернет false", () => {
      validator.config.range = true;
      validator.config.positionFrom = 10;
      validator.config.positionTo = 1;
      expect(validator.validationPositionTo()).toBeFalse();
    });
    it("при заданных параметрах, ф-я вернет true", () => {
      validator.config.range = true;
      validator.config.min = 0;
      validator.config.max = 100;
      validator.config.positionFrom = 10;
      validator.config.positionTo = 20;
      expect(validator.validationPositionTo()).toBeTrue();
    });
  });
  describe("метод validationStepValue", () => {
    beforeEach(function () {
      validator.config = config;
    })
    it("если step < 0, ф-я вернет false", () => {
      validator.config.step = -5;
      expect(validator.validationStepValue()).toBeFalse();
    });
    it("если step > max - min, ф-я вернет false", () => {
      validator.config.max = 10;
      validator.config.min = 8;
      validator.config.step = 5;
      expect(validator.validationStepValue()).toBeFalse();
    });
    it("при заданных параметрах, ф-я вернет true", () => {
      validator.config.min = 0;
      validator.config.max = 100;
      validator.config.step = 2;
      expect(validator.validationPositionFrom()).toBeTrue();
    });
  });
  describe("метод validationConfig", () => {
    let data: any;
    beforeAll(function () {
      data = {
        max: 10,
        min: 0,
        step: 5,
        positionFrom: 2,
        positionTo: 7
      }
    })
    it("при заданных значения, ф-я вернет true", () => {
      expect(validator.validationConfig(data)).toBeTrue();
    });
    it("при заданных значения, ф-я вернет false", () => {
      data.max = -100;
      expect(validator.validationConfig(data)).toBeFalse();
    });

  });
});
