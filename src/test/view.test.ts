import {View} from '../MVP/View/View'
const config  = {
  range: true,
  min: 0,
  max: 100,
  positionFrom: 15,
  positionTo: 30,
  label: true,
  step: 1,
  orientation: "horisontal",
}
const block =  $('<div>')
beforeEach(function () {

    block[0].classList.add('thumb')
    $(document.body).append(block)
})

let view : View = new View(config,block[0])
let observer = jasmine.createSpyObj('observer',['broadcast','subscribe']) ;
let thumbOne = jasmine.createSpyObj('thumbOne', ['checkOrientation','getPosition','checkLabel','checkRange','setLabelValue','addFollower','setPosition'])
const thumbTwo = jasmine.createSpyObj('thumbTwo', ['checkOrientation','getPosition','checkLabel','checkRange','setLabelValue','addFollower','setPosition', 'removeThis','addThis'])
const progressBar = jasmine.createSpyObj('progressBar', ['checkRange','setPositionForThumbOne','setPositionForThumbTwo','setOnloadProgressBarPosition','checkOrientation'])
const Step = jasmine.createSpyObj('Step', ['checkOrientation', 'changeMinValue','changeMaxValue','addStepLine'])
describe('View', ()=> {
    view.thumbOne = thumbOne
    view.thumbTwo = thumbTwo
    view.observer = observer;
    view.progressBar = progressBar;
    view.step = Step
    beforeEach(function () {
        spyOn(view, 'getSliderSize')
        spyOn(view,'checkOrientation')
        spyOn(view, 'setThumbTwo')
        spyOn(view, 'resizeWindow')
    })
    it('Инициализация View', () => {
        expect(view).toBeDefined()

        expect(view.config).toEqual(config);
        expect(view.range).toEqual(config.range)
        expect(view.positionFrom).toEqual(config.positionFrom)
        expect(view.positionTo).toEqual(config.positionTo)
        expect(view.min).toEqual(config.min)
        expect(view.max).toEqual(config.max)
        expect(view.orientation).toEqual(config.orientation)
        expect(view.stepValue).toEqual(config.step)
        expect(view.label).toEqual(config.label)
    })

    it('Инициализация блока div.slider',()=> {
        expect(view.wrapper).toBeInstanceOf(HTMLElement)
        expect(view.wrapper).toContainElement('div.slider')
        expect(view.wrapper).toHaveClass('wrapper')

        expect(view.slider).toBeInstanceOf(HTMLElement)
        expect(view.slider).toHaveClass('slider')
    })

    it('Инициализация div.slider__block', ()=> {
        expect(view.sliderBlock).toBeInstanceOf(HTMLElement)
        expect(view.sliderBlock).toHaveClass('slider__block')
        expect(view.slider).toContainElement('div.slider__block')
    })

    it('проверка метода init', () => {
        view.init()
        expect(view.slider).toHaveData('orientation',view.orientation)
        expect(view.slider).toHaveAttr('data-from', view.positionFrom + '')
        expect(view.slider).toHaveAttr('data-min', view.min + '')
        expect(view.slider).toHaveAttr('data-max',view.max + '')
        expect(view.slider).toHaveAttr('data-step', view.stepValue + '')
        expect(view.slider).toHaveAttr('data-label', view.label + '')
        expect(view.slider).toHaveAttr('data-range', view.range + '')
        if (view.range) {
            expect(view.slider).toHaveAttr('data-to', view.positionTo + '')
        }
      })

    it('проверка метода subscribeOnUpdate', () => {
        view.subscribeOnUpdate()
        expect(view.thumbOne.addFollower).toHaveBeenCalled()
        expect(view.thumbTwo?.addFollower).toHaveBeenCalled()
    })


     it('проверка метода changeMin', () => {
        view.changeMin(1);
        expect(view.min).toEqual(1)
        expect(view.step.changeMinValue).toHaveBeenCalled()
     })
     it('проверка метода changeMax', () => {
        view.changeMax(1000);
        expect(view.max).toEqual(1000)
        expect(view.step.changeMinValue).toHaveBeenCalled()
     })
    it('проверка метода changeLabel', ()=> {
        view.changeLabel(false)
        expect(view.thumbOne.checkLabel).toHaveBeenCalled()
        expect(view.thumbTwo?.checkLabel).toHaveBeenCalled()
    })
    it('проверка метода changePositionFrom', ()=> {
        view.changePositionFrom(10);
        expect(view.positionFrom).toEqual(10)
        expect(view.getSliderSize).toHaveBeenCalled()
     })
     it('проверка метода changePositionTo', ()=> {
        view.changePositionTo(100);
        expect(view.positionTo).toEqual(100)
        expect(view.getSliderSize).toHaveBeenCalled()
     })

     it('проверка метода changeStep', ()=> {
        view.changeStep(2)
        expect(view.stepValue).toEqual(2)
     })
     it('проверка метода addStep', ()=>  {
        view.addStep({});
        expect(view.step.addStepLine).toHaveBeenCalled()
    })
    it('проверка метода addFollower', ()=> {
        view.addFollower({})
        expect(view.observer.subscribe).toHaveBeenCalled()
    })

    it('проверка метода onloadWindow', ()=> {
        spyOn(window, 'addEventListener')
        view.onloadWindow()
        if (window.onload) {
            expect(window.addEventListener).toHaveBeenCalled()
            expect(view.getSliderSize).toHaveBeenCalled()
            expect(view.resizeWindow).toHaveBeenCalled()
        }


    })
    it('проверка метода resizeWindow', ()=> {
        spyOn(window, 'addEventListener')
        view.resizeWindow()
        if (window.onresize) {
            expect(window.addEventListener).toHaveBeenCalled()
            expect(view.getSliderSize).toHaveBeenCalled()
        }


    })
    describe('проверка метода setOnloadThumbPosition', () => {
        it ('range = true', ()=> {
            view.range = true;
            view.setOnloadThumbPosition({})

            if (view.range) {
               expect(view.thumbOne.setPosition).toHaveBeenCalled()
               expect(view.thumbOne.setLabelValue).toHaveBeenCalled()
               expect(view.progressBar.setOnloadProgressBarPosition).toHaveBeenCalled()

               expect(view.thumbTwo?.setPosition).toHaveBeenCalled()
               expect(view.thumbTwo?.setLabelValue).toHaveBeenCalled()
               expect(view.progressBar.setOnloadProgressBarPosition).toHaveBeenCalled()
            }
         })
        it ('range = false', ()=> {
            view.range = false;
            view.setOnloadThumbPosition({})
            if (!view.range) {
                expect(view.thumbOne.setPosition).toHaveBeenCalled()
                expect(view.thumbOne.setLabelValue).toHaveBeenCalled()
                expect(view.progressBar.setOnloadProgressBarPosition).toHaveBeenCalled()
              }
        })
    })
    describe('проверка метода update', ()=> {
        it ('type = mouseMove ', () => {
            view.update('mouseMove', {})
            expect(view.observer.broadcast).toHaveBeenCalled()
        })
        it ('type = updatePositionThumbFirst ', () => {
            view.update('updatePositionThumbFirst', {})
            expect(view.thumbOne.getPosition).toHaveBeenCalled()
        })
        it ('type = updatePositionThumbSecond ', () => {
            view.update('updatePositionThumbSecond', {})
            expect(view.thumbTwo?.getPosition).toHaveBeenCalled()
        })
    })
})


describe('View проверка метода checkOrientation', () => {
    beforeAll(function () {
        spyOn(view, 'getSliderSize')
    })
    it('orientation = horisontal', () => {
        view.checkOrientation('horisontal')

        expect(view.orientation).toEqual('horisontal')
        expect(view.thumbOne.checkOrientation).toHaveBeenCalled()
        expect(view.thumbTwo?.checkOrientation).toHaveBeenCalled()
        expect(view.step.checkOrientation).toHaveBeenCalled();
        expect(view.progressBar.checkOrientation).toHaveBeenCalled();
        expect(view.getSliderSize).toHaveBeenCalled()

        if (view.orientation === 'horisontal') {
           expect(view.sliderBlock).not.toHaveClass("slider__block_vertical")
        }
     })
     it('orientation = vertical', () => {
        view.checkOrientation('vertical')

        expect(view.orientation).toEqual('vertical')
        expect(view.thumbOne.checkOrientation).toHaveBeenCalled()
        expect(view.thumbTwo?.checkOrientation).toHaveBeenCalled()
        expect(view.step.checkOrientation).toHaveBeenCalled();
        expect(view.progressBar.checkOrientation).toHaveBeenCalled();
        expect(view.getSliderSize).toHaveBeenCalled()

        if (view.orientation === 'vertical') {
           expect(view.sliderBlock).toHaveClass("slider__block_vertical")
        }
     })
})

describe('View проверка метода checkRange', () => {
    beforeAll(function () {
        spyOn(view, 'setThumbTwo')
    })
    it('range = true', ()=> {
        view.checkRange(true);

        expect(view.setThumbTwo).toHaveBeenCalled()
        expect(view.thumbOne.checkRange).toHaveBeenCalled()
        expect(view.thumbTwo?.checkRange).toHaveBeenCalled()
        expect(view.observer.broadcast).toHaveBeenCalled()
        expect(view.progressBar.checkRange).toHaveBeenCalled()

        expect(view.thumbTwo?.addThis).toHaveBeenCalled()
        expect($('.thumb_second')[0]).toBeInDOM()
    })
    it('range = false', ()=> {
        view.checkRange(false);

        expect(view.setThumbTwo).toHaveBeenCalled()
        expect(view.thumbOne.checkRange).toHaveBeenCalled()
        expect(view.thumbTwo?.checkRange).toHaveBeenCalled()
        expect(view.observer.broadcast).toHaveBeenCalled()
        expect(view.progressBar.checkRange).toHaveBeenCalled()

        if (view.thumbTwo) {
            expect(view.thumbTwo.removeThis).toHaveBeenCalled()
            //expect($('.thumb_second')[0]).not.toBeInDOM()
        }
    })
})
describe('View проверка метода setThumbTwo', ()=> {
    it('проверка метода setThumbTwo', ()=> {
        view.range = false;
        view.setThumbTwo()
        if (!view.range) {
            expect(view.thumbTwo?.removeThis).toHaveBeenCalled()
        }
    })
})

describe('View проверка метода setPositionMoveThumb', ()=> {
    it('range = true, data_num = 1', ()=> {
        view.range = true;
        let data_num = '1'
        view.setPositionMoveThumb({})
        if(data_num == '1'){
            expect(view.thumbOne.getPosition).toHaveBeenCalled()
            expect(view.thumbOne.setLabelValue).toHaveBeenCalled()
            //expect(view.progressBar.setPositionForThumbOne).toHaveBeenCalled()
        }
    })
    it('range = true, data_num = 2', ()=> {
        view.range = true;
        let data_num = '2'
        view.setPositionMoveThumb({})
        if(data_num == '2'){
            expect(view.thumbTwo?.getPosition).toHaveBeenCalled()
            expect(view.thumbTwo?.setLabelValue).toHaveBeenCalled()
            expect(view.progressBar.setPositionForThumbTwo).toHaveBeenCalled()
        }
    })
    it('range = false', ()=> {
        view.range = false;
        view.setPositionMoveThumb({})
            expect(view.thumbOne.getPosition).toHaveBeenCalled()
            expect(view.thumbOne.setLabelValue).toHaveBeenCalled()
            expect(view.progressBar.setPositionForThumbOne).toHaveBeenCalled()

    })
})