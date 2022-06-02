import React from 'react';
import {View, Text} from 'react-native';
import {HeaderBar} from '../../../../Components';

const Items = () => {
  return (
    <View>
      <HeaderBar right={true} title="Items"/>
      <Text>Items account stock</Text>
    </View>
  );
};

export default Items;
