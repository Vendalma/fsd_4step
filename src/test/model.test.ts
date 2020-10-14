import {Model} from '../MVP/Model/Model'

describe('Model', () => {
   
    it('Создание экземпляра класса Модель', () => {
        const model: Model = new Model( {
            min: 0,
            max: 10,
            label: true,
            range: true,
            step: 1,
            orientation: "horisontal",
            positionFrom: 0,
            positionTo: 5,
          });
        expect(model).toBeDefined()
    })
})