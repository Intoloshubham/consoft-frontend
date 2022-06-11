import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  Image,
} from 'react-native';
import {COLORS, SIZES, FONTS, icons} from '../../../constants';
import {FormInput, IconButton, TextButton, Drop} from '../../../Components';

const ToolsAndMachineryModal = ({isVisible, onClose}) => {
  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [showModal, setShowModal] = React.useState(isVisible);

  //Form data
  const [toolsName, setToolsName] = React.useState('');
  const [toolsQty, setToolsQty] = React.useState('');

  React.useEffect(() => {
    if (showModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 650],
  });
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={{flex: 1, backgroundColor: COLORS.transparentBlack7}}>
        {/* transparent background */}
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}></View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            left: SIZES.padding,
            top: modalY,
            width: '90%',
            // height: '50%',
            padding: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}>
          {/* header */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                flex: 1,
                // ...FONTS.h4,
                fontSize: 20,
                color: COLORS.darkGray,
              }}>
              Add New Tools & Machines
            </Text>
            <IconButton
              containerStyle={{
                boborderWidth: 2,
                borderRadius: 10,
                borderColor: COLORS.gray2,
              }}
              icon={icons.cross}
              iconStyle={{
                tintColor: COLORS.gray,
              }}
              onPress={() => setShowModal(false)}
            />
          </View>

          {/* ToolsAndMachinery data  */}
          <View
            style={{
              marginTop: SIZES.padding,
            }}>
            <FormInput
              label="Item name"
              keyboardType="default"
              autoCompleteType="username"
              onChange={value => {
                setToolsName(value);
              }}
              appendComponent={
                <View style={{justifyContent: 'center'}}>
                  <Image
                    source={
                      toolsName == '' || toolsName != ''
                        ? icons.correct
                        : icons.cancel
                    }
                    style={{
                      height: 20,
                      width: 20,
                      tintColor:
                        toolsName == ''
                          ? COLORS.gray
                          : toolsName != ''
                          ? COLORS.green
                          : COLORS.red,
                    }}
                  />
                </View>
              }
            />
            <FormInput
              label="Quantity"
              keyboardType="numeric"
              onChange={value => {
                setToolsQty(value);
              }}
              appendComponent={
                <View style={{justifyContent: 'center'}}>
                  <Image
                    source={
                      toolsQty == '' || toolsQty != ''
                        ? icons.correct
                        : icons.cancel
                    }
                    style={{
                      height: 20,
                      width: 20,
                      tintColor:
                        toolsQty == ''
                          ? COLORS.gray
                          : toolsQty != ''
                          ? COLORS.green
                          : COLORS.red,
                    }}
                  />
                </View>
              }
            />
            <TextButton
              label="Add New"
              buttonContainerStyle={{
                height: 45,
                marginTop: SIZES.padding * 1.5,
                alignItems: 'center',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightblue_700,
              }}
              onPress={() => alert('Okay...')}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ToolsAndMachineryModal;
