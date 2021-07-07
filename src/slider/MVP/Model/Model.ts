import Observer from '../../Observer/Observer';
import defaultSettings from './fixture';
import { IConfig, IPositionValues, IUpdatedPosition, ModelValues } from './types';

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

  checkPositionValues(values: IPositionValues): void {
    const { value, leftPointValue, rightPointValue, nameState } = values;
    if (value <= leftPointValue) {
      return this.updatePosition({
        [nameState]: leftPointValue,
      });
    }
    if (value > rightPointValue) {
      return this.updatePosition({
        [nameState]: rightPointValue,
      });
    }
    return this.updatePosition({
      [nameState]: value,
    });
  }

  private updatePosition(value: IUpdatedPosition): void {
    this.updateConfig(Object.assign(this.config, value));
  }

  private validateConfig(data: IConfig): IConfig {
    this.config = data;
    this.validateMaxValue();
    this.validateMinValue();
    this.validateStepValue();
    this.validateValueFrom();
    this.validateValueTo();
    return this.config;
  }

  private validateMaxValue(): void {
    if (this.config.max <= this.config.min) {
      this.config.max = this.defaultSettings.max;
    }
  }

  private validateMinValue(): void {
    if (this.config.min >= this.config.max) {
      this.config.min = this.defaultSettings.min;
    }
  }

  private validateStepValue(): void {
    this.config.step = Number(this.config.step.toFixed(1));
    if (this.config.step <= 0) {
      this.config.step = this.defaultSettings.step;
    } else if (this.config.step > this.config.max - this.config.min) {
      this.config.step = this.defaultSettings.step;
    }
  }

  private validateValueFrom(): void {
    if (this.config.valueFrom < this.config.min) {
      this.config.valueFrom = this.config.min;
    } else if (!this.config.range && this.config.valueFrom > this.config.max) {
      this.config.valueFrom = this.config.max;
    } else if (this.config.range && this.config.valueFrom > this.config.max) {
      this.config.valueFrom = this.config.min;
    } else if (this.checkCurrentPosition(this.config.valueFrom)) {
      this.config.valueFrom = this.findCurrentPosition(this.config.valueFrom);
    }
  }

  private validateValueTo(): void {
    if (this.config.range) {
      if (this.config.valueTo < this.config.valueFrom) {
        this.config.valueTo = this.config.valueFrom;
      } else if (this.config.valueTo > this.config.max) {
        this.config.valueTo = this.config.max;
      } else if (this.checkCurrentPosition(this.config.valueTo)) {
        this.config.valueTo = this.findCurrentPosition(this.config.valueTo);
      }
    }
  }

  private findCurrentPosition(position: number): number {
    return (
      Math.round(position / this.config.step) * this.config.step +
      (this.config.min % this.config.step) +
      Math.round((-this.config.min % this.config.step) / this.config.step) * this.config.step
    );
  }

  private checkCurrentPosition(position: number): boolean {
    return (
      position !== Math.round(position / this.config.step) * this.config.step + (this.config.min % this.config.step) &&
      position !== this.config.max &&
      position !== this.config.min
    );
  }
}

export default Model;
