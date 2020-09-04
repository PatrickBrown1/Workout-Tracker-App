import React from "react";
import { StyleSheet, View } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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
  Fab,
} from "native-base";

import getTheme from "./native-base-theme/components";
import material from "./native-base-theme/variables/material";

var style = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonCard: {
    alignSelf: "center",
    padding: 20,
    marginTop: "30%",
  },
  buttonContent: {
    marginTop: 5,
    marginBottom: 5,
  },
});
export default function LogInPage({ navigation }) {
  return (
    <StyleProvider style={getTheme(material)}>
      <Container style={style.body}>
        <Content>
          <Fab position="topLeft" onPress={() => navigation.goBack()} style={{backgroundColor: "#3F51B5"}}>
            <Icon name="arrow-back" />
          </Fab>
          <Card bordered style={style.buttonCard}>
            <Button primary block iconLeft style={style.buttonContent}>
              <Icon name="logo-google" />
              <Text>Sign in with Google</Text>
            </Button>
            <Button primary block iconLeft style={style.buttonContent}>
              <Icon name="logo-facebook" />
              <Text>Sign in with Facebook</Text>
            </Button>
            <Text style={{ textAlign: "center" }}>- or -</Text>
            <Button primary block iconLeft style={style.buttonContent}>
              <Icon name="person" />
              <Text>Continue as Guest</Text>
            </Button>
          </Card>
        </Content>
      </Container>
    </StyleProvider>
  );
}
