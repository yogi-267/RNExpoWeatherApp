import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  FontAwesome5,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const WeatherCard = ({ weather }: { weather: any }) => {
  if (!weather) {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons
          name={"alert-circle-outline"}
          size={96}
          color={"red"}
          style={styles.weatherIcon}
        />
        <Text style={styles.errorText}>No weather data available</Text>
      </View>
    );
  }

  const condition = weather.currentConditions.conditions;
  const forecast = weather.days.slice(0, 7);

  const formatDay = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();

    // Check if the given date is today
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    }

    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const getWeatherIcon = (iconKey: string) => {
    const iconMap: { [key: string]: string } = {
      "clear-day": "weather-sunny",
      "clear-night": "weather-night",
      "partly-cloudy-day": "weather-partly-cloudy",
      "partly-cloudy-night": "weather-night-partly-cloudy",
      cloudy: "weather-cloudy",
      rain: "weather-rainy",
      snow: "weather-snowy",
      sleet: "weather-hail",
      wind: "weather-windy",
      fog: "weather-fog",
      hail: "weather-hail",
      thunderstorm: "weather-lightning",
    };

    return iconMap[iconKey] || "weather-cloudy";
  };

  const weatherIcon = getWeatherIcon(weather.currentConditions.icon);

  return (
    <View style={styles.container}>
      {/* City Name */}
      <View style={styles.cityRow}>
        <FontAwesome5 name="map-marker-alt" size={36} color="#4B5563" />
        <Text style={styles.city}>{weather.resolvedAddress}</Text>
      </View>

      {/* Weather Icon & Temperature */}
      <MaterialCommunityIcons
        name={weatherIcon as keyof typeof MaterialCommunityIcons.glyphMap}
        size={96}
        color={"rgba(0,0,0,0.7)"}
        style={styles.weatherIcon}
      />
      <Text style={styles.temp}>{weather.currentConditions.temp}°</Text>
      <Text style={styles.condition}>{condition}</Text>
      <Text style={styles.description}>{weather.description}</Text>

      {/* Weather Stats */}
      <View style={styles.statsContainer}>
        {[
          {
            label: "Humidity",
            value: `${weather.currentConditions?.humidity}%`,
            icon: "droplet",
          },
          {
            label: "Wind",
            value: `${weather.currentConditions?.windspeed} km/h`,
            icon: "wind",
          },
          {
            label: "Feels Like",
            value: `${weather.currentConditions?.feelslike}°C`,
            icon: "thermometer",
          },
          {
            label: "Pressure",
            value: `${weather.currentConditions?.pressure} hPa`,
            icon: "bar-chart",
          },
        ].map(({ label, value, icon }, index) => (
          <View key={index} style={styles.statCard}>
            <Feather name={icon} size={24} color="black" />
            <Text style={styles.statText}>{label}</Text>
            <Text style={styles.statValue}>{value}</Text>
          </View>
        ))}
      </View>

      {/* 7-Day Forecast */}

      <View style={styles.forecastContainer}>
      <Text style={styles.nextDays}>{"Next 7 Days forecast"}</Text>
        {forecast.map((day, index) => (
          <View key={index} style={styles.forecastRow}>
            <Text style={styles.forecastDay}>{formatDay(day.datetime)}</Text>
            <View style={styles.forecastIcon}>
              <Feather
                name={day.tempmax > 30 ? "sun" : "cloud"}
                size={24}
                color="black"
              />
            </View>
            <Text style={styles.forecastTemp}>
              {day.tempmax}° / {day.tempmin}°
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 500,
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
  },
  weatherIcon: {
    marginVertical: 10,
  },
  temp: {
    fontSize: 72,
  },
  condition: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "rgba(0, 0, 0, 0.5)",
  },
  description: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.5)",
    textAlign: "center",
    marginHorizontal: 20,
    marginVertical: 6,
  },
  nextDays: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.5)",
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
    backgroundColor: "rgba(0, 0, 0, 0.08)",
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
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
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
  },
  forecastTemp: {
    flex: 1,
    fontSize: 16,
    textAlign: "right",
  },
  errorText: {
    fontSize: 18,
    color: "rgba(0, 0, 0, 0.5)",
  },
  forecastIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WeatherCard;
