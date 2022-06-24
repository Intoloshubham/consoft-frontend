import React from 'react';
import {View, Text} from 'react-native';
import Config from '../../../config';

const Tasks = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Tasks</Text>
      <Text>{Config.API_URL}</Text>
    </View>
  );
};

export default Tasks;
