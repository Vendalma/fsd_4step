# Range slider jQuery plugin

Тестовое задание для компании Fullstack Development

[Демо-страница](https://vendalma.github.io/fsd_4step/)

## Скачать репозиторий

https://github.com/Vendalma/fsd_4step.git

## Запуск приложения

npm start

## Запуск тестов

npm test

## Описание

Архитектура приложения разделена на три слоя:

`Model` - валидирует данные и производит расчеты

`View` - отображает компоненты слайдера

`Presenter` - занимается передачей данных между Model и View

Взаимодействие Model и View c Presenter осуществляется с помощью шаблона Observer

## Подключение плагина

```
$('#id').rangeSlider()
```

При инициализации плагина можно указать необходимые параметры:

```
$('#id').rangeSlider({
  step: 5,
  range: false
})
```

| Опции        |   Тип   | Значение по умолчанию | Описание                                    |
| ------------ | :-----: | :-------------------: | ------------------------------------------- |
| min          | number  |           0           | Минимальное значение                        |
| max          | number  |          100          | Максимальное значение                       |
| step         | number  |           1           | Размер шага                                 |
| positionFrom | number  |          10           | Начальная позиция первого бегунка           |
| positionTo   | number  |          50           | Начальная позиция второго бегунка           |
| range        | boolean |         true          | Одинарный/двойной слайдер                   |
| orientation  | string  |      horizontal       | Ориентация слайдера (horizontal / vertical) |
| label        | boolean |         true          | Отображение значения бегунка                |

## Диаграмма

![alt text](uml/uml-1.jpg)
____
![alt text](uml/uml-2.jpg)
