import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWeather } from "../api/weatherService";
import { debounce } from "lodash";
import { transformWeatherData } from "../shared/helpers";

const CACHE_KEY = "weatherHistory"; // Key for AsyncStorage
const MAX_CACHE_SIZE = 100;

// ViewModel for Weather Screen
const useWeatherViewModel = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch Weather with Caching
  const fetchWeather = async (cityName: string) => {
    if (!cityName) return;

    try {
      const cachedDataString = await AsyncStorage.getItem(CACHE_KEY);
      const cachedData = cachedDataString ? JSON.parse(cachedDataString) : [];

      // Check if the city exists in cache
      const existingRecord = cachedData.find(
        (item: any) => item.city.toLowerCase() === cityName.toLowerCase()
      );

      if (existingRecord) {
        setWeather(existingRecord);
        return;
      }

      // Fetch new data if city is not found in cache
      const newWeatherData = await getWeather(cityName);
      if (!newWeatherData) throw new Error("No data received from API");

      const newRecord = { ...transformWeatherData(newWeatherData), city: cityName };
      const updatedCache = [newRecord, ...cachedData].slice(0, MAX_CACHE_SIZE);
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(updatedCache));

      setWeather(newRecord);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  // Debounce Input Handling
  const debouncedFetchWeather = useCallback(debounce(fetchWeather, 500), []);

  // Handle Input Change
  const handleInputChange = (text: string) => {
    setCity(text);
    debouncedFetchWeather(text);
  };

  // Handle Refresh
  const onRefresh = async () => {
    if (!city) return;
    setRefreshing(true);
    await fetchWeather(city);
    setRefreshing(false);
  };

  return {
    city,
    weather,
    refreshing,
    handleInputChange,
    onRefresh,
  };
};

export default useWeatherViewModel;
