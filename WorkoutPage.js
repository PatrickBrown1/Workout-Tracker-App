import React, { useState } from "react";
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
  Icon,
  StyleProvider,
  Card,
  Picker,
  Form,
} from "native-base";

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
});
function createWorkout(key, title, numExercises, exerciseArray){
  //exercise array will be an array of objects
  //the objects will look like {"Exercise_Name", #Sets, #Rep, Weight(lbs)}
  //will parse by comma
  var workoutObj = {};
  workoutObj.key = key;
  workoutObj.title = title;
  workoutObj.numExercises = numExercises;
  workoutObj.exerciseArray = exerciseArray;
  return workoutObj;
} 
const workouts = {
  "legsworkout1": createWorkout("legsworkout1", "Legs Workout 1", "4", 
    [
      {exerciseName: "Legs Exercise 1", numSets: 4, numReps: 8, weightLbs: 135},
      {exerciseName: "Legs Exercise 2", numSets: 3, numReps: 12, weightLbs: 135},
      {exerciseName: "Legs Exercise 3", numSets: 4, numReps: 8, weightLbs: 185},
      {exerciseName: "Legs Exercise 4", numSets: 3, numReps: 12, weightLbs: 135},
    ]
  ),
  "armsworkout1": createWorkout("armssworkout1", "Arms Workout 1", "3", 
  [
    {exerciseName: "Arm Exercise 1", numSets: 4, numReps: 8, weightLbs: 35},
    {exerciseName: "Arm Exercise 2", numSets: 3, numReps: 12, weightLbs: 25},
    {exerciseName: "Arm Exercise 3", numSets: 4, numReps: 8, weightLbs: 60},
  ]
),
}
function createCardList(workoutID){
  const currentWorkoutObj = workouts[workoutID];
  console.log(currentWorkoutObj.exerciseArray);
  const renderCard = ({ item }) => (
    <ExerciseCard exerciseObj={item}  />
  );
  return(
    <FlatList
      data={currentWorkoutObj.exerciseArray}
      renderItem={renderCard}
    />
  );
  
}
export default function WorkoutPage({ navigation }) {
  const [workoutName, setWorkoutName] = React.useState("null");
  console.log(workoutName);
  
  return (
    <SafeAreaView style={style.container}>
      <View>
        <H1 style={style.header}>Workout Page</H1>
        <Form>
          <Picker
            style={style.picker}
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            placeholder="Pick your Workout"
            placeholderStyle={{ color: "#bfc6ea" }}
            selectedValue={workoutName}
            onValueChange={(itemValue, itemIndex) => {
              setWorkoutName(itemValue);
            }}
          >
            {Object.entries(workouts).map( ([key, value]) => (
              <Picker.Item label={value.title} value={key} />
            ))}
          </Picker>
        </Form>
      </View>
      {workoutName !== "null" && 
        createCardList(workoutName)
      }
    </SafeAreaView>
  );
}

/*
{
  exercise: "exercise 1",
  numSets: 3,
  setObj: {
    {
      setNo: 1,
      reps: 12,
      weightLbs: 120,
      weightKgs: 54.4,
    },
    {
      setNo: 2,
      reps: 10,
      weightLbs: 135,
      weightKgs: 61.2,
    },
    {
      setNo: 3,
      reps: 8,
      weightLbs: 150,
      weightKgs: 68.0389,
    },
  }
}
*/
