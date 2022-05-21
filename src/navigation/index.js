import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, SignUpScreen, SignInScreen } from '../screens';
import navigationStrings from '../constants/navigationStrings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainStack from './MainStack';




const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();



const navigation = () => {
  return (
    <NavigationContainer>
    
      <Stack.Navigator screenOptions={{headerShown:false}}>
        {MainStack(Stack)}
      </Stack.Navigator>
    </NavigationContainer> 
  )
}

export default navigation