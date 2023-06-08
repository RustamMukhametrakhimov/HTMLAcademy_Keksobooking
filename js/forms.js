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
};

//валидация формы
//валидация поля заголовок сообщения посредством разметки
//валидация поля цена за ночь посредством разметки, js: запрет печатать не цифры, проверка минимальной цены
//валидация полей количество комнат и количество мест 

const pristine = new Pristine(adForm, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    successClass: 'ad-form__element--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'div',
    errorTextClass: 'form__error'
});

//валидация поля цена за ночь

adForm.querySelector('#price').addEventListener('keydown', function(evt){ 
    if (/^[\d]$/.test(evt.key) || evt.key == 'Backspace' || evt.key == 'Enter') {        
        return true;
    }
    evt.preventDefault();
    return false;
});

function checkMinimumPrice(value) {
    let minPrice;    
    switch (adForm.querySelector('#type').value) {
        case 'bungalow': 
            minPrice = 0;
            break;
        case 'flat': 
            minPrice = 1000;
            break;
        case 'hotel': 
            minPrice = 3000;
            break;
        case 'house': 
            minPrice = 5000;
            break;
        case 'palace': 
            minPrice = 10000;
            break;
        default: 
            minPrice = 0;
    }
    return value >= minPrice;
};

pristine.addValidator(
    adForm.querySelector('#price'),
    checkMinimumPrice,
    'Цена меньше минимельной'
);

//валидация соотвествия комнат

const roomsCapacitiOption = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
};

function checkRooms(){    
    return roomsCapacitiOption[adForm.querySelector('#room_number').value].includes(adForm.querySelector('#capacity').value)
};

pristine.addValidator(
    adForm.querySelector('#room_number'),
    checkRooms,
    'Несоответствие комнат и гостей'
);

pristine.addValidator(
    adForm.querySelector('#capacity'),
    checkRooms,
    'Несоответствие комнат и гостей'
);

adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    //pristine.validate();
    console.log('sending')
})

export {disableForms, enableForms};
