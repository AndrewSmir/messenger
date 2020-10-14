export const requiredField = value => {
    if (value) {
        return undefined
    } else {
        return 'Field is required'
    }
}

export const maxLength = length => value => {
    if (value && value.length > length){
        return `Max length is ${length} symbols`
    } else {
        return undefined
    }
}

export const minLength = length => value => {
    if (value && value.length < length){
        return `Min length is ${length} symbols`
    } else {
        return undefined
    }
}