import React from 'react';
import {View, Text} from 'react-native';
import {HeaderBar} from '../../../Components';

const ToolsAndMachinery = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.lightblue_50}}>
      <HeaderBar right={true} />
      <Text>ToolsAndMachinery</Text>
    </View>
  );
};

export default ToolsAndMachinery;
