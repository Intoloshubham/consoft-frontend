import React from 'react';
import {Text, View, Alert, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, icons} from '../../../constants';

const Tasks = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => navigation.navigate('ProjectsDetails')}>
        <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Tasks</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Tasks;
