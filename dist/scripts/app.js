import { COUNTRY } from "./country.js";
import { UI } from "./ui.js";

const country = COUNTRY;
const ui = UI;

const showCountries = async () => {

  const data = JSON.parse(localStorage.getItem('data'));

  if(data) {
    const countries = await ui.loadCountries(data);
    ui.displayCountries(countries);
    return;
  }
  
  const res = await country.get('https://restcountries.com/v2/all');
  localStorage.setItem('data', JSON.stringify(res.data));
  if(res != undefined) {
    if(res.error) {
      ui.showError(res.error); 
      return;
    }
  }
    
  if(res) {
    const data = await res.data;
    const countries = await ui.loadCountries(data);
    ui.displayCountries(countries);
  }

}

const saveCountryDetails = (e) => {
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
      // let data = JSON.stringify(element.dataset);
      if(element.dataset) {
        // console.log(element, element.dataset);
        if(element.dataset.country) {
          e.preventDefault();
          isCountryElement = true;
          country = element.dataset.country;
          console.log(country);
          localStorage.setItem('selectedCountry', JSON.stringify(country));
          window.location.href = '/countries-project/dist/details/';
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

export {showCountries, saveCountryDetails, showCountryDetails};