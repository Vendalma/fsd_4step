import { Observer } from "../../Observer/Observer";
import { progressBar } from "./progressBar";
import { Step } from './Step';
import { Thumb } from "./Thumb";
interface IConfigView {
	min: number;
	max: number;
	range: boolean;
	positionFrom: number;
	positionTo: number;
	orientation: string;
	step: number;
	label: boolean;
}
export class View {
	config: IConfigView;
	range: boolean;
	positionFrom: number;
	positionTo: number;
	orientation: string;
	min: number;
	max: number;
	stepValue: number;
	label: boolean;

	wrapper: HTMLElement;

	slider: HTMLElement;
	thumbOne: Thumb;
	thumbTwo: Thumb | null | undefined;
	observer: Observer;
	step: Step;
	progressBar: progressBar;
	sliderBlock: HTMLElement | null;

	constructor(IConfigView: any, wrapper: HTMLElement) {
		this.config = IConfigView;
		this.range = this.config.range;
		this.positionFrom = this.config.positionFrom;
		this.positionTo = this.config.positionTo;
		this.orientation = this.config.orientation;
		this.min = this.config.min;
		this.max = this.config.max;
		this.stepValue = this.config.step;
		this.label = this.config.label;

		this.observer = new Observer();

		this.wrapper = wrapper;
		this.wrapper.classList.add("wrapper");

		this.slider = document.createElement("div");
		this.slider.classList.add("slider");
		this.wrapper.append(this.slider);

		this.sliderBlock = document.createElement("div");
		this.sliderBlock.classList.add("slider__block");
		this.slider.append(this.sliderBlock);

		this.thumbOne = new Thumb(this.config, "thumb_first", this.sliderBlock, 1);
		this.thumbTwo = new Thumb(this.config, "thumb_second", this.sliderBlock, 2);

		this.progressBar = new progressBar(this.config, this.sliderBlock);

		this.step = new Step(this.config, this.sliderBlock);


		this.changeOrientation(this.orientation);
		this.onloadWindow();
		this.setThumbTwo();
		this.subscribeOnUpdate();
		this.init();
		//this.sliderClick()
	}

	init() {
		this.slider.setAttribute("data-min", this.min + "");
		this.slider.setAttribute("data-max", this.max + "");
		this.slider.setAttribute("data-step", this.stepValue + "");
		this.slider.setAttribute("data-label", this.label + "");
		this.slider.setAttribute("data-orientation", this.orientation);
		this.slider.setAttribute("data-range", this.range + "");
		this.slider.setAttribute("data-from", this.positionFrom + "");
		if (this.range) this.slider.setAttribute("data-to", this.positionTo + "");
	}

	setThumbTwo() {
		this.range ? null : this.thumbTwo?.removeThis();
	}
	subscribeOnUpdate() {
		this.thumbOne.addFollower(this);
		this.thumbTwo?.addFollower(this);
	}
	changeOrientation(data: string) {
		this.orientation = data;
		this.thumbOne.checkOrientation(data);
		this.thumbTwo?.checkOrientation(data);
		this.step.checkOrientation(data);
		this.progressBar.checkOrientation(data);
		this.getSliderSize();
		if (this.orientation == "vertical") {
			this.sliderBlock?.classList.add("slider__block_vertical");
		}

		if (this.orientation == "horisontal") {
			this.sliderBlock?.classList.remove("slider__block_vertical");
		}
	}

	update(type: string, data: any) {
		this.observer.broadcast("mouseMove", data);
		if (type == "updatePositionThumbFirst") {
			this.thumbOne.getPosition(data);
		}

		if (type == "updatePositionThumbSecond") {
			this.thumbTwo?.getPosition(data);
		}
	}

	changeMin(data: number) {
		this.min = data;
		this.step.changeMinValue(data);
		this.getSliderSize();
	}

	changeMax(data: number) {
		this.max = data;
		this.getSliderSize();
		this.step.changeMaxValue(data);
	}

	changeLabel(data: boolean) {
		this.thumbOne.checkLabel(data);
		this.thumbTwo?.checkLabel(data);
	}

	checkRange(data: boolean) {
		this.range = data;
		this.setThumbTwo();
		this.thumbOne.checkRange(data);
		this.thumbTwo?.checkRange(data);
		this.progressBar.checkRange(data);
		this.getSliderSize();
		this.slider.setAttribute("data-from", this.positionFrom + "");

		if (this.range) {
			let thumbTwo = this.thumbTwo?.addThis();
		} else if (!this.range && this.thumbTwo) {
			this.thumbTwo.removeThis();
		}
	}

	changeStep(data: number) {
		this.stepValue = data;
	}

	changePositionFrom(data: number) {
		this.positionFrom = data;
		this.getSliderSize();

	}

	changePositionTo(data: number) {
		this.positionTo = data;
		this.getSliderSize();
	}

	setPositionMoveThumb(data: any) {
		let data_num = data["data_num"];
		let position = data["position"];
		let valueThumb = data["value"];
		if (!this.range) {
			this.thumbOne.getPosition(position);
			this.thumbOne.setLabelValue(valueThumb);
			this.progressBar.setPositionForThumbOne(position);
			this.slider.setAttribute("data-from", valueThumb);
		}
		if (this.range) {
			if (data_num == "1") {
				this.thumbOne.getPosition(position);
				this.thumbOne.setLabelValue(valueThumb);
				this.progressBar.setPositionForThumbOne(position);
				this.slider.setAttribute("data-from", valueThumb);
			} else {
				this.thumbTwo?.getPosition(position);
				this.thumbTwo?.setLabelValue(valueThumb);
				this.progressBar.setPositionForThumbTwo(position);
				this.slider.setAttribute("data-to", valueThumb);
			}
		}
	}

	addStep(data: any) {
		this.step.addStepLine(data);
	}

	setOnloadThumbPosition(data: any) {
		let onloadPositionThumbOne = data["onloadPositionThumbOne"];
		let onloadPositionThumbTwo = data["onloadPositionThumbTwo"];

		if (!this.range) {
			this.thumbOne.setPosition(onloadPositionThumbOne);
			this.thumbOne.setLabelValue(this.positionFrom);
			this.progressBar.setOnloadProgressBarPosition(data);
		}
		if (this.range) {
			this.thumbOne.setPosition(onloadPositionThumbOne);
			this.thumbOne.setLabelValue(this.positionFrom);
			this.progressBar.setOnloadProgressBarPosition(data);

			this.thumbTwo?.setPosition(onloadPositionThumbTwo);
			this.thumbTwo?.setLabelValue(this.positionTo);
			this.progressBar.setOnloadProgressBarPosition(data);
		}
	}
	addFollower(follower: any) {
		this.observer.subscribe(follower);
	}
	onloadWindow() {
		window.addEventListener("load", () => {
			this.getSliderSize();
			this.resizeWindow();
		});
	}

	resizeWindow() {
		window.addEventListener("resize", () => {
			this.getSliderSize();
		});
	}

	getSliderSize() {
		if (this.orientation == "horisontal")
			return this.observer.broadcast("loadData", {
				sliderSize: this.slider?.offsetWidth,
			});

		if (this.orientation == "vertical")
			return this.observer.broadcast("loadData", {
				sliderSize: this.slider?.offsetHeight,
			});
	}

	sliderClick() {
		this.sliderBlock?.addEventListener('click', (e) => {
			console.log(e.clientX)
		})
	}
}
