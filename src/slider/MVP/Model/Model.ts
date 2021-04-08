import Observer from '../../Observer/Observer';
import defaultSettings from './fixture';
import { IConfig, IUpdatedPosition, ModelValues } from './types';

class Model extends Observer<ModelValues> {
  private defaultSettings: IConfig;

  protected config: IConfig;

  constructor() {
    super();
    this.defaultSettings = defaultSettings;
  }

  updateConfig(data: IConfig): void {
    this.validateConfig(data);
    this.broadcast({ value: this.config, type: 'configChanged' });
  }

  updatePosition(data: IUpdatedPosition): void {
    this.validateConfig(Object.assign(this.config, data));
    this.broadcast({
      value: {
        positionFrom: this.config.positionFrom,
        positionTo: this.config.positionTo,
      },
      type: 'positionChanged',
    });
  }

  private validateConfig(data: IConfig): IConfig {
    this.config = data;
    this.validateMaxValue();
    this.validateMinValue();
    this.validateStepValue();
    this.validatePositionFrom();
    this.validatePositionTo();
    return this.config;
  }

  private validateMaxValue(): void {
    if (this.config.max < this.config.min) {
      this.config.max = this.defaultSettings.max;
    }
  }

  private validateMinValue(): void {
    if (this.config.min > this.config.max) {
      this.config.min = this.defaultSettings.min;
    }
  }

  private validateStepValue(): void {
    if (this.config.step <= 0) {
      this.config.step = this.defaultSettings.step;
    } else if (this.config.step > this.config.max - this.config.min) {
      this.config.step = this.defaultSettings.step;
    }
  }

  private validatePositionFrom(): void {
    if (this.config.positionFrom < this.config.min) {
      this.config.positionFrom = this.config.min;
    } else if (!this.config.range && this.config.positionFrom > this.config.max) {
      this.config.positionFrom = this.config.max;
    } else if (this.config.range && this.config.positionFrom > this.config.max) {
      this.config.positionFrom = this.config.min;
    }
  }

  private validatePositionTo(): void {
    if (this.config.range) {
      if (this.config.positionTo <= this.config.positionFrom && this.config.max - this.config.min > this.config.step) {
        this.config.positionTo = this.config.positionFrom;
        this.validatePositionFrom();
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

export default Model;
