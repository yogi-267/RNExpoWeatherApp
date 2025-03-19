import axios from "axios";
import Constants from "expo-constants";

const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const API_KEY = Constants.expoConfig?.extra?.API_KEY;

export async function getWeather(city: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/${city}?unitGroup=metric&key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}
