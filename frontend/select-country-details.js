import countries from './data.js';
import { selectedCountry } from './script.js';

export default function handleSelect(event) {
  const countryEl = document.querySelector('#country');
  const toolbarEl = document.querySelector('#toolbar');
  const currentCountry = event.target.value;

  const findCountry = countries.find(
    (country) => country.name.common === currentCountry
  );
  selectedCountry.push(findCountry);
  console.log(selectedCountry);

  // Empty #country before append new elements
  countryEl.innerHTML = '';

  /* Alternative solution is:
  while (countryEl.firstChild) {
    countryEl.removeChild(countryEl.firstChild);
  */

  countryEl.appendChild(getDetails());
  toolbarEl.appendChild(navButtons());
  revealButtons();
}

function createNode(tagName, attributes = {}) {
  const el = document.createElement(tagName);

  for (const key of Object.keys(attributes)) {
    el[key] = attributes[key];
  }
  return el;
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

function navButtons() {
  const fragment = document.createDocumentFragment();
  const previous = createNode('button', {
    innerText: 'Previous country',
    id: 'prev',
    disabled: true,
  });
  const next = createNode('button', {
    innerText: 'Next country',
    id: 'next',
    disabled: true,
  });
  fragment.append(previous, next);
  return fragment;
}

function revealButtons() {
  const populatonButton = document.querySelector('#population');
  const areaButton = document.querySelector('#area');

  populatonButton.removeAttribute('hidden');
  areaButton.removeAttribute('hidden');
}
