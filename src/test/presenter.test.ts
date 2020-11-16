import { Model } from '../slider/MVP/Model/Model';
import { Presenter } from '../slider/MVP/Presenter/Presenter';
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
interface IConfigModel {
  min: number;
  max: number;
  range: boolean;
  positionFrom: number;
  positionTo: number;
  orientation: string;
  step: number;
  label: boolean;
}
describe("Presenter", () => {
  const SpyModel = jasmine.createSpyObj("model", [
    "fundThumbPosition",
    'getStep',
    "addFollower",
    'getConfig',
    'setOnloadData',
    {
      'getConfig ': {
        range: true,
        min: 0,
        max: 100,
        positionFrom: 15,
        positionTo: 30,
        label: true,
        step: 1,
        orientation: "horisontal",
      }
    }
  ]);
  const view = jasmine.createSpyObj("view", [
    "setPositionMoveThumb",
    "addStep",
    "setOnloadThumbPosition",
    "addFollower",
    "setOnloadView",
    "changeOrientation",
  ]);
  const block = $("<div>");
  beforeEach(function () {
    $(document.body).append(block);
  });
  const model: Model = new Model(config)
  const presenter: Presenter = new Presenter(model, block[0]);
  presenter.view = view;
  presenter.model = SpyModel;
  const data = { a: 1 };
  it("Инициализация Presenter", () => {
    expect(presenter).toBeDefined();
    expect(presenter.model).toEqual(SpyModel);
    expect(presenter.view).toEqual(view);
  });

  it("Метод subscribeOnUpdate", () => {
    const spy = spyOn<any>(presenter, 'subscribeOnUpdate').and.callThrough()
    spy.call(presenter)
    expect(presenter.view.addFollower).toHaveBeenCalled();
    expect(presenter.model.addFollower).toHaveBeenCalled();
  });
  it("Метод update с mouseMove", () => {
    const spy = spyOn<any>(presenter, 'update').and.callThrough().withArgs('mouseMove', data)
    spy.call(presenter)
    //presenter.update("mouseMove", data);
    expect(presenter.model.fundThumbPosition).toHaveBeenCalled();
  });
  /*it("Метод update с position", () => {
    presenter.update("position", data);
    expect(presenter.view.setPositionMoveThumb).toHaveBeenCalled();
  });
  it("Метод update с stepData", () => {
    presenter.update("stepData", data);
    expect(presenter.view.setOnloadView).toHaveBeenCalled();
  });
  it("Метод update с loadData", () => {
    presenter.update("loadData", data);
    expect(presenter.model.getStep).toHaveBeenCalled();
  });
  it("Метод update с changeMinValue", () => {
    presenter.update("changeMinValue", data);
    expect(presenter.view.changeMin).toHaveBeenCalled();
  });
  it("Метод update с changeMaxValue", () => {
    presenter.update("changeMaxValue", data);
    expect(presenter.view.changeMax).toHaveBeenCalled();
  });
  it("Метод update с changePositionFrom", () => {
    presenter.update("changePositionFrom", data);
    expect(presenter.view.changePositionFrom).toHaveBeenCalled();
  });
  it("Метод update с changePositionTo", () => {
    presenter.update("changePositionTo", data);
    expect(presenter.view.changePositionTo).toHaveBeenCalled();
  });
  it("Метод update с changeRange", () => {
    presenter.update("changeRange", data);
    expect(presenter.view.changeRange).toHaveBeenCalled();
  });
  it("Метод update с changeOrientation", () => {
    presenter.update("changeOrientation", data);
    expect(presenter.view.changeOrientation).toHaveBeenCalled();
  });
  it("Метод update с changeLabel", () => {
    presenter.update("changeLabel", data);
    expect(presenter.view.changeLabel).toHaveBeenCalled();
  });*/
});
