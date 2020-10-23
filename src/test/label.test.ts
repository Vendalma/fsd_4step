import {Label} from '../MVP/View/Label'

const config = {
    label: true,
    min: 5,
    max: 10,
    step: 1,
    orientation: 'horisontal'
}

describe('Label', () => {
    const block =  $('<div>')
    beforeEach(function () {
        
        block[0].classList.add('thumb')
        $(document.body).append(block)
    }   
    )
    const label: Label = new Label(config, block[0])

    it('Инициализация класса Label', ()=> {
        expect(label).toBeDefined();

        expect(label.config).toEqual(config)
        expect(label.label).toEqual(config.label)
        expect(label.min).toEqual(config.min)
        expect(label.max).toEqual(config.max)
        expect(label.step).toEqual(config.step)
        expect(label.orientation).toEqual(config.orientation)
        expect(config.orientation).toBeInstanceOf(String)

        expect(label.thumb).toBeInstanceOf(HTMLElement)
        expect(label.thumb).toContainElement('div.thumb__label')
        expect(label.elementLabel).toBeInDOM();
        expect(label.elementLabel).toHaveClass('thumb__label')
        
       
    })

    it('Тестирование метода setLabelValue', () => {
        label.setLabelValue(4)
        expect(label.elementLabel).toContainText('4')
    })
    describe('Тестирование метода CheckLabelOrientation', ()=> {
        it ('orientation = horisontal', () => {
            label.checkLabelOrientation('horisontal')     
            expect(label.orientation).toEqual('horisontal')
            expect(label.elementLabel).not.toHaveClass('thumb__label_vertical')
        });
        it ('orientation = vertical', () => {
            label.checkLabelOrientation('vertical')     
            expect(label.orientation).toEqual('vertical')
            expect(label.elementLabel).toHaveClass('thumb__label_vertical')
        });
    })
    describe('Tестирование метода checkVisibleLabel', ()=> {
        it('checkVisibleLabel = true', () => {
            label.checkVisibleLabel(true);
            expect(label.label).toEqual(true)
            expect(label.elementLabel).toHaveCss({display : 'block'})
        })
        it('checkVisibleLabel = false', () => {
            label.checkVisibleLabel(false);
            expect(label.label).toEqual(false)
            expect(label.elementLabel).toHaveCss({display : 'none'})
        })
    })
})