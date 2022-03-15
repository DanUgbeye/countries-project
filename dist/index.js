import {showCountries, saveCountryDetails} from './scripts/app.js';

document.addEventListener('click', (e) => {
  // console.log(e.target.id);
  saveCountryDetails(e);

})

window.onload = () => {
  showCountries();
}

