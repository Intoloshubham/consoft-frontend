import React from 'react';
import {View, Text} from 'react-native';
import {FloatingButton, Drop} from '../../../Components';
import {COLORS, icons, SIZES} from '../../../constants';

const Tasks = () => {
  return (
    <View
      style={{
        // flex: 1,
        marginTop: SIZES.padding,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: SIZES.padding,
      }}>
      {/* <Text>Tasks</Text> */}
      {/* <FloatingButton
        icon={icons.plus}
        containerStyle={{backgroundColor: COLORS.rose_600}}
      /> */}
      <Drop />
    </View>
  );
};

export default Tasks;
