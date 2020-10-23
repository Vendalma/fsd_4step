import {Model} from '../MVP/Model/Model'
import { MutationObserverClass } from '../RangeSlider/mutationObserver';
const config  = {
    range: true,
    min: 0,
    max: 100,
    positionFrom: 15,
    positionTo: 30,
    step: 1,
    orientation: "horisontal",
  }
const model : Model = new Model(config)
const observer = jasmine.createSpyObj('observer', ['broadcast', 'subscribe']);

describe('Model', () => {
    model.observer = observer;
    it('Инициализация класса Model', ()=> {
        expect(model).toBeDefined();

        expect(model.config).toEqual(config);
        expect(model.range).toEqual(config.range)
        expect(model.positionFrom).toEqual(config.positionFrom)
        expect(model.positionTo).toEqual(config.positionTo)
        expect(model.min).toEqual(config.min)
        expect(model.max).toEqual(config.max)
        expect(model.orientation).toEqual(config.orientation)
        expect(model.step).toEqual(config.step);

        expect(model.observer).toEqual(observer)
    })
    it('проверка метода addFollower', ()=> {
        model.addFollower({})
        expect(model.observer.subscribe).toHaveBeenCalled()
    })
    it('проверка метода changeRange', ()=> {
        model.changeRange(false)

        expect(model.range).toEqual(false)
    })
    it('проверка метода changeOrientation', ()=> {
        model.changeOrientation('vertical')

        expect(model.orientation).toEqual('vertical')
    })
    it('проверка метода changeMin', ()=> {
        model.changeMin(7)

        expect(model.min).toEqual(7)
    })
    it('проверка метода changeMax', ()=> {
        model.changeMax(102)

        expect(model.max).toEqual(102)
    })
    it('проверка метода changeStep', ()=> {
        model.changeStep(3)

        expect(model.step).toEqual(3)
    })
    it('проверка метода changePositionFrom', ()=> {
        model.changePositionFrom(10)

        expect(model.positionFrom).toEqual(10)
    })
    it('проверка метода changePositionTo', ()=> {
        model.changePositionTo(15)

        expect(model.positionTo).toEqual(15)
    })
    describe('проверка метода getStep', ()=> {
        let data: any;
        beforeEach(function() {
            data =  {
                'sliderSize': 300
            }
            model.min = 1;
            model.max = 140;
            model.positionFrom = 5;
            model.positionTo = 20;
        })
        it('', ()=> {
            model.getStep(data)
           /* let sliderSize = data["sliderSize"];
     
            let stepCount = 20;
            let onePixelSize = (model.max - model.min) / sliderSize;
            let stepSize = sliderSize / stepCount;
            let onloadPositionThumbOne = (model.positionFrom - model.min) / onePixelSize;
            let onloadPositionThumbTwo = (model.positionTo - model.min) / onePixelSize;
            expect(onePixelSize).toEqual((140-1)/300)
            expect(stepSize).toEqual(300/20)
            expect(onloadPositionThumbOne).toEqual((5-1)/onePixelSize)
            expect(onloadPositionThumbTwo).toEqual((20-1)/onePixelSize)*/
            expect(model.observer.broadcast).toHaveBeenCalled()
        })
    })
    describe('проверка метода fundThumbPosition', () => {
        let data: any;
        let data_num: string;
        describe('orientation = horisontal', () => {
            beforeEach(function() {
                model.orientation = 'horisontal';
                data = {
                'clientX': 100,
                'slider-left-point': 5,
                'slider-width': 300,
                'positionThumbFirst': 10,
                'positionThumbSecond': 21,
                }
            })
            describe('range = false', ()=> {
                beforeEach(function() {
                   model.range = false;
                })
                it('position < 0', ()=> {
                    data['slider-left-point'] = 110;
                    model.fundThumbPosition(data)
    
                    expect(model.observer.broadcast).toHaveBeenCalled()
                })
                it('position > sliderWidth', ()=> {
                    data['clientX'] = 410;
                    model.fundThumbPosition(data)
    
                    expect(model.observer.broadcast).toHaveBeenCalled()
                })
                it('position', ()=> {
                    model.fundThumbPosition(data)
    
                    expect(model.observer.broadcast).toHaveBeenCalled()
                })
            })
            describe('range=true, data_num = 1', () => {
                beforeEach(function() {
                    model.range = true;
                    data['data-num'] = '1';
                })
                it('position < 0', ()=> {
                    data['slider-left-point'] = 110;
                    model.fundThumbPosition(data)
    
                    expect(model.observer.broadcast).toHaveBeenCalled()
                })
                it('position > secondThumbPosition', ()=> {
                    model.fundThumbPosition(data)
    
                    expect(model.observer.broadcast).toHaveBeenCalled()
                })
                it('position', ()=> {
                    data['positionThumbSecond'] = 410;
                    model.fundThumbPosition(data)
    
                    expect(model.observer.broadcast).toHaveBeenCalled()
                })
            })
            describe('range=true, data_num = 2', () => {
                beforeEach(function() {
                    model.range = true;
                    data['data-num'] = '2';
                 })
                it('position < firstThumbPosition', ()=> {
                    data['slider-left-point'] = 110;
                    model.fundThumbPosition(data)
    
                    expect(model.observer.broadcast).toHaveBeenCalled()
                })
                it('position > sliderWidth', ()=> {
                    data["clientX"] = 410;
                    model.fundThumbPosition(data)
    
                    expect(model.observer.broadcast).toHaveBeenCalled()
                })
                it('position', ()=> {
                    model.fundThumbPosition(data)
    
                    expect(model.observer.broadcast).toHaveBeenCalled()
                })
            })
        })
        describe('orientation = vertical', () => {
            beforeEach(function() {
                model.orientation = 'vertical';
                data = {
                'clientY': 100,
                'slider-top-point': 5,
                'slider-height': 300,
                'positionThumbFirst': 10,
                'positionThumbSecond': 21,
                }
            })
            describe('range=false', ()=> {
                beforeEach(function() {
                    model.range = false;
                 })
                it('position < 0', ()=> {
                    data['slider-top-point'] = 110;
                    model.fundThumbPosition(data)
    
                    expect(model.observer.broadcast).toHaveBeenCalled()
                })
                it('position < sliderHeight', ()=> {
                    data['clientY'] = 410;
                    model.fundThumbPosition(data)
    
                    expect(model.observer.broadcast).toHaveBeenCalled()
                })
                it('position', ()=> {
                    model.fundThumbPosition(data)
    
                    expect(model.observer.broadcast).toHaveBeenCalled()
                })
            })
            describe('range=true, data_num = 1', ()=> {
                beforeEach(function() {
                    model.range = true;
                    data['data-num'] = '1';
                })
                it ('position < 0', ()=> {
                    data['slider-top-point'] = 110;
                    model.fundThumbPosition(data)
    
                    expect(model.observer.broadcast).toHaveBeenCalled()
                })
                it ('position > secondThumbPosition', ()=> {
                    model.fundThumbPosition(data)
    
                    expect(model.observer.broadcast).toHaveBeenCalled()
                })
                it ('position', ()=> {
                    data['positionThumbSecond'] = 410;
                    model.fundThumbPosition(data)
    
                    expect(model.observer.broadcast).toHaveBeenCalled()
                })
            })
            describe('range=true, data_num = 2', ()=> {
                beforeEach(function() {
                    model.range = true;
                    data['data-num'] = '2';
                })
                it('position < firstThumbPosition', ()=> {
                    data['slider-top-point'] = 110;
                    model.fundThumbPosition(data)
    
                    expect(model.observer.broadcast).toHaveBeenCalled()
                })
                it('position > sliderHeight', ()=> {
                    data["clientY"] = 410;
                    model.fundThumbPosition(data)
    
                    expect(model.observer.broadcast).toHaveBeenCalled()
                })
                it('position', ()=> {
                    model.fundThumbPosition(data)
    
                    expect(model.observer.broadcast).toHaveBeenCalled()
                })
            })
        })
    })
})