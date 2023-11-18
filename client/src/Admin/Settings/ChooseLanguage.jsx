//(React frontend)

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CountryList() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('/api/countries')
      .then(response => setCountries(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>List of Countries</h1>
      <ul>
        {countries.map(country => (
          <li key={country._id}>
            <strong>{country.name}</strong>: {country.languages.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CountryList;
