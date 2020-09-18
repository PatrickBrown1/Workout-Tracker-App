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
  CardItem,
  Picker,
  Form,
  Fab,
  Input,
  Item,
  Body,
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
function updateWorkoutObject(
  activeWorkoutObject,
  setActiveWorkoutObject,
  currsetArray,
  exerciseObject
) {
  var tempAWO = Object.assign({}, activeWorkoutObject);
  console.log(tempAWO);
  tempAWO[exerciseObject.exerciseName].setArray = currsetArray;
  setActiveWorkoutObject(tempAWO);
}
function renderSwiper(
  currentWorkout,
  currentExerciseIndex,
  setCurrentExerciseIndex,
  completedExercises,
  setCompletedExercises,
  activeWorkoutObject,
  setActiveWorkoutObject
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
    const setArray = [];
    //filled with objects like {setReps: ..., setWeight: ...}
    var i = 0;
    for (i = 0; i < item.numSets; i++) {
      var defaultReps = 0;
      var defaultWeight = 0;
      setArray.push({
        setNum: i,
        setReps: defaultReps,
        setWeight: defaultWeight,
      });
    }
    console.log(activeWorkoutObject);
    item.setArray = setArray;
    const updateItem = () => {
      activeWorkoutObject.exerciseArray[currentExerciseIndex]["setArray"] = setArray;
      setActiveWorkoutObject(activeWorkoutObject);
      console.log(activeWorkoutObject);
    }
    return (
      <Card
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: 5,
          padding: 10,
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <CardItem header style={{ flex: 1, justifyContent: "center" }}>
          <H2>{item.exerciseName}</H2>
        </CardItem>
        <CardItem cardBody style={{ flex: 4, justifyContent: "center" }}>
          <Body>
            <Form style={{ width: "100%" }}>
              {setArray.map((setObj) => (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    flexWrap: "wrap",
                  }}
                  key={setObj.setNum + ".setinput"}
                >
                  <Item
                    key={setObj.setNum + ".repinput"}
                    style={{
                      flex: "1 0 30%",
                      width: "30%",
                      margin: 12,
                      height: 20,
                    }}
                  >
                    <Input
                      placeholder="num reps"
                      onChangeText={(text) => {
                        setObj.setReps = parseInt(text);
                        updateItem();
                      }}
                      keyboardType="numeric"
                      style={{ textAlign: "center" }}
                    />
                  </Item>
                  <Item
                    key={setObj.setNum + ".weightinput"}
                    style={{
                      flex: "1 0 30%",
                      width: "30%",
                      margin: 12,
                      height: 20,
                    }}
                  >
                    <Input
                      placeholder="weight"
                      onChangeText={(text) => {
                        setObj.setWeight = parseInt(text);
                        updateItem();
                      }}
                      keyboardType="numeric"
                      style={{ textAlign: "center" }}
                    />
                  </Item>
                </View>
              ))}
            </Form>
          </Body>
        </CardItem>
        <CardItem footer></CardItem>
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
      itemWidth={viewWidth - 20}
      onScroll={(index) => {
        setCurrentExerciseIndex(index);
      }}
    />
  );
}
export default function ActiveWorkoutPage(props) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = React.useState(0);
  const [completedExercises, setCompletedExercises] = React.useState(0);
  const [activeWorkoutObject, setActiveWorkoutObject] = React.useState(
    props.currentWorkout
  );
  const currentWorkout = props.currentWorkout;
  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      {renderSwiper(
        currentWorkout,
        currentExerciseIndex,
        setCurrentExerciseIndex,
        completedExercises,
        setCompletedExercises,
        activeWorkoutObject,
        setActiveWorkoutObject
      )}
    </View>
  );
}
/*<Fab
        position="topLeft"
        onPress={() => props.setCurrentPage("select")}
        style={{ backgroundColor: "#3F51B5" }}
      >
        <Icon name="arrow-left" />
      </Fab>*/
