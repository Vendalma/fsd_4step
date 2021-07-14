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

interface IConfigThumb {
  range: boolean;
  valueFrom: number;
  valueTo: number;
  vertical: boolean;
  label: boolean;
}
interface IMovingThumbPosition {
  position: number;
  dataName: string;
  type?: 'thumbMoving';
  evtType?: string;
  value?: number;
}

interface IThumbStartPosition {
  position: number;
  type: 'thumbStart';
}

type IThumbValue = {
  value: IMovingThumbPosition | IThumbStartPosition;
};

interface IUpdatedThumbPosition {
  position: number;
  value: number;
}

interface IThumbBlockValues {
  distance: number;
  position: number;
}

interface IScaleBlockValues {
  scalePosition: number;
  scaleBlockValue: number;
}

interface IScaleValues {
  currentStep: number;
  segmentsNumber: number;
}

interface IScaleOptions {
  config: IConfig;
  sliderSize: number;
  pixelSize: number;
}

interface IScalePositionParams {
  value: number;
  currentStep: number;
}

interface ISliderOptions {
  sliderSize: number;
  pixelSize: number;
}

interface IPositionState {
  valueFrom: {
    position: number;
    value: number;
  };
  valueTo: {
    position: number;
    value: number;
  };
}

interface IPositionValues {
  value: number;
  leftPointValue: number;
  rightPointValue: number;
  nameState: string;
}

interface ISliderBlockValues {
  eventPosition: number;
  value?: number;
}

interface IViewValue {
  value: IPositionValues;
  type: 'viewChanged';
}

export type {
  IConfig,
  IConfigThumb,
  IThumbValue,
  IUpdatedThumbPosition,
  IThumbBlockValues,
  IScaleBlockValues,
  IScaleValues,
  IScaleOptions,
  IScalePositionParams,
  ISliderOptions,
  IPositionState,
  IPositionValues,
  ISliderBlockValues,
  IViewValue,
  IMovingThumbPosition,
  IThumbStartPosition,
};
