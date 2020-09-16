import React, { useState, useEffect } from "react";

import { AppLoading } from "expo";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Container, Text, Root } from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HeroPage from "./HeroPage.js";
import LogInPage from "./LogInPage.js";
import MainPage from "./MainPage.js";

const Stack = createStackNavigator();

async function loadFonts(setIsLoading) {
  await Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    ...Ionicons.font,
  });
  setIsLoading(false);
}
export default function App(props) {
  const [isLoading, setIsLoading] = React.useState(true);
  useEffect(() => {
    loadFonts(setIsLoading);
  });
  if (isLoading) {
    return (
      <Root>
        <AppLoading />
      </Root>
    );
  } else {
    return (
      <Root>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Hero" component={HeroPage} />
            <Stack.Screen name="LogIn" component={LogInPage} />
            <Stack.Screen name="Main" component={MainPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    );
  }
}
