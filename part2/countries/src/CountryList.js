import React from 'react'

function CountryList({ countries, handleShowButtonClick }) {
    return (
        <>
            {
                countries.length > 10 ?
                    <div>Too many matches. Specify another filter</div> :
                    countries.map(country => {
                        return (
                            <div key={country.alpha3Code}>
                                {country.name}
                                <button onClick={() => { handleShowButtonClick(country) }}>Show</button>
                            </div>
                        )
                    })
            }
        </>
    )
}

export { CountryList };
