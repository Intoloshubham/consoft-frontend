import React from 'react';
import {View, Text} from 'react-native';
import {HeaderBar} from '../../../Components';
import {COLORS} from '../../../constants';
const ProjectReports = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.lightblue_50,
      }}>
      <HeaderBar right={true} />
      <Text> ProjectReports</Text>
    </View>
  );
};

export default ProjectReports;
