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
  H2,
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
  workoutObj.exerciseArray.forEach( (exercise) => {
    var exerciseKey = exercise.exerciseName + "-" + exercise.numSets + "-" 
      + exercise.numReps + "-" + exercise.weightLbs;
    exercise.key = exerciseKey;
  });
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
function removeExercise(exerciseKey, currentWorkout, setCurrentWorkout){
  var changedExerciseArray = [];
  var changedCurrentWorkout = Object.assign({}, currentWorkout);
  currentWorkout.exerciseArray.forEach(exercise => exercise.key !== exerciseKey ? changedExerciseArray.push(exercise) : null);
  changedCurrentWorkout.exerciseArray = changedExerciseArray;
  changedCurrentWorkout.numExercises = changedExerciseArray.length;
  setCurrentWorkout(changedCurrentWorkout);
}
function createCardList(currentWorkout, setCurrentWorkout){ 
  const renderCard = ({ item }) => (
    <ExerciseCard exerciseKey={item.key} exerciseObj={item} removeSelf={() => removeExercise(item.key, currentWorkout, setCurrentWorkout)} />
  );
  return(
    <FlatList
      data={currentWorkout.exerciseArray}
      renderItem={renderCard}
      keyExtractor={item => item.key}
    />
  );
  
}
export default function WorkoutPage({ navigation }) {
  const [workoutName, setWorkoutName] = React.useState("null");
  const [currentWorkout, setCurrentWorkout] = React.useState({});
  const workoutCardList = createCardList(currentWorkout, setCurrentWorkout);
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
              setCurrentWorkout(workouts[itemValue]);
            }}
          >
            {Object.entries(workouts).map( ([key, value]) => (
              <Picker.Item key={key} label={value.title} value={key} />
            ))}
          </Picker>
        </Form>
      </View>
      {workoutName !== "null" && currentWorkout.numExercises > 0 &&
        workoutCardList
      }
      { workoutName !== "null" && currentWorkout.numExercises === 0 && 
        <H2 style={{alignSelf: "center", textAlign: "center", paddingTop: 100}}>There aren't any exercises in this workout!</H2>
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
