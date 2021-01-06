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
interface IUpdateConfig {
  [key: string]: boolean | number;
}
class Validator {
  private config: IConfigValidator;

  constructor(config: IConfigValidator) {
    this.config = config;
  }

  validationConfig(data: IUpdateConfig | IConfigValidator): boolean {
    Object.assign(this.config, data);
    const isMinMaxValid = this.validationMaxValue() === true && this.validationMinValue() === true;
    if (isMinMaxValid && this.validationStepValue() === true) {
      return true;
    }
    return false;
  }

  private validationMaxValue(): boolean {
    if (this.config.max > this.config.min) {
      return true;
    }
    return false;
  }

  private validationMinValue(): boolean {
    if (this.config.min < this.config.max) {
      return true;
    }
    return false;
  }

  private validationStepValue(): boolean {
    if (this.config.step <= 0) {
      return false;
    }
    if (this.config.step > this.config.max - this.config.min) {
      return false;
    }
    return true;
  }
}
export default Validator;
