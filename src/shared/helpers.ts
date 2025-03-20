//Formats a given date string into a readable day format.
export const formatDay = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  return date.toDateString() === today.toDateString()
    ? "Today"
    : date.toLocaleDateString("en-US", { weekday: "long" });
};

// Maps weather condition keys to corresponding MaterialCommunityIcons names.
export const getWeatherIcon = (iconKey: string): string => {
  const iconMap: Record<string, string> = {
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

// Transforms raw weather API response into a structured format for the UI
export const transformWeatherData = (weather: any) => {
  return {
    city: weather.resolvedAddress,
    temperature: weather.currentConditions.temp,
    condition: weather.currentConditions.conditions,
    description: weather.currentConditions.description,
    icon: weather.icon,
    humidity: weather.currentConditions?.humidity,
    windSpeed: weather.currentConditions.windSpeed,
    feelsLike: weather.currentConditions.feelsLike,
    pressure: weather.currentConditions.pressure,
    otherFactors: [
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
    ],
    forecast: weather?.days.slice(0, 7)?.map((day: any) => ({
      day: formatDay(day.datetime),
      tempMax: day.tempmax,
      tempMin: day.tempmin,
    })),
    ...weather,
  };
};
