import React from 'react';
import {View, Text} from 'react-native';
import {
  FormInput,
  CustomDropdown,
  TextButton,
  HeaderBar,
} from '../../../../Components';

const ManageStock = () => {
  return (
    <View>
      <HeaderBar right={true} title="Manage Stock" />
      <Text>ManageStock</Text>
    </View>
  );
};

export default ManageStock;
