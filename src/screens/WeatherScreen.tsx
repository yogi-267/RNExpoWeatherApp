import WeatherCard from "@/src/components/WeatherCard";
import React from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  TextInput,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import useWeatherViewModel from "../viewmodels/WeatherViewModel";

const WeatherScreen = () => {
  const colors = useThemeColor();

  const { city, weather, refreshing, handleInputChange, onRefresh } =
    useWeatherViewModel();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar />
      <View
        style={[
          styles.inputView,
          {
            backgroundColor: colors.inputBackground,
            borderColor: colors.inputBorder,
          },
        ]}
      >
        <Ionicons name="search" size={24} color={colors.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search for a city..."
          placeholderTextColor={colors.placeholderText}
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
  },
});

export default WeatherScreen;
