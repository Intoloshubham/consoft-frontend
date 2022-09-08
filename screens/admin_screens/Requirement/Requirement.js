import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {COLORS, FONTS} from '../../../constants';

const Requirement = () => {
  const window = useWindowDimensions();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{...FONTS.h2, color: COLORS.black, marginBottom: 10}}>
        Screen Dimention
      </Text>
      <Text
        style={{
          ...FONTS.h3,
          color: COLORS.black,
        }}>{`Height - ${window.height}`}</Text>
      <Text
        style={{
          ...FONTS.h3,
          color: COLORS.black,
          marginTop: 3,
        }}>{`Width - ${window.width}`}</Text>
      {/* <Text>Requirement</Text> */}
    </View>
  );
};

export default Requirement;
