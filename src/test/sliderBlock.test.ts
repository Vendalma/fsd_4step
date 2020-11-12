import { SliderBlock } from "../slider/MVP/View/sliderBlock";
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
const secondThumb = $("<div>");
beforeEach(function () {
  secondThumb[0].classList.add('thumb_second')
  block.append(secondThumb)
  block[0].classList.add("slider__container");
  $(document.body).append(block);
});
const sliderBlock: SliderBlock = new SliderBlock(config, block[0]);
const observer = jasmine.createSpyObj("observer", ["subscribe", "broadcast"]);
const progressBar = jasmine.createSpyObj("progressBar", [
  "setOnloadProgressBarPosition",
  "setPositionForThumbOne",
  'setPositionForThumbTwo',
  'updateBarConfig'
]);
const step = jasmine.createSpyObj("step", [
  'updateConfigStep',
  "addStepLine"
]);
const thumbOne = jasmine.createSpyObj("thumbOne", [
  "addFollower",
  "setPosition",
  "setLabelValue",
  'updateConfigThumb',
  'onMouseUp'
]);
const thumbTwo = jasmine.createSpyObj("thumbTwo", [
  "addFollower",
  "setPosition",
  "setLabelValue",
  "addThis",
  "removeThis",
  'updateConfigThumb',
  'onMouseUp'
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
  it("Проверка метода addFollower", () => {
    sliderBlock.addFollower({});
    expect(sliderBlock.observer.subscribe).toHaveBeenCalled();
  });
  it("Проверка метода addStep", () => {
    sliderBlock.addStep({});
    expect(sliderBlock.step.addStepLine).toHaveBeenCalled();
  });
  it("Проверка метода updateConfig", () => {
    const spyForOrientation = spyOn<any>(sliderBlock, 'changeOrientation')
    const spyForRange = spyOn<any>(sliderBlock, 'changeRange')
    sliderBlock.updateConfig({});
    expect(spyForRange).toHaveBeenCalled()
    expect(spyForOrientation).toHaveBeenCalled()
    expect(step.updateConfigStep).toHaveBeenCalled();
    expect(thumbOne.updateConfigThumb).toHaveBeenCalled()
    expect(thumbTwo?.updateConfigThumb).toHaveBeenCalled()
    expect(progressBar.updateBarConfig).toHaveBeenCalled()
  });

  describe("Проверка метода changeRange", () => {
    let secondThumb;
    beforeEach(function () {
      secondThumb = sliderBlock.sliderBlock.querySelector(
        ".thumb_second"
      ) as HTMLElement;
    })
    it("secondThumb = null", () => {
      secondThumb = null;
      let spyForSetThumb = spyOn<any>(sliderBlock, 'setThumbTwo')
      let spy = spyOn<any>(sliderBlock, 'changeRange').and.callThrough();
      spy.call(sliderBlock)
      expect(spyForSetThumb).toHaveBeenCalled()
    });
    it("range = true", () => {
      sliderBlock.config.range = true;
      let spy = spyOn<any>(sliderBlock, 'changeRange').and.callThrough();
      spy.call(sliderBlock)
      expect(sliderBlock.thumbTwo?.addThis).toHaveBeenCalled()
    });
  });
  describe("Проверка метода changeOrientation", () => {
    it("orientation = vertical", () => {
      sliderBlock.config.orientation = 'vertical';
      const spyForOrientation = spyOn<any>(sliderBlock, 'changeOrientation').and.callThrough()
      spyForOrientation.call(sliderBlock)
      expect(sliderBlock.sliderBlock).toHaveClass("slider__block_vertical");
    });
    it("orientation = horisontal", () => {
      sliderBlock.config.orientation = 'horisontal';
      const spyForOrientation = spyOn<any>(sliderBlock, 'changeOrientation').and.callThrough()
      spyForOrientation.call(sliderBlock)
      expect(sliderBlock.sliderBlock).not.toHaveClass("slider__block_vertical");
    });
  });
  describe("Проверка метода setOnloadThumbPosition", () => {
    let data: any;
    beforeEach(function () {
      data = {
        thumbData: {
          onloadPositionThumbOne: 50,
          onloadPositionThumbTwo: 245,
        }
      };
    });
    it("range = false", () => {
      sliderBlock.config.range = false;
      sliderBlock.setOnloadThumbPosition(data);
      expect(sliderBlock.thumbOne.setPosition).toHaveBeenCalled();
      expect(sliderBlock.thumbOne.setLabelValue).toHaveBeenCalled();
      expect(
        sliderBlock.progressBar.setOnloadProgressBarPosition
      ).toHaveBeenCalled();
    });
    it("range = true", () => {
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
  describe("Проверка метода setPositionMoveThumb", () => {
    let data: any;
    beforeEach(function () {
      data = {
        data_num: '1',
      };
    });

    it(" data_num = 1", () => {
      sliderBlock.setPositionMoveThumb(data);
      expect(sliderBlock.thumbOne.setPosition).toHaveBeenCalled();
      expect(sliderBlock.thumbOne.setLabelValue).toHaveBeenCalled();
      expect(
        sliderBlock.progressBar.setPositionForThumbOne
      ).toHaveBeenCalled();
    });
    it(" data_num = 2", () => {
      data['data_num'] = '2'
      sliderBlock.setPositionMoveThumb(data);
      expect(sliderBlock.thumbTwo?.setPosition).toHaveBeenCalled();
      expect(sliderBlock.thumbTwo?.setLabelValue).toHaveBeenCalled();
      expect(
        sliderBlock.progressBar.setPositionForThumbTwo
      ).toHaveBeenCalled();
    });
  });
  it('Проверка метода subscribeOnUpdate', () => {
    const spy = spyOn<any>(sliderBlock, 'subscribeOnUpdate').and.callThrough();
    spy.call(sliderBlock)
    expect(sliderBlock.thumbOne.addFollower).toHaveBeenCalled()
    expect(sliderBlock.thumbTwo?.addFollower).toHaveBeenCalled()
  })
  describe('Проверка метода setThumbTwo', () => {
    it('range = false', () => {
      sliderBlock.config.range = false
      const spy = spyOn<any>(sliderBlock, 'setThumbTwo').and.callThrough();
      spy.call(sliderBlock)
      expect(sliderBlock.thumbTwo?.removeThis).toHaveBeenCalled()
    })
  })

  it('Проверка метода update', () => {
    const spy = spyOn<any>(sliderBlock, 'update').and.callThrough();
    spy.call(sliderBlock)
    expect(sliderBlock.observer.broadcast).toHaveBeenCalled()
  })
  describe('Проверка метода sliderClick', () => {
    let event: MouseEvent
    beforeEach(function () {
      event = new MouseEvent('click', { bubbles: true })
    })
    describe('orientation = horisontal', () => {
      beforeAll(function () {
        sliderBlock.config.orientation = 'horisontal'
        sliderBlock.thumbOne.thumb = sliderBlock.sliderBlock.querySelector('.thumb_first') as HTMLElement
        if (sliderBlock.thumbTwo)
          sliderBlock.thumbTwo.thumb = sliderBlock.sliderBlock.querySelector('.thumb_second') as HTMLElement
      })
      it('range = false', () => {
        sliderBlock.config.range = false
        sliderBlock.sliderBlock.dispatchEvent(event)
        expect(sliderBlock.thumbOne.onMouseUp).toHaveBeenCalled()
      })
      it('range = true thumbFirst < thumbSecond', () => {
        sliderBlock.config.range = true
        let thumbFirst = 40;
        let thumbSecond = 100
        sliderBlock.sliderBlock.dispatchEvent(event)
        expect(sliderBlock.thumbOne.onMouseUp).toHaveBeenCalled()
      })
      it('range = true thumbFirst > thumbSecond', () => {
        sliderBlock.config.range = true
        let thumbFirst = 100;
        let thumbSecond = 30
        sliderBlock.sliderBlock.dispatchEvent(event)
        console.log(thumbFirst, thumbSecond)
        expect(sliderBlock.thumbTwo?.onMouseUp).toHaveBeenCalled()
      })

    })
    describe('orientation = vertical', () => {
      beforeAll(function () {
        sliderBlock.config.orientation = 'vertical'
        sliderBlock.thumbOne.thumb = sliderBlock.sliderBlock.querySelector('.thumb_first') as HTMLElement
        if (sliderBlock.thumbTwo)
          sliderBlock.thumbTwo.thumb = sliderBlock.sliderBlock.querySelector('.thumb_second') as HTMLElement
      })
      it('range = false', () => {
        sliderBlock.config.range = false
        sliderBlock.sliderBlock.dispatchEvent(event)
        expect(sliderBlock.thumbOne.onMouseUp).toHaveBeenCalled()
      })
      it('range = true thumbFirst < thumbSecond', () => {
        sliderBlock.config.range = true
        let thumbFirst = 40;
        let thumbSecond = 100
        sliderBlock.sliderBlock.dispatchEvent(event)
        expect(sliderBlock.thumbOne.onMouseUp).toHaveBeenCalled()
      })
      it('range = true thumbFirst > thumbSecond', () => {
        sliderBlock.config.range = true
        let thumbFirst = 100;
        let thumbSecond = 30
        sliderBlock.sliderBlock.dispatchEvent(event)
        console.log(thumbFirst, thumbSecond)
        expect(sliderBlock.thumbTwo?.onMouseUp).toHaveBeenCalled()
      })
    })

  })

});

