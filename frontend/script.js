import countries from './data.js';

function main() {
  addOptions();
}

function addOptions() {
  countries.sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );
  const all = document.querySelector('#all');
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
