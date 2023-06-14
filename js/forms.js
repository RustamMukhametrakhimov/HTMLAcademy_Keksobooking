//модуль работы с формой

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');

const mapFilterForm = document.querySelector('.map__filters');
const mapFilterFormSelectors = mapFilterForm.querySelectorAll('select');
const mapFilterFormFieldset = mapFilterForm.querySelector('fieldset');

//деактивация формы
const disableForms = () => {
    adForm.classList.toggle('ad-form--disabled');
    adFormFieldsets.forEach((adFormFieldsetElement) => {
        adFormFieldsetElement.setAttribute('disabled', '');
    });
    
    mapFilterForm.classList.toggle('map__filters--disabled');
    mapFilterFormSelectors.forEach((mapFilterFormSelectorsElement) => {
        mapFilterFormSelectorsElement.setAttribute('disabled','');
    });
    mapFilterFormFieldset.setAttribute('disable','');
};

//активация формы
const enableForms = () => {
    adForm.classList.toggle('ad-form--disabled');
    adFormFieldsets.forEach((adFormFieldsetElement) => {
        adFormFieldsetElement.removeAttribute('disabled');
    });

    mapFilterForm.classList.toggle('map__filters--disabled');
    mapFilterFormSelectors.forEach((mapFilterFormSelectorsElement) => {
        mapFilterFormSelectorsElement.removeAttribute('disabled');
    });
    mapFilterFormFieldset.removeAttribute('disable');
    adForm.querySelector('#address').value = 'lat: 35.67500  lng: 139.75000';
};

disableForms();

//валидация формы
//валидация поля заголовок сообщения посредством разметки
//валидация поля цена за ночь посредством разметки, js: запрет печатать не цифры, проверка минимальной цены
//валидация полей количество комнат и количество мест с помощью js
//валидация поля цена за ночь в зависимости от типа жилья с помощью js

const pristine = new Pristine(adForm, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    successClass: 'ad-form__element--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'div',
    errorTextClass: 'form__error'
});

const titleInput = adForm.querySelector('#title');
const typeInput = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const timeinSelect = adForm.querySelector('#timein');
const timeoutSelect = adForm.querySelector('#timeout');
const roomNumberSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');

//валидация поля цена за ночь
//функция не дает печатать не цифры
const keys = ['Backspace', 'Enter', 'Delete', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'];

priceInput.addEventListener('keydown', function(evt){     
    if (/^[\d]$/.test(evt.key) || keys.includes(evt.key)) {        
        return true;
    }
    evt.preventDefault();
    return false;
});

//слайдер
const sliderElement = adForm.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
    range: {
        min: 1000,
        max: 100000,
    },
    start: 5000,
    step: 1,
    connect: 'lower',
    format: {
        to: function(value) {
            return value.toFixed(0);
        },
        from: function(value) {
            return parseInt(value);
        },
        },
});

sliderElement.noUiSlider.on('update', ()=> {
    priceInput.value = sliderElement.noUiSlider.get();
});

function checkPrice(value) {
    let Price;    
    switch (value) {
        case 'bungalow': 
            Price = 0;
            break;
        case 'flat': 
            Price = 1000;
            break;
        case 'hotel': 
            Price = 3000;
            break;
        case 'house': 
            Price = 5000;
            break;
        case 'palace': 
            Price = 10000;
            break;
        default: 
            Price = 0;
    }
    return Price;
};

function validatePriceInput() {
    let value = +priceInput.value;
    let min = +priceInput.getAttribute('min');    
    if (value >= min) {
        return true;
    }
    return false;
};

function validatePriceInputErrorMessage() {
    return `Минимальная цена ${priceInput.getAttribute('min')}`;
};

pristine.addValidator(
    priceInput,
    validatePriceInput,
    validatePriceInputErrorMessage
);

function validatePrice() {
    let price = checkPrice(typeInput.value);    
    priceInput.setAttribute('placeholder', price);
    priceInput.setAttribute('min', price);
    sliderElement.noUiSlider.updateOptions({
        range: {
            min: price,
            max: 100000,
        },
        start: Math.max(price, priceInput.value),
        step: 1,
    });
    pristine.validate(priceInput);
};

typeInput.addEventListener('change',validatePrice);

//валидация соотвествия комнат

const roomsCapacitiOption = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
};

function validateRooms(){    
    return roomsCapacitiOption[roomNumberSelect.value].includes((capacitySelect).value)
};

pristine.addValidator(
    roomNumberSelect,
    validateRooms,
    'Несоответствие комнат и гостей'
);

pristine.addValidator(
    capacitySelect,
    validateRooms,
    'Несоответствие комнат и гостей'
);

function onRoomNumberOrCapacityChange(){
    pristine.validate(roomNumberSelect);
    pristine.validate(capacitySelect);
};

roomNumberSelect.addEventListener('change', onRoomNumberOrCapacityChange);

capacitySelect.addEventListener('change', onRoomNumberOrCapacityChange);

//переключение времени заезда и выезда

function changeSelectoption(select, optionValueToSelect) {
    let selectOptions = select.options;
    for (let opt, j = 0; opt = selectOptions[j]; j++) {
        if (opt.value == optionValueToSelect) {
            select.selectedIndex = j;
            break;
        }
    }
};

function changeTimeOutSelect() {
    changeSelectoption(timeoutSelect, timeinSelect.value);
};

function changeTimeInSelect() {
    changeSelectoption(timeinSelect, timeoutSelect.value);
};

timeinSelect.addEventListener('change', changeTimeOutSelect);

timeoutSelect.addEventListener('change', changeTimeInSelect);

adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
});

export {disableForms, enableForms};