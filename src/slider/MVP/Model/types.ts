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

export interface IPositionValues {
  value: number;
  leftPointValue: number;
  rightPointValue: number;
  nameState: string;
}

export interface IUpdatedPosition {
  positionFrom?: number;
  positionTo?: number;
}

export interface ModelValues {
  value: IConfig;
  type: 'configChanged';
}
