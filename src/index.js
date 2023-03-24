import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const inputSearchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

inputSearchBox.addEventListener(
  'input',
  debounce(() => {
    const trimmedInputValue = inputSearchBox.value.trim();
    cleanHtml();
    if (trimmedInputValue !== '') {
        fetchCountries(trimmedInputValue).then(foundData => {
            switch (true) {   
                case foundData.length === 0:
                    Notiflix.Notify.failure('Oops, there is no country with that name');
                    break;
                case foundData.length >= 2 && foundData.length <= 10:
                    renderCountryList(foundData);
                    break;
                case foundData.length === 1:
                    renderOneCountry(foundData);
                    break;
                default:
                    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                    break;
            }
        });
    }
  }, DEBOUNCE_DELAY)
);

function renderCountryList(countries) {
  const markupCountryList = countries
    .map(country => {
      return `<li><img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20"><p>${country.name.official}</p></li>`;
    }).join('');

  countryList.innerHTML = markupCountryList;
}

function renderOneCountry(countries) {
  const markupOneCountry = countries
    .map(country => {
      return `<li><img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20"><p>${country.name.official}</p><p><b>Capital</b>: ${country.capital}</p><p><b>Population</b>: ${country.population}</p><p><b>Languages</b>: ${Object.values(country.languages)} </p></li>`;
    }).join('');

  countryList.innerHTML = markupOneCountry;
}

function cleanHtml() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}