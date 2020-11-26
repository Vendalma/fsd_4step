interface ISettings {
  min: number;
  max: number;
  positionFrom: number;
  positionTo: number;
  range: boolean;
  label: boolean;
  step: number;
  orientation: string;
}
interface IUpdateConfig {
  [key: string]: boolean | string | number;
}
interface JQuery {
  rangeSlider: (method?: string | undefined | unknown, settings?: ISettings | IUpdateConfig | undefined) => JQuery;
}
