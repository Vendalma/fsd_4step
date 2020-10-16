import {View} from './init.test'
import {config} from './init.test'
import {block} from './init.test'
import {Thumb} from '../MVP/View/Thumb'
describe('View', ()=> {
   let slider = $('.slider')
   let thumbOne = new Thumb(config,"thumb_first",slider[0],1)
    it('Создание экземпляра класса View', ()=> {
      expect(View).toBeDefined()
      expect(View.config).toEqual(config)
      expect(View.range).toEqual(config.range)
      expect(View.positionFrom).toEqual(config.positionFrom)
      expect(View.positionTo).toEqual(config.positionTo)
      expect(View.orientation).toEqual(config.orientation)
      expect(View.min).toEqual(config.min)
      expect(View.max).toEqual(config.max)
      expect(View.stepValue).toEqual(config.step)
      expect(View.label).toEqual(config.label)
      expect(View.wrapper).toEqual(block[0])
      expect(View.wrapper).toHaveClass('wrapper')
      expect(View.slider).toBeInDOM()
      expect(View.slider).toHaveClass('slider')
      expect(View.sliderBlock).toBeInDOM()
      expect(View.sliderBlock).toHaveClass('slider__block')

     expect(View.thumbOne).toBeDefined()
    })

    it('проверка метода init', () => {
      View.init()
      expect(slider).toHaveData('orientation','horisontal')
      expect(slider).toHaveAttr('data-from', '0')
      if (View.range) {
         expect(slider).toHaveAttr('data-to','5')
      }
      expect(slider).toHaveAttr('data-min','0')
      expect(slider).toHaveAttr('data-max','10')
      expect(slider).toHaveAttr('data-step','1')
      expect(slider).toHaveAttr('data-label','true')
      expect(slider).toHaveAttr('data-range','true')

    })
    

    describe('Проверка методов View для изменения конфига', ()=>{
      beforeEach(()=> {
         spyOn(View.thumbOne,'checkOrientation');
         if (View.thumbTwo) {
            spyOn(View.thumbTwo,'checkOrientation')
         }
         spyOn(View.step, 'checkOrientation')
         spyOn(View,'getSliderSize')
         
      })
   
      it('проверка метода changeMax', () => {
       View.changeMax(4)
      expect(View.max).toEqual(4)
      expect(View.step.changeMaxValue(4)).toBeUndefined()
   })
   
   
   it('проверка метода checkOrientation', () => {
      View.checkOrientation('vertical')
   expect(View.orientation).toEqual('vertical')
     expect(View.thumbOne.checkOrientation).toHaveBeenCalled()
     if (View.thumbTwo)
    expect(View.thumbTwo.checkOrientation).toHaveBeenCalled()
    expect(View.step.checkOrientation).toHaveBeenCalled();
      expect(View.getSliderSize).toHaveBeenCalled()

      if (View.orientation === 'horisontal') {
         expect(View.sliderBlock).not.toHaveClass("slider__block_vertical")
      }

      if (View.orientation === 'vertical') {
         expect(View.sliderBlock).toHaveClass("slider__block_vertical")
      }
   })
    })  
})

