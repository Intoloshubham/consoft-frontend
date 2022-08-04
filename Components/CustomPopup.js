import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../constants';

const CustomPopup = ({msgType, text, showColor, time, icon, onOff}) => {
  const [popupModal, setPopupModal] = React.useState(false);

  React.useEffect(() => {
    setPopupModal(onOff);
    setTimeout(() => {
      setPopupModal(false);
    }, time);
  });

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={popupModal}>
        <TouchableWithoutFeedback>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              top: 60,
            }}>
            <View
              style={{
                position: 'absolute',
                width: '90%',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 2,
                backgroundColor: 'white',
                ...styles.shadow,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    style={{
                      color: showColor,
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      ...FONTS.h3,
                    }}>
                    {msgType}
                  </Text>
                  <Text style={{color: COLORS.darkGray, ...FONTS.h3}}>
                    {text}
                  </Text>
                </View>
                <ImageBackground
                  style={{
                    backgroundColor: showColor,
                    padding: 3,
                    borderRadius: 2,
                  }}>
                  <Image
                    source={icon}
                    style={{height: 22, width: 22, tintColor: COLORS.white}}
                  />
                </ImageBackground>
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
    shadowOpacity: 0.8,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
export default CustomPopup;
