import React from 'react';
import {View, Text, Button} from 'react-native';
import {ToastMsg} from '../../../Components';
import {COLORS, SIZES} from '../../../constants';
import Config from '../../../config';

const Tasks = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ToastMsg visible={setvisibleToast} message="Example" />
      <Button title="Toggle Toast" onPress={() => handleButtonPress()} />

      <Text>{Config.API_URL} cs ffhd fdfhdsjfhssdd sgdvhsvfhdsfhsd</Text>

      <View
        style={{
          marginTop: SIZES.padding,
        }}></View>
    </View>
  );
};

export default Tasks;
