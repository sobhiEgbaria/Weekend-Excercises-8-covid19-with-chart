import {getCountriesByContinent} from './server.js';
import {getCovidByCountry} from './server.js';

let chosenContenent = 'africa';

let Button = document.querySelectorAll(".continent");
Button.forEach((btn) => { btn.addEventListener("click", () => {

  // myChart.distroy(); 
  chosenContenent = btn.value;
  console.log(chosenContenent); 
  // getChart(); 
 })});

export async function getChart (){ 
  const countries = await getCountriesByContinent(`${chosenContenent}`);//TODO: replace by selected content 
    const labels = countries.map(country=>{
      return country.name
    });

    const covidData = countries.map(country=>{
      return country.data.confirmed;//TODO: replace with status
    })

      const data = {
        labels: labels,
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: covidData,
        }]
      };
    
      const config = {
        type: 'bar',
        data: data,
        options: {}
      };
    
      const myChart = new Chart(document.getElementById('myChart'),config);
      
      

}
