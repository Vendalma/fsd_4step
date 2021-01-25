interface ISettings {
  min: number;
  max: number;
  positionFrom: number;
  positionTo: number;
  range: boolean;
  label: boolean;
  step: number;
  vertical: boolean;
}
export interface IPosition {
  dataFirstThumb?: {
    positionFrom: number;
    valueFrom: number;
  };
  dataSecondThumb?: {
    positionTo?: number;
    valueTo?: number;
  };
  stepData?: number;
}
interface IUpdateConfig {
  [key: string]: boolean | number;
}

export interface IRangeSlider {
  updateConfig(data: IUpdateConfig): void;

  addFollower(follower: unknown): void;
}
