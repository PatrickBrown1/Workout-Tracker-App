import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SelectWorkoutPage from "./SelectWorkoutPage.js";
import ActiveWorkoutPage from "./ActiveWorkoutPage.js";

import getTheme from "./native-base-theme/components";
import material from "./native-base-theme/variables/material";

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
} from "native-base";

var style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
export default function WorkoutPage({ navigation }) {
  const [currentPage, setCurrentPage] = React.useState("select");
  const [currentWorkout, setCurrentWorkout] = React.useState("undefined");
  return (
    <StyleProvider style={getTheme(material)}>
      <SafeAreaView style={style.container}>
        {currentPage === "select" && (
          <SelectWorkoutPage setCurrentPage={setCurrentPage} setCurrentWorkout={setCurrentWorkout} />
        )}
        {currentPage === "active" && (
          <ActiveWorkoutPage navigation={navigation} currentWorkout={currentWorkout} setCurrentWorkout={setCurrentWorkout} setCurrentPage={setCurrentPage} />
        )}
      </SafeAreaView>
    </StyleProvider>
  );
}
