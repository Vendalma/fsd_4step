import {Presenter} from '../MVP/Presenter/Presenter'

describe('Presenter', ()=> {
    const model = jasmine.createSpyObj('model',['thumbCorrectValue','getStep','addFollower']);
    const view = jasmine.createSpyObj('view',['setPositionMoveThumb','addStep','setOnloadThumbPosition','addFollower'])
    const presenter: Presenter = new Presenter(view, model)
    const data = {a:1}
    it ('Инициализация Presenter', ()=> {
        expect(presenter).toBeDefined()
        expect(presenter.model).toEqual(model);
        expect(presenter.view).toEqual(view)
    })

    it('Метод subscribeOnUpdate', () => {
        expect(presenter.view.addFollower).toHaveBeenCalled()
        expect(presenter.model.addFollower).toHaveBeenCalled()
    })
    it('Метод update с mouseMove', ()=> {
        presenter.update('mouseMove', data)
        expect(presenter.model.thumbCorrectValue).toHaveBeenCalled()
    })
    it('Метод update с position', ()=> {
        presenter.update('position', data)
        expect(presenter.view.setPositionMoveThumb).toHaveBeenCalled()
    })
    it('Метод update с stepData', ()=> {
        presenter.update('stepData', data)
        expect(presenter.view.addStep).toHaveBeenCalled()
        expect(presenter.view.setOnloadThumbPosition).toHaveBeenCalled()
    })
    it('Метод update с loadData', ()=> {
        presenter.update('loadData', data)
        expect(presenter.model.getStep).toHaveBeenCalled()
    })
})