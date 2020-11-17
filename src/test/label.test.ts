import { Label } from "../slider/MVP/View/Label";

const config = {
  label: true,
  min: 5,
  max: 10,
  step: 1,
  orientation: "horisontal",
};

describe("Label", () => {
  const block = $("<div>");
  beforeEach(function () {
    block[0].classList.add("thumb");
    $(document.body).append(block);
  });
  const label: Label = new Label(config, block[0]);

  it("Инициализация класса Label", () => {
    expect(label).toBeDefined();
    expect(label.config).toEqual(config);
    expect(label.thumb).toBeInstanceOf(HTMLElement);
    expect(label.thumb).toContainElement("div.thumb__label");
    expect(label.elementLabel).toBeInDOM();
    expect(label.elementLabel).toHaveClass("thumb__label");
  });

  it("метод setLabelValue устанавливает переданное значение для innerHTML блока лейбла", () => {
    label.setLabelValue(4);
    expect(label.elementLabel).toContainText("4");
  });
  describe("метода CheckLabelOrientation", () => {
    it("при orientation = horisontal у блока удаляеся класс thumb__label_vertical", () => {
      label.config.orientation = "horisontal";
      label.changeLabelOrientation()
      expect(label.elementLabel).not.toHaveClass("thumb__label_vertical");
    });
    it("при orientation = vertical блоку устанавливается класс thumb__label_vertical", () => {
      label.config.orientation = "vertical";
      label.changeLabelOrientation()
      expect(label.elementLabel).toHaveClass("thumb__label_vertical");
    });
  });
  describe("метод checkVisibleLabel", () => {
    it("если config.label = true, то блок имеет style.display = block", () => {
      label.config.label = true;
      label.changeVisibleLabel()
      expect(label.elementLabel).toHaveCss({ display: "block" });
    });
    it("если config.label = false, то блок имеет style.display = none", () => {
      label.config.label = false;
      label.changeVisibleLabel()
      expect(label.elementLabel).toHaveCss({ display: "none" });
    });
  });
  it("метод update обновляет конфиг, вызывает ф-ции changeVisibleLabel и changeLabelOrientation", () => {
    spyOn(label, "changeLabelOrientation");
    spyOn(label, "changeVisibleLabel");
    label.update({});
    expect(label.changeLabelOrientation).toHaveBeenCalled();
    expect(label.changeVisibleLabel).toHaveBeenCalled();
  });
});
