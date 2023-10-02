const { api_key } = require('../config.js');
const axios = require('axios');

const getWeather = async (location) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}`);

        const data = response.data;
        const weather = data.weather[0].description;
        const temperature = data.main.temp - 273.15;
        const city = data.name;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const pressure = data.main.pressure;

        return `The weather in ${city} is ${weather} with a temperature of ${temperature.toFixed()}°C. ` +
            `The humidity is ${humidity}%, the pressure is ${pressure} hPa, and the wind speed is ${windSpeed}m/s.`;

    } catch (error) {
        return "City or country doesn't exist";
    }
};

const getSum = (text) => {
    
    const arr = text.split("+");
    console.log(text, arr);
    return Number(arr[0]) + Number(arr[1]);
}

module.exports = { getWeather, getSum };