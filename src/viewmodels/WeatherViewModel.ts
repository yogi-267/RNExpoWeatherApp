import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWeather } from "../api/weatherService";

const CACHE_KEY = "weatherHistory"; // Key for AsyncStorage
const MAX_CACHE_SIZE = 100;

export default class WeatherViewModel {
  static async fetchWeather(city: string) {
    try {
      const cachedDataString = await AsyncStorage.getItem(CACHE_KEY);
      const cachedData = cachedDataString ? JSON.parse(cachedDataString) : [];

      // Check if the city exists in cache
      const existingRecord = cachedData.find(
        (item: any) => item.city.toLowerCase() === city.toLowerCase()
      );

      if (existingRecord) {
        return existingRecord;
      }

      // Fetch new data if city is not found in cache
      const newWeatherData = await getWeather(city);
      if (!newWeatherData) throw new Error("No data received from API");

      const newRecord = { ...newWeatherData, city };

      const updatedCache = [newRecord, ...cachedData].slice(0, MAX_CACHE_SIZE);

      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(updatedCache));

      console.log("Fetched new weather data ✅:", newRecord);
      return newRecord;
    } catch (error) {
      console.error("Error fetching weather:", error);
      return  null;
    }
  }
}
