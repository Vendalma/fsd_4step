import {Presenter} from '../MVP/Presenter/Presenter'
import {Model} from '../MVP/Model/Model'
import {View} from '../MVP/View/View'
import * as $ from "jquery";
import '../styles.scss'


const block = $('<div>')
$(document.body).append(block)

const config = {
    min: 0,
    max: 10,
    label: true,
    range: true,
    step: 1,
    orientation: "horisontal",
    positionFrom: 0,
    positionTo: 5,
}

const view = new View(config, block[0])
const model = new Model(config)
const presenter = new Presenter(view, model)

export { view as View, model as Model, presenter as Presenter}