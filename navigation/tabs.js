import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, SIZES, icons, images} from '../constants';
import {Home, Account, Tracker, Reports, Tasks} from '../screens/admin_screens';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({children, onPress}) => {
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
const Tabs = () => {
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
              source={images.consoft_PNG}
              resizeMode="contain"
              style={{height: 100, width: 100}}
            />
          </View>
        ),
      }}>
      <Tab.Screen
        name="Dahsboard"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
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
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
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
                Tasks
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={Reports}
        options={{
          tabBarIcon: ({focused}) => (
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
        }}
      />
      <Tab.Screen
        name="Tracker"
        component={Tracker}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
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
                Tracker
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
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
                Account
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
export default Tabs;
