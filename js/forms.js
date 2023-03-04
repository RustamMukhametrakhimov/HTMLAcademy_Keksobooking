const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');

const mapFilterForm = document.querySelector('.map__filters');
const mapFilterFormSelectors = mapFilterForm.querySelectorAll('select');
const mapFilterFormFieldset = mapFilterForm.querySelector('fieldset');


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


export {disableForms, enableForms};
