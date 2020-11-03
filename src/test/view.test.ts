import { View } from "../MVP/View/View";
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
  block[0].classList.add("slider__block");
  $(document.body).append(block);
});

let view: View = new View(config, block[0]);
let observer = jasmine.createSpyObj("observer", ["broadcast", "subscribe"]);
let sliderBlock = jasmine.createSpyObj("sliderBlock", [
  "addFollower",
  "changeMin",
  "changeMax",
  "changeLabel",
  "changePositionFrom",
  "changePositionTo",
  "changeOrientation",
  "changeRange",
  "setPositionMoveThumb",
  "setOnloadThumbPosition",
  "addStep",
]);
view.observer = observer;
view.sliderBlock = sliderBlock;
describe("View", () => {
  beforeEach(function () {
    spyOn(view, "changeOrientation");
  });
  it("Инициализация View", () => {
    expect(view).toBeDefined();

    expect(view.config).toEqual(config);
    expect(view.range).toEqual(config.range);
    expect(view.positionFrom).toEqual(config.positionFrom);
    expect(view.positionTo).toEqual(config.positionTo);
    expect(view.min).toEqual(config.min);
    expect(view.max).toEqual(config.max);
    expect(view.orientation).toEqual(config.orientation);
    expect(view.stepValue).toEqual(config.step);
    expect(view.label).toEqual(config.label);
  });

  it("Инициализация блока div.slider", () => {
    expect(view.wrapper).toBeInstanceOf(HTMLElement);
    expect(view.wrapper).toContainElement("div.slider");
    expect(view.wrapper).toHaveClass("wrapper");

    expect(view.sliderContainer).toBeInstanceOf(HTMLElement);
    expect(view.sliderContainer).toHaveClass("slider");
  });

  it("проверка метода init", () => {
    view.init();
    expect(view.sliderContainer).toHaveData("orientation", view.orientation);
    expect(view.sliderContainer).toHaveAttr(
      "data-from",
      view.positionFrom + ""
    );
    expect(view.sliderContainer).toHaveAttr("data-min", view.min + "");
    expect(view.sliderContainer).toHaveAttr("data-max", view.max + "");
    expect(view.sliderContainer).toHaveAttr("data-step", view.stepValue + "");
    expect(view.sliderContainer).toHaveAttr("data-label", view.label + "");
    expect(view.sliderContainer).toHaveAttr("data-range", view.range + "");
    if (view.range) {
      expect(view.sliderContainer).toHaveAttr("data-to", view.positionTo + "");
    }
  });
  it("проверка метода changeMin", () => {
    view.changeMin(1);
    expect(view.min).toEqual(1);
    expect(view.sliderBlock.changeMin).toHaveBeenCalled();
  });
  it("проверка метода changeMax", () => {
    view.changeMax(1000);
    expect(view.max).toEqual(1000);
    expect(view.sliderBlock.changeMax).toHaveBeenCalled();
  });
  it("проверка метода changeLabel", () => {
    view.changeLabel(false);
    expect(view.sliderBlock.changeLabel).toHaveBeenCalled();
  });
  it("проверка метода changePositionFrom", () => {
    view.changePositionFrom(10);
    expect(view.positionFrom).toEqual(10);
    expect(view.sliderBlock.changePositionFrom).toHaveBeenCalled();
  });
  it("проверка метода changePositionTo", () => {
    view.changePositionTo(100);
    expect(view.positionTo).toEqual(100);
    expect(view.sliderBlock.changePositionTo).toHaveBeenCalled();
  });

  it("проверка метода addFollower", () => {
    view.addFollower({});
    expect(view.observer.subscribe).toHaveBeenCalled();
  });

  describe("проверка метода setOnloadView", () => {
    it("", () => {
      view.setOnloadView({});
      expect(view.sliderBlock.setOnloadThumbPosition).toHaveBeenCalled();
      expect(view.sliderBlock.addStep).toHaveBeenCalled();
    });
  });
  describe("View проверка метода changeRange", () => {
    it("range = true", () => {
      view.changeRange(true);
      expect(view.range).toEqual(true);
      expect(view.sliderBlock.changeRange).toHaveBeenCalled();
    });
    it("range = false", () => {
      view.changeRange(false);
      expect(view.range).toEqual(false);
      expect(view.sliderBlock.changeRange).toHaveBeenCalled();
    });
  });
  describe("проверка метода setPositionMoveThumb", () => {
    it("", () => {
      view.setPositionMoveThumb({});
      expect(view.sliderBlock.setPositionMoveThumb).toHaveBeenCalled();
    });
  });
  describe("проверка метода getSliderSize", () => {
    it("orientation = horisontal", () => {
      view.orientation = "horisontal";
      expect(view.observer.broadcast).toHaveBeenCalled();
    });
    it("orientation = vertical", () => {
      view.orientation = "vertical";
      expect(view.observer.broadcast).toHaveBeenCalled();
    });
  });
});
describe("проверка метода changeOrientation", () => {
  it("orientation = horisontal ", () => {
    view.changeOrientation("horisontal");
    expect(view.orientation).toEqual("horisontal");
    expect(view.sliderBlock.changeOrientation).toHaveBeenCalled();
  });
  it("orientation = vertical ", () => {
    view.changeOrientation("vertical");
    expect(view.orientation).toEqual("vertical");
    expect(view.sliderBlock.changeOrientation).toHaveBeenCalled();
  });
});

