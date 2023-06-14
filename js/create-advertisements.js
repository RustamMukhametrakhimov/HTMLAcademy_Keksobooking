//модуль создания объявлений

import {getRandomArrayElement, getRandomArray, getRandomPositiveFloat, getRandomPositiveInteger} from './util.js';

const TITLES = [
    "Дворец",
    "Квартира",
    "Дом",
    "Бунгало",
    "Отель",
];

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
];

const PHOTOS = [
    "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg",
    "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg",
    "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg",
];

const createAuthor = (index) => {    
    if (index == 10) {
        return {avatar: "img/avatars/user10.png"}
    }
    return {avatar: `img/avatars/user0${index}.png`}
};

const createLocation = () => {
    return {
        lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
        lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
    }
};

const createOffer = (location) => {
    const checkinOut = getRandomArrayElement(CHECK_IN_OUT);
    return {
        title: getRandomArrayElement(TITLES),
        address: `${location.lat}, ${location.lng}`,
        price: getRandomPositiveInteger(1, 5000),
        type: getRandomArrayElement(ROOMS_TYPE),
        rooms: getRandomPositiveInteger(1, 10),
        guests: getRandomPositiveInteger(1,30),
        checkin: checkinOut,
        checkout: checkinOut,
        features: getRandomArray(FEATURES),
        offerDescription: getRandomArrayElement(DESCRIPTIONS),
        photos: getRandomArray(PHOTOS),
    }
};

const createAdvertisement = (index, location) => {
    return {
        author: createAuthor(index),
        offer: createOffer(location),
        location: location,
    }
};

const createAdvertisements = () => {
    let arr = [];
    for (let i = 1; i <= 10; i++) {
        arr.push(createAdvertisement(i, createLocation()));
    };
    return arr;
};

export {createAdvertisements};