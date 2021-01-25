interface ISettings {
  min: number;
  max: number;
  positionFrom: number;
  positionTo: number;
  range: boolean;
  label: boolean;
  step: number;
  vertical: boolean;
}
interface IUpdateConfig {
  [key: string]: boolean | number;
}
interface MethodsObject {
  [key: string]: any /* eslint-disable-line */;
}
interface JQuery {
  rangeSlider: (
    method?: string | undefined | unknown,
    settings?: ISettings | IUpdateConfig | unknown | undefined,
  ) => JQuery;
}
