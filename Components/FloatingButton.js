import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {SIZES, images, COLORS, icons} from '../constants';

const FloatingButton = ({onPress, containerStyle, icon}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.lightblue_700,
        borderRadius: 50,
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        ...containerStyle,
      }}
      onPress={onPress}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{width: 20, height: 20, tintColor: COLORS.white}}
      />
    </TouchableOpacity>
  );
};

export default FloatingButton;
