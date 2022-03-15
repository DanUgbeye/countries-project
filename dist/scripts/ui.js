class UI {

  loadCountries = async (data) => {

    if(data.length < 1) return null;
    let countries = '';

    for(let i = 0; i < data.length; i++) {
    
      countries += `
      
      <!-- ${(data[i].name).toUpperCase()} -->
      <div id="country" class=" w-fit shadow-md overflow-hidden rounded-md ">

        <img src="${data[i].flag}" alt="${data[i].name} flag" class=" min-w-[15rem] max-h-[7.5rem] min-h-[7.5rem] " loading="lazy" />

        <div class=" p-4 bg-[hsl(0_0%_100%)] ">

          <h3 id="country-name" class=" font-[600] text-xl mb-3 ">
            ${data[i].name}
          </h3>

          <p class=" font-[600] text-[14px]  ">
            Population: 
            <span id="population" class=" font-light ">${data[i].population}</span> 
          </p>

          <p class=" font-[600] text-[14px] ">
            Region: 
            <span id="region" class=" font-light ">${data[i].region}</span> 
          </p>

          <p class=" font-[600] text-[14px] ">
            Capital: 
            <span id="capital" class=" font-light ">${data[i].capital}</span>
          </p>

        </div>
      </div>     
      
      `;
  
    }

    return countries;
  }

  displayCountries = (countries) => {
    if(countries == null) return;
    document.querySelector('#country-container').innerHTML = countries;
  }

  viewCountry = (country) => {

  }

}