import React from 'react';
import {Text, View, Alert, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, icons} from '../../../constants';

const Tasks = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Tasks</Text>
    </View>
  );
};
export default Tasks;
