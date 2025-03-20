import Constants from "expo-constants";

const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const API_KEY = Constants.expoConfig?.extra?.API_KEY;

// Fetches weather data for a given city.
export async function getWeather(city: string): Promise<any> {
  try {
    const response = await fetch(
      `${BASE_URL}/${city}?unitGroup=metric&key=${API_KEY}`
    );
    if (!response.ok) {
      // console.error(`HTTP error! Status: ${response.status}`);
      return null;
    }
    return await response.json();
  } catch (error: any) {
    // console.error("Error fetching weather data:", error);
    return null;
  }
}
