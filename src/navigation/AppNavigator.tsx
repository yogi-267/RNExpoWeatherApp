import React from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationIndependentTree } from "@react-navigation/native";
import WeatherScreen from "../screens/WeatherScreen";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const colors = useThemeColor();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar translucent={true} style={"auto"} />
      <NavigationIndependentTree>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="WeatherScreen" component={WeatherScreen} />
        </Stack.Navigator>
      </NavigationIndependentTree>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppNavigator;
