import React from 'react';
import {View, Text} from 'react-native';
import {HeaderBar} from '../../../Components';
import {COLORS} from '../../../constants';

const ProjectSeheduleTime = () => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <HeaderBar right={true} title="Sehedule Time" />
      <Text> PST</Text>
    </View>
  );
};

export default ProjectSeheduleTime;
