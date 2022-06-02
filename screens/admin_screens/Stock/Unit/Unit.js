import React from 'react';
import {View, Text} from 'react-native';
import {HeaderBar, Accordian1} from '../../../../Components';

const Unit = () => {
  return (
    <View>
      <HeaderBar right={true} title="Units" />
      <Text>Unit screen</Text>
      <Accordian1 />
    </View>
  );
};

export default Unit;
