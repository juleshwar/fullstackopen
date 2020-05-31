import React from 'react'

function CountryList({ countries }) {
    return (
        <>
            {
                countries.length > 10 ?
                    <div>Too many matches. Specify another filter</div> :
                    countries.map(country => <div key={country.alpha2Code}>{country.name}</div>)
            }
        </>
    )
}

export { CountryList };
