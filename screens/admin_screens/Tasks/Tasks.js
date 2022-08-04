import React from 'react';
import {Text, View, Alert, TouchableOpacity} from 'react-native';

import {COLORS, FONTS, icons} from '../../../constants';


const Tasks = () => {
  const pressHandler = () => {
    Alert.alert('Details', 'Are you Sure want to delete?', [
      {text: 'Yes', onPress: () => console.log('Yes')},
      {text: 'No', onPress: () => console.log('No')},
    ]);
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Tasks</Text>
      <TouchableOpacity onPress={pressHandler}>
        <Text>onPress</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Tasks;
