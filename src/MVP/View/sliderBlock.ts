import { Observer } from "../../Observer/Observer";
import { progressBar } from "./progressBar";
import { Step } from "./Step";
import { Thumb } from "./Thumb";

interface IConfig {
	min: number;
	max: number;
	range: boolean;
	positionFrom: number;
	positionTo: number;
	orientation: string;
	step: number;
	label: boolean;
}
class SliderBlock {
	config: IConfig;
	range: boolean;
	positionFrom: number;
	positionTo: number;
	orientation: string;
	min: number;
	max: number;
	stepValue: number;
	label: boolean;

	sliderContainer: HTMLElement;
	sliderBlock: HTMLElement;
	thumbOne: Thumb;
	thumbTwo: Thumb | null | undefined;
	observer: Observer;
	step: Step;
	progressBar: progressBar;
	constructor(IConfig: any, sliderContainer: HTMLElement) {
		this.config = IConfig;
		this.range = this.config.range;
		this.positionFrom = this.config.positionFrom;
		this.positionTo = this.config.positionTo;
		this.orientation = this.config.orientation;
		this.min = this.config.min;
		this.max = this.config.max;
		this.stepValue = this.config.step;
		this.label = this.config.label;

		this.sliderContainer = sliderContainer;

		this.sliderBlock = document.createElement("div");
		this.sliderBlock.classList.add("slider__block");
		this.sliderContainer.append(this.sliderBlock);

		this.observer = new Observer();
		this.thumbOne = new Thumb(this.config, "thumb_first", this.sliderBlock, 1);
		this.thumbTwo = new Thumb(this.config, "thumb_second", this.sliderBlock, 2);

		this.progressBar = new progressBar(this.config, this.sliderBlock);

		this.step = new Step(this.config, this.sliderBlock);
		this.setThumbTwo();
		this.subscribeOnUpdate();
		this.sliderClick();
	}

	subscribeOnUpdate() {
		this.thumbOne.addFollower(this);
		this.thumbTwo?.addFollower(this);
	}
	addFollower(follower: any) {
		this.observer.subscribe(follower);
	}
	setThumbTwo() {
		this.range ? null : this.thumbTwo?.removeThis();
	}
	update(type: string, data: any) {
		this.observer.broadcast("mouseMove", data);
	}
	changeOrientation(data: string) {
		this.orientation = data;
		this.thumbOne.checkOrientation(data);
		this.thumbTwo?.checkOrientation(data);
		this.step.checkOrientation(data);
		this.progressBar.checkOrientation(data);

		if (this.orientation == "vertical") {
			this.sliderBlock?.classList.add("slider__block_vertical");
		}

		if (this.orientation == "horisontal") {
			this.sliderBlock?.classList.remove("slider__block_vertical");
		}
	}

	changeMin(data: number) {
		this.min = data;
		this.step.changeMinValue(data);
	}
	changeMax(data: number) {
		this.min = data;
		this.step.changeMaxValue(data);
	}
	changeLabel(data: boolean) {
		this.thumbOne.checkLabel(data);
		this.thumbTwo?.checkLabel(data);
	}
	changePositionFrom(data: number) {
		this.positionFrom = data;
	}

	changePositionTo(data: number) {
		this.positionTo = data;
	}
	changeRange(data: boolean) {
		this.range = data;

		this.setThumbTwo();
		this.thumbOne.checkRange(data);
		this.thumbTwo?.checkRange(data);
		this.progressBar.checkRange(data);

		if (this.range) {
			let thumbTwo = this.thumbTwo?.addThis();
		}
	}

	addStep(data: any) {
		this.step.addStepLine(data);
	}

	sliderClick() {

		this.sliderBlock?.addEventListener("click", this.onSliderClick.bind(this));
	}
	onSliderClick(e: MouseEvent): any {
		if (this.orientation == "horisontal") {
			if (!this.range) {
				this.thumbOne.onMouseUp(e);
			} else if (this.range) {
				let thumbFirst = Math.abs(
					this.thumbOne.thumb.getBoundingClientRect().x - e.clientX
				);
				let thumbSecond = Math.abs(
					(this.thumbTwo?.thumb.getBoundingClientRect().x as number) -
					e.clientX
				);
				if (thumbFirst < thumbSecond) {
					this.thumbOne.onMouseUp(e);
				} else if (thumbFirst > thumbSecond) {
					this.thumbTwo?.onMouseUp(e);
				}
			}
		}
		if (this.orientation == "vertical") {
			if (!this.range) {
				this.thumbOne.onMouseUp(e);
			} else if (this.range) {
				let thumbFirst = Math.abs(
					this.thumbOne.thumb.getBoundingClientRect().y - e.clientY
				);
				let thumbSecond = Math.abs(
					(this.thumbTwo?.thumb.getBoundingClientRect().y as number) -
					e.clientY
				);
				if (thumbFirst < thumbSecond) {
					this.thumbOne.onMouseUp(e);
				} else if (thumbFirst > thumbSecond) {
					this.thumbTwo?.onMouseUp(e);
				}
			}
		}
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
	setPositionMoveThumb(data: any) {
		let data_num = data["data_num"];
		let position = data["position"];
		let valueThumb = data["value"];

		if (!this.range) {
			this.thumbOne.getPosition(position);
			this.thumbOne.setLabelValue(valueThumb);
			this.progressBar.setPositionForThumbOne(position);
		}
		if (this.range) {
			if (data_num == "1") {
				this.thumbOne.getPosition(position);
				this.thumbOne.setLabelValue(valueThumb);
				this.progressBar.setPositionForThumbOne(position);
			} else {
				this.thumbTwo?.getPosition(position);
				this.thumbTwo?.setLabelValue(valueThumb);
				this.progressBar.setPositionForThumbTwo(position);
			}
		}
	}
}
export { SliderBlock };

