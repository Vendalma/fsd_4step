import { Thumb } from "../MVP/View/Thumb";
const config = {
  range: true,
  positionFrom: 15,
  positionTo: 30,
  orientation: "horisontal",
};
const block = $("<div>");
beforeEach(function () {
  block[0].classList.add("slider__block");
  $(document.body).append(block);
});

let thumb: Thumb = new Thumb(config, "thumb_first", block[0], 1);
let observer = jasmine.createSpyObj("observer", ["broadcast", "subscribe"]);
let label = jasmine.createSpyObj("label", [
  "checkVisibleLabel",
  "setLabelValue",
  "checkLabelOrientation",
]);

describe("Thumb", () => {
  thumb.observer = observer;
  thumb.label = label;
  it("инициализация класса Thumb", () => {
    expect(thumb).toBeDefined();

    expect(thumb.range).toBeInstanceOf(Boolean);
    expect(thumb.positionFrom).toBeInstanceOf(Number);
    expect(thumb.positionTo).toBeInstanceOf(Number);
    expect(thumb.orientation).toBeInstanceOf(String);
    expect(thumb.countThumbs).toBeInstanceOf(String);
    expect(thumb.thumb).toBeInstanceOf(HTMLElement);

    expect(thumb.config).toEqual(config);
    expect(thumb.positionFrom).toEqual(config.positionFrom);
    expect(thumb.positionTo).toEqual(config.positionTo);
    expect(thumb.orientation).toEqual(config.orientation);

    expect(thumb.countThumbs).toEqual("thumb_first");
    expect(thumb.slider).toBeInstanceOf(HTMLElement);
    expect(thumb.slider).toContainElement("div.thumb_first");
    expect(thumb.thumb).toBeInDOM();
    expect(thumb.thumb).toHaveAttr("data-num", "1");
  });

  it("проверка метода addFollower", () => {
    thumb.addFollower({});

    expect(thumb.observer.subscribe).toHaveBeenCalled();
  });
  it("проверка метода checkLabel", () => {
    thumb.checkLabel(true);

    expect(thumb.label.checkVisibleLabel).toHaveBeenCalled();
  });
  it("проверка метода checkRange", () => {
    thumb.checkRange(false);

    expect(thumb.range).toEqual(false);
  });
  it("проверка метода setLabelValue", () => {
    thumb.setLabelValue(8);

    expect(thumb.label.setLabelValue).toHaveBeenCalled();
  });
  it("проверка метода removeThis", () => {
    thumb.removeThis();

    expect(thumb.slider).not.toContainElement("div.thumb_first");
    expect(thumb.thumb).not.toBeInDOM();
  });
  it("проверка метода addThis", () => {
    thumb.addThis();

    expect(thumb.slider).toContainElement("div.thumb_first");
    expect(thumb.thumb).toBeInDOM();
  });
  describe("проверка метода setPosition", () => {
    it("orientation = horisontal", () => {
      thumb.orientation = "horisontal";
      thumb.setPosition(8);

      expect(thumb.thumb).toHaveCss({ left: "8px" });
    });
    it("orientation = vertical", () => {
      thumb.orientation = "vertical";
      thumb.setPosition(8);

      expect(thumb.thumb).toHaveCss({ top: "8px" });
    });
    it("orientation = horisontal", () => {
      thumb.orientation = "horisontal";
      thumb.setPosition();

      expect(thumb.thumb).toHaveCss({ left: "0px" });
    });
    it("orientation = vertical", () => {
      thumb.orientation = "vertical";
      thumb.setPosition();

      expect(thumb.thumb).toHaveCss({ top: "0px" });
    });
  });
  describe("проверка метода checkOrientation", () => {
    it("orientation = vertical", () => {
      thumb.checkOrientation("vertical");

      expect(thumb.orientation).toEqual("vertical");
      expect(thumb.label.checkLabelOrientation).toHaveBeenCalled();
      expect(thumb.thumb).toHaveCss({ left: "-5px" });
      expect(thumb.thumb).toHaveClass("thumb_vertical");
    });
    it("orientation = horisontal", () => {
      thumb.checkOrientation("horisontal");

      expect(thumb.orientation).toEqual("horisontal");
      expect(thumb.label.checkLabelOrientation).toHaveBeenCalled();
      expect(thumb.thumb).toHaveCss({ top: "-5px" });
      expect(thumb.thumb).not.toHaveClass("thumb_vertical");
    });
  });

  it("проверка метода moveThumb", () => {
    spyOn(thumb, "mouseDown");
    const mousedown = new MouseEvent("mousedown", { bubbles: true });

    thumb.moveThumb(thumb.thumb);
    thumb.thumb.dispatchEvent(mousedown);
    expect(thumb.mouseDown).toHaveBeenCalled();
  });

  it("проверка метода mouseDown", () => {
    spyOn(thumb, "onMouseMove");
    spyOn(thumb, "onMouseUp");
    spyOn(thumb, "findPosition");
    const mousedown = new MouseEvent("mousedown", { bubbles: true });
    const mousemove = new MouseEvent("mousemove", { bubbles: true });
    const mouseup = new MouseEvent("mouseup", { bubbles: true });

    thumb.mouseDown(mousedown);
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);
    expect(thumb.onMouseMove).toHaveBeenCalled();
    expect(thumb.onMouseUp).toHaveBeenCalled();
    expect(thumb.zIndex).toEqual(2);
    expect(thumb.thumb).toHaveCss({ "z-index": "2" });
    expect(thumb.observer.broadcast).toHaveBeenCalled();
    expect(thumb.findPosition).toHaveBeenCalled();
  });

  it("проверка метода onMouseMove", () => {
    spyOn(thumb, "moveHandle");
    const mousemove = new MouseEvent("mousemove", { bubbles: true });
    thumb.onMouseMove(mousemove);

    expect(thumb.moveHandle).toHaveBeenCalled();
  });
  it("проверка метода moveHandle", () => {
    spyOn(thumb, "findPosition");
    const mousemove = new MouseEvent("mousemove", { bubbles: true });
    thumb.moveHandle(mousemove);

    expect(thumb.observer.broadcast).toHaveBeenCalled();
    expect(thumb.findPosition).toHaveBeenCalled();
  });
  it("проверка метода onMouseUp", () => {
    spyOn(thumb, "findPosition");
    const mouseup = new MouseEvent("mouseup", { bubbles: true });
    thumb.onMouseUp(mouseup);

    expect(document.onmousemove).toBeNull();
    expect(document.onmouseup).toBeNull();
    expect(thumb.observer.broadcast).toHaveBeenCalled();
    expect(thumb.findPosition).toHaveBeenCalled();
  });

  describe("проверка метода findPosition", () => {
    const thumbTwo = $("<div>");
    thumbTwo[0].classList.add("thumb_second");
    thumbTwo[0].setAttribute("data-num", "2");
    block.append(thumbTwo);
    block[0].style.width = "400px";
    block[0].style.height = "300px";

    let event: MouseEvent;
    beforeEach(function () {
      event = new MouseEvent("mousedown", { clientX: 100, clientY: 105 });
      let thumbFirst = thumb.slider.querySelector(
        ".thumb_first"
      ) as HTMLElement;
      let thumbSecond = thumb.slider.querySelector(
        ".thumb_second"
      ) as HTMLElement;

      thumbFirst.style.left = "101px";
      thumbFirst.style.top = "58px";

      thumbSecond.style.left = "10px";
      thumbSecond.style.top = "50px";

      spyOn(thumb, "findPosition").and.callThrough();
    });
    it("orientation = horisontal, range = false", () => {
      thumb.range = false;
      thumb.orientation = "horisontal";

      let expectedValue = {
        clientX: 100,
        "slider-left-point": thumb.slider.getBoundingClientRect().left,
        "slider-width": 400,
        "data-num": "1",
      };
      thumb.findPosition(event);
      let returnedValue = thumb.findPosition(event);
      expect(returnedValue).toEqual(expectedValue);
    });
    it("orientation = horisontal, range = true, data-num = 1", () => {
      thumb.range = true;
      thumb.orientation = "horisontal";
      thumb.thumb.dataset.num = "1";

      let expectedValue = {
        clientX: 100,
        "slider-left-point": thumb.slider.getBoundingClientRect().left,
        "slider-width": 400,
        "data-num": "1",
        positionThumbSecond: 10,
      };
      thumb.findPosition(event);
      let returnedValue = thumb.findPosition(event);
      expect(returnedValue).toEqual(expectedValue);
    });
    it("orientation = horisontal, range = true, data-num = 2", () => {
      thumb.range = true;
      thumb.orientation = "horisontal";
      thumb.thumb.dataset.num = "2";

      let expectedValue = {
        clientX: 100,
        "slider-left-point": thumb.slider.getBoundingClientRect().left,
        "slider-width": 400,
        "data-num": "2",
        positionThumbFirst: 101,
      };
      thumb.findPosition(event);
      let returnedValue = thumb.findPosition(event);
      expect(returnedValue).toEqual(expectedValue);
    });
    it("orientation = vertical, range = false", () => {
      thumb.range = false;
      thumb.orientation = "vertical";
      thumb.thumb.dataset.num = "1";

      let expectedValue = {
        clientY: 105,
        "slider-top-point": thumb.slider.getBoundingClientRect().top,
        "slider-height": thumb.slider.offsetHeight,
        "data-num": "1",
      };
      thumb.findPosition(event);
      let returnedValue = thumb.findPosition(event);
      expect(returnedValue).toEqual(expectedValue);
    });
    it("orientation = vertical, range = true, data-num = 1", () => {
      thumb.range = true;
      thumb.orientation = "vertical";
      thumb.thumb.dataset.num = "1";

      let expectedValue = {
        clientY: 105,
        "slider-top-point": thumb.slider.getBoundingClientRect().top,
        "slider-height": thumb.slider.offsetHeight,
        "data-num": "1",
        positionThumbSecond: 50,
      };
      thumb.findPosition(event);
      let returnedValue = thumb.findPosition(event);
      expect(returnedValue).toEqual(expectedValue);
    });
    it("orientation = vertical, range = true, data-num = 2", () => {
      thumb.range = true;
      thumb.orientation = "vertical";
      thumb.thumb.dataset.num = "2";

      let expectedValue = {
        clientY: 105,
        "slider-top-point": thumb.slider.getBoundingClientRect().top,
        "slider-height": thumb.slider.offsetHeight,
        "data-num": "2",
        positionThumbFirst: 58,
      };
      thumb.findPosition(event);
      let returnedValue = thumb.findPosition(event);
      expect(returnedValue).toEqual(expectedValue);
    });
  });
});
