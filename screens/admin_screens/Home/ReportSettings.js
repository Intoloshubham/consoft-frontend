import React from 'react';
import {View, Text} from 'react-native';
import {HeaderBar} from '../../../Components';

const ReportSettings = () => {
  return (
    <View>
      <HeaderBar title={'Report Settings'} right={true} />
      <Text>ReportSettings</Text>
    </View>
  );
};

export default ReportSettings;
