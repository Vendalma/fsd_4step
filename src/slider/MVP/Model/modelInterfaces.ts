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

export interface ICalcPosition {
  position: number;
  leftPoint: number;
  leftPointValue: number;
  rightPoint: number;
  rightPointValue: number;
  nameState: string;
}

export interface IUpdatedPosition {
  positionFrom?: {
    position: number;
    value: number;
  };
  positionTo?: {
    position: number;
    value: number;
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
