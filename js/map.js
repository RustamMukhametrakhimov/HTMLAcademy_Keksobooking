//модуль раболоты с картой
import {typeToName} from './util.js';
import {enableForms} from './forms.js';
import {createAdvertisements} from './create-advertisements.js';

const map = L.map('map-canvas')
    .on('load', ()=> {enableForms()})
    .setView({
        lat: 35.67500,
        lng: 139.75000,
    }, 12);

L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    ).addTo(map);

const mainPinIcon = L.icon({
    iconUrl: '/img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26,52],
});

const pinIcon = L.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20,40],
});

const mainMarker = L.marker(
    {
        lat: 35.67500,
        lng: 139.75000, 
    },
    {
        draggable: true, 
        icon: mainPinIcon,
    },

);

mainMarker.addTo(map);

const advertisements = createAdvertisements();

const createCustomPopup = (point) => {
    const baloonTemplate = document.querySelector('#card').content.querySelector('.popup');
    const popupElement = baloonTemplate.cloneNode(true);
    if (point.author.avatar == '') {
        popupElement.querySelector('.popup__avatar').classList.add('visually-hidden');
    } else {
        popupElement.querySelector('.popup__avatar').src = point.author.avatar;
    };
    popupElement.querySelector('.popup__title').textContent = point.offer.title;
    popupElement.querySelector('.popup__text--address').textContent =  `lat: ${point.location.lat.toFixed(5)}  lng: ${point.location.lng.toFixed(5)}`;
    popupElement.querySelector('.popup__text--price').innerHTML = `${point.offer.price} <span>₽/ночь</span>`;
    popupElement.querySelector('.popup__type').textContent = typeToName(point.offer.type);
    popupElement.querySelector('.popup__text--capacity').textContent = `${point.offer.rooms} комнаты для ${point.offer.guests} гостей`;
    popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${point.offer.checkin}, выезд до ${point.offer.checkout}`;
    if (point.offer.description = '') {
        popupElement.querySelector('.popup__description').classList.add('visually-hidden');
    } else {
        popupElement.querySelector('.popup__description').textContent = point.offer.offerDescription;
    };
    
    const features = point.offer.features;
    if (features == []) {
        popupElement.querySelector('.popup__features').classList.add('visually-hidden');
    }else {
        const featureContainer = popupElement.querySelector('.popup__features');
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

    const photos = point.offer.photos;
    if (photos == []) {
        popupElement.querySelector('.popup__photos').classList.add('visually-hidden');
    }else {
        const photoContainer = popupElement.querySelector('.popup__photos');
        photoContainer.innerHTML = '';
        for (let i = 0; i < photos.length; i++) {
            photoContainer.insertAdjacentHTML('beforeend',`<img src="${photos[i]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
        };
    };

    return popupElement;
}

advertisements.forEach((point) => {   
    const marker = L.marker({
        lat: point.location.lat,
        lng: point.location.lng,
    },
    {
        icon: pinIcon,
    });

    marker
        .addTo(map)
        .bindPopup(createCustomPopup(point));
});

const address = document.querySelector('#address');

function getAddress(evt) {
    const latLng = {
        lat: evt.target.getLatLng().lat,
        lng: evt.target.getLatLng().lng,
    }
    return `lat: ${latLng.lat.toFixed(5)}  lng: ${latLng.lng.toFixed(5)}`  
} 

mainMarker.on('moveend', (evt) => {
    address.value = getAddress(evt);
});

//функция сбрасывает параметры карты 
function resetMap() {
    map.setView({
        lat: 35.67500,
        lng: 139.75000,
    }, 12);}