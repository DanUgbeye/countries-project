import { COUNTRY } from "./country.js";

const UI = {

  showCountries : async (data) => {

    let countries = '';
    console.log(data);

    if(data.length < 1 || data.message == 'Page Not Found') {
      countries = `
        <img src="./assets/img/no-results.svg" alt="No results" class=" max-w-[15rem] max-h-[7.5rem] md:max-w-[20rem] md:max-h-[10rem] " />
      `;
      document.querySelector('#country-container').innerHTML = countries;
      return ;
    }

    for(let i = 0; i < data.length; i++) {
    
      countries += `
      
      <!-- ${(data[i].name).toUpperCase()} -->
      <a href="#" id="country" data-country="${data[i].alpha3Code}" data-id="${i}" class=" w-full max-w-[20rem] shadow-md overflow-hidden rounded-md bg-secondary h-full mb-12 p-0 flex flex-col sm:mb-0 sm:col-span-6 md:col-span-4 lg:col-span-3 ">

        <img src="${data[i].flag}" alt="${data[i].name} flag" class=" max-h-[40%] min-h-[40%] table overflow-auto " loading="lazy" />

        <div class=" p-6 h-full ">

          <h3 id="country-name" class=" font-[600] text-xl mb-3 ">
            ${data[i].name}
          </h3>

          <p class=" font-[600] mb-2 text-[14px]  ">
            Population: 
            <span id="population" class=" font-light ">${data[i].population.toLocaleString("en-US")}</span> 
          </p>

          <p class=" font-[600] mb-2 text-[14px] ">
            Region: 
            <span id="region" class=" font-light ">${data[i].region}</span> 
          </p>

          <p class=" font-[600] mb-2 text-[14px] ">
            Capital: 
            <span id="capital" class=" font-light ">${data[i].capital ? data[i].capital : 'none'}</span>
          </p>

        </div>
      </a>     
      
      `;
  
    }

    if(countries == null) return;
    document.querySelector('#country-container').innerHTML = countries;

  },

  showDetails : (country) => {

    // console.log(country);
    //loading the currencies to display
    let currencies = '';
    for(let i = 0; i < country.currencies.length; i++) {
      currencies += `${country.currencies[i].name}`;
      if(i < country.currencies.length - 1) {
        currencies += ', ';
      }
    }

    //loading the languages to display
    let languages = '';
    for(let i = 0; i < country.languages.length; i++) {
      languages += `${country.languages[i].name}`;
      if(i < country.languages.length - 1) {
        languages += ', ';
      }
    }

    // loading the border countries to display
    let borderCountries = '';
    if(country.borders) {

      for(let i = 0; i < country.borders.length; i++) {
  
        let data = JSON.parse(localStorage.getItem('data'));
        if(!data) {
          //if there is no data in localstorage then fetch online
          const res = COUNTRY.get('https://restcountries.com/v2/all');
          if(res.error) {
            UI.showError(res.error);
            return;
          }
          data = res.data;
        }
        let borderCountry = COUNTRY.getCountryByAlpha3Code(country.borders[i]);
  
        borderCountries += `
          <a href="#" id="country" data-country="${borderCountry.alpha3Code}" class=" min-w-[8rem] max-w-[8rem] bg-secondary shadow-md py-1 px-4 rounded-sm justify-center flex items-center ">
            ${borderCountry.name}
          </a>
        `;
  
      }

    }

    let details = `
    
      <img src="${country.flag}" alt="${country.name} flag" class=" max-w-[20rem] max-h-[calc(20rem/2)] min-w-[300px] md:h-fit md:w-full lg:max-w-[800px] lg:max-h-[calc(800px/2)] flex items-start justify-start " loading="lazy" />

      <div class=" md:w-full h-fit ">

        <h3 id="country-name" class=" font-[600] text-2xl mb-3 ">
          ${country.name}
        </h3>

        <div id="country-details" class=" flex gap-8 my-8 flex-col   lg:flex-row ">

          <!-- LEFT SIDE -->
          <div class=" w-full max-w-[350px] ">

            <p class=" font-[600] mb-2 text-[14px]  ">
              Native Name: 
              <span id="native-name" class=" font-light ">${country.nativeName}</span> 
            </p>

            <p class=" font-[600] mb-2 text-[14px]  ">
              Population: 
              <span id="population" class=" font-light ">${country.population.toLocaleString("en-US")}</span> 
            </p>

            <p class=" font-[600] mb-2 text-[14px] ">
              Region: 
              <span id="region" class=" font-light ">${country.region}</span> 
            </p>

            <p class=" font-[600] mb-2 text-[14px] ">
              Sub Region: 
              <span id="sub-region" class=" font-light ">${country.subregion}</span>
            </p>

            <p class=" font-[600] mb-2 text-[14px] ">
              Capital: 
              <span id="capital" class=" font-light ">${country.capital ? country.capital : 'none'}</span>
            </p>

          </div>

          <!-- RIGHT SIDE -->
          <div class=" w-full ">

            <p class=" font-[600] mb-2 text-[14px]  ">
              Top Level Domain: 
              <span id="top-level-domain" class=" font-light ">${country.topLevelDomain}</span> 
            </p>

            <p class=" font-[600] mb-2 text-[14px]  ">
              Currencies: 
              <span id="currency" class=" font-light ">${currencies}</span>
            </p>

            <p class=" font-[600] mb-2 text-[14px]  ">
              Languages: 
              <span id="languages" class=" font-light ">${languages}</span> 
            </p>

          </div>

        </div>

        <!-- BORDER COUNTRIES -->
        <div id="border-countries" class=" flex flex-col lg:flex-row gap-2 lg:items-baaseline  ">

          <p class=" font-[600] text-[14px]  ">
            Border&nbsp;Countries: 
          </p>

          <div class="  w-full grid auto-rows-[1fr] grid-cols-[repeat(auto-fill,_8rem)] gap-1 py-4 lg:py-0  ">
            ${borderCountries}
          </div>

        </div>

      </div>
    `
    document.querySelector('#details-container').innerHTML = details;

  },

  theme : (mode, details) => {

    let linkAmmend = '';
    if(details === 'details') {
        linkAmmend = '.';
    }

    const lightMode = `
      <img src="${linkAmmend}./assets/img/light-mode.svg" alt="light mode" class="max-w-[1.5rem] w-[1.5rem] ">
      <span>Light&nbsp;Mode</span> 
    `;

    const darkMode = `
      <img src="${linkAmmend}./assets/img/dark-mode.svg" alt="dark mode" class="max-w-[1.5rem] w-[1.5rem] ">
      <span>Dark&nbsp;Mode</span> 
    `;
    const root = document.querySelector('html');
    const toggleButton = document.querySelector('#theme-toggle');

    if(!mode) {
      if(root.classList.contains('dark-mode')) {
        toggleButton.innerHTML = darkMode;
        localStorage.setItem('theme', 'light');
      }else {
        toggleButton.innerHTML = lightMode;
        localStorage.setItem('theme', 'dark');
      }
      root.classList.toggle('dark-mode');
      return;
    }

    if(mode === 'light') {
      toggleButton.innerHTML = darkMode;
      root.classList.remove('dark-mode');
    }else if(mode === 'dark') {
      toggleButton.innerHTML = lightMode;
      root.classList.add('dark-mode');
    }


  },

  showError : (error) => {

    let message = `
    <div id="error" class=" absolute left-[50%] right-[50%] translate-x-[-50%] top-0  flex flex-col md:flex-row items-center text-red-700 p-4 w-full min-w-[15rem] h-fit  ">
      <img src="./assets/img/warning.svg" alt="warning" class=" max-w-[10rem] " />
      <div class=" text-2xl  ">An error occured, try again later</div>
    </div>
    `;

    let container = document.querySelector('#country-container');
    if(!container) {
      container = document.querySelector('#details-container');
    }

    container.innerHTML = message;
    

  }
}

export {UI};