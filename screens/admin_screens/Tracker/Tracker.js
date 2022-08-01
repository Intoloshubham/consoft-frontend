import React from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import {COLORS, FONTS} from '../../../constants';
import {ConfirmDialog, Dialog} from 'react-native-simple-dialogs';

const Tracker = () => {
  const [modal, setmodal] = React.useState(false);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => setmodal(true)}>
        <Text>OPEN</Text>
      </TouchableOpacity>
      {/* <ConfirmDialog
        title="Confirm Dialog"
        message="Are you sure about that?"
        visible={modal}
        onTouchOutside={() => setmodal(false)}
        positiveButton={{
          title: 'YES',
          onPress: () => alert('Yes touched!'),
        }}
        negativeButton={{
          title: 'NO',
          onPress: () => alert('No touched!'),
        }}
      /> */}

      <Dialog
        visible={modal}
        title="Success"
        titleStyle={{color: COLORS.green}}
        animationType="slide"
        
        onTouchOutside={setTimeout(() => {
          setmodal(false);
        }, 1000)}

        dialogStyle={{backgroundColor: COLORS.white, borderRadius: 5}}
        overlayStyle={{backgroundColor: COLORS.transparentBlack1}}>
        <Text
          style={{
            ...FONTS.body3,
          }}>
          helo this is one
        </Text>
      </Dialog>
    </View>
  );
};

export default Tracker;
