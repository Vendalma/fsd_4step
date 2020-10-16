import { Observer } from '../Observer/Observer'
import {Model} from './init.test'
describe('Model', () => {
   
    it('Создание экземпляра класса Модель', () => {
        let observer = new Observer();
        expect(Model).toBeDefined()
        expect(Model.observer).toBeDefined()
        expect(Model.observer).toBeInstanceOf(Observer)
    })
})

