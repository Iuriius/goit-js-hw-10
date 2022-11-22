import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from "./fetchCountries.js";

const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector(".country-list");
const countryCard = document.querySelector(".country-card");
const searchArea = document.querySelector("#search-box");

searchArea.addEventListener("change", debounce(DEBOUNCE_DELAY, searchQuery));

function searchQuery() {
    const searchValue = searchArea.value.trim();
    fetchCountries(searchValue).then(data => {
        if (data.length > 10) {
            tooMany(data)
        }
        else if (data.length < 10 & data.length > 1) {
            countryList(data)
        }
        else if (Error) {
            notFound()
        } else {
            countryCard(data)
        }
    })
}

function countryCard(arr) {
    const markup = arr.map(({ flags, name, capital, population, languages }) => {
        return `<div class="card-title">
                    <img class="country-card-flag" src='${flags.svg}' alt='${name} flag'> 
                    <p class="country-name">${name.official}</p>
                <div>

                <div class="info">
                    <span class="info-label">Capital:</span>
                    <span class="info-value" data-capital>${capital}</span>
                </div>

                <div class="info">
                    <span class="info-label">Population:</span>
                    <span class="info-value" data-population>${population}</span>
                </div>

                <div class="info">
                    <span class="info-label">Languages:</span>
                    <span class="info-value" data-languages>${Object.values(languages)}</span> 
                </div>`;
    })
}

function countryList(arr) {
    const markup = arr.map(({ flags, name }) => {
        return `<div class="card-title">
                    <img class="country-card-flag" src='${flags.svg}' alt='${name} flag'> 
                    <p class="country-name">${name.official}</p>
                </div>`;
    })
}

function notFound() {
    Notify.failure("Oops, there's no country with that name!")
}

function tooMany() {
    Notify.failure("Too many matches found. Please enter a more specific name.")
}