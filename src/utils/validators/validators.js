export const requiredField = value => { // в value нам будут приходить значания textarea или input-a, куда мы вводим текст
    if (value) {
        return undefined
    } else {
        return 'Field is required'
    }
}

export const maxLength = length => value => { //Создаем замыкание для создания валидации различных maxLength. Для создания нужной maxLength создаем переменную за пределами компоненты. Эта переменная будет равна вызову функции с нужным нам параметром
    if (value && value.length > length){
        return `Max length is ${length} symbols`
    } else {
        return undefined
    }
}
