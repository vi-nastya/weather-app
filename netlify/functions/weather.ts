import { Handler } from "@netlify/functions";
import { AxiosError } from "axios";

const axios = require("axios");

const WEATHER_API_URL = "https://api.openweathermap.org/data/3.0/onecall";

const handler: Handler = async (event, context) => {
  try {
    const lat = event.queryStringParameters?.lat || "";
    const lon = event.queryStringParameters?.lon || "";
    const response = await axios.get(
      `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${process.env.OPENWEATHER_APPID}&units=metric`
    );
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: (err as AxiosError).toString(),
    };
  }
};

export { handler };
