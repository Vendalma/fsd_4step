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

export interface IConfigThumb {
  range: boolean;
  positionFrom: number;
  positionTo: number;
  vertical: boolean;
  label: boolean;
}

export interface IOnloadParams {
  config: IConfig;
  sliderSize: number;
}

export interface IStepValues {
  stepSize: number;
  thumbSize: number;
}

export interface IMovingThumbValues {
  position: number;
  dataName: string;
}

export interface IPosition {
  positionFrom: {
    position: number;
    value: number;
  };
  positionTo: {
    position: number;
    value: number;
  };
}

export interface IUpdatedThumbPosition {
  position: number;
  value: number;
}

export interface IUpdatedPositionValues {
  positionFrom?: {
    position: number;
    value: number;
  };
  positionTo?: {
    position: number;
    value: number;
  };
}

export interface ICalcPosition {
  position: number;
  leftPoint: number;
  leftPointValue: number;
  rightPoint: number;
  rightPointValue: number;
  nameState: string;
}

export interface IThumbValue {
  value: IMovingThumbValues;
}

export interface IViewValue {
  value: {
    positionFrom: number;
    positionTo: number;
  };
  type: 'viewChanged';
}
