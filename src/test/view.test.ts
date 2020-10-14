import {View} from '../MVP/View/View'
import '../styles.scss'
import * as $ from "jquery";
describe('View', ()=> {
    let block :any;
    beforeEach(function() {
        block = $('<div>')
        
        $(document.body).append(block)
    })
    

    it('Создание экземпляра класса View', ()=> {
        const view: View = new View({
            min: 0,
            max: 10,
            label: true,
            range: true,
            step: 1,
            orientation: "horisontal",
            positionFrom: 0,
            positionTo: 5,
        },block[0] )
        expect(view).toBeDefined()
    })
})