import { Model } from "../MVP/Model/Model";
import { Presenter } from "../MVP/Presenter/Presenter";

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
	constructor(container: HTMLElement, settings: ISettings) {
		this.model = new Model(settings);
		new Presenter(this.model, container);
	}
	setLabel(data: boolean) {
		this.model.changeLabel(data)
	}

	setOrientation(data: string) {
		this.model.changeOrientation(data);
	}

	setRange(data: boolean) {
		this.model.changeRange(data);
	}
	changeMin(data: number) {
		this.model.changeMin(data);
	}
	changeMax(data: number) {
		this.model.changeMax(data);
	}

	changeStep(data: number) {
		this.model.changeStep(data);
	}

	changePositionFrom(data: number) {
		this.model.changePositionFrom(data);
	}
	changePositionTo(data: number) {
		this.model.changePositionTo(data);
	}
}

export default RangeSlider;
