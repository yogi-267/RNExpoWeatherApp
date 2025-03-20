import WeatherCard from "@/src/components/WeatherCard";
import React from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  TextInput,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import useWeatherViewModel from "../viewmodels/WeatherViewModel";

// WeatherScreen displays weather details for a given city with city search input
const WeatherScreen: React.FC = () => {
  const colors = useThemeColor();
  const { city, weather, refreshing, handleInputChange, onRefresh, loading } =
    useWeatherViewModel();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search Input */}
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
          style={[styles.input, { color: colors.text }]}
          placeholder="Search for a city..."
          placeholderTextColor={colors.placeholderText}
          value={city}
          onChangeText={handleInputChange}
        />
      </View>

      {/* Weather Details */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Loader */}
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.icon} />
          </View>
        )}

        {/* Weather Card */}
        {!loading && <WeatherCard weather={weather} />}
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
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 16,
    ...(Platform.OS == "android" ? { paddingTop: 0, paddingBottom: 0 } : null),
  },
  loaderContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WeatherScreen;
