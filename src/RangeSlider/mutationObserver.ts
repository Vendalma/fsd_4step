import { PanelController } from '../panelController/panelController';
import { RangeSlider } from './rangeSlider';

export class MutationObserverClass {
	container: HTMLElement | null;
	panel: PanelController;
	slider: RangeSlider
	constructor(panel: PanelController, slider: RangeSlider, container: HTMLElement) {
		this.container = container;
		this.panel = panel;
		this.slider = slider;



		this.init()
	}
	init() {
		let that = this;
		let target = this.container?.lastChild
		const config = {
			attributes: true,
			subtree: true,
			attributeFilter: ["data-label", "data-orientation", 'data-range', 'data-min', 'data-max', 'data-step', 'data-from', 'data-to'],
		};
		const callback = function (mutationsList: any, observer: any) {
			for (let mutation of mutationsList) {
				if (mutation.type === "attributes" && target instanceof HTMLElement) {
					let name = mutation.attributeName + "";
					let value = target.getAttribute(name);
					if (name == "data-label" && value) {
						that.slider.setLabel(JSON.parse(value));
					}

					if (name == "data-orientation" && value) {
						that.slider.setOrientation(value);
					}

					if (name == "data-range" && value) {
						that.slider.setRange(JSON.parse(value));
					}
					if (name == "data-min" && value) {
						that.slider.changeMin(Number(value));
						that.panel.updateInputMin(value)
					}

					if (name == "data-max" && value) {
						that.slider.changeMax(Number(value));
						that.panel.updateInputMax(value)
					}
					if (name == "data-step" && value) {
						that.slider.changeStep(Number(value));
					}
					if (name == "data-from" && value) {
						that.slider.changePositionFrom(Number(value));
						that.panel.updateInputFrom(value)
					}
					if (name == "data-to" && value) {
						that.slider.changePositionTo(Number(value));
						that.panel.updateInputTo(value)
					}
				}
			}
		};

		const observer = new MutationObserver(callback);
		if (target) observer.observe(target, config);
	}
}


