import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, SIZES, icons, images} from '../constants';
import {
  Home,
  Account,
  Calender,
  ReportsDisplay,
  Tasks,
} from '../screens/admin_screens';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        top: -12,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
      onPress={onPress}>
      <LinearGradient
        colors={[COLORS.success_400, COLORS.success_800]}
        style={{
          width: 45,
          height: 45,
          borderRadius: 35,
        }}>
        {children}
      </LinearGradient>
      <Text
        style={{
          color: COLORS.black,
          ...FONTS.body5,
        }}>
        Show Report
      </Text>
    </TouchableOpacity>
  );
};
const Tabs = () => {
  const companyData = useSelector(state => state.company);

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
          elevation: 10,
          backgroundColor: COLORS.white,
          borderTopColor: 'transparent',
          height: 100,
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
        name={'Dashboard'}
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={icons.dashboard}
                resizeMode="contain"
                style={{
                  height: focused ? 20 : 18,
                  width: focused ? 20 : 18,
                  tintColor: COLORS.black,
                }}
              />
              <Text
                style={{
                  color: COLORS.black,
                  ...FONTS.body5,
                }}>
                Home
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
                  height: focused ? 20 : 18,
                  width: focused ? 20 : 18,
                  tintColor: COLORS.black,
                }}
              />
              <Text
                style={{
                  color: COLORS.black,
                  ...FONTS.body5,
                }}>
                Tasks
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportsDisplay}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.report}
              resizeMode="contain"
              style={{
                height: focused ? 22 : 20,
                width: focused ? 22 : 20,
                tintColor: COLORS.white,
              }}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Calender"
        component={Calender}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={icons.date}
                style={{
                  height: focused ? 20 : 18,
                  width: focused ? 20 : 18,
                  tintColor: COLORS.black,
                }}
              />
              <Text
                style={{
                  color: COLORS.black,
                  ...FONTS.body5,
                }}>
                Calender
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
                  height: focused ? 20 : 18,
                  width: focused ? 20 : 18,
                  tintColor: COLORS.black,
                }}
              />
              <Text
                style={{
                  color: COLORS.black,
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
