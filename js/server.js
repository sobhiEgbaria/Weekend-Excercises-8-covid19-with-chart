const countriesApi ="https://nameless-citadel-58066.herokuapp.com/https://restcountries.herokuapp.com/api/v1";
const covidApi ="https://corona-api.com/";


export async function getCountriesByContinent(continent){
    const data = await axios.get(`${countriesApi}/region/${continent}`);
    const countriesData = data.data.map(country=>{
        return {code: country.cca2, name: country.name.common} // arr of obj have name and code
    });
    const covidData = await getCovidByContinent(countriesData);
    return covidData;
}


export async function getCovidByCountry(countryCode){
    const data = await axios.get(`${covidApi}countries/${countryCode}`);
    return data;

}


export async function getCovidByContinent(countriesData){
    let countryData= [];
    for await (let country of countriesData){
        const data =  await getCovidByCountry(country.code);
        countryData.push({name: country.name, code:country.code, data: data.data.data.latest_data});
    }
    
    return countryData;
}


