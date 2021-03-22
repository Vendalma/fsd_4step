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
  clientXY: number;
  sliderClientReact: number;
  dataNum: string;
  positionThumbFirst?: number;
  positionThumbSecond?: number;
}

export interface IPosition {
  dataFirstThumb?: {
    positionFrom: number;
    valueFrom: number;
  };
  dataSecondThumb?: {
    positionTo: number;
    valueTo: number;
  };
  stepData?: number;
}

export interface IConfigThumb {
  range: boolean;
  positionFrom: number;
  positionTo: number;
  vertical: boolean;
  label: boolean;
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
