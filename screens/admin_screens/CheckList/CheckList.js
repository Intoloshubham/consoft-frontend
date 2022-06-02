import React from 'react';
import {View, Text} from 'react-native';
import {HeaderBar} from '../../../Components';

const CheckList = () => {
  return (
    <View>
      <HeaderBar right={true} title="Project Checklist" />
      <Text>CheckList</Text>
    </View>
  );
};

export default CheckList;
