import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

import { OnBoarding, SignIn, SignUp, ForgotPassword, Otp, Home, StockMangement,Deeler } from './screens';

import Tabs from './navigation/tabs';

const Stack = createStackNavigator();

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'StockMangement'}>
        {/* // initialRouteName={'Deeler'}> */}

        <Stack.Screen name="Home" component={Tabs} />

        <Stack.Screen name="StockMangement" component={StockMangement} />

        <Stack.Screen name="Deeler" component={Deeler} />


        <Stack.Screen name="OnBoarding" component={OnBoarding} />

        <Stack.Screen name="SignIn" component={SignIn} />

        <Stack.Screen name="SignUp" component={SignUp} />

        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

        <Stack.Screen name="Otp" component={Otp} />

        {/* <Stack.Screen name="Home" component={Home} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;
