import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CustomToast} from '../../../Components';
import {COLORS} from '../../../constants';

const Tasks = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisible1, setModalVisible1] = React.useState(false);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Click</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisible1(true)}>
        <Text>Click</Text>
      </TouchableOpacity>
      <CustomToast
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        color={COLORS.green}
        title="Work Update"
        message="Updated Work Successfully..."
      />
      <CustomToast
        isVisible={modalVisible1}
        onClose={() => setModalVisible1(false)}
        color={COLORS.rose_600}
        title="Work Update"
        message="Updated Work Successfully..."
      />
    </View>
  );
};

export default Tasks;
