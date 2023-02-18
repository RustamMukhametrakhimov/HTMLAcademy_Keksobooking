function getRandomIntInclusive(min, max) {
    //взято с https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }


function getRandomFloatInclusive(min, max, count = 0) {

    if ((min > max) || (min < 0) || (max < 0) || (count < 0)) {
        throw new Error('Неверно зхаданы параметры!');
    };

    min = Math.ceil(min * (10**count));
    max = Math.floor(max * (10**count));
    return (Math.floor(Math.random() * (max - min + 1)) + min)/(10**count);
}
