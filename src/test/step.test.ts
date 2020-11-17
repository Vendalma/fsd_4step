import { Step } from "../slider/MVP/View/Step";
const config = {
  min: 0,
  max: 100,
  step: 1,
  orientation: "horisontal",
};
const container = $("<div>");
const blockMin = $("<div>");
const blockMax = $("<div>");
beforeEach(function () {
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
    step.changeMinValue()
    expect(blockMin[0]).toBeInDOM();
    expect(blockMin).toContainText("4");
  });
  it("метод changeMaxValue изменяет innerHTML блока max", () => {
    step.config.max = 104;
    step.changeMaxValue()
    expect(blockMax[0]).toBeInDOM();
    expect(blockMax).toContainText("104");
  });
  describe("метода addStepLine добавляет шкалу значений", () => {
    let data: any;
    let stepCount: number;
    let stepSize: number;

    beforeAll(function () {
      data = {
        stepSize: 14,
      };
      stepCount = data["stepCount"];
      stepSize = data["stepSize"];
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
    it("orientation = horisontal", () => {
      step.config.orientation = "horisontal";
      step.addStepLine(data);
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
      step.addStepLine(data);
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
  it('метод deleteElements удаляет все эл-ты с классом slider__step-block', () => {
    step.deleteElements()
    expect(step.container).not.toContainElement('div.slider__step-block')
  })
  it("метод updateConfigStep обновляет конфиг и вызывает ф-ции changeMinValue и changeMaxValue", () => {
    spyOn(step, "changeMinValue");
    spyOn(step, "changeMaxValue");
    step.updateConfigStep({});
    expect(step.changeMinValue).toHaveBeenCalled();
    expect(step.changeMaxValue).toHaveBeenCalled();
  });
});
