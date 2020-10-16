import { Model } from "../MVP/Model/Model";
import { View } from "../MVP/View/View";
import { Presenter } from "../MVP/Presenter/Presenter";
import { htmlPrefilter } from "jquery";

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
export class RangeSlider {
  model: Model;
  view: View;

  container: HTMLElement;

  constructor(container: HTMLElement, settings: ISettings) {
    this.model = new Model(settings);
    this.view = new View(settings, container);
    new Presenter(this.view, this.model);

    this.container = container;
 
  }

  setLabel(data: boolean) {
    this.view.changeLabel(data);
  }

  setOrientation(data: string) {
    this.view.checkOrientation(data);
    this.model.changeOrientation(data)
  }

  setRange(data: boolean) {
    this.view.checkRange(data)
    this.model.changeRange(data)
  }
  changeMin(data:number) {
    this.model.changeMin(data)
    this.view.changeMin(data)
  }
  changeMax (data: number) {
    this.model.changeMax(data)
    this.view.changeMax(data)
  }

  changeStep (data: number) {
    this.model.changeStep(data);
    this.view.changeStep(data)
  }
 
  changePositionFrom( data:number) {
    this.model.changePositionFrom(data)
    this.view.changePositionFrom(data)
  }
  changePositionTo( data:number) {
    this.model.changePositionTo(data)
    this.view.changePositionTo(data)
  }
}

export default RangeSlider;
