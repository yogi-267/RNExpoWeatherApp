import WeatherCard from "@/src/components/WeatherCard";
import WeatherViewModel from "@/src/viewmodels/WeatherViewModel";
import React, { useState, useCallback } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  TextInput,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { debounce } from "lodash";
import { StatusBar } from "expo-status-bar";
import { Weather } from "../models/Weather";
import { Ionicons } from "@expo/vector-icons";

const WeatherScreen = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const colorScheme = useColorScheme(); // Detects system theme

  // handling fetch weather
  const fetchWeather = async (cityName: string) => {
    if (!cityName) return;
    const data: Weather = await WeatherViewModel.fetchWeather(cityName);
    setWeather(data);
  };

  // Debouncing search input
  const debouncedFetchWeather = useCallback(debounce(fetchWeather, 500), []);

  // Handling input change
  const handleInputChange = (text: string) => {
    setCity(text);
    debouncedFetchWeather(text); // Debounced API Call
  };

  // Handle Pull-to-Refresh
  const onRefresh = async () => {
    if (!city) return;
    setRefreshing(true);
    await fetchWeather(city);
    setRefreshing(false);
  };

  return (
    <View
      style={[
        styles.container,
        colorScheme === "dark" ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      <StatusBar />
      <View
        style={[
          styles.inputView,
          colorScheme === "dark" ? styles.darkInput : styles.lightInput,
        ]}
      >
        <Ionicons name="search" size={24} color="black" />
        <TextInput
          style={[styles.input]}
          placeholder="Search for a city..."
          placeholderTextColor={colorScheme === "dark" ? "#ccc" : "#888"}
          value={city}
          onChangeText={handleInputChange}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <WeatherCard weather={weather} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  inputView: {
    flexDirection: "row",
    borderRadius: 10,
    paddingRight: 15,
    paddingLeft: 8,
    paddingVertical: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#9CA3AF",
  },
  lightBackground: { backgroundColor: "#fff" },
  darkBackground: { backgroundColor: "#222" },
  lightText: { color: "#000" },
  darkText: { color: "#fff" },
  lightInput: {
    backgroundColor: "#f0f0f0",
    borderColor: "#ccc",
    color: "#000",
  },
  darkInput: { backgroundColor: "#444", borderColor: "#888", color: "#fff" },
});

export default WeatherScreen;
