import React from "react";
import { StyleSheet, View } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutCard from "./WorkoutCard.js";

import {
  Container,
  Header,
  Content,
  Text,
  Button,
  H1,
  Icon,
  StyleProvider,
  Card,
  Fab,
} from "native-base";

import getTheme from "./native-base-theme/components";
import material from "./native-base-theme/variables/material";

var style = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  
});
export default function WorkoutPage({ navigation }) {
  return (
    <StyleProvider style={getTheme(material)}>
      <Container style={style.body}>
        <Content>
          <Text>
            WorkoutPage
          </Text>
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
        </Content>
      </Container>
    </StyleProvider>
  );
}
