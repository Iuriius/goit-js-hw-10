import './css/styles.css';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

fetch('http://restcountries.com/v3.1/${inputName}/')
    .then(response => {
        return response.json();
    })
    .then(name => {
        console.log(name);
    })
    .catch(error => {
        console.log(error);
    })

function createMarkup(arr) {
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
                </div >
            </div>`;
    })
}
refs.list.innerHTML = markup