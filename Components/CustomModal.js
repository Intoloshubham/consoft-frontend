import React, {useState} from 'react';
import {Button, Text, View, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS, FONTS, icons, SIZES} from '../constants';

function CustomModal() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Button title="Show modal" onPress={toggleModal} />
      <Modal
        isVisible={isModalVisible}
        coverScreen={true}
        animationOut="fadeOut">
        <View
          style={{
            // height: 80,
            marginHorizontal: SIZES.radius,
            backgroundColor: COLORS.lightblue_50,
            borderRadius: SIZES.radius,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: SIZES.radius,
              paddingVertical: SIZES.radius,
            }}>
            <Text
              style={{
                ...FONTS.h2,
              }}>
              Modal title
            </Text>
            <TouchableOpacity onPress={toggleModal}>
              <Image
                source={icons.cross}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.gray,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CustomModal;
