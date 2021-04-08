export interface IConfig {
  min: number;
  max: number;
  positionFrom: number;
  positionTo: number;
  range: boolean;
  label: boolean;
  step: number;
  vertical: boolean;
}

export interface IUpdatedConfig {
  [key: string]: boolean | number;
}

export interface IUpdatedPosition {
  positionFrom: number;
  positionTo: number;
}
