import React from "react";
import { View, Text, StyleSheet} from "react-native";
import {
  FontAwesome5,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { getWeatherIcon } from "../shared/helpers";
import type { WeatherData } from "../viewmodels/types";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

const WeatherCard = ({ weather }: { weather: WeatherData }) => {
  const colors = useThemeColor();
  const styles = getStyles(colors);

  if (!weather) {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="alert-circle-outline"
          size={96}
          color="red"
          style={styles.weatherIcon}
        />
        <Text style={styles.errorText}>No weather data available</Text>
      </View>
    );
  }

  console.log(weather);

  return (
    <View style={styles.container}>
      {/* City Name */}
      <View style={styles.cityRow}>
        <FontAwesome5
          name="map-marker-alt"
          size={36}
          color={colors.icon}
        />
        <Text style={styles.city}>{weather?.city}</Text>
      </View>

      {/* Weather Icon & Temperature */}
      <MaterialCommunityIcons
        name={getWeatherIcon(weather?.icon) as keyof typeof MaterialCommunityIcons.glyphMap}
        size={96}
        color={colors.icon}
        style={styles.weatherIcon}
      />
      <Text style={styles.temp}>{weather?.temperature}°</Text>
      <Text style={styles.condition}>{weather?.condition}</Text>
      <Text style={styles.description}>{weather?.description}</Text>

      {/* Weather Stats */}
      <View style={styles.statsContainer}>
        {weather?.otherFactors?.map(({ label, value, icon }, index) => (
          <View key={index} style={styles.statCard}>
            <Feather
              name={icon}
              size={24}
              color={colors.icon}
            />
            <Text style={styles.statText}>{label}</Text>
            <Text style={styles.statValue}>{value}</Text>
          </View>
        ))}
      </View>

      {/* 7-Day Forecast */}
      <View style={styles.forecastContainer}>
        <Text style={styles.nextDays}>{"Next 7 Days Forecast"}</Text>
        {weather?.forecast?.map(({ day, tempMin, tempMax }, index) => (
          <View key={index} style={styles.forecastRow}>
            <Text style={styles.forecastDay}>{day}</Text>
            <View style={styles.forecastIcon}>
              <Feather
                name={Number(tempMax) > 30 ? "sun" : "cloud"}
                size={24}
                color={colors.icon}
              />
            </View>
            <Text style={styles.forecastTemp}>
              {tempMax}° / {tempMin}°
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const getStyles = (colors: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      marginTop: 10,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 500,
      backgroundColor: colors.background,
      borderRadius: 10,
      padding: 15,
    },
    cityRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    city: {
      fontSize: 30,
      fontWeight: "bold",
      marginLeft: 10,
      textAlign: "center",
      color: colors.text,
    },
    weatherIcon: {
      marginVertical: 10,
    },
    temp: {
      fontSize: 72,
      color: colors.text,
    },
    condition: {
      fontSize: 18,
      fontWeight: "bold",
      textTransform: "capitalize",
      color: colors.text,
    },
    description: {
      fontSize: 14,
      color: colors.text,
      textAlign: "center",
      marginHorizontal: 20,
      marginVertical: 6,
    },
    nextDays: {
      fontSize: 16,
      color: colors.text,
      marginVertical: 6,
    },
    statsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      width: "100%",
      marginVertical: 10,
    },
    statCard: {
      backgroundColor: colors.cardBackground,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      width: "48%",
      marginVertical: 8,
    },
    statText: {
      fontSize: 14,
      fontWeight: "bold",
      marginTop: 5,
      color: colors.text,
    },
    statValue: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    forecastContainer: {
      marginTop: 10,
      width: "100%",
    },
    forecastRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 5,
    },
    forecastDay: {
      flex: 1,
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    forecastTemp: {
      flex: 1,
      fontSize: 16,
      textAlign: "right",
      color: colors.text,
    },
    errorText: {
      fontSize: 18,
      color: colors.text,
    },
    forecastIcon: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default WeatherCard;
