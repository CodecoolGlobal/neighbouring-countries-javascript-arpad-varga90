import countries from './data.js';
import { selectedCountry } from './script.js';

const populatonButton = document.querySelector('#population');
const areaButton = document.querySelector('#area');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');

let arrPointer;
const getCurrentIndex = () => arrPointer;
const setCurrentIndex = (value) => (arrPointer = value);

let actualTranslation;
const getActualTranslation = () => actualTranslation;
const setActualTranslation = (value) => (actualTranslation = value);

const countryEl = document.getElementById('country');

export function runOnce() {
  navButtons();
  addTranslations();
  revealButtons();
}

export function handleSelect(event) {
  const previousButton = document.querySelector('#prev');
  const currentCountry = event.target.value;

  if (currentCountry === 'Please choose a country') {
    console.log('No such country.');
    return;
  }

  const findCountry = countries.find(
    (country) => country.name.common === currentCountry
  );

  const historySize = selectedCountry.push(findCountry);
  setCurrentIndex(historySize - 1);

  if (historySize > 1) {
    previousButton.removeAttribute('disabled');
  }

  // Empty #country before append new elements
  countryEl.innerHTML = '';

  countryEl.append(
    getDetailsFragment(findCountry),
    areaPopulationDivFragment() // Better to define in reka and csabi function
  );
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

function getDetailsFragment(lastSelected) {
  const fragment = document.createDocumentFragment();
  const {
    flags: { png },
    name: { common },
    region,
    subregion,
    capital,
    translations,
  } = lastSelected;
  const lngShort = getActualTranslation();
  let isTrAvlailable = false;
  let trName = '';

  if (Object.keys(translations).includes(lngShort)) {
    trName = translations[lngShort].common;
    isTrAvlailable = true;
  }

  //prettier-ignore
  fragment.appendChild(createNode('img', { src: png, alt: `flag-of-${common.toLowerCase()}`}));
  fragment.appendChild(
    createNode('h1', { innerText: isTrAvlailable ? trName : common }) //User is not informed if tr is nat available
  );
  fragment.appendChild(createNode('h2', { innerText: region }));
  fragment.appendChild(createNode('h3', { innerText: subregion }));
  fragment.appendChild(createNode('h4', { innerText: capital }));

  return fragment;
}

function navButtons() {

  next.addEventListener('click', handleNextClick);
  prev.addEventListener('click', handlePrevClick);

}

function revealButtons() {

  populatonButton.removeAttribute('hidden');
  areaButton.removeAttribute('hidden');
  prev.removeAttribute('hidden');
  next.removeAttribute('hidden');
}

function toggleDisableAttrib(index) {
  const selectedCountrySize = selectedCountry.length;

  if (index === selectedCountrySize - 1) {
    next.setAttribute('disabled', '');
  } else if (index < selectedCountrySize) {
    next.removeAttribute('disabled');
  }
  if (index === 0) {
    prev.setAttribute('disabled', '');
  } else if (index > 0) {
    prev.removeAttribute('disabled');
  }
}

function handleNextClick() {
  let currentIndex = getCurrentIndex();

  currentIndex++;
  setCurrentIndex(currentIndex);
  toggleDisableAttrib(currentIndex);
  currentIndextoExport = currentIndex;

  countryEl.innerHTML = '';
  countryEl.appendChild(getDetailsFragment(selectedCountry[currentIndex]));
}

function handlePrevClick() {
  let currentIndex = getCurrentIndex();

  currentIndex--;
  setCurrentIndex(currentIndex);
  toggleDisableAttrib(currentIndex);
  currentIndextoExport = currentIndex;

  countryEl.innerHTML = '';
  countryEl.appendChild(getDetailsFragment(selectedCountry[currentIndex]));
}

function addTranslations() {
  const select = document.querySelector('#all');
  const trList = Object.keys(countries[0].translations);
  const languages = {
    ara: 'Arabic',
    ces: 'Czech',
    cym: 'Welsh',
    deu: 'German',
    est: 'Estonian',
    fin: 'Finnish',
    fra: 'French',
    hrv: 'Croatian',
    hun: 'Hungarian',
    ita: 'Italian',
    jpn: 'Japanese',
    kor: 'Korean',
    nld: 'Dutch',
    per: 'Persian',
    pol: 'Polish',
    por: 'Portuguese',
    rus: 'Russian',
    slk: 'Slovak',
    spa: 'Spanish',
    swe: 'Swedish',
    urd: 'Urdu',
    zho: 'Chinese',
  };

  const newSelect = createNode('select', { id: 'translations' });
  newSelect.appendChild(createNode('option', { selected: null }));
  for (const translation of trList) {
    newSelect.appendChild(
      createNode('option', {
        value: `${translation}`,
        innerText: `${languages[translation]}`,
      })
    );
  }

  newSelect.addEventListener('change', handleTrChange);

  select.after(newSelect);
}

function handleTrChange(event) {
  const selectedTranslation = event.target.value;
  setActualTranslation(selectedTranslation);

  countryEl.innerHTML = '';
  countryEl.append(
    getDetailsFragment(selectedCountry.at(-1)),
    areaPopulationDivFragment()
  );
}
