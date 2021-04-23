export interface IConfig {
  min: number;
  max: number;
  range: boolean;
  valueFrom: number;
  valueTo: number;
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
  valueFrom?: number;
  valueTo?: number;
}

export interface ModelValues {
  value: IConfig;
  type: 'configChanged';
}
