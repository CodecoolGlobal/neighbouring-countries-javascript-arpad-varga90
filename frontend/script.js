import countries from './data.js';
import handleSelect from './select-country-details.js';

const all = document.querySelector('#all');
const population = document.querySelector('#population');
const countryEl = document.querySelector('#country');
const selectedCountry = [];

function main() {
  addOptions();
  all.addEventListener('change', handleSelect);
  population.addEventListener('click', (e) =>
    getNeighborWithLargestPopulation()
  );
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

function createNode(tagName, attributes = {}, parentNode = '') {
  const el = document.createElement(tagName);

  for (const key of Object.keys(attributes)) {
    el[key] = attributes[key];
  }
  if (parentNode === '') {
    return el;
  }
  parentNode.append(el);
  return null;
}

// get current country that returns the selected country
function getCurrentCountry() {
  const name = selectedCountry[selectedCountry.length - 1];
  for (const country of countries) {
    if (country.name.common === name) {
      return country;
    }
  }
  return null;
}

// get country obj by cca3
function getCountryByCca3(cca3) {
  for (const country of countries) {
    if (cca3 === country.cca3) {
      return country;
    }
  }
  return null;
}

// get neighbor countries and find max value by population
function getNeighborWithLargestPopulation() {
  let neighbors = getCurrentCountry().borders.map(getCountryByCca3);
  let maxValue = neighbors.reduce((max, country) => {
    return country.population > max.population ? country : max;
  });
  return maxValue;
}

function handleSelect(event) {
  console.log(event.target.value);
  selectedCountry.push(event.target.value);
}

main();
console.log(countries);

export { all, countryEl, selectedCountry };
