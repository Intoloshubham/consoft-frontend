import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import {COLORS, FONTS} from '../constants';

const ConformationAlert = ({
  isVisible,
  onCancel,
  title,
  message,
  cancelText,
  confirmText,
  onConfirmPressed,
}) => {
  return (
    <AwesomeAlert
      show={isVisible}
      showProgress={false}
      title={title}
      message={message}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={true}
      showCancelButton={true}
      showConfirmButton={true}
      cancelText={cancelText}
      confirmText={confirmText}
      cancelButtonColor={COLORS.gray}
      cancelButtonTextStyle={{...FONTS.h4}}
      confirmButtonColor={COLORS.green}
      confirmButtonTextStyle={{...FONTS.h4}}
      onCancelPressed={onCancel}
      onConfirmPressed={onConfirmPressed}
      overlayStyle={{backgroundColor: COLORS.transparentBlack6}}
      contentContainerStyle={{
        backgroundColor: COLORS.white,
        borderRadius: 5,
      }}
      titleStyle={{...FONTS.h3, color: COLORS.black, fontSize: 20}}
      messageStyle={{...FONTS.h3, color: COLORS.darkGray}}
    />
  );
};
export default ConformationAlert;
