import { progressBar } from "../MVP/View/progressBar";
const config = {
  range: true,
  orientation: "horisontal",
};
const block = $("<div>");
const secondThumb = $("<div>");
beforeEach(function () {
  block[0].classList.add("slider__block");
  secondThumb[0].classList.add("thumb_second");
  block.append(secondThumb[0]);
  $(document.body).append(block);
});
const ProgressBar: progressBar = new progressBar(config, block[0]);

describe("ProgressBar", () => {
  it("Инициализация ProgressBar", () => {
    expect(ProgressBar).toBeDefined();

    expect(ProgressBar.config).toEqual(config);
    expect(ProgressBar.range).toEqual(config.range);
    expect(ProgressBar.orientation).toEqual(config.orientation);

    expect(ProgressBar.slider).toBeInstanceOf(HTMLElement);
    expect(ProgressBar.slider).toContainElement("div.progress-bar");
    expect(ProgressBar.progressBar).toBeInstanceOf(HTMLElement);
    expect(ProgressBar.progressBar).toHaveClass("progress-bar");
  });
  it("проверка метода checkRange", () => {
    ProgressBar.checkRange(false);

    expect(ProgressBar.range).toEqual(false);
  });
  it("проверка метода checkOrientation", () => {
    ProgressBar.checkOrientation("vertical");

    expect(ProgressBar.orientation).toEqual("vertical");
  });
  describe("проверка метода setOnloadProgressBarPosition", () => {
    let data: any;
    let onloadPositionThumbOne: number;
    let onloadPositionThumbTwo: number;
    beforeAll(function () {
      data = {
        onloadPositionThumbOne: 15,
        onloadPositionThumbTwo: 100,
      };
      onloadPositionThumbOne = data["onloadPositionThumbOne"];
      onloadPositionThumbTwo = data["onloadPositionThumbTwo"];
    });
    it("orientation = horisontal, range = false", () => {
      ProgressBar.range = false;
      ProgressBar.orientation = "horisontal";
      ProgressBar.setOnloadProgressBarPosition(data);

      expect(ProgressBar.progressBar).toHaveCss({ left: "0px" });
      expect(ProgressBar.progressBar).toHaveCss({
        width: onloadPositionThumbOne + 2 + "px",
      });
    });
    it("orientation = horisontal, range = true", () => {
      ProgressBar.range = true;
      ProgressBar.orientation = "horisontal";
      ProgressBar.setOnloadProgressBarPosition(data);
      expect(ProgressBar.progressBar).toHaveCss({
        left: onloadPositionThumbOne + "px",
      });
      expect(ProgressBar.progressBar).toHaveCss({
        width: onloadPositionThumbTwo - onloadPositionThumbOne + "px",
      });
    });
    it("orientation = vertical, range = false", () => {
      ProgressBar.range = false;
      ProgressBar.orientation = "vertical";
      ProgressBar.setOnloadProgressBarPosition(data);

      expect(ProgressBar.progressBar).toHaveCss({ top: "0px" });
      expect(ProgressBar.progressBar).toHaveCss({
        height: onloadPositionThumbOne + 2 + "px",
      });
    });
    it("orientation = vertical, range = true", () => {
      ProgressBar.range = true;
      ProgressBar.orientation = "vertical";
      ProgressBar.setOnloadProgressBarPosition(data);

      expect(ProgressBar.progressBar).toHaveCss({ left: "0px" });
      expect(ProgressBar.progressBar).toHaveCss({
        top: onloadPositionThumbOne + "px",
      });
      expect(ProgressBar.progressBar).toHaveCss({
        height: onloadPositionThumbTwo - onloadPositionThumbOne + "px",
      });
    });
  });
  describe("проверка метода setPositionForThumbOne", () => {
    let position: number;
    let secondThumb: HTMLElement;
    beforeAll(function () {
      position = 100;
      secondThumb = ProgressBar.slider.querySelector(
        ".thumb_second"
      ) as HTMLElement;
    });
    it("orientation = horisontal, range = false", () => {
      ProgressBar.range = false;
      ProgressBar.orientation = "horisontal";
      ProgressBar.setPositionForThumbOne(position);

      expect(ProgressBar.progressBar).toHaveCss({ width: position + 2 + "px" });
    });

    it("orientation = horisontal, range = true", () => {
      ProgressBar.range = true;
      ProgressBar.orientation = "horisontal";
      secondThumb.style.left = "170px";

      ProgressBar.setPositionForThumbOne(position);
      expect(ProgressBar.progressBar).toHaveCss({ left: position + "px" });
      expect(ProgressBar.progressBar).toHaveCss({
        width: parseInt(secondThumb.style.left) - position + "px",
      });
    });
    it("orientation = vertical, range = false", () => {
      ProgressBar.range = false;
      ProgressBar.orientation = "vertical";
      ProgressBar.setPositionForThumbOne(position);

      expect(ProgressBar.progressBar).toHaveCss({
        height: position + 2 + "px",
      });
    });
    it("orientation = vertical, range = true", () => {
      ProgressBar.range = true;
      ProgressBar.orientation = "vertical";
      secondThumb.style.top = "270px";
      ProgressBar.setPositionForThumbOne(position);

      expect(ProgressBar.progressBar).toHaveCss({ top: position + "px" });
      expect(ProgressBar.progressBar).toHaveCss({
        height: parseInt(secondThumb.style.top) - position + "px",
      });
    });
  });
  describe("проверка метода setPositionForThumbTwo", () => {
    let position: number;
    beforeAll(function () {
      position = 254;
      ProgressBar.progressBar.style.left = "100px";
      ProgressBar.progressBar.style.top = "30px";
    });
    it("orientation = horisontal", () => {
      ProgressBar.orientation = "horisontal";
      ProgressBar.setPositionForThumbTwo(position);
      expect(ProgressBar.progressBar.style.width).toEqual("161px");
      expect(ProgressBar.progressBar).toHaveCss({
        width:
          position - parseInt(ProgressBar.progressBar.style.left) + 7 + "px",
      });
    });
    it("orientation = vertical", () => {
      ProgressBar.orientation = "vertical";
      ProgressBar.setPositionForThumbTwo(position);
      expect(ProgressBar.progressBar.style.height).toEqual("229px");
      expect(ProgressBar.progressBar).toHaveCss({
        height:
          position - parseInt(ProgressBar.progressBar.style.top) + 5 + "px",
      });
    });
  });
});
