import { Observer } from "../../Observer/Observer";
import { Validator } from "./Validator";

interface IConfigModel {
	min: number;
	max: number;
	range: boolean;
	positionFrom: number;
	positionTo: number;
	orientation: string;
	step: number;
	label: boolean;
}

class Model extends Validator {
	observer: Observer;
	range: boolean;
	config: IConfigModel;
	max: number;
	min: number;
	positionFrom: number;
	positionTo: number;
	orientation: string;
	step: number;
	label: boolean;

	validator: Validator;
	constructor(IConfigModel: any) {
		super(IConfigModel);
		this.observer = new Observer();

		this.config = IConfigModel;
		this.range = this.config.range;
		this.max = this.config.max;
		this.min = this.config.min;
		this.positionFrom = this.config.positionFrom;
		this.positionTo = this.config.positionTo;
		this.orientation = this.config.orientation;
		this.step = this.config.step;
		this.label = this.config.label;

		this.validator = new Validator(this.config);
	}
	addFollower(follower: any) {
		this.observer.subscribe(follower);
	}
	fundThumbPosition(data: any) {
		if (this.orientation == "horisontal") {
			this.fundThumbPositionHorisontal(data);
		} else if (this.orientation == "vertical") {
			this.fundThumbPositionVertical(data);
		}
	}
	getConfig() {
		if (this.validation()) return this.config;
	}
	private fundThumbPositionHorisontal(data: any) {
		let clientX = data["clientX"];
		let sliderLeftPoint = data["slider-left-point"];
		let sliderWidth = data["slider-width"];
		let data_num = data["data-num"];
		let firstThumbPosition = data["positionThumbFirst"];
		let secondThumbPosition = data["positionThumbSecond"];

		let onePixelSizeHorisontal = (this.max - this.min) / sliderWidth;
		let stepSizeHorisontal = this.step / onePixelSizeHorisontal;
		let position = clientX - sliderLeftPoint;
		let positionMove =
			Math.round(position / stepSizeHorisontal) * stepSizeHorisontal;

		let value =
			Math.round((position * onePixelSizeHorisontal + this.min) / this.step) *
			this.step;

		let rightValueForRange =
			Math.round(
				(secondThumbPosition * onePixelSizeHorisontal + this.min) / this.step
			) * this.step;
		let leftValueForRange =
			Math.round(
				(firstThumbPosition * onePixelSizeHorisontal + this.min) / this.step
			) * this.step;
		if (!this.range) {
			let right = sliderWidth;

			if (position < 0) {
				this.observer.broadcast("position", {
					position: 0,
					data_num: data_num,
					value: this.min,
				});
			} else if (position > right) {
				this.observer.broadcast("position", {
					position: right,
					data_num: data_num,
					value: this.max,
				});
			} else {
				this.observer.broadcast("position", {
					position: positionMove,
					data_num: data_num,
					value: value,
				});
			}
		} else if (this.range) {
			if (data_num == "1") {
				let right = secondThumbPosition;
				if (position < 0) {
					this.observer.broadcast("position", {
						position: 0,
						data_num: data_num,
						value: this.min,
					});
				} else if (position > right) {
					this.observer.broadcast("position", {
						position: right,
						data_num: data_num,
						value: rightValueForRange,
					});
				} else {
					this.observer.broadcast("position", {
						position: positionMove,
						data_num: data_num,
						value: value,
					});
				}
			} else if (data_num == "2") {
				let left = firstThumbPosition;
				let right = sliderWidth;

				if (position < left) {
					this.observer.broadcast("position", {
						position: left,
						data_num: data_num,
						value: leftValueForRange,
					});
				} else if (position > right) {
					this.observer.broadcast("position", {
						position: right,
						data_num: data_num,
						value: this.max,
					});
				} else {
					this.observer.broadcast("position", {
						position: positionMove,
						data_num: data_num,
						value: value,
					});
				}
			}
		}
	}

	private fundThumbPositionVertical(data: any) {
		let clientY = data["clientY"];
		let sliderTopPoint = data["slider-top-point"];
		let sliderHeight = data["slider-height"];
		let data_num = data["data-num"];
		let firstThumbPosition = data["positionThumbFirst"];
		let secondThumbPosition = data["positionThumbSecond"];

		let position = clientY - sliderTopPoint;
		let onePixelSizeVertical = (this.max - this.min) / sliderHeight;
		let stepSizeVertical = this.step / onePixelSizeVertical;
		let positionMove =
			Math.round(position / stepSizeVertical) * stepSizeVertical;
		let value =
			Math.round((position * onePixelSizeVertical + this.min) / this.step) *
			this.step;
		let rightValueForRange =
			Math.round(
				(secondThumbPosition * onePixelSizeVertical + this.min) / this.step
			) * this.step;

		let leftValueForRange =
			Math.round(
				(firstThumbPosition * onePixelSizeVertical + this.min) / this.step
			) * this.step;
		if (!this.range) {
			let right = sliderHeight;

			if (position < 0) {
				this.observer.broadcast("position", {
					position: 0,
					data_num: data_num,
					value: this.min,
				});
			} else if (position > right) {
				this.observer.broadcast("position", {
					position: right,
					data_num: data_num,
					value: this.max,
				});
			} else {
				this.observer.broadcast("position", {
					position: positionMove,
					data_num: data_num,
					value: value,
				});
			}
		} else if (this.range) {
			if (data_num == "1") {
				let right = secondThumbPosition;

				if (position < 0) {
					this.observer.broadcast("position", {
						position: 0,
						data_num: data_num,
						value: this.min,
					});
				} else if (position > right) {
					this.observer.broadcast("position", {
						position: right,
						data_num: data_num,
						value: rightValueForRange,
					});
				} else {
					this.observer.broadcast("position", {
						position: positionMove,
						data_num: data_num,
						value: value,
					});
				}
			} else if (data_num == "2") {
				let left = firstThumbPosition;
				let right = sliderHeight;

				if (position < left) {
					this.observer.broadcast("position", {
						position: left,
						data_num: data_num,
						value: leftValueForRange,
					});
				} else if (position > right) {
					this.observer.broadcast("position", {
						position: right,
						data_num: data_num,
						value: this.max,
					});
				} else {
					this.observer.broadcast("position", {
						position: positionMove,
						data_num: data_num,
						value: value,
					});
				}
			}
		}
	}
	changeLabel(data: boolean) {
		this.label = data;
		if (this.checkLabel(this.label)) {
			this.observer.broadcast("changeLabel", this.label);
		}
	}

	changeRange(data: boolean) {
		this.range = data;
		if (this.checkRange(this.range)) {
			this.observer.broadcast("changeRange", this.range);
			this.calcPosotionFrom();
			this.calcPosotionTo();
		}
	}

	changeOrientation(data: string) {
		this.orientation = data;
		if (this.checkOrientation(this.orientation)) {
			this.observer.broadcast("changeOrientation", this.orientation);
		}
	}

	changeMin(data: number) {
		this.min = data;
		if (this.checkMinValue(this.min)) {
			this.observer.broadcast("changeMinValue", this.min);
			this.calcPosotionFrom();
			this.calcPosotionTo();
		}
	}
	changeMax(data: number) {
		this.max = data;
		if (this.checkMaxValue(this.max)) {
			this.observer.broadcast("changeMaxValue", this.max);
			this.calcPosotionFrom();
			this.calcPosotionTo();
		}
	}
	changeStep(data: number) {
		this.step = data;
		if (this.checkStepValue(this.step)) {
			this.observer.broadcast("changeStep", this.step);
			this.calckStep();
		}
	}
	changePositionFrom(data: number) {
		this.positionFrom = data;
		if (this.checkPositionFrom(this.positionFrom)) {
			this.observer.broadcast('changePositionFrom', this.positionFrom)
			this.calcPosotionFrom();
		}
	}

	changePositionTo(data: number) {
		this.positionTo = data;
		if (this.checkPositionTo(this.positionTo)) {
			this.calcPosotionTo();
		}
	}
	calcPosotionFrom() {
		if (this.positionFrom < this.min) {
			this.positionFrom = this.min;
			this.observer.broadcast("changePositionFrom", this.positionFrom);
		} else if (this.range && this.positionFrom > this.positionTo) {
			this.positionFrom = this.positionTo - this.step;
			this.observer.broadcast("changePositionFrom", this.positionFrom);
		} else if (!this.range && this.positionFrom > this.max) {
			this.positionFrom = this.max;
			this.observer.broadcast("changePositionFrom", this.positionFrom);
		} else {
			this.observer.broadcast("changePositionFrom", this.positionFrom);
		}
	}
	calcPosotionTo() {
		if (this.positionTo > this.max) {
			this.positionTo = this.max;
			this.observer.broadcast("changePositionTo", this.positionTo);
		} else if (this.positionTo < this.positionFrom) {
			this.positionTo = this.positionFrom + this.step;
			this.observer.broadcast("changePositionTo", this.positionTo);
		} else {
			this.observer.broadcast("changePositionTo", this.positionTo);
		}
	}
	calckStep() {
		if (this.step <= 0) {
			this.step = 1;
		} else if (this.step > this.max - this.min) {
			this.step = this.max;
		}
	}
	getStep(loadData: any) {
		let sliderSize = loadData["sliderSize"];

		let stepCount = 20;
		let onePixelSize = (this.max - this.min) / sliderSize;
		let stepSize = sliderSize / stepCount;
		let onloadPositionThumbOne = (this.positionFrom - this.min) / onePixelSize;
		let onloadPositionThumbTwo = (this.positionTo - this.min) / onePixelSize;

		this.observer.broadcast("stepData", {
			stepCount: stepCount,
			stepSize: stepSize,
			onloadPositionThumbOne: onloadPositionThumbOne,
			onloadPositionThumbTwo: onloadPositionThumbTwo,
		});
	}
}
export { Model };
