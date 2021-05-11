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
  value?: number;
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

export interface IScaleBlockValues {
  scalePosition: number;
  scaleBlockValue: number;
}

export interface IScaleValues {
  currentStep: number;
  segmentsNumber: number;
}

export interface IScaleOptions {
  config: IConfig;
  sliderSize: number;
  pixelSize: number;
}

export interface IScalePositionParams {
  value: number;
  currentStep: number;
}

export interface ISliderOptions {
  sliderSize: number;
  pixelSize: number;
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

export interface ISliderBlockValues {
  eventPosition: number;
  value?: number;
}

export interface IViewValue {
  value: IPositionValues;
  type: 'viewChanged';
}
