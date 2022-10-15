import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {FBLoginScreen, PhoneLoginScreen} from './screen/LoginScreen';
import {MainScreen} from './screen/MainScreen';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MainScreen">
      <Stack.Screen name="FBLoginScreen" component={FBLoginScreen} />
      <Stack.Screen name="PhoneLoginScreen" component={PhoneLoginScreen} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
