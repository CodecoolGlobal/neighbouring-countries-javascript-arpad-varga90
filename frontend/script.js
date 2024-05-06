import countries from './data.js';

const all = document.querySelector('#all');
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

function handleSelect(event) {
  console.log(event.target.value);
  selectedCountry.push(event.target.value);
}

main();
console.log(countries);
