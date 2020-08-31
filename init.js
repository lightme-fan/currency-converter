import { generateOptions } from './utils.js';
import currencies from './currencies.js';
import { handleInput } from './hendlers.js';
import { fromSelect, toSelect } from './elements.js'

export function init() {
    // Grabbing select tags
    const form = document.querySelector('.app form');

    // Calling the function
    const optionsHtml = generateOptions(currencies);
    // Append this function to the fromSelect and toSelect
    fromSelect.innerHTML = optionsHtml;
    toSelect.innerHTML = optionsHtml;

    form.addEventListener('input', handleInput);
}