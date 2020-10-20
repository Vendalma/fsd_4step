import {Step} from '../MVP/View/Step'
const config  = {
    min: 0,
    max: 100,
    step: 1,
    orientation: "horisontal",
  }
const container = $('<div>');
const thumbBlock =  $('<div>')
const blockMin = $('<div>')
const blockMax = $('<div>')
beforeEach(function () { 
    thumbBlock[0].classList.add('thumb_first')
    blockMin[0].classList.add('slider__step-block_min')
    blockMin[0].innerHTML = step.min + '';
    blockMax[0].classList.add('slider__step-block_max')
    blockMax[0].innerHTML = step.max + '';
    container.append(thumbBlock)
    container.append(blockMin)
    container.append(blockMax)
    $(document.body).append(container)
})

let step : Step = new Step(config, container[0])

describe('Step', ()=> {
    beforeAll(function () {
        spyOn(step,'deleteElements')
    })
    it('инициализация класса Step', ()=> {
        expect(step).toBeDefined();
        
        expect(step.config).toEqual(config)
        expect(step.min).toEqual(config.min)
        expect(step.max).toEqual(config.max)
        expect(step.orientation).toEqual(config.orientation)

        expect(step.container).toBeInstanceOf(HTMLElement)
    })
    it('проверка метода addStepLine ', ()=> {
        step.addStepLine({});

        expect(step.deleteElements).toHaveBeenCalled()
        expect($('.thumb_first')[0]).toBeInDOM()
        
    })
    it('проверка метода changeMinValue', ()=> {
        step.changeMinValue(4)

        expect(step.min).toEqual(4)
        expect(blockMin[0]).toBeInDOM()
        expect(blockMin).toContainText('4')
    })
    it('проверка метода changeMaxValue', ()=> {
        step.changeMaxValue(104)

        expect(step.max).toEqual(104)
        expect(blockMax[0]).toBeInDOM()
        expect(blockMax).toContainText('104')
    })
    it('проверка метода checkOrientation', () => {
        step.checkOrientation('vertical');
        expect(step.orientation).toEqual('vertical')
    })
})