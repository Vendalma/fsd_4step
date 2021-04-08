export interface IConfig {
  min: number;
  max: number;
  range: boolean;
  positionFrom: number;
  positionTo: number;
  vertical: boolean;
  step: number;
  label: boolean;
}

interface IChangedConfig {
  value: IConfig;
  type: 'configChanged';
}

export interface IUpdatedPosition {
  positionFrom: number;
  positionTo: number;
}

export interface IChangedPosition {
  value: IUpdatedPosition;
  type: 'positionChanged';
}

export type ModelValues = IChangedConfig | IChangedPosition;
