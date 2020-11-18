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
  validationPositionFrom() {
    if (this.config.positionFrom < this.config.min) {
      return false;
    } else if (
      this.config.range &&
      this.config.positionFrom > this.config.positionTo
    ) {
      return false;
    } else if (
      !this.config.range &&
      this.config.positionFrom > this.config.max
    ) {
      return false;
    }
    return true;
  }
  validationPositionTo() {
    if (this.config.range && this.config.positionTo > this.config.max) {
      return false;
    } else if (
      this.config.range &&
      this.config.positionTo < this.config.positionFrom
    ) {
      return false;
    }
    return true;
  }
  validationStepValue() {
    if (this.config.step <= 0) {
      return false;
    } else if (this.config.step > this.config.max - this.config.min) {
      return false;
    }
    return true;
  }
  validationConfig(data: any) {
    Object.assign(this.config, data);
    if (
      this.validationMaxValue() === true &&
      this.validationMinValue() === true &&
      this.validationPositionFrom() === true &&
      this.validationPositionTo() === true &&
      this.validationStepValue() === true
    ) {
      return true;
    }
    return false;
  }
}
export { Validator };

