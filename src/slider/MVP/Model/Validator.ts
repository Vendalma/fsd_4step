import defaultSettings from './defaultSettings';
import { IConfig } from './modelInterfaces';

class Validator {
  private config: IConfig;

  private defaultSettings: IConfig;

  constructor() {
    this.defaultSettings = defaultSettings;
  }

  validationConfig(data: IConfig): IConfig {
    this.config = data;
    this.validationMaxValue();
    this.validationMinValue();
    this.validationStepValue();
    this.validationPositionFrom();
    this.validationPositionTo();
    return this.config as IConfig;
  }

  private validationMaxValue(): void {
    if (this.config.max < this.config.min) {
      this.config.max = this.defaultSettings.max;
    }
  }

  private validationMinValue(): void {
    if (this.config.min > this.config.max) {
      this.config.min = this.defaultSettings.min;
    }
  }

  private validationStepValue(): void {
    if (this.config.step <= 0) {
      this.config.step = this.defaultSettings.step;
    } else if (this.config.step > this.config.max - this.config.min) {
      this.config.step = this.defaultSettings.step;
    }
  }

  private validationPositionFrom(): void {
    if (this.config.positionFrom < this.config.min) {
      this.config.positionFrom = this.config.min;
    } else if (!this.config.range && this.config.positionFrom > this.config.max) {
      this.config.positionFrom = this.config.max;
    } else if (this.config.range && this.config.positionFrom > this.config.max) {
      this.config.positionFrom = this.config.min;
    }
  }

  private validationPositionTo(): void {
    if (this.config.range) {
      if (this.config.positionTo <= this.config.positionFrom && this.config.max - this.config.min > this.config.step) {
        this.config.positionTo = this.config.positionFrom;
        this.config.positionFrom = this.config.positionTo - this.config.step;
        this.validationPositionFrom();
      }

      if (this.config.positionTo <= this.config.positionFrom && this.config.max - this.config.min <= this.config.step) {
        this.config.positionTo = this.config.max;
      }

      if (this.config.positionTo > this.config.max) {
        this.config.positionTo = this.config.max;
      }
    }
  }
}
export default Validator;
