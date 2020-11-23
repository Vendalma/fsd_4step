import { Step } from "../slider/MVP/View/Step";
const config = {
  min: 0,
  max: 100,
  step: 1,
  orientation: "horizontal",
};
const container = $("<div>");
const thumb = $("<div>");
const blockMin = $("<div>");
const blockMax = $("<div>");
beforeEach(function () {
  thumb[0].classList.add("thumb_first");
  container.append(thumb);
  blockMin[0].classList.add("slider__step-block_min");
  blockMin[0].classList.add("slider__step-block");
  blockMin[0].innerHTML = step.config.min + "";
  blockMax[0].classList.add("slider__step-block_max");
  blockMax[0].classList.add("slider__step-block");
  blockMax[0].innerHTML = step.config.max + "";
  container.append(blockMin);
  container.append(blockMax);
  $(document.body).append(container);
});

let step: Step = new Step(config, container[0]);

describe("Step", () => {
  it("инициализация класса Step", () => {
    expect(step).toBeDefined();
    expect(step.config).toEqual(config);
    expect(step.container).toBeInstanceOf(HTMLElement);
  });
  it("метода changeMinValue изменяет innerHTML блока min", () => {
    step.config.min = 104;
    step.changeMinValue();
    expect(blockMin[0]).toBeInDOM();
    expect(blockMin).toContainText("4");
  });
  it("метод changeMaxValue изменяет innerHTML блока max", () => {
    step.config.max = 104;
    step.changeMaxValue();
    expect(blockMax[0]).toBeInDOM();
    expect(blockMax).toContainText("104");
  });
  describe("метода addStepLine добавляет шкалу значений", () => {
    let data: any;
    let stepSize: number;

    beforeAll(function () {
      data = {
        stepData: 30.5,
      };
      stepSize = data.stepData;
      step.config.min = 7;
      step.config.max = 11;
    });
    beforeEach(function () {
      let blocks = step.container.querySelectorAll(
        ".slider__step-block"
      ) as NodeListOf<HTMLElement>;
      blocks.forEach((elem) => {
        step.container.removeChild(elem);
      });
    });
    it("orientation = horizontal", () => {
      step.config.orientation = "horizontal";
      step.addStepLine(data.stepData);
      let stepBlocks = step.container.querySelectorAll(".slider__step-block");

      expect(stepBlocks.length).toEqual(21);
      for (let i = 0; i < stepBlocks.length; i++) {
        expect(stepBlocks[i]).not.toHaveClass("slider__step-block_vertical");
        if (i == 0) {
          expect(stepBlocks[i].innerHTML).toEqual("7");
          expect(stepBlocks[i]).toHaveClass("slider__step-block_min");
        }
        if (i == stepBlocks.length) {
          expect(stepBlocks[i].innerHTML).toEqual("11");
          expect(stepBlocks[i]).toHaveClass("slider__step-block_max");
        }
      }
    });
    it("orientation = vertical", () => {
      step.config.orientation = "vertical";
      step.addStepLine(data.stepData);
      let stepBlocks = step.container.querySelectorAll(
        ".slider__step-block"
      ) as NodeListOf<HTMLElement>;

      expect(stepBlocks.length).toEqual(21);
      for (let i = 0; i < stepBlocks.length; i++) {
        expect(stepBlocks[i]).toHaveClass("slider__step-block_vertical");
        if (i == 0) {
          expect(stepBlocks[i].innerHTML).toEqual("7");
          expect(stepBlocks[i]).toHaveClass("slider__step-block_min");
        }
        if (i == stepBlocks.length) {
          expect(stepBlocks[i].innerHTML).toEqual("11");
          expect(stepBlocks[i]).toHaveClass("slider__step-block_max");
        }
      }
    });
  });
  it("метод deleteStep удаляет все эл-ты с классом slider__step-block", () => {
    step.deleteStep();
    expect(step.container).not.toContainElement("div.slider__step-block");
  });
  it("метод updateConfigStep обновляет конфиг и вызывает ф-ции changeMinValue и changeMaxValue", () => {
    const newConf = {
      min: 0,
      max: 10,
      orientation: "vertical",
    };
    spyOn(step, "changeMinValue");
    spyOn(step, "changeMaxValue");
    step.updateConfigStep(newConf);
    expect(step.changeMinValue).toHaveBeenCalled();
    expect(step.changeMaxValue).toHaveBeenCalled();
  });
});
