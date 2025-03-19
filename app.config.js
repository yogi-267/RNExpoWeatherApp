import 'dotenv/config';

export default {
  expo: {
    name: "WeatherApp",
    slug: "weatherapp",
    scheme: "weatherapp",
    version: "1.0.0",
    orientation: "portrait",
    platforms: ["ios", "android", "web"],
    userInterfaceStyle: "automatic",
    extra: {
      API_KEY: process.env.EXPO_PUBLIC_API_KEY,
    },
  },
};
