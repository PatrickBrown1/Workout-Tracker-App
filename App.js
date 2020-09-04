import React, {useState, useEffect} from 'react';

import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Container, Text } from 'native-base';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HeroPage from './HeroPage.js';
import LogInPage from './LogInPage.js';

const Stack = createStackNavigator();

async function loadFonts(){
  await Font.loadAsync({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    ...Ionicons.font,
  });
}
export default function App(props){
  useEffect( () => {
    loadFonts();
  });

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