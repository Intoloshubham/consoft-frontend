import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import * as eva from '@eva-design/eva';

import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import {
  OnBoarding,
  SignUp,
  SignIn,
  Otp,
  ForgotPassword,
  CreateCompany,
  CompanyPayment,
  VerifyProductKey,
} from './screens';

import {
  ProjectsDetails,
  ProjectTeam,
  Contractors,
  StocksAndInventry,
  ProjectReports,
  ToolsAndMachinery,
  ProjectSeheduleTime,
  CheckList,
  Items,
  Unit,
  CompanyTeam,
  ManageStock,
} from './screens/admin_screens';
import {Profile, Demo, Demo1, Demo2} from './screens/user_screens';
import Tabs from './navigation/tabs';
import UserTabs from './navigation/user_tabs';
import Account from './screens/admin_screens/Account/Account';
import Toast from 'react-native-toast-message';

global.apiurl = 'http://192.168.1.99:8000/api';

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
          initialRouteName={'UserTabs'}>
          <Stack.Screen name="UserTabs" component={UserTabs} />
          <Stack.Screen name="CreateCompany" component={CreateCompany} />
          <Stack.Screen name="CompanyPayment" component={CompanyPayment} />
          <Stack.Screen name="VerifyProductKey" component={VerifyProductKey} />
          <Stack.Screen name="SignIn" component={SignIn} />

          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="ProjectsDetails" component={ProjectsDetails} />
          <Stack.Screen name="ProjectTeam" component={ProjectTeam} />
          <Stack.Screen name="Contractors" component={Contractors} />
          <Stack.Screen
            name="StocksAndInventry"
            component={StocksAndInventry}
          />
          <Stack.Screen name="ProjectReports" component={ProjectReports} />
          <Stack.Screen
            name="ToolsAndMachinery"
            component={ToolsAndMachinery}
          />
          <Stack.Screen
            name="ProjectSeheduleTime"
            component={ProjectSeheduleTime}
          />
          <Stack.Screen name="CheckList" component={CheckList} />
          <Stack.Screen name="Items" component={Items} />
          <Stack.Screen name="Unit" component={Unit} />
          <Stack.Screen name="CompanyTeam" component={CompanyTeam} />
          <Stack.Screen name="ManageStock" component={ManageStock} />

          {/* User  */}
          <Stack.Screen name="UserDashboard" component={UserTabs} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Demo" component={Demo} />
          <Stack.Screen name="Demo1" component={Demo1} />
          <Stack.Screen name="Demo2" component={Demo2} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;
