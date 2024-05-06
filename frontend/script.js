import countries from './data.js';

const all = document.querySelector('#all');
const countryEl = document.querySelector('#country');
const selectedCountry = [];

function main() {
  addOptions();
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

function createNode(tagName, attributes = {}) {
  const el = document.createElement(tagName);

  for (const key of Object.keys(attributes)) {
    el[key] = attributes[key];
  }
  return el;
}

function handleSelect(event) {
  const currentCountry = event.target.value;

  const findCountry = countries.find(
    (country) => country.name.common === currentCountry
  );
  selectedCountry.push(findCountry);
  console.log(selectedCountry);

  // Empty #country before append new elements
  while (countryEl.firstChild) {
    countryEl.removeChild(countryEl.firstChild);
  }
  /* Alternative solution is:
  countryEl.innerHTML = '';
  */

  countryEl.appendChild(getDetails());
}

function getDetails() {
  const lastSelected = selectedCountry[selectedCountry.length - 1];
  const {
    flag,
    name: { common },
    region,
    subregion,
    capital,
  } = lastSelected;

  const fragment = document.createDocumentFragment();

  //Flag (as <img> element), Common name (as <h1> element), Region (as <h2> element), Subregion (as <h3> element), Capital city (as <h4> element)
  fragment.appendChild(createNode('img', { innerText: flag }));
  fragment.appendChild(createNode('h1', { innerText: common }));
  fragment.appendChild(createNode('h2', { innerText: region }));
  fragment.appendChild(createNode('h3', { innerText: subregion }));
  fragment.appendChild(createNode('h4', { innerText: capital }));

  return fragment;
}

main();
console.log(countries);
