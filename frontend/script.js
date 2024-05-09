import countries from './data.js';

const all = document.querySelector('#all');
const population = document.querySelector('#population');
const area = document.querySelector('#area');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const mapPointer = document.querySelector('#map_pointer');
const countryEl = document.getElementById('country');

let arrPointer;
const getCurrentIndex = () => arrPointer;
const setCurrentIndex = (value) => (arrPointer = value);

let actualTranslation;
const getActualTranslation = () => actualTranslation;
const setActualTranslation = (value) => (actualTranslation = value);

const selectedCountry = [];

function main() {
  addOptions();
  all.addEventListener('change', runOnce, { once: true });
  all.addEventListener('change', handleSelect);
  all.addEventListener('change', console.log('ok'));
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

function showOnMap(lastSelected) {
  const geoInfo = lastSelected.latlng;
  const lat = (Math.abs(geoInfo[0] - 90) / 180) * 100;
  const lng = ((geoInfo[1] + 180) / 360) * 100;
  mapPointer.style = `visibility: visible; top: ${lat}%; left: ${lng}%`;
}

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

  population.removeAttribute('hidden');
  area.removeAttribute('hidden');
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
  countryEl.innerHTML = '';
  countryEl.appendChild(getDetailsFragment(selectedCountry[currentIndex]));
  showOnMap(selectedCountry[currentIndex]);
}

function handlePrevClick() {
  let currentIndex = getCurrentIndex();

  currentIndex--;
  setCurrentIndex(currentIndex);
  toggleDisableAttrib(currentIndex);
  countryEl.innerHTML = '';
  countryEl.appendChild(getDetailsFragment(selectedCountry[currentIndex]));
  showOnMap(selectedCountry[currentIndex]);
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



main();
