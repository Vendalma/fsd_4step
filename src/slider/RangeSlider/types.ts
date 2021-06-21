interface IConfig {
  min: number;
  max: number;
  valueFrom: number;
  valueTo: number;
  range: boolean;
  label: boolean;
  step: number;
  vertical: boolean;
}

interface IUpdatedConfig {
  [key: string]: boolean | number;
}

interface IUpdatedPosition {
  valueFrom: number;
  valueTo: number;
}

export type { IConfig, IUpdatedConfig, IUpdatedPosition };
