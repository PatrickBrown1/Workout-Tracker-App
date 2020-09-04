import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import {
  Container,
  Header,
  Content,
  Text,
  Button,
  H1,
  StyleProvider,
  Card,
  Fab,
  Footer,
  FooterTab,
} from "native-base";

import getTheme from "./native-base-theme/components";
import material from "./native-base-theme/variables/material";

import HomePage from './HomePage.js';
import WorkoutPage from './WorkoutPage.js';
import LogsPage from './LogsPage.js';

const Tab = createMaterialTopTabNavigator();

var style = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
export default function MainPage({ navigation }) {
  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#f0edf6" inactiveColor="#3e2465" shifting swipeEnabled={true}
    animationEnabled={true} tabBarPosition="bottom" 
    tabBarOptions={{showIcon: true}}>
        <Tab.Screen name="Home" component={HomePage} 
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen name="Workout" component={WorkoutPage}
            options={{
                tabBarLabel: 'Workout',
                tabBarIcon: ({ color }) => (
                  <Icon name="dumbbell" color={color} size={26} />
                ),
              }}
        />
        <Tab.Screen name="Logs" component={LogsPage}
            options={{
                tabBarLabel: 'Logs',
                tabBarIcon: ({ color }) => (
                  <Icon name="chart-line" color={color} size={26} />
                ),
              }}
        />
    </Tab.Navigator>
  );
}
