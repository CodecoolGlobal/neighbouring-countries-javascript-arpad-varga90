import countries from './data.js';

const all = document.querySelector('#all');

for (const countrie of countries) {
  const option = document.createElement('option');
  option.innerText = countrie.name.common;
  all.append(option);
}

console.log(countries);
