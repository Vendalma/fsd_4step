export interface IConfig {
  min: number;
  max: number;
  valueFrom: number;
  valueTo: number;
  range: boolean;
  label: boolean;
  step: number;
  vertical: boolean;
}

export interface IUpdatedConfig {
  [key: string]: boolean | number;
}

export interface IUpdatedPosition {
  valueFrom: number;
  valueTo: number;
}
