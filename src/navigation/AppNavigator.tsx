import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationIndependentTree } from '@react-navigation/native';
import WeatherScreen from '../screens/WeatherScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationIndependentTree>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WeatherScreen" component={WeatherScreen} />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
};

export default AppNavigator;
