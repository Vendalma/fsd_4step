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
class Validator {
  config: IConfigValidator;
  constructor(config: IConfigValidator) {
    this.config = config;
  }

  private validationMaxValue() {
    try {
      if (this.config.max <= this.config.min) {
        throw new Error("Error: max <= min");
      }
      return true;
    } catch (error) {
      return error;
    }
  }

  private validationMinValue() {
    try {
      if (this.config.min >= this.config.max) {
        throw new Error("Error: min >= max");
      }
      return true;
    } catch (error) {
      return error;
    }
  }
  private validationPositionFrom() {
    try {
      if (this.config.positionFrom < this.config.min) {
        throw new Error("Error: position from < min");
      } else if (
        this.config.range &&
        this.config.positionFrom > this.config.positionTo
      ) {
        throw new Error("Error: position from > position to");
      } else if (
        !this.config.range &&
        this.config.positionFrom > this.config.max
      ) {
        throw new Error("Error: position from > max");
      }
      return true;
    } catch (error) {
      return error;
    }
  }
  private validationPositionTo() {
    try {
      if (this.config.range && this.config.positionTo > this.config.max) {
        throw new Error("Error: position to > max");
      } else if (
        this.config.range &&
        this.config.positionTo < this.config.positionFrom
      ) {
        throw new Error("Error: position to < position from");
      }
      return true;
    } catch (error) {
      return error;
    }
  }
  private validationStepValue() {
    try {
      if (this.config.step <= 0) {
        throw new Error("Error: step <= 0");
      } else if (this.config.step > this.config.max - this.config.min) {
        throw new Error("Error: step > max - min");
      }
      return true;
    } catch (error) {
      return error;
    }
  }
  private validationOrientation() {
    try {
      if (
        this.config.orientation == "vertical" ||
        this.config.orientation == "horisontal"
      ) {
        return true;
      } else {
        throw new Error("Error: not valid orientation value");
      }
    } catch (error) {
      return error;
    }
  }
  validation(data: any): boolean {
    Object.assign(this.config, data);
    try {
      if (
        this.validationMaxValue() === true &&
        this.validationMinValue() === true &&
        this.validationPositionFrom() === true &&
        this.validationPositionTo() === true &&
        this.validationOrientation() === true &&
        this.validationStepValue() === true
      ) {
        return true;
      } else {
        throw new Error("config is not valid");
      }
    } catch (error) {
      return error;
    }
  }
}
export { Validator };

