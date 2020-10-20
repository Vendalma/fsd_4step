import {Thumb} from '../MVP/View/Thumb'
const config  = {
    range: true,
    positionFrom: 15,
    positionTo: 30,
    orientation: "horisontal",
  }
  const block =  $('<div>')
  beforeEach(function () {
      
      block[0].classList.add('slider__block')
      $(document.body).append(block)
  })

let thumb: Thumb = new Thumb(config,'thumb_first',block[0], 1)
let observer = jasmine.createSpyObj('observer',['broadcast','subscribe'])
let label = jasmine.createSpyObj('label',['checkLabelProp','setLabelValue','checkLabelOrientation'])

describe('Thumb', ()=> {
    thumb.observer = observer;
    thumb.label = label;
    it('инициализация класса Thumb', ()=> {
        expect(thumb).toBeDefined()

        expect(thumb.range).toBeInstanceOf(Boolean)
        expect(thumb.positionFrom).toBeInstanceOf(Number)
        expect(thumb.positionTo).toBeInstanceOf(Number)
        expect(thumb.orientation).toBeInstanceOf(String)
        expect(thumb.countThumbs).toBeInstanceOf(String)
        expect(thumb.thumb).toBeInstanceOf(HTMLElement)
        
        expect(thumb.config).toEqual(config);
        expect(thumb.positionFrom).toEqual(config.positionFrom)
        expect(thumb.positionTo).toEqual(config.positionTo)
        expect(thumb.orientation).toEqual(config.orientation)

        expect(thumb.countThumbs).toEqual('thumb_first')
        expect(thumb.slider).toBeInstanceOf(HTMLElement)
        expect(thumb.slider).toContainElement('div.thumb_first')
        expect(thumb.thumb).toBeInDOM()
        expect(thumb.thumb).toHaveAttr('data-num', "1")

    })

    it('проверка метода addFollower', () => {
        thumb.addFollower({})

        expect(thumb.observer.subscribe).toHaveBeenCalled()
    })
    it('проверка метода checkLabel', () => {
        thumb.checkLabel(true)

        expect(thumb.label.checkLabelProp).toHaveBeenCalled()
    })
    it('проверка метода checkRange', () => {
        thumb.checkRange(false)

        expect(thumb.range).toEqual(false)
    })
    it('проверка метода setLabelValue', () => {
        thumb.setLabelValue(8)

        expect(thumb.label.setLabelValue).toHaveBeenCalled()
    })
    it('проверка метода removeThis', () => {
        thumb.removeThis()

        expect(thumb.slider).not.toContainElement('div.thumb_first')
        expect(thumb.thumb).not.toBeInDOM()
    })
    it('проверка метода removeThis', () => {
        thumb.addThis()

        expect(thumb.slider).toContainElement('div.thumb_first')
        expect(thumb.thumb).toBeInDOM()
    })
    describe('проверка метода getPosition', () => {
        it('orientation = horisontal', () => {
            thumb.orientation = 'horisontal'
            thumb.getPosition(8)
    
            expect(thumb.thumb).toHaveCss({left : '8px'})
        })
        it('orientation = vertical', () => {
            thumb.orientation = 'vertical'
            thumb.getPosition(8)
    
            expect(thumb.thumb).toHaveCss({top : '8px'})
        })
    })
    describe('проверка метода setPosition', () => {
        describe('orientation = horisontal', () => {
            beforeEach(function () {
                thumb.orientation = 'horisontal'
            })
            it('range = false', () => {
                thumb.range = false
                thumb.setPosition(11)
        
                expect(thumb.thumb).toHaveCss({left : '11px'})
            })
            it('range = true', () => {
                thumb.range = true
                thumb.getPosition(14)
        
                expect(thumb.thumb).toHaveCss({left : '14px'})
            })
        })
        describe('orientation = vertical', () => {
            beforeEach(function () {
                thumb.orientation = 'vertical'
            })
            it('range = false', () => {
                thumb.range = false
                thumb.setPosition(11)
        
                expect(thumb.thumb).toHaveCss({top : '11px'})
            })
            it('range = true', () => {
                thumb.range = true
                thumb.getPosition(14)
        
                expect(thumb.thumb).toHaveCss({top : '14px'})
            })
        })
    })
    describe('проверка метода checkOrientation', ()=> {
        it('orientation = horisontal', ()=> {
            thumb.checkOrientation('horisontal');
        
            expect(thumb.orientation).toEqual('horisontal');
            expect(thumb.label.checkLabelOrientation).toHaveBeenCalled()
            //expect( thumb.thumb?.style.left).toEqual(thumb.thumb?.style.top)
            expect(thumb.thumb).toHaveCss({top: '-5px'})
            expect(thumb.thumb).not.toHaveClass('thumb_vertical')
        })
        it('orientation = vertical', ()=> {
            thumb.checkOrientation('vertical');
        
            expect(thumb.orientation).toEqual('vertical');
            expect(thumb.label.checkLabelOrientation).toHaveBeenCalled()
            //expect( thumb.thumb?.style.top).toEqual(thumb.thumb?.style.left)
            expect(thumb.thumb).toHaveCss({left: '-5px'})
            expect(thumb.thumb).toHaveClass('thumb_vertical')
        })
    })
})
