import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CountryList } from './CountryList';
import { CountryDetails } from './CountryDetails';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  function searchCountriesByName(event) {
    setSearchTerm(event.target.value);
  }
  useEffect(
    () => {
      if (searchTerm) {
        axios
          .get(`https://restcountries.eu/rest/v2/name/${searchTerm}`)
          .then(response => {
            setCountries(response.data);
          })
          .catch(_ => {
            setCountries([]);
          })
      } else {
        setCountries([]);
      }
    }
    , [searchTerm]
  );

  return (
    <div className="App">
      <div className="countries-search-form">
        find  countries <input value={searchTerm} onChange={searchCountriesByName} />
      </div>
      <div className="countries-content">
        {
          countries.length === 1 ?
            <CountryDetails country={countries[0]} /> :
            <CountryList countries={countries} />
        }
      </div>
    </div>
  );
}

export default App;
