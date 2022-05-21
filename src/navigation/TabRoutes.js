import React from 'react'
import { View, Text, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, SignUpScreen, SignInScreen } from '../screens';
import navigationStrings from '../constants/navigationStrings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import imagePath from '../constants/imagePath';

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  return (
    // <NavigationContainer>
      

      <Tab.Navigator 
      initialRouteName={navigationStrings.SIGNIN}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: {
            // position: 'absolute',
            // backgroundColor: '#ADD8E6',
            // borderRadius: 50,
            // bottom: 20,
            // marginHorizontal: 16

            }
        }}
      >
          <Tab.Screen
            name={navigationStrings.SIGNIN} 
            component={SignInScreen}
            options={{
                tabBarIcon: ({ focused }) => {
                    return (
                        <Image
                            style={{
                                tintColor: focused ? 'red' : 'gray'
                            }}
                            source={imagePath.icHome} />
                        
                    )
                }
            }}
            />
          <Tab.Screen 
            name={navigationStrings.SIGNUP} 
            component={SignUpScreen}
            options={{
                tabBarIcon: ({ focused }) => {
                    return (

                        <Image
                            style={{
                                tintColor: focused ? 'red' : 'gray'
                            }}
                            source={imagePath.icExplore}
                        />
                    )
                }
            }}
            />

          <Tab.Screen 
          name={navigationStrings.HOME} 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => {
                return (
                    <Image
                        style={{
                            tintColor: focused ? 'red' : 'gray'
                        }}
                        source={imagePath.icProfile}
                    />
                )
            }
        }}
          />
      </Tab.Navigator>
      
      
    //  </NavigationContainer> 
  )
}

export default TabRoutes