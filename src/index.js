import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from "./fetchCountries.js";

const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector(".country-list");
const countryCard = document.querySelector(".country-info");
const searchArea = document.querySelector("#search-box");

searchArea.addEventListener("input", debounce(searchQuery, DEBOUNCE_DELAY));

function searchQuery() {
    const searchValue = searchArea.value.trim();
    fetchCountries(searchValue).then(data => {
        if (data.length >= 10) {
            const markup = tooMany(data)
            countryList.innerHTML = "";
            console.log(markup);
            countryCard.innerHTML = "";
        }
        else if (data.length < 10 && data.length > 1) {
            const markup = countryListF(data)
            countryList.innerHTML = markup;
            console.log(markup);
            countryCard.innerHTML = "";
        }
        else if (data.length = 1) {
            const markup = countryCardF(data)
            countryCard.innerHTML = markup;
            countryList.innerHTML = "";
        }
        else (Error) => {
            notFound()
            countryList.innerHTML = "";
        }
    })
}

function countryCardF(arr) {
    return arr.map(({ flags, name, capital, population, languages }) => {
        return `<div class="card-title">
                    <img class="country-card-flag" src='${flags.svg}' alt='${name} flag' width="300"> 
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

function countryListF(arr) {
    return arr.map(({ flags, name }) => {
        return `<div class="card-title">
                    <img class="country-card-flag" src='${flags.svg}' alt='${name} flag' width="100"> 
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