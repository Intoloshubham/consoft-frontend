import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import FilePicker, {types} from 'react-native-document-picker';
import {COLORS, FONTS, SIZES, icons} from '../../../constants';
import {IconButton} from '../../../Components';

const DoucumentPicker = () => {
  const [fileData, setFileData] = React.useState([]);

  const handleFilePicker = async () => {
    try {
      const response = await FilePicker.pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
        type: [types.images, types.pdf, types.plainText],
      });
      setFileData(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {fileData.length > 0
        ? fileData.map((list, index) => {
            return (
              <View key={index}>
                <Text>Name:{list.name}</Text>
                <Image
                  source={{uri: list.uri}}
                  style={{
                    height: 100,
                    width: 100,
                  }}
                />
              </View>
            );
          })
        : null}
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.lightblue_700,
          paddingHorizontal: SIZES.radius,
          paddingVertical: SIZES.base,
        }}
        onPress={handleFilePicker}>
        <Text style={{...FONTS.h3, color: COLORS.white}}>OPEN</Text>
      </TouchableOpacity>
      {/* <IconButton
        icon={icons.camera}
        iconStyle={{tintColor: COLORS.lightblue_900}}
        onPress={handleFilePicker}
      /> */}
    </View>
  );
};

export default DoucumentPicker;
