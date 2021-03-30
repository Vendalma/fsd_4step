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
  dataNum?: string;
}

export interface IPosition {
  dataFirstThumb: {
    positionFrom: number;
    valueFrom: number;
  };
  dataSecondThumb: {
    positionTo: number;
    valueTo: number;
  };
}

export interface ICalcMoveThumb {
  firstThumbPosition?: number;
  secondThumbPosition?: number;
  position: number;
  positionMove: number;
  value: number;
}

export interface IUpdatePosition {
  dataFirstThumb?: {
    positionFrom: number;
    valueFrom: number;
  };
  dataSecondThumb?: {
    positionTo: number;
    valueTo: number;
  };
}

type UpdateConfig = {
  value: IConfig;
  type: 'changeConfig';
};

type UpdateThumbPosition = {
  value: IPosition;
  type: 'positionThumb';
};

type GetStepSize = {
  value: number;
  type: 'stepSize';
};
export type ModelValues = UpdateConfig | UpdateThumbPosition | GetStepSize;
