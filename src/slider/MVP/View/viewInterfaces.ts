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

export interface IUpdatedThumbPosition {
  position: number;
  value: number;
}

export interface ThumbValue {
  value: IDataThumbMove;
}

type ThumbMove = {
  value: IDataThumbMove;
  type: 'thumbMove';
};

type GetSliderSize = {
  value: number;
  type: 'sliderSize';
};

export type ChangeView = ThumbMove | GetSliderSize;
