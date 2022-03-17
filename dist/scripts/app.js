import { COUNTRY } from "./country.js";
import { UI } from "./ui.js";

const country = COUNTRY;
const ui = UI;

const showCountries = async () => {

  const data = JSON.parse(localStorage.getItem('data'));

  if(data) {
    ui.showCountries(data);
    return;
  }

  try {
    const res = await country.get('https://restcountries.com/v2/all');
    localStorage.setItem('data', JSON.stringify(res.data));
    if(res != undefined) {
      if(res.error) {
        ui.showError(res.error); 
        return;
      }
    }
      
    if(res) {
      data = await res.data;
      ui.showCountries(data);
    }
  } catch(err) {
    ui.showError(err)
  }
  

}

const saveCountryDetails = (e, details) => {
  let country;
  let isCountryElement = false;
  let path;
  if(e.path){
    //for chrome browsers
    path = e.path;
  }else if(e.composedPath()) {
    // for firefox browser
    path = e.composedPath();
  }

  if(path){
    e.composedPath().every( element => {
      if(element.dataset) {
        if(element.dataset.country) {
          e.preventDefault();
          isCountryElement = true;
          country = element.dataset.country;
          localStorage.setItem('selectedCountry', JSON.stringify(country));
          if(details === 'details') {
            let link = window.location.href;
            console.log(link);
            window.location.href = link;
            return false;
          }
          window.location.href = './details/';
          return false;
        }
        return true;

      }else {
        return true;
      }
    });
  }

  if(isCountryElement == false) return;
  
}

const showCountryDetails = () => {

  let selectedCountry = JSON.parse(localStorage.getItem('selectedCountry'));

  let theCountry = country.getCountryByAlpha3Code(selectedCountry);
  
  if(!theCountry) return;

  ui.showDetails(theCountry);

}

const toggleTheme = (details) => {
  const toggleButton = document.querySelector('#theme-toggle');
  const theme = localStorage.getItem('theme');
 
  if(theme) {
    ui.theme(theme, details);
  }
  toggleButton.addEventListener('click', () => {
    ui.theme('', details);
  });
}

const searchCountry = async () => {

  let searchInput = document.querySelector('#search');

  //empty search input when it is clicked on
  searchInput.addEventListener('click', () => {
    searchInput.value = '';
  });

  //fetch the country that is inputed
  searchInput.addEventListener('input', async () => {
    let param = searchInput.value;
    let paramType = 'name';

    //if the search input is not empty
    if(param) {
      const res = await country.searchCountry(param, paramType);
  
      if(res) {
        if(res.error) {
          ui.showError(res.error);
          return;
        }
        const data = await res.data;
        ui.showCountries(data);
        return;
      }
    }

    //if the search input is empty, show all countries
    showCountries();
  })

}

const filterCountries = async () => {

  let region = document.querySelector('#region')
  region.addEventListener('change', async () => {
    const selectedRegion = region.value;
    const res = await country.filterByRegion(selectedRegion);

    if(res.error) {
      ui.showError(res.error);
      return;
    }
    const data = await res.data;
    ui.showCountries(data);
  });

}

export {showCountries, saveCountryDetails, showCountryDetails, toggleTheme, searchCountry, filterCountries};