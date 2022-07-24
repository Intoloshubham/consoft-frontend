import React from 'react';
import {Text, View} from 'react-native';
import {COLORS, FONTS} from '../../../constants';

const ReportDisplay = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Report Display</Text>
    </View>
  );
};

export default ReportDisplay;
