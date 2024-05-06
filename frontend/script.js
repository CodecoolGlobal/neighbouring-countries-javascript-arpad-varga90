import countries from './data.js';

function main() {
  addOptions();
}

function addOptions() {
  countries.sort((a, b) => {
    if (a.name.common < b.name.common) {
      return -1;
    }
    if (a.name.common > b.name.common) {
      return 1;
    }
    return 0;
  });
  const all = document.querySelector('#all');
  const optionDefault = document.createElement('option');
  optionDefault.innerText = 'Please choose a countrie';
  all.append(optionDefault);
  for (const countrie of countries) {
    const option = document.createElement('option');
    option.innerText = countrie.name.common;
    all.append(option);
  }
}

main();
console.log(countries);
