import React from 'react';
import {Text, View, Alert, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, icons} from '../../../constants';
import {DeleteConfirmationToast} from '../../../Components';

const Tasks = () => {
  const [modal, setModal] = React.useState(false);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => setModal(true)}>
        <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Tasks</Text>
      </TouchableOpacity>
      <DeleteConfirmationToast
        isVisible={modal}
        onClose={() => setModal(false)}
        title={'Are You Sure?'}
        message={'Do you really want to delete?'}
        color={COLORS.rose_600}
        icon={icons.delete_withbg}
        onClickYes={() => alert('delete')}
      />
    </View>
  );
};
export default Tasks;
