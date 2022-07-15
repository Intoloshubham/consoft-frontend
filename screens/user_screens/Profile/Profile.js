import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  LogBox,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {removeUserId, removeToken} from '../../../services/asyncStorageService';
import {useSelector} from 'react-redux';
import {unSetUserInfo} from '../../../features/UserSlice';
import {unsetUserToken} from '../../../features/UserAuthSlice';
import {SIZES, COLORS, FONTS, icons, images} from '../../../constants';
import {ProfileValue, LineDivider} from '../../../Components';

const Profile = () => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.user);
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  });

  const logout = async () => {
    unSetUserInfo({
      _id: '',
      name: '',
      email: '',
      mobile: '',
      role: '',
      role_id: '',
    });
    unsetUserToken({token: null});
    await removeToken('token');
    await removeUserId('user_id');
    navigation.navigate('Login');
  };

  function renderProfileCard() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          paddingVertical: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightblue_800,
          alignItems: 'center',
        }}>
        {/* profile image  */}
        <TouchableOpacity
          style={{
            width: 80,
            height: 80,
          }}
          onPress={() => alert('Upload Image')}>
          <Image
            source={images.civil_eng}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 15,
              borderWidth: 3,
              borderColor: COLORS.white,
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                marginBottom: -15,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                backgroundColor: COLORS.success_300,
              }}>
              <Image
                source={icons.camera}
                resizeMode="contain"
                style={{
                  width: 17,
                  height: 17,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
        {/* Details  */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.padding,
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
              textTransform: 'capitalize',
            }}>
            {userData.name}
          </Text>
          <Text style={{color: COLORS.white, ...FONTS.body4}}>
            {userData.email}
          </Text>
          <Text style={{color: COLORS.white, ...FONTS.body4}}>
            +91{userData.mobile}
          </Text>
        </View>
      </View>
    );
  }

  function renderProfileSection2() {
    return (
      <View
        style={{
          ...styles.profileSectionContainer1,
        }}>
        <ProfileValue icon={icons.logout} value="LogOut" onPress={logout} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 150,
        }}>
        {renderProfileCard()}
        {renderProfileSection2()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  profileSectionContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.radius,
    borderWidth: 1,
    borderRadius: SIZES.base,
    borderColor: COLORS.gray2,
  },
  profileSectionContainer1: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.radius,
    borderWidth: 1,
    borderRadius: SIZES.base,
    borderColor: COLORS.gray2,
  },
});
export default Profile;
