import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import { OnBoarding, SignIn, SignUp, ForgotPassword, Otp, Home, StockMangement } from './screens';

import Tabs from './navigation/tabs';

const Stack = createStackNavigator();

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'StockMangement'}>
        <Stack.Screen name="Home" component={Tabs} />

        <Stack.Screen name="StockMangement" component={StockMangement} />

        <Stack.Screen name="OnBoarding" component={OnBoarding} />

        <Stack.Screen name="SignIn" component={SignIn} />

        <Stack.Screen name="SignUp" component={SignUp} />

        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

        <Stack.Screen name="Otp" component={Otp} />

        {/* <Stack.Screen name="Home" component={Home} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
