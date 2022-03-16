import {showCountryDetails, saveCountryDetails, toggleTheme} from '../scripts/app.js';

document.addEventListener('click', (e) => {
  // console.log(e.target.id);
  saveCountryDetails(e);

})

window.onload = () => {
  showCountryDetails();
  toggleTheme();
}
