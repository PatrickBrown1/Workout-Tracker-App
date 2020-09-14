import React from "react";
import { StyleSheet, View } from "react-native";
import { AppLoading } from "expo";
import {
  Container,
  Content,
  Text,
  Button,
  H1,
  StyleProvider,
} from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

import getTheme from "./native-base-theme/components";
import material from "./native-base-theme/variables/material";
var style = StyleSheet.create({
  body: {
    flex: 1,
  },
  titleView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonView: {
    flex: 2,
    justifyContent: "center",
  },
});
export default function HeroPage({ navigation }) {
  return (
    <StyleProvider style={getTheme(material)}>
      <Container style={style.body}>
        <View style={style.titleView}>
          <H1>Ready to Work?</H1>
        </View>
        <View style={style.buttonView}>
          <Button
            style={{ alignSelf: "center" }}
            rounded
            primary
            large
            onPress={() => {
              navigation.navigate("LogIn");
            }}
          >
            <Text>Let's Go!</Text>
          </Button>
        </View>
      </Container>
    </StyleProvider>
  );
}
