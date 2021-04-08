import PositionCalculator from '../slider/MVP/View/PositionCalculator';
import { IMovingThumbValues } from '../slider/MVP/View/types';

class TestPositionCalculator extends PositionCalculator {
  public config: IConfig;
}

const calculator: TestPositionCalculator = new TestPositionCalculator();
const config = {
  range: true,
  min: 0,
  max: 100,
  positionFrom: 15,
  positionTo: 30,
  label: true,
  step: 1,
  vertical: false,
};

describe('PositionCalculator', () => {
  it('Инициализация класса PositionCalculator', () => {
    expect(calculator).toBeDefined();
  });

  it('метод calcOnloadPosition устанавливает конфиг, вычисляет начальные позиции бегунков и возвращает их', () => {
    expect(calculator.calcOnloadPosition({ config, sliderSize: 300 })).toEqual({
      positionFrom: {
        position: 45,
        value: 15,
      },
      positionTo: {
        position: 90,
        value: 30,
      },
    });
  });

  describe('метод findPosition рассчитывает позиции бегунков при движении и возвращает их значения', () => {
    let data: IMovingThumbValues;
    beforeEach(function () {
      data = {
        position: 94,
        dataName: 'from',
      };
    });

    describe('step = 1', () => {
      describe('dataName = from, range = false', () => {
        beforeEach(function () {
          data.dataName = 'from';
          calculator.config = {
            step: 1,
            max: 100,
            min: 0,
            positionFrom: 10,
            positionTo: 20,
            range: false,
            label: true,
            vertical: false,
          };
        });

        it('position <= leftPoint', () => {
          data.position = -100;

          expect(calculator.findPosition(data)).toEqual({
            positionFrom: {
              position: 0,
              value: 0,
            },
            positionTo: {
              position: 90,
              value: 30,
            },
          });
        });

        it('при position > rightPoint, вызывается ф-я broadcast', () => {
          data.position = 410;

          expect(calculator.findPosition(data)).toEqual({
            positionFrom: {
              position: 300,
              value: 100,
            },
            positionTo: {
              position: 90,
              value: 30,
            },
          });
        });

        it('при position, вызывается ф-я broadcast', () => {
          expect(calculator.findPosition(data)).toEqual({
            positionFrom: {
              position: 93,
              value: 31,
            },
            positionTo: {
              position: 90,
              value: 30,
            },
          });
        });
      });

      describe('dataName = from, range = true', () => {
        beforeEach(function () {
          data.dataName = 'from';
          calculator.config = {
            step: 1,
            max: 100,
            min: 0,
            positionFrom: 10,
            positionTo: 20,
            range: true,
            label: true,
            vertical: false,
          };
        });

        it('если position <= leftPoint, вызывается метод broadcast', () => {
          data.position = -110;

          expect(calculator.findPosition(data)).toEqual({
            positionFrom: {
              position: 0,
              value: 0,
            },
            positionTo: {
              position: 90,
              value: 30,
            },
          });
        });

        it('при position > rightPoint, вызывается ф-я broadcast', () => {
          data.position = 410;

          expect(calculator.findPosition(data)).toEqual({
            positionFrom: {
              position: 90,
              value: 30,
            },
            positionTo: {
              position: 90,
              value: 30,
            },
          });
        });

        it('при position, вызывается метод broadcast', () => {
          data.position = 80;

          expect(calculator.findPosition(data)).toEqual({
            positionFrom: {
              position: 81,
              value: 27,
            },
            positionTo: {
              position: 90,
              value: 30,
            },
          });
        });
      });

      describe('dataName = to, range = true', () => {
        beforeEach(function () {
          data.dataName = 'to';
          calculator.config = {
            step: 1,
            max: 100,
            min: 0,
            positionFrom: 10,
            positionTo: 20,
            range: true,
            label: true,
            vertical: false,
          };
        });

        it('при position <= leftPoint, вызывается ф-я broadcast', () => {
          data.position = 80;

          expect(calculator.findPosition(data)).toEqual({
            positionFrom: {
              position: 81,
              value: 27,
            },
            positionTo: {
              position: 81,
              value: 27,
            },
          });
        });

        it('если position > rightPoint, вызывается метод broadcast', () => {
          data.position = 410;

          expect(calculator.findPosition(data)).toEqual({
            positionFrom: {
              position: 81,
              value: 27,
            },
            positionTo: {
              position: 300,
              value: 100,
            },
          });
        });

        it('если position, вызывается ф-я broadcast', () => {
          data.position = 100;

          expect(calculator.findPosition(data)).toEqual({
            positionFrom: {
              position: 81,
              value: 27,
            },
            positionTo: {
              position: 99,
              value: 33,
            },
          });
        });
      });
    });

    describe('step = 0.5', () => {
      describe('dataName = from, range = false', () => {
        beforeEach(function () {
          data.dataName = 'from';
          calculator.config = {
            step: 0.5,
            max: 100,
            min: 0,
            positionFrom: 10,
            positionTo: 20,
            range: false,
            label: true,
            vertical: false,
          };
        });

        it('position <= leftPoint', () => {
          data.position = -100;

          expect(calculator.findPosition(data)).toEqual({
            positionFrom: {
              position: 0,
              value: 0,
            },
            positionTo: {
              position: 99,
              value: 33,
            },
          });
        });

        it('при position > rightPoint, вызывается ф-я broadcast', () => {
          data.position = 410;

          expect(calculator.findPosition(data)).toEqual({
            positionFrom: {
              position: 300,
              value: 100,
            },
            positionTo: {
              position: 99,
              value: 33,
            },
          });
        });

        it('при position, вызывается ф-я broadcast', () => {
          expect(calculator.findPosition(data)).toEqual({
            positionFrom: {
              position: 94.5,
              value: 31.5,
            },
            positionTo: {
              position: 99,
              value: 33,
            },
          });
        });
      });
    });
  });
});
