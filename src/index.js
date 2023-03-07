'use strict';

import './css/index.min.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputArea = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputArea.addEventListener(
  'input',
  debounce(() => {
    clearPreviousSearch();
    const name = inputArea.value.trim();
    if (name.length === 0) {
      return;
    }
    fetchCountries(name)
      .then(name => renderCountriesList(name))
      .catch(error => console.log(error));
  }, DEBOUNCE_DELAY)
);

function clearPreviousSearch() {
  while (countryList.firstChild) {
    countryList.firstChild.remove();
  }
  while (countryInfo.firstChild) {
    countryInfo.firstChild.remove();
  }
}

function renderCountriesList(name) {
  if (name === undefined) {
    return;
  }

  if (name.length > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }

  if (name.length === 1) {
    name.map(country => {
      const infoFlag = document.createElement('img');
      infoFlag.classList.add('info-flag');
      infoFlag.setAttribute('src', `${country.flags.svg}`);
      infoFlag.setAttribute('alt', `${country.name.official} flag`);
      infoFlag.setAttribute('width', `40`);

      const infoName = document.createElement('p');
      infoName.classList.add('info-name');
      infoName.textContent = `${country.name.official}`;

      const infoCapital = document.createElement('p');
      infoCapital.classList.add('info-capital');
      infoCapital.insertAdjacentHTML(
        'beforeend',
        `<span class="bolded">Capital:</span>${country.capital}`
      );

      const infoPopulation = document.createElement('p');
      infoPopulation.classList.add('info-population');
      infoPopulation.insertAdjacentHTML(
        'beforeend',
        `<span class="bolded">Population:</span>${country.population}`
      );

      const infoLanguages = document.createElement('p');
      infoLanguages.classList.add('info-languages');
      infoLanguages.insertAdjacentHTML(
        'beforeend',
        `<span class="bolded">Languages:</span>${Object.values(
          country.languages
        )}`
      );

      countryInfo.append(
        infoFlag,
        infoName,
        infoCapital,
        infoPopulation,
        infoLanguages
      );
    });
  }

  if (name.length > 1) {
    name.map(country => {
      const listElement = document.createElement('li');
      listElement.classList.add('country-item');
      countryList.append(listElement);

      const countryFlag = document.createElement('img');
      countryFlag.classList.add('country-flag');
      countryFlag.setAttribute('src', `${country.flags.svg}`);
      countryFlag.setAttribute('alt', `${country.name.official} flag`);
      countryFlag.setAttribute('width', `40`);

      const countryName = document.createElement('p');
      countryName.classList.add('country-name');
      countryName.textContent = `${country.name.official}`;

      countryList.lastChild.append(countryFlag, countryName);
    });
  }
}
