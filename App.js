import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import * as eva from '@eva-design/eva';

import {ApplicationProvider} from '@ui-kitten/components';
import {
  Login,
  CompanyRegistration,
  CompanyPayment,
  VerifyProductKey,
} from './screens';

import {
  ProjectsDetails,
  ProjectTeam,
  Contractors,
  StocksAndInventry,
  ToolsAndMachinery,
  ProjectSeheduleTime,
  CheckList,
  Items,
  Unit,
  CompanyTeam,
  ManageStock,
  CompanyTeamShow,
  CategoryandType,
  ProjectReports,
  Suppliers,
  Optiontype,
  Quantitywork,
  ToolsAndMachinery1,
} from './screens/admin_screens';
import {Profile, Demo, Demo1, Demo2} from './screens/user_screens';
import Tabs from './navigation/tabs';
import UserTabs from './navigation/user_tabs';
import Account from './screens/admin_screens/Account/Account';

//setup redux
// import {store} from './app/store';
import store from './app/store';
import {Provider} from 'react-redux';

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
          initialRouteName={'Login'}>
          {/* Company Resgistration & User */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="CompanyRegistration"
            component={CompanyRegistration}
          />
          <Stack.Screen name="CompanyPayment" component={CompanyPayment} />
          <Stack.Screen name="VerifyProductKey" component={VerifyProductKey} />

          {/* Home screens */}
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="ProjectsDetails" component={ProjectsDetails} />
          <Stack.Screen name="CompanyTeamShow" component={CompanyTeamShow} />
          <Stack.Screen name="ProjectTeam" component={ProjectTeam} />
          <Stack.Screen name="Contractors" component={Contractors} />
          <Stack.Screen name="ProjectReports" component={ProjectReports} />
          <Stack.Screen
            name="StocksAndInventry"
            component={StocksAndInventry}
          />
          <Stack.Screen
            name="ToolsAndMachinery"
            component={ToolsAndMachinery}
          />
          <Stack.Screen
            name="ProjectSeheduleTime"
            component={ProjectSeheduleTime}
          />

          {/* Tab screens */}
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Suppliers" component={Suppliers} />

          {/* Account Screens */}
          <Stack.Screen name="CategoryandType" component={CategoryandType} />
          <Stack.Screen name="Items" component={Items} />
          <Stack.Screen name="Unit" component={Unit} />
          <Stack.Screen name="CompanyTeam" component={CompanyTeam} />
          <Stack.Screen name="ManageStock" component={ManageStock} />
          <Stack.Screen name="CheckList" component={CheckList} />
          <Stack.Screen name="Optiontype" component={Optiontype} />
          <Stack.Screen name="Quantitywork" component={Quantitywork} />
          <Stack.Screen
            name="ToolsAndMachinery1"
            component={ToolsAndMachinery1}
          />

          {/* User Screens */}
          <Stack.Screen name="UserDashboard" component={UserTabs} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Demo" component={Demo} />
          <Stack.Screen name="Demo1" component={Demo1} />
          <Stack.Screen name="Demo2" component={Demo2} />
          {/* <Stack.Screen name="user_tabs" component={user_tabs} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

// export default App;

//for redux
export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
