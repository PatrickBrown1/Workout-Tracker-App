import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ExerciseCard from "./ExerciseCard.js";

import Constants from "expo-constants";
import {
  Container,
  Header,
  Content,
  Text,
  Button,
  H1,
  H2,
  StyleProvider,
  Card,
  Picker,
  Form,
  Fab,
} from "native-base";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import getTheme from "./native-base-theme/components";
import material from "./native-base-theme/variables/material";

var style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  body: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  header: {
    paddingTop: 10,
    alignSelf: "center",
  },
  picker: {
    width: "90%",
    alignSelf: "center",
  },
  buttonContent: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
});
export default function ActiveWorkoutPage(props) {
  return (
    <View style={{ flex: 1 }}>
      <Fab
        position="topLeft"
        onPress={() => props.setCurrentPage("select")}
        style={{ backgroundColor: "#3F51B5" }}
      >
        <Icon name="arrow-left" />
      </Fab>
      <Text>Active Workout Page</Text>
    </View>
  );
}
