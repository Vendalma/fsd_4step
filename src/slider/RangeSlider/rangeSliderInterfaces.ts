export interface ISettings {
  min: number;
  max: number;
  positionFrom: number;
  positionTo: number;
  range: boolean;
  label: boolean;
  step: number;
  vertical: boolean;
}

export interface IUpdateConfig {
  [key: string]: boolean | number;
}

export interface IUpdatedPosition {
  positionFrom: number;
  positionTo: number;
}

export interface valueForBroadcast {
  data?: number | unknown;
  type: string;
}
