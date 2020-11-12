import { View } from "../slider/MVP/View/View";
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
  "setPositionMoveThumb",
  "setOnloadThumbPosition",
  "addStep",
  "updateConfig",
]);
view.observer = observer;
view.sliderBlock = sliderBlock;
describe("View", () => {
  it("Инициализация View", () => {
    expect(view).toBeDefined();
    expect(view.config).toEqual(config);
  });

  it("Инициализация блока div.slider", () => {
    expect(view.wrapper).toBeInstanceOf(HTMLElement);
    expect(view.wrapper).toContainElement("div.slider");
    expect(view.wrapper).toHaveClass("wrapper");

    expect(view.sliderContainer).toBeInstanceOf(HTMLElement);
    expect(view.sliderContainer).toHaveClass("slider");
  });
  it("div.sliderContainer должен иметь атрибуты с заданными параметрами", () => {
    const spy = spyOn<any>(view, "setAttr").and.callThrough();
    spy.call(view);
    expect(view.sliderContainer).toHaveAttr(
      "data-min",
      view.config.min.toString()
    );
    expect(view.sliderContainer).toHaveAttr(
      "data-max",
      view.config.max.toString()
    );
    expect(view.sliderContainer).toHaveAttr(
      "data-step",
      view.config.step.toString()
    );
    expect(view.sliderContainer).toHaveAttr(
      "data-label",
      String(view.config.label)
    );
    expect(view.sliderContainer).toHaveAttr(
      "data-orientation",
      view.config.orientation
    );
    expect(view.sliderContainer).toHaveAttr(
      "data-range",
      String(view.config.range)
    );
    expect(view.sliderContainer).toHaveAttr(
      "data-from",
      view.config.positionFrom.toString()
    );
    expect(view.sliderContainer).toHaveAttr(
      "data-to",
      view.config.positionTo.toString()
    );
    expect(view.sliderContainer).toHaveAttr(
      "data-from-move",
      view.config.positionFrom.toString()
    );
    expect(view.sliderContainer).toHaveAttr(
      "data-to-move",
      view.config.positionTo.toString()
    );
  });
  it("проверка метода addFollower", () => {
    view.addFollower({});
    expect(view.observer.subscribe).toHaveBeenCalled();
  });
  it("Проверка метода updateConfig", () => {
    const newConf = {
      range: false,
      min: -100,
      max: 100,
      positionFrom: 10,
      positionTo: 45,
      label: true,
      step: 0.1,
      orientation: "vertical",
    };
    const spyOnFrom = spyOn<any>(view, "updateAttrFromMove");
    const spyOnTo = spyOn<any>(view, "updateAttrToMove");
    view.updateConfig(newConf);
    expect(view.config).toEqual(newConf);
    expect(view.sliderBlock.updateConfig).toHaveBeenCalled();
    expect(spyOnFrom).toHaveBeenCalled();
    expect(spyOnTo).toHaveBeenCalled();
  });

  it("проверка метода setOnloadView", () => {
    view.setOnloadView({});
    expect(view.sliderBlock.setOnloadThumbPosition).toHaveBeenCalled();
    expect(view.sliderBlock.addStep).toHaveBeenCalled();
  });

  describe("проверка метода setPositionMoveThumb", () => {
    let data: any;
    beforeEach(function () {
      data = {
        data_num: "1",
        value: "50",
      };
    });
    it("data_num = 1", () => {
      view.setPositionMoveThumb(data);
      expect(view.sliderBlock.setPositionMoveThumb).toHaveBeenCalled();
      expect(view.sliderContainer).toHaveAttr("data-from-move", data.value);
    });
    it("data_num = 2", () => {
      data.data_num = "2";
      view.setPositionMoveThumb(data);
      expect(view.sliderBlock.setPositionMoveThumb).toHaveBeenCalled();
      expect(view.sliderContainer).toHaveAttr("data-to-move", data.value);
    });
  });
  it("проверка метода subscribeOnUpdate", () => {
    const spy = spyOn<any>(view, "subscribeOnUpdate").and.callThrough();
    spy.call(view);
    expect(view.sliderBlock.addFollower).toHaveBeenCalled();
  });
  it("проверка метода update", () => {
    const spy = spyOn<any>(view, "update").and.callThrough();
    spy.call(view);
    expect(view.observer.broadcast).toHaveBeenCalled();
  });
  describe('', () => {
    beforeAll(function () {
      let view: View = new View(config, block[0]);
    })
    it("проверка метода onloadWindow", () => {
      const event = new UIEvent("load", { bubbles: true });
      window.dispatchEvent(event);
      expect(view.observer.broadcast).toHaveBeenCalled();
    });
  });
  describe('', () => {
    beforeAll(function () {
      let view: View = new View(config, block[0]);
    })
    it("проверка метода resizeWindow", () => {
      const event = new UIEvent('resize', {})
      window.dispatchEvent(event)
      expect(view.observer.broadcast).toHaveBeenCalled();
    });
  })

  describe("проверка метода getSliderSize", () => {
    beforeEach(function () {
      const spy = spyOn<any>(view, "getSliderSize").and.callThrough();
      spy.call(view);
    });
    it("orientation = horisontal", () => {
      view.config.orientation = "horisontal";
      expect(view.observer.broadcast).toHaveBeenCalled();
    });
    it("orientation = vertical", () => {
      view.config.orientation = "verticcal";
      expect(view.observer.broadcast).toHaveBeenCalled();
    });
  });
  it("проверка метода changeOrientaion", () => {
    const spy = spyOn<any>(view, 'getSliderSize');
    const anotherSpy = spyOn(view, 'updateConfig')
    view.changeOrientaion({})
    expect(view.updateConfig).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled()
  });
});
