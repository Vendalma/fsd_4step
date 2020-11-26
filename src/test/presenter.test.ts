import Model from '../slider/MVP/Model/Model';
import Presenter from '../slider/MVP/Presenter/Presenter';

const config = {
  range: true,
  min: 0,
  max: 100,
  positionFrom: 15,
  positionTo: 30,
  label: true,
  step: 1,
  orientation: 'horizontal',
};
describe('Presenter', () => {
  const SpyModel = jasmine.createSpyObj('model', ['findMoveThumbPosition', 'addFollower', 'getConfig', 'calcParams']);
  const view = jasmine.createSpyObj('view', [
    'setPositionThumb',
    'addFollower',
    'updateConfig',
    'changeOrientationOrRange',
  ]);
  const block = $('<div>');
  beforeEach(function () {
    $(document.body).append(block);
  });
  const model: Model = new Model(config);
  const presenter: Presenter = new Presenter(model, block[0]);
  presenter.view = view;
  presenter.model = SpyModel;
  const data = { a: 1 };
  it('Инициализация Presenter', () => {
    expect(presenter).toBeDefined();
    expect(presenter.model).toEqual(SpyModel);
    expect(presenter.view).toEqual(view);
  });

  describe('Метод subscribeOnUpdate', () => {
    it('должен вызвать ф-цию addFollower в Model и View', () => {
      presenter.subscribeOnUpdate();

      expect(presenter.view.addFollower).toHaveBeenCalledWith(presenter);
      expect(presenter.model.addFollower).toHaveBeenCalledWith(presenter);
    });
  });

  describe('Метод update', () => {
    it(' type = mouseMove должно вызывать ф-ю findThumbPosition в Model', () => {
      const dataPosition = {
        clientXY: 100,
        sliderClientReact: 205,
        dataNum: '1',
        positionThumbFirst: 10,
        positionThumbSecond: 50,
      };
      presenter.update('mouseMove', dataPosition);

      expect(presenter.model.findMoveThumbPosition).toHaveBeenCalledWith(dataPosition);
    });

    it(' type = positionThumb должно вызывать ф-ю setPositionMoveThumb в View', () => {
      const newData = {
        dataFirstThumb: {
          positionFrom: 105,
          valueFrom: 10,
        },
        dataSecondThumb: {
          positionTo: 200,
          valueTo: 15,
        },
        stepData: 30.5,
      };
      presenter.update('positionThumb', newData);

      expect(presenter.view.setPositionThumb).toHaveBeenCalledWith(newData);
    });

    it(' type = sliderSize должно вызывать ф-ю setOnloadData в View', () => {
      const updateData = 300;
      presenter.update('sliderSize', updateData);

      expect(presenter.model.calcParams).toHaveBeenCalledWith(updateData);
    });

    it(' type = changeConfig должно вызывать ф-ю updateConfig в View', () => {
      const newConf = {
        min: -5,
        max: 105,
        label: false,
        orientation: 'vertical',
        positionFrom: 5,
        positionTo: 10,
        range: false,
        step: 1,
      };
      presenter.update('changeConfig', newConf);

      expect(presenter.view.updateConfig).toHaveBeenCalledWith(newConf);
    });

    it(' type = changeOrientationOrRange должно вызывать ф-ю changeOrientationOrRange в View', () => {
      const newConf = {
        min: -5,
        max: 105,
        label: false,
        orientation: 'vertical',
        positionFrom: 5,
        positionTo: 10,
        range: false,
        step: 1,
      };
      presenter.update('changeOrientationOrRange', newConf);

      expect(presenter.view.changeOrientationOrRange).toHaveBeenCalledWith(newConf);
    });
  });
});
