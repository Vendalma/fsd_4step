import { View } from "../slider/MVP/View/View";
const config = {
  range: true,
  min: 0,
  max: 100,
  positionFrom: 15,
  positionTo: 30,
  label: true,
  step: 1,
  orientation: "horizontal",
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
  "setPositionThumb",
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
    view.setAttr();
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
  });
  it("метод subscribeOnUpdate должен вызывать ф-ю addFollower в sliderBlock", () => {
    view.subscribeOnUpdate();
    expect(view.sliderBlock.addFollower).toHaveBeenCalled();
  });
  it("метод update вызывает ф-ю broadcast в Observer", () => {
    const data = {
      clientXY: 100,
      slider_client_react: 5,
      data_num: "2",
      positionThumbFirst: 30,
      positionThumbSecond: 45,
    };
    view.update("mouse", data);
    expect(view.observer.broadcast).toHaveBeenCalled();
  });
  describe("метод setPositionThumb", () => {
    let data: any;
    beforeEach(function () {
      data = {
        dataFirstThumb: {
          valueFrom: 10,
        },
        dataSecondThumb: {
          valueTo: 30,
        },
      };
    });
    it("должна вызваться ф-я setPositionThumb в sliderBlock и обновиться атрибуты sliderContainer", () => {
      view.setPositionThumb(data);
      expect(view.sliderBlock.setPositionThumb).toHaveBeenCalled();
      expect(view.sliderContainer).toHaveAttr(
        "data-from",
        String(data.dataFirstThumb.valueFrom)
      );
      expect(view.sliderContainer).toHaveAttr(
        "data-to",
        String(data.dataSecondThumb.valueTo)
      );
    });
  });
  it("метод addFollower вызывает ф-ю subscribe в Observer", () => {
    view.addFollower({});
    expect(view.observer.subscribe).toHaveBeenCalled();
  });
  describe("метод onloadWindow", () => {
    beforeAll(function () {
      let view: View = new View(config, block[0]);
    });
    it("при загрузке окна вызывается observer.broadcast в ф-ции getSliderSize во View", () => {
      const event = new UIEvent("load", { bubbles: true });
      window.dispatchEvent(event);
      expect(view.observer.broadcast).toHaveBeenCalled();
    });
  });
  describe("метод resizeWindow", () => {
    beforeAll(function () {
      let view: View = new View(config, block[0]);
    });
    it("при resize окна вызывается observer.broadcast в ф-ции getSliderSize во View ", () => {
      const event = new UIEvent("resize", {});
      window.dispatchEvent(event);
      expect(view.observer.broadcast).toHaveBeenCalled();
    });
  });
  describe("метод getSliderSize", () => {
    it("при orientation = horizontal вызывается observer.broadcast", () => {
      view.config.orientation = "horizontal";
      view.getSliderSize();
      expect(view.observer.broadcast).toHaveBeenCalled();
    });
    it("при orientation = vertical вызывается observer.broadcast", () => {
      view.config.orientation = "vertical";
      view.getSliderSize();
      expect(view.observer.broadcast).toHaveBeenCalled();
    });
  });
  describe("метод updateFromToAttr", () => {
    it("при positionFrom !== атрибуту data-from, метод уравнивает значения", () => {
      view.config.positionFrom = 99;
      view.sliderContainer.dataset.from = "10";
      view.updateFromToAttr();
      expect(view.sliderContainer).toHaveAttr("data-from", "99");
    });
    it("при positionTo !== атрибуту data-to, метод уравнивает значения", () => {
      view.config.positionTo = 200;
      view.sliderContainer.dataset.to = "50";
      view.updateFromToAttr();
      expect(view.sliderContainer).toHaveAttr("data-to", "200");
    });
  });
  it("метод updateConfig обновляет конфиг  View и вызывает ф-ю updateConfig в sliderBlock", () => {
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
    view.updateConfig(newConf);
    expect(view.config).toEqual(newConf);
    expect(view.sliderBlock.updateConfig).toHaveBeenCalled();
  });
  it("метод changeOrientation вызывает методы getSliderSize и updateConfig", () => {
    const newConf = {
      min: -5,
      max: 105,
      label: false,
      orientation: "vertical",
      positionFrom: 5,
      positionTo: 10,
      range: false,
      step: 1,
    };
    spyOn(view, "getSliderSize");
    spyOn(view, "updateConfig");
    view.changeOrientationOrRange(newConf);
    expect(view.updateConfig).toHaveBeenCalled();
    expect(view.getSliderSize).toHaveBeenCalled();
  });
});
