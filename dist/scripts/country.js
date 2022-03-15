class COUNTRY {


  get = async (url) => {
    let resObj = {};
    try{
      let error;
      const res = await fetch(url);
      const data = await res.json();
      // console.log(data);
      resObj.data =  data;
      return resObj;

    }catch{(err) => {
      console.log(err);
      resObj.error = err;
    }}
  }

  filterByRegion = async (region) => {
    const url = `https://restcountries.com/v2/region/${region}`;
    const data = await this.get(url);
    return data;
  }

  searchCountry = async (param) => {
    const url = `https://restcountries.com/v2/name/${param}`;
    const data = await this.get(url);
    return data;
  }

}