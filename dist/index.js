import {showCountries, saveCountryDetails, toggleTheme, searchCountry, filterCountries} from './scripts/app.js';

document.addEventListener('click', (e) => {
  // console.log(e.target.id);
  saveCountryDetails(e);

})

window.onload = () => {
  showCountries();
  toggleTheme();
  searchCountry();
  filterCountries();
}

