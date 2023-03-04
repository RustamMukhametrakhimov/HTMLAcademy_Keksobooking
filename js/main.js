import {createAdvertisements} from './data.js';
import './Advertisement.js';
import {disableForms, enableForms} from './forms.js';

disableForms();
setTimeout(enableForms, 5000)

//console.log(simulateAdvertisement());