import countries from './data.js';
import { selectedCountry, getCurrentIndex, setCurrentIndex } from './script.js';

export function runOnce() {
  const toolbarEl = document.getElementById('toolbar');

  toolbarEl.appendChild(navButtons());
  revealButtons();
}

export function handleSelect(event) {
  const previousButton = document.querySelector('#prev');

  const countryEl = document.getElementById('country');
  const currentCountry = event.target.value;

  const findCountry = countries.find(
    (country) => country.name.common === currentCountry
  );
  const currentIndex = selectedCountry.push(findCountry);
  setCurrentIndex(currentIndex);

  if (currentIndex > 1) {
    previousButton.removeAttribute('disabled');
  }

  //temp
  console.log(selectedCountry);

  // Empty #country before append new elements
  countryEl.innerHTML = '';

  countryEl.append(getDetailsFragment(), areaPopulationDivFragment());
  revealButtons();
}

function createNode(tagName, attributes = {}) {
  const el = document.createElement(tagName);

  for (const key of Object.keys(attributes)) {
    el[key] = attributes[key];
  }
  return el;
}

function areaPopulationDivFragment() {
  const fragment = document.createDocumentFragment();

  const divCountryArea = createNode('div', { id: 'country_area' });
  const divCountryPopulation = createNode('div', { id: 'country_population' });

  fragment.append(divCountryArea, divCountryPopulation);

  return fragment;
}

function getDetailsFragment() {
  const lastSelected = selectedCountry[selectedCountry.length - 1];
  const {
    flags: { png },
    name: { common },
    region,
    subregion,
    capital,
  } = lastSelected;

  const fragment = document.createDocumentFragment();

  //Flag (as <img> element), Common name (as <h1> element), Region (as <h2> element), Subregion (as <h3> element), Capital city (as <h4> element)
  fragment.appendChild(
    createNode('img', { src: png, alt: `flag-of-${common.toLowerCase()}` })
  );
  fragment.appendChild(createNode('h1', { innerText: common }));
  fragment.appendChild(createNode('h2', { innerText: region }));
  fragment.appendChild(createNode('h3', { innerText: subregion }));
  fragment.appendChild(createNode('h4', { innerText: capital }));

  return fragment;
}

function navButtons() {
  const fragment = document.createDocumentFragment();
  const prev = createNode('button', {
    innerText: 'Previous country',
    id: 'prev',
    disabled: true,
  });
  const next = createNode('button', {
    innerText: 'Next country',
    id: 'next',
    disabled: true,
  });
  next.addEventListener('click', handleNextClick);
  prev.addEventListener('click', handlePrevClick);

  fragment.append(prev, next);
  return fragment;
}

function revealButtons() {
  const populatonButton = document.querySelector('#population');
  const areaButton = document.querySelector('#area');

  populatonButton.removeAttribute('hidden');
  areaButton.removeAttribute('hidden');
}

function toggleDisableAttrib(index) {
  const nextButton = document.querySelector('#next');
  const previousButton = document.querySelector('#prev');
  const selectedCountrySize = selectedCountry.length;

  if (index === selectedCountrySize) {
    nextButton.setAttribute('disabled', '');
  } else if (index < selectedCountrySize) {
    nextButton.removeAttribute('disabled');
  }
  if (index === 0) {
    previousButton.setAttribute('disabled', '');
  } else if (index > 0) {
    previousButton.removeAttribute('disabled');
  }
}

function handleNextClick() {
  let currentIndex = getCurrentIndex();

  currentIndex++;
  setCurrentIndex(currentIndex);
  console.log(`Current index value: ${getCurrentIndex()}`);
}

function handlePrevClick() {
  const nextButton = document.querySelector('#next');
  let currentIndex = getCurrentIndex();

  nextButton.removeAttribute('disabled');
  currentIndex--;
  setCurrentIndex(currentIndex);
  console.log(`Current index value: ${getCurrentIndex()}`);
}
