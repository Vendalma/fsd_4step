import { SliderBlock } from "../MVP/View/sliderBlock";
const config = {
  range: true,
  min: 0,
  max: 100,
  positionFrom: 15,
  positionTo: 30,
  label: true,
  step: 1,
  orientation: "horisontal",
};
const block = $("<div>");
beforeEach(function () {
  block[0].classList.add("slider__container");
  $(document.body).append(block);
});
const sliderBlock: SliderBlock = new SliderBlock(config, block[0]);
const observer = jasmine.createSpyObj("observer", ["subscribe", "broadcast"]);
const progressBar = jasmine.createSpyObj("progressBar", [
  "checkOrientation",
  "checkRange",
  "setOnloadProgressBarPosition",
  "setPositionForThumbOne",
  'setPositionForThumbTwo'
]);
const step = jasmine.createSpyObj("step", [
  "checkOrientation",
  "changeMinValue",
  "changeMaxValue",
  "addStepLine",
]);
const thumbOne = jasmine.createSpyObj("thumbOne", [
  "addFollower",
  "checkOrientation",
  "checkLabel",
  "checkRange",
  "setPosition",
  "setLabelValue",
]);
const thumbTwo = jasmine.createSpyObj("thumbTwo", [
  "addFollower",
  "checkOrientation",
  "checkLabel",
  "checkRange",
  "setPosition",
  "setLabelValue",
  "addThis",
  "removeThis",
]);

sliderBlock.observer = observer;
sliderBlock.progressBar = progressBar;
sliderBlock.step = step;
sliderBlock.thumbOne = thumbOne;
sliderBlock.thumbTwo = thumbTwo;
describe("Slider Block", () => {

  it("Инициализация Slider Block", () => {
    expect(sliderBlock).toBeDefined();
    expect(sliderBlock.config).toEqual(config);
    expect(sliderBlock.range).toEqual(config.range);
    expect(sliderBlock.positionFrom).toEqual(config.positionFrom);
    expect(sliderBlock.positionTo).toEqual(config.positionTo);
    expect(sliderBlock.min).toEqual(config.min);
    expect(sliderBlock.max).toEqual(config.max);
    expect(sliderBlock.orientation).toEqual(config.orientation);
    expect(sliderBlock.stepValue).toEqual(config.step);
    expect(sliderBlock.label).toEqual(config.label);

    expect(sliderBlock.sliderBlock).toBeInDOM();
    expect(sliderBlock.sliderBlock).toHaveClass("slider__block");
  });
  it("Проверка метода addFollower", () => {
    sliderBlock.addFollower({});
    expect(sliderBlock.observer.subscribe).toHaveBeenCalled();
  });
  it("Проверка метода addStep", () => {
    sliderBlock.addStep({});
    expect(sliderBlock.step.addStepLine).toHaveBeenCalled();
  });
  it("Проверка метода changeMin", () => {
    sliderBlock.changeMin(7);
    expect(sliderBlock.min).toEqual(7);
    expect(sliderBlock.step.changeMinValue).toHaveBeenCalled();
  });
  it("Проверка метода changeMax", () => {
    sliderBlock.changeMax(104);
    expect(sliderBlock.max).toEqual(104);
    expect(sliderBlock.step.changeMaxValue).toHaveBeenCalled();
  });
  it("Проверка метода changeLabel", () => {
    sliderBlock.changeLabel(false);
    expect(sliderBlock.thumbOne.checkLabel).toHaveBeenCalled();
    expect(sliderBlock.thumbTwo?.checkLabel).toHaveBeenCalled();
  });
  it("Проверка метода changePositionFrom", () => {
    sliderBlock.changePositionFrom(50);
    expect(sliderBlock.positionFrom).toEqual(50);
  });
  it("Проверка метода changePositionTo", () => {
    sliderBlock.changePositionTo(250);
    expect(sliderBlock.positionTo).toEqual(250);
  });

  describe("Проверка метода changeRange", () => {
    it("range = true", () => {
      sliderBlock.changeRange(true);
      expect(sliderBlock.range).toEqual(true);
      expect(sliderBlock.thumbOne.checkRange).toHaveBeenCalled();
      expect(sliderBlock.thumbTwo?.checkRange).toHaveBeenCalled();
      expect(sliderBlock.thumbTwo?.addThis).toHaveBeenCalled();
      expect(sliderBlock.progressBar.checkRange).toHaveBeenCalled();
    });
    it("range = false", () => {
      sliderBlock.changeRange(false);
      expect(sliderBlock.range).toEqual(false);
      expect(sliderBlock.thumbOne.checkRange).toHaveBeenCalled();
      expect(sliderBlock.thumbTwo?.checkRange).toHaveBeenCalled();
      expect(sliderBlock.progressBar.checkRange).toHaveBeenCalled();
    });
  });
  describe("Проверка метода changeOrientation", () => {
    it("orientation = vertical", () => {
      sliderBlock.changeOrientation("vertical");
      expect(sliderBlock.orientation).toEqual("vertical");
      expect(sliderBlock.thumbOne.checkOrientation).toHaveBeenCalled();
      expect(sliderBlock.thumbTwo?.checkOrientation).toHaveBeenCalled();
      expect(sliderBlock.step.checkOrientation).toHaveBeenCalled();
      expect(sliderBlock.progressBar.checkOrientation).toHaveBeenCalled();
      expect(sliderBlock.sliderBlock).toHaveClass("slider__block_vertical");
    });
    it("orientation = horisontal", () => {
      sliderBlock.changeOrientation("horisontal");
      expect(sliderBlock.orientation).toEqual("horisontal");
      expect(sliderBlock.thumbOne.checkOrientation).toHaveBeenCalled();
      expect(sliderBlock.thumbTwo?.checkOrientation).toHaveBeenCalled();
      expect(sliderBlock.step.checkOrientation).toHaveBeenCalled();
      expect(sliderBlock.progressBar.checkOrientation).toHaveBeenCalled();
      expect(sliderBlock.sliderBlock).not.toHaveClass("slider__block_vertical");
    });
  });
  describe("Проверка метода setOnloadThumbPosition", () => {
    let data: any;
    beforeEach(function () {
      data = {
        onloadPositionThumbOne: 50,
        onloadPositionThumbTwo: 245,
      };
    });
    it("range = false", () => {
      sliderBlock.range = false;
      sliderBlock.setOnloadThumbPosition(data);
      expect(sliderBlock.thumbOne.setPosition).toHaveBeenCalled();
      expect(sliderBlock.thumbOne.setLabelValue).toHaveBeenCalled();
      expect(
        sliderBlock.progressBar.setOnloadProgressBarPosition
      ).toHaveBeenCalled();
    });
    it("range = true", () => {
      sliderBlock.range = true;
      sliderBlock.setOnloadThumbPosition(data);
      expect(sliderBlock.thumbOne.setPosition).toHaveBeenCalled();
      expect(sliderBlock.thumbOne.setLabelValue).toHaveBeenCalled();
      expect(
        sliderBlock.progressBar.setOnloadProgressBarPosition
      ).toHaveBeenCalled();

      expect(sliderBlock.thumbTwo?.setPosition).toHaveBeenCalled();
      expect(sliderBlock.thumbTwo?.setLabelValue).toHaveBeenCalled();
    });
  });
  describe("Проверка метода setPositionMoveThumb", () => {
    let data: any;
    beforeEach(function () {
      data = {
        data_num: '1',
      };
    });
    it("range = false", () => {
      sliderBlock.range = false;
      sliderBlock.setPositionMoveThumb(data);
      expect(sliderBlock.thumbOne.setPosition).toHaveBeenCalled();
      expect(sliderBlock.thumbOne.setLabelValue).toHaveBeenCalled();
      expect(
        sliderBlock.progressBar.setPositionForThumbOne
      ).toHaveBeenCalled();
    });
    it("range = true, data_num = 1", () => {
      sliderBlock.range = true;
      sliderBlock.setPositionMoveThumb(data);
      expect(sliderBlock.thumbOne.setPosition).toHaveBeenCalled();
      expect(sliderBlock.thumbOne.setLabelValue).toHaveBeenCalled();
      expect(
        sliderBlock.progressBar.setPositionForThumbOne
      ).toHaveBeenCalled();
    });
    it("range = true, data_num = 2", () => {
      sliderBlock.range = true;
      data['data_num'] = '2'
      sliderBlock.setPositionMoveThumb(data);
      expect(sliderBlock.thumbTwo?.setPosition).toHaveBeenCalled();
      expect(sliderBlock.thumbTwo?.setLabelValue).toHaveBeenCalled();
      expect(
        sliderBlock.progressBar.setPositionForThumbTwo
      ).toHaveBeenCalled();
    });
  });
});
