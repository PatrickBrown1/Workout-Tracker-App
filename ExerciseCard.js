import React from "react";
import { StyleSheet, View } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import {
  Container,
  Header,
  Content,
  Text,
  Button,
  H1,
  StyleProvider,
  Card,
  CardItem,
  Top,
  Bottom,
} from "native-base";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import getTheme from "./native-base-theme/components";
import material from "./native-base-theme/variables/material";

var style = StyleSheet.create({
  card: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    width: "90%",
  },
  cardBody: {
      flex: 1,
      padding: 5,
      flexDirection: "column",
  },
  cardToolBar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "20%",
  }
});
export default function ExerciseCard( {exerciseObj} ) {
  const exerciseName = exerciseObj.exerciseName;
  const numSets = exerciseObj.numSets;
  const numReps = exerciseObj.numReps;
  const weightLbs = exerciseObj.weightLbs;
  return (
    <Card style={style.card}>
      <CardItem style={style.cardBody}>
        <H1>{exerciseName}</H1>
        <Text>{numSets} sets</Text>
        <Text>{numReps} reps</Text>
        <Text>{weightLbs}lbs</Text>
      </CardItem>
      <CardItem style={style.cardToolBar}>
          <Button transparent style={{alignSelf: "center"}}>
            <Icon active name="close-circle" size={26}/>
          </Button>
          <Button transparent style={{alignSelf: "center"}}>
            <Icon active name="information-outline" size={26}/>
          </Button>
      </CardItem>
    </Card>
  );
}
