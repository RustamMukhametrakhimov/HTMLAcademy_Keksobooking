import {createAdvertisements} from './data.js';

const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

const simulareAdvertisements = createAdvertisements();

const simularListFragment = document.createDocumentFragment();

const houseType = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
};

simulareAdvertisements.forEach(({author, offer}) => {
    const offerElement = offerTemplate.cloneNode(true);
    const features = offer.features;
    const photos = offer.photos;    

    if (offer.title == '') {
        offerElement.querySelector('.popup__title').classList.add('visually-hidden');
    }else {
        offerElement.querySelector('.popup__title').textContent = offer.title;
    };

    if (offer.description == '') {
        offerElement.querySelector('.popup__description').classList.add('visually-hidden');
    }else {
        offerElement.querySelector('.popup__description').textContent = offer.description;
    };

    if (features == []) {
        offerElement.querySelector('.popup__features').classList.add('visually-hidden');
    }else {
        const featureContainer = offerElement.querySelector('.popup__features');
        const featureList = featureContainer.querySelectorAll('.popup__feature');
        featureList.forEach((featureListItem) => {
            const isNecessary = features.some(
                (feature) => featureListItem.classList.contains(`popup__feature--${feature}`,)
            );
            if (!isNecessary) {
                featureListItem.remove();
            };
        });
    };

    if (photos == []) {
        offerElement.querySelector('.popup__photo').classList.add('visually-hidden');
    }else {
        const photoContainer = offerElement.querySelector('.popup__photos');
        photoContainer.innerHTML = '';
        for (let i = 0; i < photos.length; i++) {
            photoContainer.insertAdjacentHTML('beforeend',`<img src="${photos[i]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
        };
    };

    offerElement.querySelector('.popup__text--address').textContent = offer.address;
    offerElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    offerElement.querySelector('.popup__type').textContent = houseType[offer.type];
    offerElement.querySelector('.popup__text--capacity').textContent =  `${offer.rooms} комнаты для ${offer.guests} гостей`;
    offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    offerElement.querySelector('.popup__avatar').src = author.avatar;

    simularListFragment.appendChild(offerElement);
});
