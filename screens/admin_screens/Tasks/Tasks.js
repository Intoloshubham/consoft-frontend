import React from 'react';
import {View, Text, Button} from 'react-native';
import {ToastMsg} from '../../../Components';
import {COLORS, SIZES} from '../../../constants';

const Tasks = () => {
  const [visibleToast, setvisibleToast] = React.useState(false);
  React.useEffect(() => setvisibleToast(false), [visibleToast]);
  const handleButtonPress = () => {
    setvisibleToast(true);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.darkGray,
        paddingHorizontal: SIZES.padding,
      }}>
      <ToastMsg visible={setvisibleToast} message="Example" />
      <Button title="Toggle Toast" onPress={() => handleButtonPress()} />

      <View
        style={{
          marginTop: SIZES.padding,
        }}></View>
    </View>
  );
};

export default Tasks;
