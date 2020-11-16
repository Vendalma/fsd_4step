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

  validationMaxValue(data: number) {

    if (data <= this.config.min) {
      throw new Error("Error: max <= min");
    }
    this.config.max = data;
    return true;

  }

  validationMinValue(data: number) {
    try {
      if (data >= this.config.max) {
        throw new Error("Error: min >= max");
      }
      this.config.min = data;
      return true;
    } catch (error) {
      return error;
    }
  }
  validationPositionFrom(data: number) {
    try {
      if (data < this.config.min) {
        throw new Error("Error: position from < min");
      } else if (this.config.range && data > this.config.positionTo) {
        throw new Error("Error: position from > position to");
      } else if (!this.config.range && data > this.config.max) {
        throw new Error("Error: position from > max");
      }
      this.config.positionFrom = data;
      return true;
    } catch (error) {
      return error;
    }
  }
  validationPositionTo(data: number) {
    try {
      if (data > this.config.max) {
        throw new Error("Error: position to > max");
      } else if (data < this.config.positionFrom) {
        throw new Error("Error: position to < position from");
      }
      this.config.positionTo = data;
      return true;
    } catch (error) {
      return error;
    }
  }
  validationStepValue(data: number) {
    try {
      if (data <= 0) {
        throw new Error("Error: step <= 0");
      } else if (data > this.config.max - this.config.min) {
        throw new Error("Error: step > max - min");
      }
      this.config.step = data;
      return true;
    } catch (error) {
      return error;
    }
  }
  validationOrientation(data: string) {
    try {
      if (data == "vertical" || data == "horisontal") {
        this.config.orientation = data;
        return true;
      } else {
        throw new Error("Error: not valid orientation value");
      }
    } catch (error) {
      return error;
    }
  }
  validation(data: any): boolean {
    let key = Object.keys(data)[0];
    let value = Object.values(data)[0] as number

    let isValidMin = (key === 'min' && this.validationMinValue(value) === true);
    let isValidMax = (key === 'max' && this.validationMaxValue(value) === true)
    try {
      if (isValidMax && isValidMax)
      /* if (
         //  &&
         // this.validationMinValue() === true /*&&
         /* this.validationPositionFrom() === true &&
          this.validationPositionTo() === true &&*/

      // this.validationOrientation() === true &&
      // this.validationStepValue() === true
      {
        return true;
      } else {
        throw new Error('config is not valid')
      }
    } catch (error) {
      return error
    }
  }
}
export { Validator };

