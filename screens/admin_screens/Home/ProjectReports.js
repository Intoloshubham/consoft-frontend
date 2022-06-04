import React from 'react';
import {HeaderBar} from '../../../Components';
import {COLORS} from '../../../constants';
import {View, Text, Button} from 'react-native';
import Toast from 'react-native-toast-message';

const ProjectReports = () => {
  const showToast = () => {
    Toast.show({
      position: 'top',
      type: 'error',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.lightblue_50,
      }}>
      <HeaderBar right={true} title="Reports" />
      <Toast config={showToast} />
      <Text> ProjectReports</Text>
      <Button title="Show toast" onPress={showToast} />
    </View>
  );
};

export default ProjectReports;
