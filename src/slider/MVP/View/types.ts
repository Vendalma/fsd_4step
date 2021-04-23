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

export interface IConfigThumb {
  range: boolean;
  valueFrom: number;
  valueTo: number;
  vertical: boolean;
  label: boolean;
}

export interface IMovingThumbValues {
  position: number;
  dataName: string;
}

export interface IThumbValue {
  value: IMovingThumbValues;
}

export interface IUpdatedThumbPosition {
  position: number;
  value: number;
}

export interface IThumbBlockValues {
  distance: number;
  position: number;
}

export interface IStepValues {
  stepSize: number;
  thumbSize: number;
}

export interface IPositionState {
  valueFrom: {
    position: number;
    value: number;
  };
  valueTo: {
    position: number;
    value: number;
  };
}

export interface IPositionValues {
  value: number;
  leftPointValue: number;
  rightPointValue: number;
  nameState: string;
}

export interface IViewValue {
  value: IPositionValues;
  type: 'viewChanged';
}
