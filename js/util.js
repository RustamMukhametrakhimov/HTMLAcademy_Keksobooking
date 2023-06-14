//модуль общие функции

function getRandomPositiveInteger (a, b) {    
    // Функция взята из интернета и доработана HTMLAcademy
    // Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
        const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
        const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
        const result = Math.random() * (upper - lower + 1) + lower;
        return Math.floor(result);
    };
    
    
function getRandomPositiveFloat (a, b, digits = 1) {
    // Функция взята из интернета и доработана HTMLAcademy
    // Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random    
        const lower = Math.min(Math.abs(a), Math.abs(b));
        const upper = Math.max(Math.abs(a), Math.abs(b));
        const result = Math.random() * (upper - lower) + lower;
        return +result.toFixed(digits);
    };

const getRandomArrayElement = (elements) => {
        return elements[getRandomPositiveInteger(0, elements.length - 1)];
    };

const getRandomArray = (array) => {
        var arr = [];
        for (var i = 0; i < array.length - 1; i++) {
            if (Math.random() > 0.5) {
                arr.push(array[i]);
            }
        }
        return arr;
    };

function typeToName(value) {
    switch (value) {
        case 'bungalow': 
            return 'Бунгало';
        case 'flat': 
            return 'Квартира';
        case 'hotel': 
            return 'Отель';
        case 'house': 
            return 'Дом';
        case 'palace': 
            return 'Дворец';
    }
    return 'что-то не то';
}

export {getRandomArrayElement, getRandomArray, getRandomPositiveFloat, getRandomPositiveInteger, typeToName};