import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import {
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
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
  Left,
  Right,
  Body,
  Title,
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
function createWorkout(key, title, numExercises, exerciseArray) {
  //exercise array will be an array of objects
  //the objects will look like {"Exercise_Name", #Sets, #Rep, Weight(lbs)}
  //will parse by comma
  var workoutObj = {};
  workoutObj.key = key;
  workoutObj.title = title;
  workoutObj.numExercises = numExercises;
  workoutObj.exerciseArray = exerciseArray;
  workoutObj.exerciseArray.forEach((exercise) => {
    var exerciseKey =
      exercise.exerciseName +
      "-" +
      exercise.numSets +
      "-" +
      exercise.numReps +
      "-" +
      exercise.weightLbs;
    exercise.key = exerciseKey;
  });
  return workoutObj;
}
const workouts = {
  legsworkout1: createWorkout("legsworkout1", "Legs Workout 1", "4", [
    { exerciseName: "Legs Exercise 1", numSets: 4, numReps: 8, weightLbs: 135 },
    {
      exerciseName: "Legs Exercise 2",
      numSets: 3,
      numReps: 12,
      weightLbs: 135,
    },
    { exerciseName: "Legs Exercise 3", numSets: 4, numReps: 8, weightLbs: 185 },
    {
      exerciseName: "Legs Exercise 4",
      numSets: 3,
      numReps: 12,
      weightLbs: 135,
    },
  ]),
  armsworkout1: createWorkout("armssworkout1", "Arms Workout 1", "3", [
    { exerciseName: "Arm Exercise 1", numSets: 4, numReps: 8, weightLbs: 35 },
    { exerciseName: "Arm Exercise 2", numSets: 3, numReps: 12, weightLbs: 25 },
    { exerciseName: "Arm Exercise 3", numSets: 4, numReps: 8, weightLbs: 60 },
  ]),
};
function removeExercise(exerciseKey, currentWorkout, setCurrentWorkout) {
  var changedExerciseArray = [];
  var changedCurrentWorkout = Object.assign({}, currentWorkout);
  currentWorkout.exerciseArray.forEach(
    (exercise) =>
      exercise.key !== exerciseKey && changedExerciseArray.push(exercise)
  );
  changedCurrentWorkout.exerciseArray = changedExerciseArray;
  changedCurrentWorkout.numExercises = changedExerciseArray.length;
  setCurrentWorkout(changedCurrentWorkout);
}
function startWorkout(workout) {}
function createCardList(
  currentWorkout,
  setCurrentWorkout,
  setCurrentPage,
  setCurrentWorkoutParent
) {
  const renderCard = ({ item }) => (
    <ExerciseCard
      exerciseKey={item.key}
      exerciseObj={item}
      removeSelf={() =>
        removeExercise(item.key, currentWorkout, setCurrentWorkout)
      }
    />
  );
  return (
    <FlatList
      data={currentWorkout.exerciseArray}
      renderItem={renderCard}
      keyExtractor={(item) => item.key}
      ListFooterComponent={
        <View style={{ flex: 1 }}>
          <Button
            iconRight
            primary
            style={style.buttonContent}
            onPress={() => {
              setCurrentPage("active");
              setCurrentWorkoutParent(currentWorkout);
            }}
          >
            <Text bold>Start Workout</Text>
            <Icon
              color="white"
              size={26}
              name="arrow-right-drop-circle-outline"
            />
          </Button>
        </View>
      }
    />
  );
}
export default function SelectWorkoutPage(props) {
  const [workoutName, setWorkoutName] = React.useState("null");
  const [currentWorkout, setCurrentWorkout] = React.useState({});
  const setCurrentPage = props.setCurrentPage;
  const setCurrentWorkoutParent = props.setCurrentWorkout;
  const workoutCardList = createCardList(
    currentWorkout,
    setCurrentWorkout,
    setCurrentPage,
    setCurrentWorkoutParent
  );
  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            textAlign: "center",
            paddingLeft: 50,
            paddingRight: 50,
          }}
        >
          There aren't any exercises in this workout!
        </Text>
      </View>
    );
  };
  return (
    <StyleProvider style={getTheme(material)}>
      <View style={{ flex: 1 }}>
        <H1 style={style.header}>Workout Page</H1>
        <Form>
          <Picker
            style={style.picker}
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            placeholder="Pick your Workout"
            placeholderStyle={{ color: "#bfc6ea" }}
            renderHeader={(backAction) => (
              <Header style={{ backgroundColor: "#3F51B5" }}>
                <Button icon transparent onPress={backAction}>
                  <Icon name="arrow-left" style={{ color: "#fff" }} size={20}/>
                </Button>
                <Body style={{ flex: 3 }}>
                  <Title>Pick a Workout</Title>
                </Body>
              </Header>
            )}
            selectedValue={workoutName}
            onValueChange={(itemValue, itemIndex) => {
              setWorkoutName(itemValue);
              setCurrentWorkout(workouts[itemValue]);
            }}
          >
            {Object.entries(workouts).map(([key, value]) => (
              <Picker.Item key={key} label={value.title} value={key} />
            ))}
          </Picker>
        </Form>
        {workoutName !== "null" &&
          currentWorkout.numExercises > 0 &&
          workoutCardList}
        {workoutName !== "null" && currentWorkout.numExercises === 0 && (
          <ListEmptyComponent />
        )}
      </View>
    </StyleProvider>
  );
}
