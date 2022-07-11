# Weather App

An app for displaying weather in selected cities. Weather data is fetched from [OpenWeather API](https://openweathermap.org/api/one-call-3) via [Netlify function](https://www.netlify.com/products/functions/) to avoid exposing API key.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the project locally

1. Make sure you have your API key. You can get one on the [OpenWeather website]((https://openweathermap.org/api/one-call-3)). Create `.env` file in the project root directory and add your API key there as `OPENWEATHER_APPID` (see `.env.example` for reference).

2. Install the dependencies `npm i`.

3. Start the project `npm run dev`.

## Customization

If you want to change cities, please update `src/constants/cities.tsx`.
