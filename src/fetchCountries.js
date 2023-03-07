'use strict';
import Notiflix from 'notiflix';

const searchParams = new URLSearchParams({
  fields: 'name,region,capital,population,flags,languages',
});

export const fetchCountries = name => {
  return fetch(
    'https://restcountries.com/v3.1/name/' + name + `?${searchParams}`
  ).then(response => {
    if (response.status === 404) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    } else if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
