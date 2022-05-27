import React from 'react';
import {View, Text} from 'react-native';
import {HeaderBar} from '../../../Components';
import {COLORS} from '../../../constants';

const ProjectSeheduleTime = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.lightblue_50,
      }}>
      <HeaderBar right={true} />
      <Text> PST</Text>
    </View>
  );
};

export default ProjectSeheduleTime;
