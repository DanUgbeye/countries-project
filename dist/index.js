

const country = new COUNTRY();
const ui = new UI();

const showCountries = async () => {
  
  const res = await country.get('https://restcountries.com/v2/all');
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

window.onload = showCountries();