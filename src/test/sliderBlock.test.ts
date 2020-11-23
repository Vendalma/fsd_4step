import { SliderBlock } from "../slider/MVP/View/sliderBlock";
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
const secondThumb = $("<div>");
beforeEach(function () {
  secondThumb[0].classList.add("thumb_second");
  block.append(secondThumb);
  block[0].classList.add("slider__container");
  $(document.body).append(block);
});
const sliderBlock: SliderBlock = new SliderBlock(config, block[0]);
const observer = jasmine.createSpyObj("observer", ["subscribe", "broadcast"]);
const progressBar = jasmine.createSpyObj("progressBar", [
  "addBar",
  "cleanStyleAttr",
  "updateBarConfig",
]);
const step = jasmine.createSpyObj("step", ["updateConfigStep", "addStepLine"]);
const thumbOne = jasmine.createSpyObj("thumbOne", [
  "addFollower",
  "setPosition",
  "setLabelValue",
  "updateConfigThumb",
  "onMouseUp",
  "cleanStyleAttr",
]);
const thumbTwo = jasmine.createSpyObj("thumbTwo", [
  "addFollower",
  "setPosition",
  "setLabelValue",
  "addThis",
  "removeThis",
  "updateConfigThumb",
  "onMouseUp",
  "cleanStyleAttr",
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
    expect(sliderBlock.sliderBlock).toBeInDOM();
    expect(sliderBlock.sliderBlock).toHaveClass("slider__block");
  });
  it("метод addFollower вызывает observer.subscribe", () => {
    sliderBlock.addFollower({});
    expect(sliderBlock.observer.subscribe).toHaveBeenCalled();
  });
  it("метод updateConfig обновляет конфиг, вызывает методы changeRange, changeOrientation, передает новый конфиг классам step, thumbOne, thumbTwo, progressBar", () => {
    const newConf = {
      min: -5,
      max: 40,
      range: false,
      positionFrom: 0,
      positionTo: 10,
      label: false,
      orientation: "vertical",
    };
    spyOn(sliderBlock, "checkOrientation");
    spyOn(sliderBlock, "setThumbTwo");
    sliderBlock.updateConfig(newConf);
    expect(sliderBlock.checkOrientation).toHaveBeenCalled();
    expect(sliderBlock.setThumbTwo).toHaveBeenCalled();
    expect(step.updateConfigStep).toHaveBeenCalled();
    expect(thumbOne.updateConfigThumb).toHaveBeenCalled();
    expect(thumbTwo?.updateConfigThumb).toHaveBeenCalled();
    expect(progressBar.updateBarConfig).toHaveBeenCalled();
  });
  describe("метод checkOrientation", () => {
    it("при orientation = vertical блоку присваивается класс slider__block_vertical", () => {
      sliderBlock.config.orientation = "vertical";
      sliderBlock.checkOrientation();
      expect(sliderBlock.sliderBlock).toHaveClass("slider__block_vertical");
    });
    it("при orientation = horizontal у блока удаляется класс slider__block_vertical", () => {
      sliderBlock.config.orientation = "horizontal";
      sliderBlock.checkOrientation();
      expect(sliderBlock.sliderBlock).not.toHaveClass("slider__block_vertical");
    });
  });
  describe("метод setPositionThumb всегда вызывает ф-ю addBar класса progressBar", () => {
    let data: any;
    beforeEach(function () {
      data = {
        stepData: 30.5,
        dataFirstThumb: {},
        dataSecondThumb: {},
      };
    });

    it("при data.stepData !== undefined вызываются ф-ции addStepLine класса Step и cleanStyleAttr в классах thumbOne, thumbTwo, progressBar", () => {
      sliderBlock.setPositionThumb(data);
      expect(sliderBlock.step.addStepLine).toHaveBeenCalled();
      expect(sliderBlock.thumbOne.cleanStyleAttr).toHaveBeenCalled();
      expect(sliderBlock.thumbTwo?.cleanStyleAttr).toHaveBeenCalled();
      expect(sliderBlock.progressBar.cleanStyleAttr).toHaveBeenCalled();
      expect(sliderBlock.progressBar.addBar).toHaveBeenCalled();
    });
    it("при data.dataFirstThumb !== undefined вызываются ф-ции setPosition,setLabelValue класса thumbOne", () => {
      sliderBlock.setPositionThumb(data);
      expect(sliderBlock.thumbOne.setPosition).toHaveBeenCalled();
      expect(sliderBlock.thumbOne.setLabelValue).toHaveBeenCalled();
      expect(sliderBlock.progressBar.addBar).toHaveBeenCalled();
    });
    it("при data.dataSecondThumb !== undefined вызываются ф-ции setPosition,setLabelValue класса thumbTwo", () => {
      sliderBlock.setPositionThumb(data);
      expect(sliderBlock.thumbTwo?.setPosition).toHaveBeenCalled();
      expect(sliderBlock.thumbTwo?.setLabelValue).toHaveBeenCalled();
      expect(sliderBlock.progressBar.addBar).toHaveBeenCalled();
    });
  });
  it("метод subscribeOnUpdate вызывает ф-ю addFollower в классах thumbOne, thumbTwo", () => {
    sliderBlock.subscribeOnUpdate();
    expect(sliderBlock.thumbOne.addFollower).toHaveBeenCalled();
    expect(sliderBlock.thumbTwo?.addFollower).toHaveBeenCalled();
  });
  describe("метод setThumbTwo", () => {
    let secondThumb: HTMLElement;
    beforeAll(function () {
      secondThumb = sliderBlock.sliderBlock.querySelector(
        ".thumb_second"
      ) as HTMLElement;
    });
    it("при range = true вызывает ф-ю addThis в классе thumbTwo", () => {
      sliderBlock.config.range = true;
      sliderBlock.setThumbTwo();
      expect(sliderBlock.thumbTwo?.addThis).toHaveBeenCalled();
    });
    it("при range = false вызывает ф-ю removeThis в классе thumbTwo", () => {
      sliderBlock.config.range = false;
      sliderBlock.setThumbTwo();
      expect(sliderBlock.thumbTwo?.removeThis).toHaveBeenCalled();
    });
  });

  it("метод update вызывает ф-ю broadcast класса observer", () => {
    const data = {
      clientXY: 100,
      slider_client_react: 5,
      data_num: "2",
      positionThumbFirst: 30,
      positionThumbSecond: 45,
    };
    sliderBlock.update("mouse", data);
    expect(sliderBlock.observer.broadcast).toHaveBeenCalled();
  });
  describe("метод sliderClick добавляет контейнеру обработчик событий", () => {
    let event: MouseEvent;
    beforeEach(function () {
      event = new MouseEvent("click", { bubbles: true });
    });
    it("при orientation = horizontal вызывается ф-я fundClickPlaceHorizon", () => {
      sliderBlock.config.orientation = "horizontal";
      spyOn(sliderBlock, "fundClickPlaceHorizon");

      sliderBlock.sliderClick()
      sliderBlock.sliderBlock.dispatchEvent(event);
      expect(sliderBlock.fundClickPlaceHorizon).toHaveBeenCalled();
    });
    it("при orientation = vertical вызывается ф-я fundClickPlaceVert", () => {
      sliderBlock.config.orientation = "vertical";
      spyOn(sliderBlock, "fundClickPlaceVert");
      sliderBlock.sliderBlock.dispatchEvent(event);
      expect(sliderBlock.fundClickPlaceVert).toHaveBeenCalled();
    });
  });
  describe('метод onSliderClick', () => {
    let event: MouseEvent;
    beforeEach(function () {
      event = new MouseEvent("click", { bubbles: true });
    });
    it("при orientation = horizontal вызывается ф-я fundClickPlaceHorizon", () => {
      sliderBlock.config.orientation = "horizontal";
      spyOn(sliderBlock, "fundClickPlaceHorizon");
      sliderBlock.onSliderClick(event)
      expect(sliderBlock.fundClickPlaceHorizon).toHaveBeenCalled();
    });
    it("при orientation = vertical вызывается ф-я fundClickPlaceVert", () => {
      sliderBlock.config.orientation = "vertical";
      spyOn(sliderBlock, "fundClickPlaceVert");
      sliderBlock.onSliderClick(event);
      expect(sliderBlock.fundClickPlaceVert).toHaveBeenCalled();
    });
  })
  describe("метод fundClickPlaceHorizon", () => {
    let event: MouseEvent;
    beforeAll(function () {
      event = new MouseEvent("click", { bubbles: true });
      sliderBlock.config.orientation = "horizontal";
      sliderBlock.thumbOne.thumb = sliderBlock.sliderBlock.querySelector(
        ".thumb_first"
      ) as HTMLElement;
      if (sliderBlock.thumbTwo)
        sliderBlock.thumbTwo.thumb = sliderBlock.sliderBlock.querySelector(
          ".thumb_second"
        ) as HTMLElement;
    });
    it("при range = false вызывается метод onMouseUp класса thumbOne", () => {
      sliderBlock.config.range = false;
      sliderBlock.fundClickPlaceHorizon(event);
      expect(sliderBlock.thumbOne.onMouseUp).toHaveBeenCalled();
    });
    it("при range = true thumbFirst < thumbSecond вызывается метод onMouseUp класса thumbOne", () => {
      sliderBlock.config.range = true;
      let thumbFirst = 40;
      let thumbSecond = 100;
      sliderBlock.fundClickPlaceHorizon(event);
      expect(sliderBlock.thumbOne.onMouseUp).toHaveBeenCalled();
    });
    it("при range = true thumbFirst > thumbSecond вызывается метод onMouseUp класса thumbTwo", () => {
      sliderBlock.config.range = true;
      let thumbFirst = 100;
      let thumbSecond = 30;
      sliderBlock.fundClickPlaceHorizon(event);
      expect(sliderBlock.thumbTwo?.onMouseUp).toHaveBeenCalled();
    });
  });
  describe("метод fundChickPlaceVert", () => {
    let event: MouseEvent;
    beforeAll(function () {
      event = new MouseEvent("click", { bubbles: true });
      sliderBlock.config.orientation = "vertical";
      sliderBlock.thumbOne.thumb = sliderBlock.sliderBlock.querySelector(
        ".thumb_first"
      ) as HTMLElement;
      if (sliderBlock.thumbTwo)
        sliderBlock.thumbTwo.thumb = sliderBlock.sliderBlock.querySelector(
          ".thumb_second"
        ) as HTMLElement;
    });
    it("при range = false вызывается метод onMouseUp класса thumbOne", () => {
      sliderBlock.config.range = false;
      sliderBlock.fundClickPlaceHorizon(event);
      expect(sliderBlock.thumbOne.onMouseUp).toHaveBeenCalled();
    });
    it("при range = true thumbFirst < thumbSecond вызывается метод onMouseUp класса thumbOne", () => {
      sliderBlock.config.range = true;
      let thumbFirst = 40;
      let thumbSecond = 100;
      sliderBlock.fundClickPlaceHorizon(event);
      expect(sliderBlock.thumbOne.onMouseUp).toHaveBeenCalled();
    });
    it("при range = true thumbFirst > thumbSecond вызывается метод onMouseUp класса thumbTwo", () => {
      sliderBlock.config.range = true;
      let thumbFirst = 100;
      let thumbSecond = 30;
      sliderBlock.fundClickPlaceHorizon(event);
      expect(sliderBlock.thumbTwo?.onMouseUp).toHaveBeenCalled();
    });
  });
});
