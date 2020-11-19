import { Model } from "../slider/MVP/Model/Model";
const config = {
  range: true,
  min: 0,
  max: 100,
  positionFrom: 15,
  positionTo: 50,
  step: 1,
  orientation: "horizontal",
  label: true,
};
const model: Model = new Model(config);
const observer = jasmine.createSpyObj("observer", ["broadcast", "subscribe"]);
const validator = jasmine.createSpyObj("validator", { validationConfig: true });
describe("Model", () => {
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
      orientation: "horizontal",
      label: true,
    };
  });
  it("Инициализация класса Model", () => {
    expect(model).toBeDefined();
    expect(model.observer).toEqual(observer);
    expect(model.validator).toEqual(validator);
    expect(model.config).toEqual(config);
  });
  it("метод addFollower вызывает ф-ю subscribe в кассе Observer", () => {
    model.addFollower({});
    expect(model.observer.subscribe).toHaveBeenCalled();
  });
  describe("метод updateConfig обновляет конфиг модели", () => {
    it("если в принимаемом объекте key = orientation, то вызывается ф-я broadcast класса Observer", () => {
      const data = {
        orientation: "vertical",
      };
      model.updateConfig(data);
      expect(model.observer.broadcast).toHaveBeenCalled();
    });
    it("если в принимаемом объекте key = range, то вызываются ф-ции calcPositionFrom, calcPositionTo, calcParams и broadcast класса Observer", () => {
      const data = {
        range: false,
      };
      spyOn(model, "calcPositionFrom");
      spyOn(model, "calcPositionTo");
      spyOn(model, "calcParams");
      model.updateConfig(data);
      expect(model.calcPositionFrom).toHaveBeenCalled();
      expect(model.calcPositionTo).toHaveBeenCalled();
      expect(model.calcParams).toHaveBeenCalled();
      expect(model.observer.broadcast).toHaveBeenCalled();
    });
    it("если в принимаемом объекте key = min, то вызываются ф-ции calcPositionFrom, calcPositionTo, calcParams и broadcast класса Observer", () => {
      const data = {
        min: -100,
      };
      spyOn(model, "calcPositionFrom");
      spyOn(model, "calcPositionTo");
      spyOn(model, "calcParams");
      model.updateConfig(data);
      expect(model.calcPositionFrom).toHaveBeenCalled();
      expect(model.calcPositionTo).toHaveBeenCalled();
      expect(model.calcParams).toHaveBeenCalled();
      expect(model.observer.broadcast).toHaveBeenCalled();
    });
    it("если в принимаемом объекте key = max, то вызываются ф-ции calcPositionFrom, calcPositionTo, calcParams и broadcast класса Observer", () => {
      const data = {
        max: 1000,
      };
      spyOn(model, "calcPositionFrom");
      spyOn(model, "calcPositionTo");
      spyOn(model, "calcParams");
      model.updateConfig(data);
      expect(model.calcPositionFrom).toHaveBeenCalled();
      expect(model.calcPositionTo).toHaveBeenCalled();
      expect(model.calcParams).toHaveBeenCalled();
      expect(model.observer.broadcast).toHaveBeenCalled();
    });
    it("если в принимаемом объекте key = positionFrom, то то вызываются ф-ции calcPositionFrom, calcParams и broadcast класса Observer", () => {
      const data = {
        positionFrom: 45,
      };
      spyOn(model, "calcPositionFrom");
      spyOn(model, "calcParams");
      model.updateConfig(data);
      expect(model.calcPositionFrom).toHaveBeenCalled();
      expect(model.calcParams).toHaveBeenCalled();
      expect(model.observer.broadcast).toHaveBeenCalled();
    });
    it("если в принимаемом объекте key = positionTo, тто вызываются ф-ции calcPositionTo, calcParams и broadcast класса Observer", () => {
      const data = {
        positionTo: 50,
      };
      spyOn(model, "calcPositionTo");
      spyOn(model, "calcParams");
      model.updateConfig(data);
      expect(model.calcPositionTo).toHaveBeenCalled();
      expect(model.calcParams).toHaveBeenCalled();
      expect(model.observer.broadcast).toHaveBeenCalled();
    });
  });

  it("метод getConfig,валидирует конфиг модели и возвращает его", () => {
    const expectConfig = {
      range: true,
      min: 0,
      max: 100,
      positionFrom: 15,
      positionTo: 50,
      step: 1,
      orientation: "horizontal",
      label: true,
    };
    const result = model.getConfig();
    expect(model.validator.validationConfig).toHaveBeenCalled();
    expect(result).toEqual(expectConfig);
  });
  it("метод setOnloadData,устанавливает значение sliderSize, вызывает ф-ции calcStepData, calcOnloadThumbPosition и передает результат через observer.broadcast", () => {
    spyOn(model, "calcStepData");
    spyOn(model, "calcOnloadThumbPosition");
    model.calcParams(400);
    expect(model.observer.broadcast).toHaveBeenCalled();
    expect(model.calcStepData).toHaveBeenCalled();
    expect(model.calcOnloadThumbPosition).toHaveBeenCalled();
  });
  describe("проверка метода fundMoveThumbPosition", () => {
    let data: any;
    let data_num: string;
    beforeEach(function () {
      data = {
        clientXY: 100,
        slider_client_react: 5,
        positionThumbFirst: 10,
        positionThumbSecond: 21,
      };
    });
    describe("data_num = 1, range = false", () => {
      beforeEach(function () {
        data.data_num = "1";
        model.config.range = false;
      });
      it("при position < 0, вызывается ф-я broadcast класса Observer", () => {
        data.slider_client_react = 110;
        model.fundMoveThumbPosition(data);
        expect(model.observer.broadcast).toHaveBeenCalled();
      });
      it("при position > sliderSize, вызывается ф-я broadcast класса Observer", () => {
        data.clientXY = 410;
        model.sliderSize = 300;
        model.fundMoveThumbPosition(data);
        expect(model.observer.broadcast).toHaveBeenCalled();
      });
      it("при position, вызывается ф-я broadcast класса Observer", () => {
        model.fundMoveThumbPosition(data);
        expect(model.observer.broadcast).toHaveBeenCalled();
      });
    });
    describe("data_num = 1, range = true", () => {
      beforeEach(function () {
        data.data_num = "1";
        model.config.range = true;
      });
      it("при position < 0, вызывается ф-я broadcast класса Observer", () => {
        data.slider_client_react = 110;
        model.fundMoveThumbPosition(data);
        expect(model.observer.broadcast).toHaveBeenCalled();
      });
      it("при position > secondThumbPosition, вызывается ф-я broadcast класса Observer", () => {
        data.clientXY = 410;
        model.fundMoveThumbPosition(data);
        expect(model.observer.broadcast).toHaveBeenCalled();
      });
      it("при position, вызывается ф-я broadcast класса Observer", () => {
        model.fundMoveThumbPosition(data);
        expect(model.observer.broadcast).toHaveBeenCalled();
      });
    });
    describe("data_num = 2, range = true", () => {
      beforeEach(function () {
        data.data_num = "2";
        model.config.range = true;
      });
      it("при position < firstThumbPosition, вызывается ф-я broadcast класса Observer", () => {
        data.slider_client_react = 110;
        model.fundMoveThumbPosition(data);
        expect(model.observer.broadcast).toHaveBeenCalled();
      });
      it("при position > sliderSize, вызывается ф-я broadcast класса Observer", () => {
        data.clientXY = 410;
        model.sliderSize = 300;
        model.fundMoveThumbPosition(data);
        expect(model.observer.broadcast).toHaveBeenCalled();
      });
      it("при position, вызывается ф-я broadcast класса Observer", () => {
        model.fundMoveThumbPosition(data);
        expect(model.observer.broadcast).toHaveBeenCalled();
      });
    });
  });
  describe('метод calcPositionFrom', () => {
    it('positionFrom < min', () => {
      model.config.positionFrom = -5;
      model.config.min = 0;
      model.calcPositionFrom();
      expect(model.config.positionFrom).toEqual(model.config.min)
    })
    it('range = true,positionFrom > positionTo', () => {
      model.config.range = true;
      model.config.positionFrom = 10;
      model.config.positionTo = 0;
      model.calcPositionFrom();
      expect(model.config.positionTo).toEqual(model.config.positionFrom + model.config.step)
    })
    it('range = false ,positionFrom > max', () => {
      model.config.range = false;
      model.config.positionFrom = 40;
      model.config.max = 30;
      model.calcPositionFrom();
      expect(model.config.positionFrom).toEqual(model.config.max)
    })
  })
  describe('метод calcPositionTo', () => {
    it('range = true, positionTo < max', () => {
      model.config.positionTo = 30;
      model.config.max = 29;
      model.calcPositionTo();
      expect(model.config.positionTo).toEqual(model.config.max)
    })
  })
  it('метод calcPixelSize возвращает кол-во пикселей для одного шага', () => {
    model.config.max = 10;
    model.config.min = 0;
    model.sliderSize = 40;
    const expectResult = (model.config.max - model.config.min) / model.sliderSize;
    expect(model.calcPixelSize()).toEqual(expectResult)
  })
  it('метод calcStepData возвращает размер шага', () => {
    model.sliderSize = 40;
    const expectResult = model.sliderSize / 20;
    expect(model.calcStepData()).toEqual(expectResult)
  })
  it('метод calcOnloadThumbPosition возвращает объект с начальными позициями бегунков', () => {
    model.config.positionFrom = 15;
    model.config.positionTo = 50;
    model.config.min = 0;
    model.sliderSize = 400;
    const sizePixel = spyOn(model, 'calcPixelSize').and.returnValue(0.25)
    expect(model.calcOnloadThumbPosition()).toEqual({ onloadPositionThumbOne: 60, onloadPositionThumbTwo: 200 })
  })
  describe('метод isIntegerStep', () => {
    it('возвращает true, если step целое число', () => {
      model.config.step = 5;
      expect(model.isIntegerStep()).toBeTrue()
    })
    it('возвращает false, если step не целое число', () => {
      model.config.step = 0.5;
      expect(model.isIntegerStep()).toBeFalse()
    })
  })
  describe('метод checkValueWithMin', () => {
    it('возвращает value, если value > min', () => {
      model.config.min = 0;
      expect(model.checkValueWithMin(5)).toEqual(5)
    })
    it('возвращает value, если value = min', () => {
      model.config.min = 0;
      expect(model.checkValueWithMin(0)).toEqual(0)
    })
    it('возвращает min, если value < min', () => {
      model.config.min = 0;
      expect(model.checkValueWithMin(-55)).toEqual(0)
    })
  })
  describe('метод checkValueWithMax', () => {
    it('возвращает value, если value < max', () => {
      model.config.max = 100;
      expect(model.checkValueWithMax(5)).toEqual(5)
    })
    it('возвращает value, если value = max', () => {
      model.config.max = 100;
      expect(model.checkValueWithMax(100)).toEqual(100)
    })
    it('возвращает max, если value > max', () => {
      model.config.max = 100;
      expect(model.checkValueWithMax(500)).toEqual(100)
    })
  })
  describe('метод checkSliderSizeMax', () => {
    it('возвращает value, если value < sliderSize', () => {
      model.sliderSize = 400;
      expect(model.checkSliderSizeMax(5)).toEqual(5)
    })
    it('возвращает value, если value = sliderSize', () => {
      model.sliderSize = 400;
      expect(model.checkSliderSizeMax(400)).toEqual(400)
    })
    it('возвращает sliderSize, если value > sliderSize', () => {
      model.sliderSize = 400;
      expect(model.checkSliderSizeMax(500)).toEqual(400)
    })
  })
  it('метод calcValue возвращает число', () => {
    model.config.min = 0;
    model.config.step = 4;
    const sizePixel = spyOn(model, 'calcPixelSize').and.returnValue(0.25);
    const expectedResult = Math.round(
      (400 * 0.25 + model.config.min) / model.config.step
    ) * model.config.step;
    expect(model.calcValue(400)).toEqual(expectedResult)
  })
});
