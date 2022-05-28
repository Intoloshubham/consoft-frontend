import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {COLORS, SIZES, FONTS, icons, images} from '../constants';

const ProfileValue = ({icon, value, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
      }}
      onPress={onPress}>
      {/* icon  */}
      <View
        style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          backgroundColor: COLORS.lightblue_100,
        }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            height: 25,
            width: 25,
            tintColor: COLORS.lightblue_800,
          }}
        />
      </View>

      {/* label & value  */}
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
        }}>
        {/* {label && (
          <Text
            style={{
              color: COLORS.gray,
              ...FONTS.body4,
            }}>
            {label}
          </Text>
        )} */}
        <Text style={{...FONTS.h3, fontSize: 18, color: COLORS.darkGray}}>
          {value}
        </Text>
      </View>
      {/* icon  */}
      <Image
        source={icons.right_arr}
        style={{
          height: 18,
          width: 18,
        }}
      />
    </TouchableOpacity>
  );
};

export default ProfileValue;
