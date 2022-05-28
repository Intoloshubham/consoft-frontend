import React from 'react';
import {Text, View, Image, Button, StyleSheet} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const UploadImage = () => {
  const openPicker = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User canceled');
      } else if (response.errorCode) {
        console.error('Image Picker Error:', response.errorCode);
      } else {
        const source = {uri: 'data:image/jpeg;base64	,' + response.base64};
      }
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title="Upload Project Image"
        onPress={() => {
          openPicker();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
});

export default UploadImage;
