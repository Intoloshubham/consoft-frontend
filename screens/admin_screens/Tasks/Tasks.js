import React from 'react';
<<<<<<< HEAD
import {View, Text} from 'react-native';
=======
import {View, Text, Button} from 'react-native';
import {ToastMsg} from '../../../Components';
import {COLORS, SIZES} from '../../../constants';
import Config from '../../../config';
>>>>>>> 94543fa2e1910b67598eb44acdc9059cf899c1b1

const Tasks = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
<<<<<<< HEAD
      <Text>Tasks</Text>
=======
      <ToastMsg visible={setvisibleToast} message="Example" />
      <Button title="Toggle Toast" onPress={() => handleButtonPress()} />

      <Text>{Config.API_URL} cs ffhd fdfhdsjfhssdd sgdvhsvfhdsfhsd</Text>

      <View
        style={{
          marginTop: SIZES.padding,
        }}></View>
>>>>>>> 94543fa2e1910b67598eb44acdc9059cf899c1b1
    </View>
  );
};

export default Tasks;
