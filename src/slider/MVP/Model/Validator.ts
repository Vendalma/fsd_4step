interface IConfigValidator {
  min: number;
  max: number;
  range: boolean;
  positionFrom: number;
  positionTo: number;
  step: number;
}
interface IUpdateConfig {
  [key: string]: boolean | string | number;
}
class Validator {
  config: IConfigValidator;

  constructor(config: IConfigValidator) {
    this.config = config;
  }

  validationMaxValue(): boolean {
    if (this.config.max > this.config.min) {
      return true;
    }
    return false;
  }

  validationMinValue(): boolean {
    if (this.config.min < this.config.max) {
      return true;
    }
    return false;
  }

  validationStepValue(): boolean {
    if (this.config.step <= 0) {
      return false;
    }
    if (this.config.step > this.config.max - this.config.min) {
      return false;
    }
    return true;
  }

  validationConfig(data: IUpdateConfig | IConfigValidator): boolean {
    Object.assign(this.config, data);
    const isMinMaxValid = this.validationMaxValue() === true && this.validationMinValue() === true;
    if (isMinMaxValid && this.validationStepValue() === true) {
      return true;
    }
    return false;
  }
}
export default Validator;
