function getRandomPositiveInteger (a, b) {    
// Функция взята из интернета и доработана HTMLAcademy
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
    const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
    const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
    const result = Math.random() * (upper - lower + 1) + lower;
    return Math.floor(result);
  }


function getRandomPositiveFloat (a, b, digits = 1) {
// Функция взята из интернета и доработана HTMLAcademy
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random    
    const lower = Math.min(Math.abs(a), Math.abs(b));
    const upper = Math.max(Math.abs(a), Math.abs(b));
    const result = Math.random() * (upper - lower) + lower;
    return +result.toFixed(digits);
  }