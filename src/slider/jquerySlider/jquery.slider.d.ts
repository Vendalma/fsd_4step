interface IConfig {
  min: number;
  max: number;
  valueFrom: number;
  valueTo: number;
  range: boolean;
  label: boolean;
  step: number;
  vertical: boolean;
}

interface IUpdatedConfig {
  [key: string]: boolean | number;
}

interface MethodsObject {
  [key: string]: any;  /* eslint-disable-line */
}

interface JQuery {
  rangeSlider: (
    method?: string | IConfig | IUpdatedConfig,
    settings?: IConfig | IUpdatedConfig | ((data?: IConfig) => void),
  ) => JQuery;
}
