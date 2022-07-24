import React from 'react';
import {Text, View} from 'react-native';
import {COLORS, FONTS} from '../../../constants';

const Tracker = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Tracker</Text>
    </View>
  );
};

export default Tracker;
