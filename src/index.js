import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetch-countries';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

input.addEventListener(
  'input',
  debounce(() => {
    const trimmedValue = input.value.trim();
    cleanHtml();
    if (trimmedValue !== '') {
        fetchCountries(trimmedValue).then(foundData => {
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