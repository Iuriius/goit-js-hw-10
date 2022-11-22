const BASE_URL = 'https://restcountries.com/v3.1/name/';
const filters = 'name.official,capital,population,flags,languages';

export default function fetchCountries(name) {
    fetch(`${BASE_URL}${name}?fields=${filters}`)
        .then(response => {
            return response.json();
        })
        .then(name => {
            console.log(name);
        })
        .catch(error => {
            console.log(error);
        })
};