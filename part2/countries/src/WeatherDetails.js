import React, { useState, useEffect } from 'react'
import axios from 'axios'
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY

function WeatherDetails({ countryName }) {
    const [weatherDetails, setWeatherDetails] = useState({});

    const isObjectEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

    useEffect(() => {
        const axiosSource = axios.CancelToken.source();
        axios
            .get(`http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${countryName}`, { cancelToken: axiosSource.token })
            .then(response => {
                setWeatherDetails(response.data);
            })
            .catch(_ => {
                /** 
                * ! Don't try to set state here because though the xhr call is aborted in the cleanup code, 
                * ! the catch function still stays live even after the component has been unmounted
                */
                // setWeatherDetails({});
            })

        return () => axiosSource.cancel('Name changed');
    }, [countryName])
    return (isObjectEmpty(weatherDetails)) ?
        null :
        (
            <div>
                <h3>Weather in {countryName}</h3>
                <div>Temperature: {weatherDetails.current.temperature} ºC</div>
                <img src={weatherDetails.current.weather_icons[0]} alt={weatherDetails.current.weather_descriptions[0]} />
                <div>Wind: {weatherDetails.current.wind_speed} mph ({weatherDetails.current.wind_dir})</div>
            </div>
        )
}

export { WeatherDetails }
