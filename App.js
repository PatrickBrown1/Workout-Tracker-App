import React, {useState, useEffect} from 'react';

import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import { Container, Text } from 'native-base';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HeroPage from './HeroPage.js';
import LogInPage from './LogInPage.js';

const Stack = createStackNavigator();

export default function App(props){
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Hero" component={HeroPage} />
        <Stack.Screen name="LogIn" component={LogInPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}