import {showCountryDetails, saveCountryDetails, toggleTheme} from '../scripts/app.js';

document.addEventListener('click', (e) => {
  saveCountryDetails(e, 'details');

})

window.onload = () => {
  showCountryDetails();
  toggleTheme('details');
}
