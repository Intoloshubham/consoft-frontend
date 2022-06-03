import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import * as eva from '@eva-design/eva';

import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import {OnBoarding, SignUp, SignIn, Otp, ForgotPassword} from './screens';

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
import {AuthContext} from './screens/Authentication/Context';
import axios from 'axios';
const url = 'http://192.168.1.99:8000/api/login';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  //auth
  // const [isLoading, setIsLoading] = React.useState(true); // check user is authenticate or not
  // const [userToken, setUserToken] = React.useState(null); // validate user

  // const [userData, setUserData] = React.useState([]);
  useEffect(() => {
    axios.get(url).then(response => setUserData(response.data.access_token));
  }, []);

  const initialLoginState = {
    isLoading: true,
    mobileNo: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {...prevState, userToken: action.token, isLoading: false};
      case 'LOGIN':
        return {
          ...prevState,
          mobileNo: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          mobileNo: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          mobileNo: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (mobileNo, password) => {
        // setUserToken('fgkj');
        // setIsLoading(false);
        let userToken;
        userToken = null;
        if (mobileNo == 1234567892 && password == 1234) {
          userToken = 'dfgdfg';
          try {
            await AsyncStorage.setItem('userToken', userToken);
          } catch (e) {
            console.log(e);
          }
        }
        // console.log('user token', userToken);
        dispatch({type: 'LOGIN', id: mobileNo, token: userToken});
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        setUserToken('fgkj');
        setIsLoading(false);
      },
    }),
    [],
  );

  useEffect(async () => {
    setTimeout(() => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      // console.log('user token', userToken);
      dispatch({type: 'REGISTER', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color="#444" size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={'OnBoarding'}>
            {loginState.userToken == null ? (
              <React.Fragment>
                <Stack.Screen name="OnBoarding" component={OnBoarding} />
                <Stack.Screen name="SignIn" component={SignIn} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Stack.Screen name="Home" component={Tabs} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                />
                <Stack.Screen name="Otp" component={Otp} />
                <Stack.Screen name="Account" component={Account} />
                <Stack.Screen
                  name="ProjectsDetails"
                  component={ProjectsDetails}
                />
                <Stack.Screen name="ProjectTeam" component={ProjectTeam} />
                <Stack.Screen name="Contractors" component={Contractors} />
                <Stack.Screen
                  name="StocksAndInventry"
                  component={StocksAndInventry}
                />
                <Stack.Screen
                  name="ProjectReports"
                  component={ProjectReports}
                />
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
              </React.Fragment>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </AuthContext.Provider>
  );
};

export default App;