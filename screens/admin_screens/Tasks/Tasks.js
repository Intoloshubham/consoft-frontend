import React from 'react';
import {View, Text} from 'react-native';
import {Dropdown2} from '../../../Components';

const Tasks = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Tasks</Text>
      <Dropdown2 />
    </View>
  );
};

export default Tasks;
