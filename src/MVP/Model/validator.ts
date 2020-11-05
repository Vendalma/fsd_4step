interface IConfigModel {
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
  config: IConfigModel;
  constructor(config: any) {
    this.config = config;
  }

  validationMaxValue(data: number) {
    try {
      if (data <= this.config.min) {
        throw new Error("Error: max <= min");
      }
      this.config.max = data;
      return true;
    } catch (error) {
      return error;
    }
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
  validationRange(data: boolean) {
    try {
      if (typeof data !== "boolean") {
        throw new Error("Error: range is not valid");
      }
      this.config.range = data;
      return true;
    } catch (error) {
      return error;
    }
  }
  validationLabel(data: boolean) {
    try {
      if (typeof data !== "boolean") {
        throw new Error("Error: label is not valid");
      }
      this.config.label = data;
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
  validation() {
    if (
      this.validationMaxValue(this.config.max) &&
      this.validationMinValue(this.config.min) &&
      this.validationPositionFrom(this.config.positionFrom) &&
      this.validationPositionTo(this.config.positionTo) &&
      this.validationRange(this.config.range) &&
      this.validationLabel(this.config.label) &&
      this.validationOrientation(this.config.orientation) &&
      this.validationStepValue(this.config.step)
    )
      return true;
  }
}
export { Validator };

