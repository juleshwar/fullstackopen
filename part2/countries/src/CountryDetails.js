import React from 'react';

const CountryDetails = ({ country }) => {
    return (
        <div>
            <h3>{country.name}</h3>
            <div>Capital: {country.capital}</div>
            <div>Population: {country.population}</div>
            <h4>Languages</h4>
            <ul>
                {
                    country.languages
                        .map(({ iso639_1, name }) =>
                            <li key={iso639_1}>{name}</li>)
                }
            </ul>
            <img
                src={country.flag}
                alt={`${country.name} flag`}
                width="150px"
            />
        </div>
    )
}

export { CountryDetails };