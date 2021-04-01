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

export interface IDataThumbMove {
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

export interface IConfigThumb {
  range: boolean;
  positionFrom: number;
  positionTo: number;
  vertical: boolean;
  label: boolean;
}

export interface IStepValues {
  stepSize: number;
  thumbSize: number;
}

export interface IUpdatedThumbPosition {
  position: number;
  value: number;
}

export interface IThumbValue {
  value: IDataThumbMove;
}

interface IThumbMove {
  value: IDataThumbMove;
  type: 'thumbMove';
}

interface IGetSliderSize {
  value: number;
  type: 'sliderSize';
}

export type ChangeView = IThumbMove | IGetSliderSize;
