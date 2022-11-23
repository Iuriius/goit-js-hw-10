const BASE_URL = 'https://restcountries.com/v3.1/name/';
const filters = 'name.official,capital,population,flags,languages';

export function fetchCountries(name) {
    return fetch(`${BASE_URL}${name}?fields=${filters}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json();
        })

};