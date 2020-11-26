import Model from '../slider/MVP/Model/Model';

interface IDataThumbMove {
  clientXY: number;
  sliderClientReact: number;
  dataNum: string;
  positionThumbFirst: number;
  positionThumbSecond: number;
}
const config = {
  range: true,
  min: 0,
  max: 100,
  positionFrom: 15,
  positionTo: 50,
  step: 1,
  orientation: 'horizontal',
  label: true,
};

describe('Model', () => {
  const model: Model = new Model(config);
  const observer = jasmine.createSpyObj('observer', ['broadcast', 'subscribe']);
  const validator = jasmine.createSpyObj('validator', { validationConfig: true });
  model.observer = observer;
  model.validator = validator;
  beforeEach(function () {
    model.config = {
      range: true,
      min: 0,
      max: 100,
      positionFrom: 15,
      positionTo: 50,
      step: 1,
      orientation: 'horizontal',
      label: true,
    };
  });

  it('Инициализация класса Model', () => {
    expect(model).toBeDefined();
    expect(model.observer).toEqual(observer);
    expect(model.validator).toEqual(validator);
    expect(model.config).toEqual(config);
  });

  it('метод addFollower вызывает ф-ю subscribe в кассе Observer', () => {
    model.addFollower({});

    expect(model.observer.subscribe).toHaveBeenCalledWith({});
  });

  describe('метод updateConfig обновляет конфиг модели', () => {
    it('если в принимаемом объекте key = orientation, то вызывается ф-я calcPositionTo и broadcast класса Observer', () => {
      const data = {
        orientation: 'vertical',
      };
      spyOn(model, 'calcPositionTo');
      model.updateConfig(data);

      expect(model.calcPositionTo).toHaveBeenCalledWith();
      expect(model.observer.broadcast).toHaveBeenCalledWith('changeOrientationOrRange', model.config);
    });

    it('если в принимаемом объекте key = range, то вызывается ф-я calcPositionTo и broadcast класса Observer', () => {
      const data = {
        range: false,
      };

      spyOn(model, 'calcPositionTo');
      model.updateConfig(data);

      expect(model.calcPositionTo).toHaveBeenCalledWith();
      expect(model.observer.broadcast).toHaveBeenCalledWith('changeOrientationOrRange', model.config);
    });

    it('если в принимаемом объекте key = min, то вызываются ф-ции calcPositionFrom, calcPositionTo, calcParams и broadcast класса Observer', () => {
      const data = {
        min: -100,
      };
      spyOn(model, 'calcPositionFrom');
      spyOn(model, 'calcPositionTo');
      spyOn(model, 'calcParams');
      model.updateConfig(data);

      expect(model.calcPositionTo).toHaveBeenCalledWith();
      expect(model.calcPositionFrom).toHaveBeenCalledWith();
      expect(model.calcParams).toHaveBeenCalledWith(model.sliderSize);
      expect(model.observer.broadcast).toHaveBeenCalledWith('changeConfig', model.config);
    });

    it('если в принимаемом объекте key = max, то вызываются ф-ции calcPositionFrom, calcPositionTo, calcParams и broadcast класса Observer', () => {
      const data = {
        max: 1000,
      };
      spyOn(model, 'calcPositionFrom');
      spyOn(model, 'calcPositionTo');
      spyOn(model, 'calcParams');
      model.updateConfig(data);

      expect(model.calcPositionTo).toHaveBeenCalledWith();
      expect(model.calcPositionFrom).toHaveBeenCalledWith();
      expect(model.calcParams).toHaveBeenCalledWith(model.sliderSize);
      expect(model.observer.broadcast).toHaveBeenCalledWith('changeConfig', model.config);
    });

    it('если в принимаемом объекте key = positionFrom, то то вызываются ф-ции calcPositionFrom, calcPositionTo, calcParams и broadcast класса Observer', () => {
      const data = {
        positionFrom: 45,
      };
      spyOn(model, 'calcPositionFrom');
      spyOn(model, 'calcPositionTo');
      spyOn(model, 'calcParams');
      model.updateConfig(data);

      expect(model.calcPositionTo).toHaveBeenCalledWith();
      expect(model.calcPositionFrom).toHaveBeenCalledWith();
      expect(model.calcParams).toHaveBeenCalledWith(model.sliderSize);
      expect(model.observer.broadcast).toHaveBeenCalledWith('changeConfig', model.config);
    });

    it('если в принимаемом объекте key = positionTo, то вызываются ф-ции calcPositionFrom, calcPositionTo, calcParams и broadcast класса Observer', () => {
      const data = {
        positionTo: 50,
      };
      spyOn(model, 'calcPositionFrom');
      spyOn(model, 'calcPositionTo');
      spyOn(model, 'calcParams');
      model.updateConfig(data);

      expect(model.calcPositionTo).toHaveBeenCalledWith();
      expect(model.calcPositionFrom).toHaveBeenCalledWith();
      expect(model.calcParams).toHaveBeenCalledWith(model.sliderSize);
      expect(model.observer.broadcast).toHaveBeenCalledWith('changeConfig', model.config);
    });

    it('если в принимаемом объекте key = label, то вызываются ф-ция  broadcast класса Observer', () => {
      const data = {
        label: false,
      };
      model.updateConfig(data);

      expect(model.observer.broadcast).toHaveBeenCalledWith('changeConfig', model.config);
    });
  });

  it('метод getConfig,валидирует конфиг модели и возвращает его', () => {
    const expectConfig = {
      range: true,
      min: 0,
      max: 100,
      positionFrom: 15,
      positionTo: 50,
      step: 1,
      orientation: 'horizontal',
      label: true,
    };
    const result = model.getConfig();

    expect(model.validator.validationConfig).toHaveBeenCalledWith(model.config);
    expect(result).toEqual(expectConfig);
  });

  describe('проверка метода findMoveThumbPosition', () => {
    let data: IDataThumbMove;
    beforeEach(function () {
      data = {
        clientXY: 100,
        sliderClientReact: 5,
        dataNum: '1',
        positionThumbFirst: 10,
        positionThumbSecond: 21,
      };
    });

    describe('dataNum = 1, range = false', () => {
      beforeEach(function () {
        data.dataNum = '1';
        model.config.range = false;
      });

      it('при position < 0, вызывается ф-я broadcast класса Observer', () => {
        data.sliderClientReact = 110;
        model.findMoveThumbPosition(data);

        expect(model.observer.broadcast).toHaveBeenCalledWith('positionThumb', {
          dataFirstThumb: {
            positionFrom: 0,
            valueFrom: model.config.min,
          },
        });
      });

      it('при position > sliderSize, вызывается ф-я broadcast класса Observer', () => {
        data.clientXY = 410;
        model.sliderSize = 300;
        model.findMoveThumbPosition(data);

        expect(model.observer.broadcast).toHaveBeenCalledWith('positionThumb', {
          dataFirstThumb: {
            positionFrom: 300,
            valueFrom: model.config.max,
          },
        });
      });

      it('при position, вызывается ф-я broadcast класса Observer', () => {
        model.findMoveThumbPosition(data);

        expect(model.observer.broadcast).toHaveBeenCalledWith('positionThumb', {
          dataFirstThumb: {
            positionFrom: 96,
            valueFrom: 32,
          },
        });
      });
    });

    describe('dataNum = 1, range = true', () => {
      beforeEach(function () {
        data.dataNum = '1';
        model.config.range = true;
      });

      it('если position < 0, вызывается метод broadcast класса Observer', () => {
        data.sliderClientReact = 110;
        model.findMoveThumbPosition(data);

        expect(model.observer.broadcast).toHaveBeenCalledWith('positionThumb', {
          dataFirstThumb: {
            positionFrom: 0,
            valueFrom: model.config.min,
          },
        });
      });

      it('при position > secondThumbPosition, вызывается ф-я broadcast класса Observer', () => {
        data.clientXY = 410;
        model.findMoveThumbPosition(data);

        expect(model.observer.broadcast).toHaveBeenCalledWith('positionThumb', {
          dataFirstThumb: {
            positionFrom: 21,
            valueFrom: 7,
          },
        });
      });

      it('при position, вызывается метод broadcast класса Observer', () => {
        model.findMoveThumbPosition(data);

        expect(model.observer.broadcast).toHaveBeenCalledWith('positionThumb', {
          dataFirstThumb: {
            positionFrom: 96,
            valueFrom: 32,
          },
        });
      });
    });

    describe('dataNum = 2, range = true', () => {
      beforeEach(function () {
        data.dataNum = '2';
        model.config.range = true;
      });

      it('при position < firstThumbPosition, вызывается ф-я broadcast класса Observer', () => {
        data.sliderClientReact = 110;
        model.findMoveThumbPosition(data);

        expect(model.observer.broadcast).toHaveBeenCalledWith('positionThumb', {
          dataSecondThumb: {
            positionTo: 10,
            valueTo: 3,
          },
        });
      });

      it('если position > sliderSize, вызывается метод broadcast класса Observer', () => {
        data.clientXY = 410;
        model.sliderSize = 300;
        model.findMoveThumbPosition(data);

        expect(model.observer.broadcast).toHaveBeenCalledWith('positionThumb', {
          dataSecondThumb: {
            positionTo: model.sliderSize,
            valueTo: model.config.max,
          },
        });
      });

      it('если position, вызывается ф-я broadcast класса Observer', () => {
        model.findMoveThumbPosition(data);

        expect(model.observer.broadcast).toHaveBeenCalledWith('positionThumb', {
          dataSecondThumb: {
            positionTo: 96,
            valueTo: 32,
          },
        });
      });
    });
  });

  it('метод calcParams принимает размер слайдера и вызывает ф-ю broadcast класса Observer', () => {
    model.calcParams(150);

    expect(model.sliderSize).toEqual(150);
    expect(model.observer.broadcast).toHaveBeenCalledWith('positionThumb', {
      dataFirstThumb: {
        positionFrom: 22.5,
        valueFrom: model.config.positionFrom,
      },
      dataSecondThumb: {
        positionTo: 75,
        valueTo: model.config.positionTo,
      },
      stepData: 7.5,
    });
  });

  describe('метод calcPositionFrom', () => {
    it('positionFrom < min', () => {
      model.config.positionFrom = -5;
      model.config.min = 0;
      model.calcPositionFrom();

      expect(model.config.positionFrom).toEqual(model.config.min);
    });

    it('range = false ,positionFrom > max', () => {
      model.config.range = false;
      model.config.positionFrom = 40;
      model.config.max = 30;
      model.calcPositionFrom();

      expect(model.config.positionFrom).toEqual(model.config.max);
    });

    it('range = true ,positionFrom > max', () => {
      model.config.range = true;
      model.config.positionFrom = 40;
      model.config.max = 30;
      model.calcPositionFrom();

      expect(model.config.positionFrom).toEqual(model.config.min);
    });
  });

  describe('метод calcPositionTo', () => {
    it('range = true, positionTo <= positionFrom && max - min > step', () => {
      spyOn(model, 'calcPositionFrom');
      model.config.positionFrom = 30;
      model.config.positionTo = 25;
      model.config.step = 1;
      model.calcPositionTo();

      expect(model.config.positionTo).toEqual(30);
      expect(model.config.positionFrom).toEqual(29);
      expect(model.calcPositionFrom).toHaveBeenCalledWith();
    });

    it('range = true, positionTo <= positionFrom && max - min <= step', () => {
      spyOn(model, 'calcPositionFrom');
      model.config.positionFrom = 30;
      model.config.positionTo = 25;
      model.config.step = 1000;
      model.calcPositionTo();

      expect(model.config.positionTo).toEqual(model.config.max);
    });

    it('range = true, positionTo < max', () => {
      model.config.positionTo = 30;
      model.config.max = 29;
      model.calcPositionTo();

      expect(model.config.positionTo).toEqual(model.config.max);
    });
  });

  it('метод calcPixelSize возвращает кол-во пикселей для одного шага', () => {
    model.config.max = 10;
    model.config.min = 0;
    model.sliderSize = 40;
    const expectResult = (model.config.max - model.config.min) / model.sliderSize;

    expect(model.calcPixelSize()).toEqual(expectResult);
  });

  it('метод calcStepData возвращает размер шага', () => {
    model.sliderSize = 40;
    const expectResult = model.sliderSize / 20;

    expect(model.calcStepData()).toEqual(expectResult);
  });

  it('метод calcOnloadFirstThumbPosition возвращает объект с начальной позицией первого бегунка', () => {
    model.config.positionFrom = 15;
    model.config.min = 0;
    model.sliderSize = 400;
    const sizePixel = spyOn(model, 'calcPixelSize').and.returnValue(0.25);

    expect(model.calcOnloadFirstThumbPosition()).toEqual(60);
  });

  it('метод calcOnloadSecondThumbPosition возвращает объект с начальной позицией второго бегунка', () => {
    model.config.positionTo = 50;
    model.config.min = 0;
    model.sliderSize = 400;
    const sizePixel = spyOn(model, 'calcPixelSize').and.returnValue(0.25);

    expect(model.calcOnloadSecondThumbPosition()).toEqual(200);
  });

  it('метод calcValue возвращает число', () => {
    model.config.min = 0;
    model.config.step = 4;
    const sizePixel = spyOn(model, 'calcPixelSize').and.returnValue(0.25);
    const expectedResult = Math.round((400 * 0.25 + model.config.min) / model.config.step) * model.config.step;

    expect(model.calcValue(400)).toEqual(expectedResult);
  });

  describe('метод isIntegerStep', () => {
    it('возвращает true, если step целое число', () => {
      model.config.step = 5;

      expect(model.isIntegerStep()).toBeTrue();
    });

    it('возвращает false, если step не целое число', () => {
      model.config.step = 0.5;

      expect(model.isIntegerStep()).toBeFalse();
    });
  });

  describe('метод checkValueWithMin', () => {
    it('возвращает value, если value > min', () => {
      model.config.min = 0;

      expect(model.checkValueWithMin(5)).toEqual(5);
    });

    it('возвращает value, если value = min', () => {
      model.config.min = 0;

      expect(model.checkValueWithMin(0)).toEqual(0);
    });

    it('возвращает min, если value < min', () => {
      model.config.min = 0;

      expect(model.checkValueWithMin(-55)).toEqual(0);
    });
  });

  describe('метод checkValueWithMax', () => {
    it('возвращает value, если value < max', () => {
      model.config.max = 100;

      expect(model.checkValueWithMax(5)).toEqual(5);
    });

    it('возвращает value, если value = max', () => {
      model.config.max = 100;

      expect(model.checkValueWithMax(100)).toEqual(100);
    });

    it('возвращает max, если value > max', () => {
      model.config.max = 100;

      expect(model.checkValueWithMax(500)).toEqual(100);
    });
  });

  describe('метод checkValueWithSliderSize', () => {
    it('возвращает value, если value < sliderSize', () => {
      model.sliderSize = 400;

      expect(model.checkValueWithSliderSize(5)).toEqual(5);
    });

    it('возвращает value, если value = sliderSize', () => {
      model.sliderSize = 400;

      expect(model.checkValueWithSliderSize(400)).toEqual(400);
    });

    it('возвращает sliderSize, если value > sliderSize', () => {
      model.sliderSize = 400;

      expect(model.checkValueWithSliderSize(500)).toEqual(400);
    });
  });
});
