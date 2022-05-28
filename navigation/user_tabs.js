import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, SIZES, icons, images } from '../constants';
import {
  UserDashboard,
  Profile,
  Demo,
  Demo1,
  Demo2,
} from '../screens/user_screens';

import Reports from '../screens/user_screens/Reports/Reports'

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        top: -15,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
      onPress={onPress}>

      <LinearGradient
        colors={[COLORS.lightblue_500, COLORS.lightblue_900]}
        style={{
          width: 60,
          height: 60,
          borderRadius: 35,
        }}>
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};
const UserTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        // headerShown: false,
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: COLORS.white,
          borderTopColor: 'transparent',
          height: 100,
        },
        headerStyle: {
          // height: 60,
        },
        headerTitleAlign: 'left',
        headerRight: () => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: SIZES.radius,
            }}>
            <Image
              source={images.cons_logo}
              resizeMode="contain"
              style={{ height: 80, width: 100 }}
            />
          </View>
        ),
      }}>
      <Tab.Screen
        name="User Dahsboard"
        screenOptions={{
          tabBarShowLabel: false
        }}  
        component={UserDashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={icons.dashboard}
                resizeMode="contain"
                style={{
                  height: 18,
                  width: 18,
                  tintColor: focused ? COLORS.yellow_700 : COLORS.black,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.yellow_700 : COLORS.black,
                  ...FONTS.body5,
                }}>
                Dashboard
              </Text>
            </View>
          ),
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Demo"
        component={Demo}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={icons.tasks}
                style={{
                  height: 18,
                  width: 18,
                  tintColor: focused ? COLORS.yellow_700 : COLORS.black,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.yellow_700 : COLORS.black,
                  ...FONTS.body5,
                }}>
                Demo
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={Reports}

        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.report}
              resizeMode="contain"
              style={{
                height: 25,
                width: 25,
                tintColor: COLORS.white,
              }}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
          // headerShown:false
        }}
      />
      <Tab.Screen
        name="Demo2"
        component={Demo2}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={icons.tracker}
                style={{
                  height: 18,
                  width: 18,
                  tintColor: focused ? COLORS.yellow_700 : COLORS.black,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.yellow_700 : COLORS.black,
                  ...FONTS.body5,
                }}>
                Demo2
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={icons.account}
                style={{
                  height: 18,
                  width: 18,
                  tintColor: focused ? COLORS.yellow_700 : COLORS.black,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.yellow_700 : COLORS.black,
                  ...FONTS.body5,
                }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.39,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
export default UserTabs;
