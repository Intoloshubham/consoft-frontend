import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../constants';

const CustomModalToast = ({isVisible, messageType, message, col}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <TouchableWithoutFeedback>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: COLORS.transparentBlack2,
          }}>
          <View
            style={{
              position: 'absolute',
              backgroundColor: COLORS.white,
              padding: 5,
              borderRadius: 3,
              width: '90%',
              top: 50,
              borderLeftColor: col,
              borderLeftWidth: 5,
              borderBottomColor: col,
              borderBottomWidth: 2,
            }}>
            <View style={{left: 5}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: col}}>
                {messageType}
              </Text>
              <Text style={{fontSize: 12, color: COLORS.black}}>{message}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModalToast;
