import React from 'react';
import {View, Text} from 'react-native';
import {HeaderBar} from '../../../Components';

const Boq = () => {
  return (
    <View>
      <HeaderBar right={true} title="BOQ" />
      <Text style={{textAlign: 'center'}}>boq</Text>
    </View>
  );
};

export default Boq;
