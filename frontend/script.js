import countries from './data.js';

function main() {
  addOptions()
}

function addOptions() {
  const all = document.querySelector('#all');
  for (const countrie of countries) {
    const option = document.createElement('option');
    option.innerText = countrie.name.common;
    all.append(option);
  }
}


main();
console.log(countries);
