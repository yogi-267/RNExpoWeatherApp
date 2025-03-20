import 'dotenv/config';

export default {
  expo: {
    owner: "yogi.267",
    name: "WeatherApp",
    slug: "weatherapp",
    scheme: "weatherapp",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    icon: "./assets/images/icon.png",
    extra: {
      API_KEY: process.env.EXPO_PUBLIC_API_KEY,
      eas: {
        projectId: "68b45a93-26c8-44fd-ae7d-42194f575cd0",
      },
    },
    platforms: ["ios", "android", "web"],
    ios: {
      supportsTablet: true,
      newArchEnabled: false,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
      },
      newArchEnabled: false,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    updates: {
      url: "https://u.expo.dev/68b45a93-26c8-44fd-ae7d-42194f575cd0"
    },
    runtimeVersion: {
      policy: "appVersion"
    }
  },
};
