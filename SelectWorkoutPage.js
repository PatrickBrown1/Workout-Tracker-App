import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from "react-native";
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
  CardItem,
  Picker,
  Form,
  Left,
  Right,
  Body,
  Title,
  Item,
  Label,
  Input,
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
  addButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    padding: 10,
  },
  startWorkoutButton: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    padding: 10,
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
    const setArray = [];
    //filled with objects like {setReps: ..., setWeight: ...}
    var i = 0;
    for (i = 0; i < exercise.numSets; i++) {
      var defaultReps = 0;
      var defaultWeight = 0;
      setArray.push({
        key: exercise.exerciseName + "." + i,
        setNum: i,
        setReps: defaultReps,
        setWeight: defaultWeight,
      });
    }
    exercise.setArray = setArray;
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
function createCardList(
  currentWorkout,
  setCurrentWorkout,
  setCurrentPage,
  setCurrentWorkoutParent,
  setAddExerciseModal
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
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 17,
          }}
        >
          <Button
            icon
            primary
            style={style.addButton}
            onPress={() => setAddExerciseModal(true)}
          >
            <Icon color="white" size={26} name="plus" />
          </Button>
          <Button
            iconRight
            primary
            style={style.startWorkoutButton}
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
function addNewExerciseToCurrentWorkout(
  currentWorkout,
  setCurrentWorkout,
  exerciseName,
  exerciseSets,
  exerciseReps
) {
  const exerciseKey =
    exerciseName + "-" + exerciseSets + "-" + exerciseReps + "-0";
  var tempWorkout = Object.assign({}, currentWorkout);
  var newExercise = {
    exerciseName: exerciseName,
    key: exerciseKey,
    numSets: exerciseSets,
    numReps: exerciseReps,
    weightLbs: 0,
  };
  tempWorkout.exerciseArray.push(newExercise);
  setCurrentWorkout(tempWorkout);
}
export default function SelectWorkoutPage(props) {
  const [workoutName, setWorkoutName] = React.useState("null");
  const [currentWorkout, setCurrentWorkout] = React.useState({});
  const [addExerciseModal, setAddExerciseModal] = React.useState(false);
  const [addExerciseName, setAddExerciseName] = React.useState(null);
  const [addExerciseSets, setAddExerciseSets] = React.useState(null);
  const [addExerciseReps, setAddExerciseReps] = React.useState(null);
  const setCurrentPage = props.setCurrentPage;
  const setCurrentWorkoutParent = props.setCurrentWorkout;
  const workoutCardList = createCardList(
    currentWorkout,
    setCurrentWorkout,
    setCurrentPage,
    setCurrentWorkoutParent,
    setAddExerciseModal
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
                  <Icon name="arrow-left" style={{ color: "#fff" }} size={20} />
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
        <Modal
          animationType="fade"
          transparent={true}
          visible={addExerciseModal}
          onRequestClose={() => setAddExerciseModal(false)}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              paddingTop: 40,
              justifyContent: "flex-start",
            }}
            activeOpacity={1}
            onPressOut={() => {
              setAddExerciseModal(false);
              setAddExerciseName(null);
              setAddExerciseSets(null);
              setAddExerciseReps(null);
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
              }}
            >
              <Card
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "white",
                  alignSelf: "center",
                  padding: 10,
                  margin: 10,
                  height: "55%",
                  width: "80%",
                }}
              >
                <CardItem header style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16 }}>Add a new Exercise</Text>
                </CardItem>
                <CardItem style={{ flex: 6 }}>
                  <Body>
                    <Form style={{ width: "100%", fontSize: 12 }}>
                      <Item style={{ margin: 12, height: 20 }}>
                        <Input
                          placeholder="Name of Exercise"
                          onChangeText={(text) => setAddExerciseName(text)}
                        />
                      </Item>
                      <Item style={{ margin: 12, height: 20 }}>
                        <Input
                          placeholder="Number of Sets"
                          onChangeText={(text) =>
                            setAddExerciseSets(parseInt(text))
                          }
                          keyboardType="numeric"
                        />
                      </Item>
                      <Item last style={{ margin: 12, height: 20 }}>
                        <Input
                          placeholder="Reps per Set"
                          onChangeText={(text) =>
                            setAddExerciseReps(parseInt(text))
                          }
                          keyboardType="numeric"
                        />
                      </Item>
                    </Form>
                  </Body>
                </CardItem>
                <CardItem footer style={{ flex: 1, marginBottom: 20 }}>
                  <Button
                    primary
                    onPress={() => {
                      if (
                        addExerciseName === null ||
                        addExerciseSets === null ||
                        addExerciseReps === null
                      ) {
                        console.log("no input");
                      } else {
                        setAddExerciseModal(false);
                        addNewExerciseToCurrentWorkout(
                          currentWorkout,
                          setCurrentWorkout,
                          addExerciseName,
                          addExerciseSets,
                          addExerciseReps
                        );

                        setAddExerciseName(null);
                        setAddExerciseSets(null);
                        setAddExerciseReps(null);
                      }
                    }}
                  >
                    <Text>Done</Text>
                  </Button>
                </CardItem>
              </Card>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    </StyleProvider>
  );
}
