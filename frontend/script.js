import countries from './data.js';
import { handleSelect, runOnce } from './select-country-details.js';

const all = document.querySelector('#all');
const countryEl = document.querySelector('#country');
const selectedCountry = [];

function main() {
  addOptions();
  all.addEventListener('change', runOnce, { once: true });
  all.addEventListener('change', handleSelect);
}

function addOptions() {
  countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  const optionDefault = document.createElement('option');
  optionDefault.innerText = 'Please choose a country';
  all.append(optionDefault);
  for (const country of countries) {
    const option = document.createElement('option');
    option.innerText = country.name.common;
    all.append(option);
  }
}

main();
console.log(countries);

export { selectedCountry };
