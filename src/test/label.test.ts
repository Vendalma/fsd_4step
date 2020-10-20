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
        
        expect(label.max).toBeInstanceOf(Number)
        expect(label.min).toBeInstanceOf(Number)
        expect(label.step).toBeInstanceOf(Number)
        expect(label.label).toBeInstanceOf(Boolean)

        expect(label.config).toEqual(config)
        expect(label.label).toEqual(config.label)
        expect(label.min).toEqual(config.min)
        expect(label.max).toEqual(config.max)
        expect(label.step).toEqual(config.step)
        expect(label.orientation).toEqual(config.orientation)

        expect(label.thumb).toBeInstanceOf(HTMLElement)
        expect(label.thumb).toContainElement('div.thumb__label')
        expect(label.labelElem).toBeInDOM();
        expect(label.labelElem).toHaveClass('thumb__label')
        
       
    })

    it('Тестирование метода setLabelValue', () => {
        label.setLabelValue(4)
        if (label.labelElem) {
            expect(label.labelElem).toContainText('4')
        }
    })

    it ('Тестирование метода CheckLabelOrientation', () => {
        label.checkLabelOrientation('vertical')     
        expect(label.orientation).toEqual('vertical')
       if (label.orientation == 'vertical') {
           expect(label.labelElem).toHaveClass('thumb__label_vertical')
       }
       if (label.orientation == 'horisontal') {
        expect(label.labelElem).not.toHaveClass('thumb__label_vertical')
    }
    })

    it('Tестирование метода checkLabelProp', () => {
        label.checkLabelProp(false);
        expect(label.label).toEqual(false)
        if (label.labelElem) {
            if (label.label) {
                expect(label.labelElem).toHaveCss({display : 'block'})
            } else if (!label.label) {
                expect(label.labelElem).toHaveCss({display : 'none'})
            }
        }
    })
})