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
  "setOnloadProgressBarPosition",
  "setPositionForThumbOne",
  "setPositionForThumbTwo",
  "updateBarConfig",
]);
const step = jasmine.createSpyObj("step", ["updateConfigStep", "addStepLine"]);
const thumbOne = jasmine.createSpyObj("thumbOne", [
  "addFollower",
  "setPosition",
  "setLabelValue",
  "updateConfigThumb",
  "onMouseUp",
]);
const thumbTwo = jasmine.createSpyObj("thumbTwo", [
  "addFollower",
  "setPosition",
  "setLabelValue",
  "addThis",
  "removeThis",
  "updateConfigThumb",
  "onMouseUp",
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
  it("метод addStep вызывает addStepLine в Step", () => {
    sliderBlock.addStep({});
    expect(sliderBlock.step.addStepLine).toHaveBeenCalled();
  });
  it("метод updateConfig обновляет конфиг, вызывает методы changeRange, changeOrientation, передает новый конфиг классам step, thumbOne, thumbTwo, progressBar", () => {
    spyOn(sliderBlock, "changeOrientation");
    spyOn(sliderBlock, "changeRange");
    sliderBlock.updateConfig({});
    expect(sliderBlock.changeOrientation).toHaveBeenCalled();
    expect(sliderBlock.changeRange).toHaveBeenCalled();
    expect(step.updateConfigStep).toHaveBeenCalled();
    expect(thumbOne.updateConfigThumb).toHaveBeenCalled();
    expect(thumbTwo?.updateConfigThumb).toHaveBeenCalled();
    expect(progressBar.updateBarConfig).toHaveBeenCalled();
  });

  describe("метода changeRange", () => {
    let secondThumb;
    beforeEach(function () {
      secondThumb = sliderBlock.sliderBlock.querySelector(
        ".thumb_second"
      ) as HTMLElement;
    });
    it("при secondThumb = null метод вызывает ф-ю setThumbTwo", () => {
      secondThumb = null;
      spyOn(sliderBlock, "setThumbTwo");
      sliderBlock.changeRange();
      expect(sliderBlock.setThumbTwo).toHaveBeenCalled();
    });
    it("при range = true метод вызывает ф-ю addThis в классе thumbTwo", () => {
      sliderBlock.config.range = true;
      sliderBlock.changeRange();
      expect(sliderBlock.thumbTwo?.addThis).toHaveBeenCalled();
    });
  });
  describe("метод changeOrientation", () => {
    it("при orientation = vertical блоку присваивается класс slider__block_vertical", () => {
      sliderBlock.config.orientation = "vertical";
      sliderBlock.changeOrientation();
      expect(sliderBlock.sliderBlock).toHaveClass("slider__block_vertical");
    });
    it("при orientation = horizontal у блока удаляется класс slider__block_vertical", () => {
      sliderBlock.config.orientation = "horizontal";
      sliderBlock.changeOrientation();
      expect(sliderBlock.sliderBlock).not.toHaveClass("slider__block_vertical");
    });
  });
  describe("метод setOnloadThumbPosition", () => {
    let data: any;
    beforeEach(function () {
      data = {
        thumbData: {
          onloadPositionThumbOne: 50,
          onloadPositionThumbTwo: 245,
        },
      };
    });
    sliderBlock.progressBar.setOnloadProgressBarPosition;
    it("при range = false вызываются ф-ции setPosition и setLabelValue класса thumbOne, setOnloadProgressBarPosition класса progressBar", () => {
      sliderBlock.config.range = false;
      sliderBlock.setOnloadThumbPosition(data);
      expect(sliderBlock.thumbOne.setPosition).toHaveBeenCalled();
      expect(sliderBlock.thumbOne.setLabelValue).toHaveBeenCalled();
      expect(
        sliderBlock.progressBar.setOnloadProgressBarPosition
      ).toHaveBeenCalled();
    });
    it("при range = true вызываются ф-ции setPosition и setLabelValue в классах thumbOne и thumbTwo, setOnloadProgressBarPosition класса progressBar", () => {
      sliderBlock.config.range = true;
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
  describe("метод setPositionMoveThumb", () => {
    let data: any;
    beforeEach(function () {
      data = {
        data_num: "1",
      };
    });

    it("при data_num = 1 вызываются ф-ции setPosition,setLabelValue класса thumbOne, setPositionForThumbOne в классе progressBar", () => {
      sliderBlock.setPositionMoveThumb(data);
      expect(sliderBlock.thumbOne.setPosition).toHaveBeenCalled();
      expect(sliderBlock.thumbOne.setLabelValue).toHaveBeenCalled();
      expect(sliderBlock.progressBar.setPositionForThumbOne).toHaveBeenCalled();
    });
    it("при data_num = 2 вызываются ф-ции setPosition,setLabelValue класса thumbTwo, setPositionForThumbTwo в классе progressBar", () => {
      data["data_num"] = "2";
      sliderBlock.setPositionMoveThumb(data);
      expect(sliderBlock.thumbTwo?.setPosition).toHaveBeenCalled();
      expect(sliderBlock.thumbTwo?.setLabelValue).toHaveBeenCalled();
      expect(sliderBlock.progressBar.setPositionForThumbTwo).toHaveBeenCalled();
    });
  });
  it("метод subscribeOnUpdate вызывает ф-ю addFollower в классах thumbOne, thumbTwo", () => {
    sliderBlock.subscribeOnUpdate();
    expect(sliderBlock.thumbOne.addFollower).toHaveBeenCalled();
    expect(sliderBlock.thumbTwo?.addFollower).toHaveBeenCalled();
  });
  describe("метод setThumbTwo", () => {
    it("при range = false вызывает ф-ю removeThis в классе thumbTwo", () => {
      sliderBlock.config.range = false;
      sliderBlock.setThumbTwo();
      expect(sliderBlock.thumbTwo?.removeThis).toHaveBeenCalled();
    });
  });

  it("метод update вызывает ф-ю broadcast класса observer", () => {
    sliderBlock.update("mouse", {});
    expect(sliderBlock.observer.broadcast).toHaveBeenCalled();
  });
  describe("метод sliderClick", () => {
    let event: MouseEvent;
    beforeEach(function () {
      event = new MouseEvent("click", { bubbles: true });
    });
    describe("orientation = horizontal", () => {
      beforeAll(function () {
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
        sliderBlock.sliderBlock.dispatchEvent(event);
        expect(sliderBlock.thumbOne.onMouseUp).toHaveBeenCalled();
      });
      it("при range = true thumbFirst < thumbSecond вызывается метод onMouseUp класса thumbOne", () => {
        sliderBlock.config.range = true;
        let thumbFirst = 40;
        let thumbSecond = 100;
        sliderBlock.sliderBlock.dispatchEvent(event);
        expect(sliderBlock.thumbOne.onMouseUp).toHaveBeenCalled();
      });
      it("при range = true thumbFirst > thumbSecond вызывается метод onMouseUp класса thumbTwo", () => {
        sliderBlock.config.range = true;
        let thumbFirst = 100;
        let thumbSecond = 30;
        sliderBlock.sliderBlock.dispatchEvent(event);
        expect(sliderBlock.thumbTwo?.onMouseUp).toHaveBeenCalled();
      });
    });
    describe("orientation = vertical", () => {
      beforeAll(function () {
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
        sliderBlock.sliderBlock.dispatchEvent(event);
        expect(sliderBlock.thumbOne.onMouseUp).toHaveBeenCalled();
      });
      it("при range = true thumbFirst < thumbSecond вызывается метод onMouseUp класса thumbOne", () => {
        sliderBlock.config.range = true;
        let thumbFirst = 40;
        let thumbSecond = 100;
        sliderBlock.sliderBlock.dispatchEvent(event);
        expect(sliderBlock.thumbOne.onMouseUp).toHaveBeenCalled();
      });
      it("при range = true thumbFirst > thumbSecond вызывается метод onMouseUp класса thumbTwo", () => {
        sliderBlock.config.range = true;
        let thumbFirst = 100;
        let thumbSecond = 30;
        sliderBlock.sliderBlock.dispatchEvent(event);
        expect(sliderBlock.thumbTwo?.onMouseUp).toHaveBeenCalled();
      });
    });
  });
});
