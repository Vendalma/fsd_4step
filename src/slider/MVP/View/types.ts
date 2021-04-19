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
  positionFrom: {
    position: number;
    value: number;
  };
  positionTo: {
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