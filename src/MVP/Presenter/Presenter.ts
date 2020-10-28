import { Model } from "../Model/Model";
import { View } from "../View/View";

class Presenter {
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
		else if (type == "position") {
			this.view.setPositionMoveThumb(data);
		} else if (type == "stepData") {
			this.view.setOnloadView(data);
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
		} else if (type == "changeRange") {
			this.view.changeRange(data);
		} else if (type == "changeOrientation") {
			this.view.changeOrientation(data);
		} else if (type == "changeLabel") {
			this.view.changeLabel(data);
		}
	}
}

export { Presenter };

