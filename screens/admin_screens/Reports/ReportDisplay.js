import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from 'react-native';
import {COLORS, FONTS} from '../../../constants';

const ReportDisplay = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View style={styles.container}>
      <Button title={'Open Modal'} onPress={() => setModalVisible(true)} />
      {modalVisible && (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <KeyboardAvoidingView
            behavior={'padding'}
            style={styles.safeAreaView}>
            <View style={styles.modalContentContainer}>
              <Button
                title={'Close Modal'}
                onPress={() => setModalVisible(false)}
              />
              <ScrollView>
                <View style={styles.textInputContainer}>
                  <TextInput
                    value={'test 1'}
                    onChangeText={() => {}}
                    onBlur={() => {}}
                  />
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    value={'test 2'}
                    onChangeText={() => {}}
                    onBlur={() => {}}
                  />
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    value={'test 3'}
                    onChangeText={() => {}}
                    onBlur={() => {}}
                  />
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    value={'test 4'}
                    onChangeText={() => {}}
                    onBlur={() => {}}
                  />
                </View>
              </ScrollView>
              <Button
                title={'Open Modal'}
                onPress={() => setModalVisible(true)}
              />
            </View>
          </KeyboardAvoidingView>
        </Modal>
      )}
    </View>
  );
};

export default ReportDisplay;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  safeAreaView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentContainer: {
    margin: 100,
    backgroundColor: '#d6d6d6',
    width: '80%',
    height: '60%',
    borderRadius: 10,
  },
  textInputContainer: {
    flex: 1,
    margin: 40,
    alignItems: 'center',
  },
});
