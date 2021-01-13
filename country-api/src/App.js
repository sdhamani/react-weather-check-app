import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {

  const [countries , setCountries] = useState([]);

  const [singleCountry , setSingleCountry] = useState("");

  const [cities, setCities] = useState(null);

  const [singleCity ,setsingleCity] = useState("");

  const [submit , setsubmit] = useState(false);

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
      const findcities = countries.find((c) => c.country ===country)
      setCities(findcities.cities)
    }

  function submitHandler(){
      if(singleCountry && singleCity){
        setsubmit(true)
      }
    }

  useEffect(() => {
    getCountries()
  }, [])

  return (
    <div className="App">
      <div className="App-header">
        <h1>Select Your Hometown</h1>
        <div>
          { countries && <select  onChange={(event) => findCities(event.target.value)} value={singleCountry}>
            <option disabled selected hidden>
              select country
            </option>
            {
              countries.map((country) =>
                  <option key={`${country.country}`} value={country.country}>{country.country}</option>
              )
            }
          </select>}
          {cities &&  <select onChange ={(event) => (setsingleCity(event.target.value))}  value={singleCity}>
            <option disabled selected hidden>
              select town 
            </option>
            {
              (cities).map((city1) =>
                <option key={city1} value={city1}>{city1}</option>
              ) 
            }
          </select>}
          <button onClick={submitHandler()}>Go</button>
        </div>
        <div>
          {
            submit && (<h1>Your country is {singleCountry} and your city is {singleCity}</h1>)
          }
        </div>
      </div>
    </div>
  );  
}

export default App;

