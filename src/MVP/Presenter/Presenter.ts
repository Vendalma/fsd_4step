import { Model } from "../Model/Model";
import { View } from "../View/View";

export class Presenter {
	view: View;
	model: Model;
	constructor(model: Model, container: HTMLElement) {
		this.model = model;
		this.view = new View(this.model.getConfig(), container);
		this.subscribeOnUpdate();
	}
	subscribeOnUpdate() {
		this.view.addFollower(this);
		this.model.addFollower(this);
	}
	update(type: string, data: any) {
		if (type == "mouseMove") this.model.fundThumbPosition(data);
		else if (type == "position") this.view.setPositionMoveThumb(data);
		else if (type == "stepData") {
			this.view.addStep(data);
			this.view.setOnloadThumbPosition(data);
		} else if (type == "loadData") {
			this.model.getStep(data);
		} else if (type == "changeMinValue") {
			this.view.changeMin(data);
		} else if (type == "changeMaxValue") {
			this.view.changeMax(data);
		} else if (type == "changePositionFrom") {
			this.view.changePositionFrom(data);
		} else if (type == "changePositionTo") {
			this.view.changePositionTo(data);
		} else if (type == "changeStep") {
			this.view.changeStep(data);
		}

	}
}

export default Presenter;
