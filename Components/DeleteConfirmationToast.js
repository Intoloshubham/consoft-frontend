import React from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {FONTS, COLORS, images, icons, SIZES} from '../constants';

const DeleteConfirmationToast = ({
  isVisible,
  onClose,
  color,
  title,
  message,
  icon,
  onClickYes,
}) => {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              // marginHorizontal: SIZES.padding,
              backgroundColor: COLORS.transparentBlack3,
            }}>
            <View
              style={{
                position: 'absolute',
                width: '90%',
                backgroundColor: COLORS.lightblue_50,
                borderRadius: 5,
                paddingHorizontal: SIZES.padding,
                paddingVertical: 3,
                ...styles.shadow,
              }}>
              <View
                style={{
                  padding: 20,
                  alignItems: 'center',
                }}>
                <Image source={icon} style={{height: 60, width: 60}} />
                <Text
                  style={{
                    ...FONTS.h2,
                    color: COLORS.darkGray,
                    marginTop: 20,
                  }}>
                  {title}
                </Text>
                <Text style={{...FONTS.h3, marginTop: 5}}>{message}</Text>
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={{
                      right: 15,
                      backgroundColor: COLORS.gray,
                      paddingHorizontal: 15,
                      paddingVertical: 8,
                    }}
                    onPress={onClose}>
                    <Text style={{...FONTS.h3, color: COLORS.white}}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      left: 15,
                      backgroundColor: color,
                      paddingHorizontal: 15,
                      paddingVertical: 8,
                    }}
                    onPress={onClickYes}>
                    <Text style={{...FONTS.h3, color: COLORS.white}}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 20,
  },
});
export default DeleteConfirmationToast;
