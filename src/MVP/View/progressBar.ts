interface IConfigProgressBar {
	range: boolean;
	orientation: string;
}
class progressBar {
	config: IConfigProgressBar;
	range: boolean;
	orientation: string;

	slider: HTMLElement;
	progressBar: HTMLElement;

	constructor(IConfigProgressBar: any, slider: HTMLElement) {
		this.config = IConfigProgressBar;
		this.range = this.config.range;
		this.orientation = this.config.orientation;

		this.slider = slider;
		this.progressBar = document.createElement("div");
		this.progressBar.classList.add("progress-bar");
		this.slider.prepend(this.progressBar);
	}

	setPositionForThumbOne(position: number) {
		if (this.orientation == 'horisontal') {
			if (!this.range) {
				this.progressBar.style.width = position + 2 + "px";
			} else {
				let secondThumb = this.slider.querySelector(".thumb_second") as HTMLElement;
				this.progressBar.style.left = position + "px";
				this.progressBar.style.width = parseInt(secondThumb.style.left) - position + "px";
			}
		}

		if (this.orientation == 'vertical') {
			if (!this.range) {
				this.progressBar.style.height = position + 2 + "px";
			} else {
				let secondThumb = this.slider.querySelector(".thumb_second") as HTMLElement

				this.progressBar.style.top = position + "px";
				this.progressBar.style.height = parseInt(secondThumb.style.top) - position + "px";
			}
		}
	}
	setPositionForThumbTwo(position: number) {
		if (this.orientation == 'horisontal') {
			this.progressBar.style.width =
				position - parseInt(this.progressBar.style.left) + 7 + "px";
		}
		if (this.orientation == 'vertical') {
			this.progressBar.style.height =
				position - parseInt(this.progressBar.style.top) + 5 + "px";
		}
	}
	checkRange(data: boolean) {
		this.range = data;

	}

	checkOrientation(data: string) {
		this.orientation = data;
	}

	setOnloadProgressBarPosition(data: any) {
		let onloadPositionThumbOne = data["onloadPositionThumbOne"];
		let onloadPositionThumbTwo = data["onloadPositionThumbTwo"];

		if (this.orientation == "horisontal") {
			this.progressBar.style.height = "7px";
			this.progressBar.style.top = '0px'

			if (!this.range) {
				this.progressBar.style.left = "0px";
				this.progressBar.style.width = onloadPositionThumbOne + 2 + "px";
			} else if (this.range) {
				this.progressBar.style.left = onloadPositionThumbOne + "px";
				this.progressBar.style.width =
					onloadPositionThumbTwo - onloadPositionThumbOne + "px";
			}
		}

		if (this.orientation == "vertical") {
			this.progressBar.style.width = "7px";
			if (!this.range) {
				this.progressBar.style.top = "0px";
				this.progressBar.style.height = onloadPositionThumbOne + 2 + "px";
			} else if (this.range) {
				this.progressBar.style.left = "0px";
				this.progressBar.style.top = onloadPositionThumbOne + "px";
				this.progressBar.style.height =
					onloadPositionThumbTwo - onloadPositionThumbOne + "px";
			}
		}
	}
}
export { progressBar };
