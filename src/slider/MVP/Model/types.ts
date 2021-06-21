interface IConfig {
  min: number;
  max: number;
  range: boolean;
  valueFrom: number;
  valueTo: number;
  vertical: boolean;
  step: number;
  label: boolean;
}

interface IPositionValues {
  value: number;
  leftPointValue: number;
  rightPointValue: number;
  nameState: string;
}

interface IUpdatedPosition {
  valueFrom?: number;
  valueTo?: number;
}

interface ModelValues {
  value: IConfig;
  type: 'configChanged';
}

export type { IConfig, IPositionValues, IUpdatedPosition, ModelValues };
