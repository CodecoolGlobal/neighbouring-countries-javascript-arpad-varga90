import countries from './data.js';
import { handleSelect, runOnce } from './select-country-details.js';

const all = document.querySelector('#all');
const population = document.querySelector('#population');
const area = document.querySelector('#area');
const countryEl = document.querySelector('#country');
const mapPointer = document.querySelector('#map_pointer');
const selectedCountry = [];

function main() {
  addOptions();
  all.addEventListener('change', runOnce, { once: true });
  all.addEventListener('change', handleSelect);
  all.addEventListener('change', showOnMap);
  population.addEventListener('click', (e) =>
    getNeighborWithLargestPopulation()
  );
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
  const currentCountry = selectedCountry[selectedCountry.length - 1];
  if (currentCountry.borders) {
  }
  const neighbors = currentCountry.borders.map(getCountryByCca3);
  const maxValue = neighbors.reduce((max, country) => {
    return country.population > max.population ? country : max;
  });
  return maxValue;
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

function showOnMap() {
  const geoInfo = selectedCountry.at(-1).latlng;
  const lat = (Math.abs(geoInfo[0] - 90) / 180) * 100;
  const lng = ((geoInfo[1] + 180) / 360) * 100;
  mapPointer.style = `visibility: visible; top: ${lat}%; left: ${lng}%`;
  console.log(lat, lng);
}
main();
console.log(countries);

export { selectedCountry };
