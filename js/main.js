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

const TITLES = [
    "Дворец",
    "Квартира",
    "Дом",
    "Бунгало",
    "Отель",
]

const ROOMS_TYPE = [
    "palace",
    "flat",
    "house",
    "bungalow",
    "hotel",
];

const CHECK_IN_OUT = [
    "12:00",
    "13:00",
    "14:00",
];

const FEATURES = [
    "wifi",
    "dishwasher",
    "parking",
    "washer",
    "elevator",
    "conditioner",
];

const DESCRIPTIONS = [
    "Прекрасный дворец для отличного отдыха",
    "Уютная квартира",
    "Хороший дом для всей семьи или компании",
    "Уютное бунгало",
    "Чудесный отель",
]

const PHOTOS = [
    "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg",
    "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg",
    "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg",
]

const createAvatar = (index) => {    
    if (index == 10) {
        return "img/avatars/user10.png";
    }
    return `img/avatars/user0${index}.png`
}

const createLocation = () => {
    return {
        lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
        lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
    }
}

const getRandomArrayElement = (elements) => {
    return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

const getRandomArray = (array) => {
    var arr = [];
    for (var i = 0; i < array.length - 1; i++) {
        if (Math.random() > 0.5) {
            arr.push(array[i]);
        }
    }
    return arr;
}

const createOffer = (location) => {
    return {
        title: getRandomArrayElement(TITLES),
        address: `${location.lat}, ${location.lng}`,
        price: getRandomPositiveInteger(1, 5000),
        type: getRandomArrayElement(ROOMS_TYPE),
        rooms: getRandomPositiveInteger(1, 10),
        guests: getRandomPositiveInteger(1,30),
        checkin: getRandomArrayElement(CHECK_IN_OUT),
        checkout: getRandomArrayElement(CHECK_IN_OUT),
        features: getRandomArray(FEATURES),
        description: getRandomArrayElement(DESCRIPTIONS),
        photos: getRandomArray(PHOTOS),
    }
}

const createAdvertisement = (index, location) => {
    return {
        author: createAvatar(index),
        offer: createOffer(location),
        location: location,
    }
}

const simulateAdvertisement = () => {
    let arr = [];
    for (let i = 1; i <= 10; i++) {
        arr.push(createAdvertisement(i, createLocation()));
    };
    return arr;
}