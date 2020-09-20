import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Alert,
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
function handleFinishWorkoutPress(
  activeWorkoutObject,
  setActiveWorkoutObject,
  setCurrentWorkout,
  navigation
) {
  //need to write to parent to save progress
  const handleRoute = () => {
    //POST TO LOCAL OR CLOUD SERVER TO SAVE, THEN PULL IN LOGS
    navigation.navigate("Logs");
  }
  var hasEmptyFields = false;
  activeWorkoutObject.exerciseArray.forEach((exerciseObject) => {
    exerciseObject.setArray.forEach((setObject) => {
      if (
        setObject.setReps === 0 ||
        setObject.setWeight === 0 ||
        isNaN(setObject.setReps) ||
        isNaN(setObject.setWeight)
      ) {
        hasEmptyFields = true;
      }
    });
  });
  if (hasEmptyFields === true) {
    Alert.alert(
      "Slow Down",
      "You seem to have an empty field, do you still want to finish the workout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => handleRoute() },
      ],
      { cancelable: false }
    );
  } else {
    handleRoute();
  }
}
function renderExerciseCard(
  item,
  index,
  activeWorkoutObject,
  setActiveWorkoutObject,
  setCurrentWorkout,
  navigation
) {
  var tempSetArray = item.setArray;
  // const updateItem = () => {

  //   tempAWO.exerciseArray[index]["setArray"] = tempSetArray;
  //   setActiveWorkoutObject(tempAWO);
  // };
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
            <FlatList
              data={tempSetArray}
              keyExtractor={(newItem) => newItem.key}
              renderItem={(newItem) => (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    flexWrap: "wrap",
                  }}
                  key={newItem.setNum + ".setinput"}
                >
                  <Item
                    key={newItem.setNum + ".repinput"}
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
                        tempSetArray[newItem.index].setReps = parseInt(text);
                      }}
                      keyboardType="numeric"
                      style={{ textAlign: "center" }}
                    />
                  </Item>
                  <Item
                    key={newItem.setNum + ".weightinput"}
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
                        tempSetArray[newItem.index].setWeight = parseInt(text);
                      }}
                      keyboardType="numeric"
                      style={{ textAlign: "center" }}
                    />
                  </Item>
                </View>
              )}
            />
          </Form>
        </Body>
      </CardItem>
      {index === activeWorkoutObject.exerciseArray.length - 1 && (
        <CardItem footer style={{ justifyContent: "center" }}>
          <Button
            primary
            style={{ alignSelf: "center" }}
            onPress={() => {
              handleFinishWorkoutPress(
                activeWorkoutObject,
                setActiveWorkoutObject,
                setCurrentWorkout,
                navigation,
              );
            }}
          >
            <Text>Finish Workout</Text>
          </Button>
        </CardItem>
      )}
    </Card>
  );
}

function renderSwiper(
  currentExerciseIndex,
  setCurrentExerciseIndex,
  activeWorkoutObject,
  setActiveWorkoutObject,
  setCurrentWorkout,
  navigation
) {
  var tempAWO = Object.assign({}, activeWorkoutObject);
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

  return (
    <Carousel
      ref={swiperRef}
      data={tempAWO.exerciseArray}
      renderItem={({ item, index }) =>
        renderExerciseCard(
          item,
          index,
          tempAWO,
          setActiveWorkoutObject,
          setCurrentWorkout,
          navigation
        )
      }
      layout={"tinder"}
      sliderWidth={viewWidth}
      itemWidth={viewWidth - 20}
      onScroll={(index) => {
        setCurrentExerciseIndex(index);
        setActiveWorkoutObject(tempAWO);
      }}
    />
  );
}
export default function ActiveWorkoutPage({navigation, currentWorkout, setCurrentWorkout}) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = React.useState(0);
  const [completedExercises, setCompletedExercises] = React.useState(0);
  const [activeWorkoutObject, setActiveWorkoutObject] = React.useState(
    currentWorkout
  );
  console.log("rendering active workout page (reseting state)");

  console.log(activeWorkoutObject);
  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      {renderSwiper(
        currentExerciseIndex,
        setCurrentExerciseIndex,
        activeWorkoutObject,
        setActiveWorkoutObject,
        setCurrentWorkout,
        navigation
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
