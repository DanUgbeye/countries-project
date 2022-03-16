const COUNTRY = {


  get: async (url) => {
    let resObj = {};
    try{
      const res = await fetch(url);
      const data = await res.json();
      resObj.data = data;
      return resObj;

    }catch{(err) => {
      console.log(err);
      resObj.error = err;
    }}
  },

  filterByRegion: async (region) => {

    const url = `https://restcountries.com/v2/region/${region}`;
    const res = await COUNTRY.get(url);
    return res;
    
  },

  searchCountry: async (param, paramType) => {
    
    const url = `https://restcountries.com/v2/${paramType}/${param}`;
    const res = await COUNTRY.get(url);
    return res;

  },

  getCountryByAlpha3Code: (alpha3Code) => {
    let data = JSON.parse(localStorage.getItem('data'));
    let country;
    for(let i = 0; i < data.length; i++) {
      if(data[i].alpha3Code == alpha3Code) {
        country = data[i];
        break;
      }
    }

    return country;
  }

}

export {COUNTRY};