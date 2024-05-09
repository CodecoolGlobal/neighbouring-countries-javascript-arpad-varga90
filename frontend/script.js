import countries from './data.js';
import { handleSelect, runOnce } from './select-country-details.js';

const all = document.querySelector('#all');
const population = document.querySelector('#population');
const area = document.querySelector('#area');
const selectedCountry = [];

function main() {
  addOptions();
  all.addEventListener('change', runOnce, { once: true });
  all.addEventListener('change', handleSelect);
  population.addEventListener('click', getNeighborWithLargestPopulation);
  area.addEventListener('click', getNeighborWithLargestArea);
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
  const populationDiv = document.querySelector('#country_population');
  const currentCountry = selectedCountry[selectedCountry.length - 1];
  let neighbors;
  let innerText = '';
  if (currentCountry.borders) {
    neighbors = currentCountry.borders.map(getCountryByCca3);
    let maxValue = neighbors.reduce((max, country) => {
      return country.population > max.population ? country : max;
    });
    innerText = `The neighbor country of ${currentCountry.name.common} with highest population is ${maxValue.name.common}`;
  } else {
    innerText = `${currentCountry.name.common} does not have neighbors`;
  }

  populationDiv.innerHTML = '';
  createNode(
    'p',
    {
      className: 'population',
      innerText: innerText,
    },
    populationDiv
  );
}
// get neighbor countries and find max value by area
function getNeighborWithLargestArea() {
  const areaDiv = document.querySelector('#country_area');
  const currentCountry = selectedCountry.at(-1);
  let neighbors;
  let innerText = '';

  if (currentCountry.borders) {
    neighbors = currentCountry.borders.map(getCountryByCca3);
    const maxValue = neighbors.reduce((max, country) => {
      return country.area > max.area ? country : max;
    });

    innerText = `The largest country next to ${
      currentCountry.name.common
    } in terms of land area is ${maxValue.name.common} with ${
      Math.round(maxValue.area / 10000) / 100
    } million km²
  `;
  } else {
    innerText = `${currentCountry.name.common} has no land neighbors
  `;
  }

  areaDiv.innerHTML = '';
  createNode(
    'p',
    {
      className: 'area',
      innerText: innerText,
    },
    areaDiv
  );
}

main();
console.log(countries);

export { selectedCountry };
