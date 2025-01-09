import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import('dotenv')
const Joker = () => {
    const [joke, setJoke] = useState(''); // State for the joke
    const [location, setLocation] = useState(''); // State for the input location
    const [weather, setWeather] = useState(null); // State for the weather data

    // Fetch a new joke
    const fetchJoke = () => {
        axios
            .get('https://official-joke-api.appspot.com/jokes/programming/random')
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    setJoke(`${response.data[0].setup} - ${response.data[0].punchline}`);
                }
            })
            .catch((error) => {
                console.error('Error fetching joke:', error);
            });
    };

    // Fetch weather for the entered location

    const [loading, setLoading] = useState(false); // State for loading

    const fetchWeather = () => {
        if (!location.trim()) {
            alert('Please enter a valid location!');
            return;
        }
        setLoading(true)
        const apiKey = '11d1a66f20d0c3fa18946ae813424cff';
        // const apiKey = process.env.REACT_APP_Wheather;
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
            .then((response) => {
                setWeather({
                    temp: response.data.main.temp,
                    description: response.data.weather[0].description,
                    city: response.data.name,
                });
            })
            .catch((error) => {
                console.error('Error fetching weather:', error);
                alert('Something went wrong. Please try again.');
                setWeather(null);
            })
            .finally(() => setLoading(false));
    };

    // return (
    //     <div>
    //         {loading ? <p>Loading...</p> : null}
    //     </div>
    // );

    return (
        <div className="container text-center mt-5">
            <div className="card shadow p-4 mb-4">
                <h1 className="mb-4">Programmig Joke</h1>
                <button className="btn btn-primary mb-3" onClick={fetchJoke}>
                    Get New Joke
                </button>
                <p className="alert alert-info">{joke ? joke : 'Click the button to fetch a joke!'}</p>
            </div>

            <div className="card shadow p-4">
                <h1 className="mb-4">Weather App</h1>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter location"
                    />
                    <button className="btn btn-secondary" onClick={fetchWeather}>
                        Get Weather
                    </button>
                </div>
                {weather ? (
                    <div className="alert alert-success">
                        <h2>{weather.city}</h2>
                        <p>Temperature: {weather.temp}&#8451;</p>
                        <p>Condition: {weather.description}</p>
                    </div>
                ) : (
                    <p className="alert alert-warning">Enter a location to get the weather details!</p>
                )}
            </div>
        </div>
    );
};

export default Joker;
