interface IConfigValidator {
  min: number;
  max: number;
  range: boolean;
  positionFrom: number;
  positionTo: number;
  step: number;
}
class Validator {
  config: IConfigValidator;
  constructor(config: IConfigValidator) {
    this.config = config;
  }
  validationMaxValue() {
    if (this.config.max > this.config.min) {
      return true;
    }
    return false;
  }
  validationMinValue() {
    if (this.config.min < this.config.max) {
      return true;
    }
    return false;
  }
  validationStepValue() {
    if (this.config.step <= 0) {
      return false;
    } else if (this.config.step > this.config.max - this.config.min) {
      return false;
    }
    return true;
  }
  validationConfig(data: Object) {
    Object.assign(this.config, data);
    if (
      this.validationMaxValue() === true &&
      this.validationMinValue() === true &&
      this.validationStepValue() === true
    ) {
      return true;
    }
    return false;
  }
}
export { Validator };

