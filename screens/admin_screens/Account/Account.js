import React from 'react';
import {View, Text, Image} from 'react-native';
import {SIZES, COLORS, FONTS, icons, images} from '../../../constants';

const Account = () => {
  function renderCreateUser() {
    return (
      <View
        style={{
          height: 100,
          backgroundColor: COLORS.lightblue_800,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding,
          flexDirection: 'row',
          alignItems: 'center',
        }}></View>
    );
  }
  return (
    <View
      style={{
        marginHorizontal: SIZES.padding,
        marginVertical: SIZES.padding,
      }}>
      {renderCreateUser()}
    </View>
  );
};

export default Account;
