import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import {
  CurrentRenderContext,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ExerciseCard from "./ExerciseCard.js";

import Carousel from "react-native-snap-carousel";

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

function renderSwiper(
  currentWorkout,
  currentExerciseIndex,
  setCurrentExerciseIndex,
  completedExercises,
  setCompletedExercises
) {
  const viewWidth = Dimensions.get("window").width;
  const swiperRef = React.useRef(null);
  // const goNextPage = (currentExerciseIndex, setCurrentExerciseIndex) => {
  //   swiperRef.scrollTo({
  //     x: viewWidth * (currentExerciseIndex + 1),
  //     y: 0,
  //     animated: true,
  //   });
  // };
  // const handleScroll = (index, setCurrentExerciseIndex) => {
  //   console.log("updating scroll");
  //   setCurrentExerciseIndex(index);
  // };
  const renderExercise = ({ item, index }) => {
    return (
      <Card
        style={{
          backgroundColor: "white",
          borderRadius: 5,
          height: 350,
          padding: 50,
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <Text style={{ fontSize: 30 }}>{item.exerciseName}</Text>
      </Card>
    );
  };
  return (
    <Carousel
      ref={swiperRef}
      data={currentWorkout.exerciseArray}
      renderItem={renderExercise}
      layout={"tinder"}
      sliderWidth={viewWidth}
      itemWidth={viewWidth-20}
      onScroll={index => {setCurrentExerciseIndex(index)}}
    />
  );
}
export default function ActiveWorkoutPage(props) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = React.useState(0);
  const [completedExercises, setCompletedExercises] = React.useState(0);
  const currentWorkout = props.currentWorkout;
  return (
    <View style={{ flex: 1 }}>
      <Fab
        position="topLeft"
        onPress={() => props.setCurrentPage("select")}
        style={{ backgroundColor: "#3F51B5" }}
      >
        <Icon name="arrow-left" />
      </Fab>
      <View style={{marginTop: 100}}>
        {renderSwiper(
          currentWorkout,
          currentExerciseIndex,
          setCurrentExerciseIndex,
          completedExercises,
          setCompletedExercises
        )}
      </View>
    </View>
  );
}
