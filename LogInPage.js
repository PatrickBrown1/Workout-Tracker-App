import React from 'react';
import { StyleSheet, View } from 'react-native'
import { AppLoading } from 'expo';
import { Container, Header, Content, Text, Button, H1, Left } from 'native-base'; 
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
var style = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
});
export default function LogInPage( {navigation} ){
    return (
        <Container style={style.body}>
            <Content>
                <Button rounded secondary>
                    <Text onPress={() => navigation.goBack()}>
                        back
                    </Text>
                </Button>
                <H1>Log In</H1>
            </Content>
        </Container>
    );
}