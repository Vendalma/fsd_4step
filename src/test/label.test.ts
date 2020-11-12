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

  it("Тестирование метода setLabelValue", () => {
    label.setLabelValue(4);
    expect(label.elementLabel).toContainText("4");
  });
  describe("Тестирование метода CheckLabelOrientation", () => {
    it("orientation = horisontal", () => {
      label.config.orientation = "horisontal";
      let spyChangeOrientation = spyOn<any>(
        label,
        "changeLabelOrientation"
      ).and.callThrough();
      spyChangeOrientation.call(label);
      expect(label.elementLabel).not.toHaveClass("thumb__label_vertical");
    });
    it("orientation = vertical", () => {
      label.config.orientation = "vertical";
      let spyChangeOrientation = spyOn<any>(
        label,
        "changeLabelOrientation"
      ).and.callThrough();
      spyChangeOrientation.call(label);
      expect(label.elementLabel).toHaveClass("thumb__label_vertical");
    });
  });
  describe("Tестирование метода checkVisibleLabel", () => {
    it("config.label = true", () => {
      label.config.label = true;
      let spyChangeVisible = spyOn<any>(
        label,
        "changeVisibleLabel"
      ).and.callThrough();
      spyChangeVisible.call(label);
      expect(label.elementLabel).toHaveCss({ display: "block" });
    });
    it("config.label = false", () => {
      label.config.label = false;
      let spyChangeVisible = spyOn<any>(
        label,
        "changeVisibleLabel"
      ).and.callThrough();
      spyChangeVisible.call(label);
      expect(label.elementLabel).toHaveCss({ display: "none" });
    });
  });
  it("Проверка метода update", () => {
    const spyChangeOrientation = spyOn<any>(label, "changeLabelOrientation");
    const spyChangeVisible = spyOn<any>(label, "changeVisibleLabel");
    label.update({});
    expect(spyChangeOrientation).toHaveBeenCalled();
    expect(spyChangeVisible).toHaveBeenCalled();
  });
});
