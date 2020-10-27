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
export class Validator {
	range: boolean;
	config: IConfigModel;
	max: number;
	min: number;
	positionFrom: number;
	positionTo: number;
	orientation: string;
	step: number;
	label: boolean;
	constructor(config: any) {
		this.config = config;
		this.range = this.config.range;
		this.max = this.config.max;
		this.min = this.config.min;
		this.positionFrom = this.config.positionFrom;
		this.positionTo = this.config.positionTo;
		this.orientation = this.config.orientation;
		this.step = this.config.step;
		this.label = this.config.label;
	}

	checkMaxValue(data: number) {
		try {
			this.max = data;
			if (this.max <= this.min) {
				throw new Error("Error: max <= min");
			}
		} catch (error) {
			return error
		}
		return true;
	}

	checkMinValue(data: number) {
		this.min = data;
		try {
			this.min = data;
			if (this.min >= this.max) {
				throw new Error("Error: min >= max");
			}
		} catch (error) {
			return error
		}
		return true;
	}
	checkPositionFrom(data: number) {
		this.positionFrom = data;
		try {
			if (this.positionFrom < this.min) {
				throw new Error("Error: position from < min");
			} else if (this.range && this.positionFrom > this.positionTo) {
				throw new Error("Error: position from > position to");
			} else if (!this.range && this.positionFrom > this.max) {
				throw new Error("Error: position from > max");
			}
		} catch (error) {
			return error
		}
		return true;
	}
	checkPositionTo(data: number) {
		this.positionTo = data;
		try {
			if (this.positionTo > this.max) {
				throw new Error("Error: position to > max");
			} else if (this.positionTo < this.positionFrom) {
				throw new Error("Error: position to < position from");
			}
		} catch (error) {
			return error
		}
		return true;
	}
	checkStep(data: number) {
		this.step = data;
		try {
			if (this.step <= 0) {
				throw new Error("Error: step <= 0");
			} else if (this.step > this.max - this.min) {
				throw new Error("Error: step > max - min");
			}
		} catch (error) {
			return error
		}
		return true;
	}
	checkRange(data: boolean) {
		this.range = data;
		try {
			if (typeof this.range !== "boolean") {
				throw new Error("Error: range is not valid");
			}
		} catch (error) {
			return error
		}
		return true;
	}
	checkLabel(data: boolean) {
		this.label = data;
		try {
			if (typeof this.label !== "boolean") {
				throw new Error("Error: label is not valid");
			}
		} catch (error) {
			return error
		}
		return true;
	}
	checkOrientation(data: string) {
		this.orientation = data;
		try {
			if (this.orientation == "vertical" || this.orientation == "horisontal") {
				return true;
			} else {
				throw new Error("Error: not valid orientation value");
			}
		} catch (error) {
			return error;
		}
	}
	validation() {
		if (
			this.checkMaxValue(this.max) &&
			this.checkMinValue(this.min) &&
			this.checkPositionFrom(this.positionFrom) &&
			this.checkPositionTo(this.positionTo) &&
			this.checkRange(this.range) &&
			this.checkLabel(this.label) &&
			this.checkOrientation(this.orientation)
		)
			return true;
	}
}
