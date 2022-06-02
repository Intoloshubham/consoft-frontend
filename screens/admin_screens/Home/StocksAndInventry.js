import React from 'react'; 
import {View, Text} from 'react-native';
import {HeaderBar} from '../../../Components';
import {COLORS} from '../../../constants';

const StocksAndInventry = () => {
  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.lightblue_50,
      }}>
      <HeaderBar right={true} title="Stock Inventry" />
      <Text> SAI</Text>
      

    </View>
  );
};

export default StocksAndInventry;