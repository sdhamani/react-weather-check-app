import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  const [countries , setCountries] = useState([]);

  const [singleCountry , setSingleCountry] = useState("");

  const [cities, setCities] = useState(null);

  const [singleCity ,setsingleCity] = useState("");

  const [submit , setsubmit] = useState(false);

  const [weather , setweather] = useState("");

  const [imgSRC , setImgSrc] = useState("");

  const getCountries = async() => {
    try{
      const country = await axios.get("https://countriesnow.space/api/v0.1/countries");
      setCountries(country.data.data);
    }
    catch(error){
      console.log(error); 
    }
    

    }

  function findCities(country){
    setsubmit(false)
    setsingleCity(null)
    setSingleCountry(country)
    const findcities = countries.find((c) => c.country === country)
    setCities(findcities.cities)
    }

  function submitHandler(){
    if(singleCountry && singleCity){
        setsubmit(true)
    }

    const options = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/weather',
      params: {
        q: singleCity,
      },
      headers: {
        'x-rapidapi-key': 'ea079904a3msh1659185b9db3094p1c73b4jsn8f8a444ea999',
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
      }
    };
  
    axios.request(options).then(function (response) {
      setweather(response.data.weather[0])
      setImgSrc("http://openweathermap.org/img/wn/"+response.data.weather[0].icon+"@2x.png")
      console.log(imgSRC)
      console.log(response.data.weather[0]);
  
    }).catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    getCountries()
  }, [])

  return (
    <div className="App">
      <div className="App-header">
        <h1>Select Your Hometown</h1>
        <div>
          { countries && <select  onChange={(e) => findCities(e.target.value)} value={singleCountry}>
            <option selected hidden disabled>
              select country
            </option>
            {
              countries.map((country) =>
                  <option key={`${country.country}`} value={country.country}>{country.country}</option>
              )
            }
          </select>}
          {cities && ( <select onChange ={(e) => (setsingleCity(e.target.value))}  value={singleCity}>
            <option disabled selected hidden>
              select town 
            </option>
            {
              (cities).map((city) =>
                <option  value={city}  key={city}>{city}</option>
              ) 
            }
          </select>)}
          <button onClick={submitHandler}>Go</button>
        </div>
        <div className="result">
          {
            submit && weather.description && (
            <div>
              <img className="img" alt="NA" src={imgSRC}></img>
              {weather.description && <h3>{(weather.description).toUpperCase()}</h3>}
            </div>
            )
            
          }
        </div>
      </div>
    </div>
  );  
}

export default App;



