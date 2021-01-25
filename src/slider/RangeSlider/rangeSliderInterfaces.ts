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

interface IUpdateConfig {
  [key: string]: boolean | number;
}

export interface IRangeSlider {
  updateConfig(data: IUpdateConfig | ISettings): void;

  addFollower(follower: unknown): void;
}
