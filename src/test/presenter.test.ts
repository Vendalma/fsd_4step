import { Model } from "../slider/MVP/Model/Model";
import { Presenter } from "../slider/MVP/Presenter/Presenter";
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
describe("Presenter", () => {
  const SpyModel = jasmine.createSpyObj("model", [
    "fundThumbPosition",
    "addFollower",
    "getConfig",
    "setOnloadData",
  ]);
  const view = jasmine.createSpyObj("view", [
    "setPositionMoveThumb",
    "addFollower",
    "setOnloadView",
    "updateConfig",
    "changeOrientation",
  ]);
  const block = $("<div>");
  beforeEach(function () {
    $(document.body).append(block);
  });
  const model: Model = new Model(config);
  const presenter: Presenter = new Presenter(model, block[0]);
  presenter.view = view;
  presenter.model = SpyModel;
  const data = { a: 1 };
  it("Инициализация Presenter", () => {
    expect(presenter).toBeDefined();
    expect(presenter.model).toEqual(SpyModel);
    expect(presenter.view).toEqual(view);
  });

  describe("Метод subscribeOnUpdate", () => {
    it("должен вызвать ф-цию addFollower в Model и View", () => {
      presenter.subscribeOnUpdate();
      expect(presenter.view.addFollower).toHaveBeenCalled();
      expect(presenter.model.addFollower).toHaveBeenCalled();
    });
  });
  describe("Метод update", () => {
    it(" type = mouseMove должно вызывать ф-ю fundThumbPosition в Model", () => {
      presenter.update("mouseMove", data);
      expect(presenter.model.fundThumbPosition).toHaveBeenCalled();
    });
    it(" type = position должно вызывать ф-ю setPositionMoveThumb в View", () => {
      presenter.update("position", data);
      expect(presenter.view.setPositionMoveThumb).toHaveBeenCalled();
    });
    it(" type = onloadPosition должно вызывать ф-ю setOnloadView в View", () => {
      presenter.update("onloadPosition", data);
      expect(presenter.view.setOnloadView).toHaveBeenCalled();
    });
    it(" type = sliderSize должно вызывать ф-ю setOnloadData в View", () => {
      presenter.update("sliderSize", data);
      expect(presenter.model.setOnloadData).toHaveBeenCalled();
    });
    it(" type = changeConfig должно вызывать ф-ю updateConfig в View", () => {
      presenter.update("changeConfig", data);
      expect(presenter.view.updateConfig).toHaveBeenCalled();
    });
    it(" type = changeOrientation должно вызывать ф-ю changeOrientation в View", () => {
      presenter.update("changeOrientation", data);
      expect(presenter.view.changeOrientation).toHaveBeenCalled();
    });
  });
});
