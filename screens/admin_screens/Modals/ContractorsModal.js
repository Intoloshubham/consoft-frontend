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
import {IconButton, Drop, FormInput, TextButton} from '../../../Components';

const ContractorsModal = ({isVisible, onClose}) => {
  // company team states
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mobileNo, setMobileNo] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [mobileNoError, setMobileNoError] = React.useState('');

  //drop
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [items, setItems] = React.useState([
    {label: 'Engineer', value: '1'},
    {label: 'Supervisor', value: '2'},
    {label: 'Asst. Supervisor', value: '3'},
    {label: 'Site Engineer', value: '4'},
    {label: 'Other staff', value: '5'},
  ]);

  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [showCompanyTeamModal, setShowCompanyTeamModal] =
    React.useState(isVisible);

  React.useEffect(() => {
    if (showCompanyTeamModal) {
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
  }, [showCompanyTeamModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 650],
  });
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={{flex: 1, backgroundColor: COLORS.transparentBlack7}}>
        {/* transparent background */}
        <TouchableWithoutFeedback
          onPress={() => setShowCompanyTeamModal(false)}>
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
            <Text style={{flex: 1, ...FONTS.h2, color: COLORS.darkGray}}>
              Add Contractor
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
              onPress={() => setShowCompanyTeamModal(false)}
            />
          </View>
          {/* <WorkAssign /> */}
          <View>
            <Drop
              placeholder="Select Role"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              categorySelectable={true}
              listParentLabelStyle={{
                color: COLORS.white,
              }}
            />
            <FormInput
              label="Name"
              keyboardType="default"
              autoCompleteType="username"
              onChange={value => {
                setName(value);
              }}
              appendComponent={
                <View style={{justifyContent: 'center'}}>
                  <Image
                    source={
                      name == '' || (name != '' && nameError == '')
                        ? icons.correct
                        : icons.cancel
                    }
                    style={{
                      height: 20,
                      width: 20,
                      tintColor:
                        name == ''
                          ? COLORS.gray
                          : name != '' && nameError == ''
                          ? COLORS.green
                          : COLORS.red,
                    }}
                  />
                </View>
              }
            />
            <FormInput
              label="Email"
              keyboardType="email-address"
              autoCompleteType="email"
              onChange={value => {
                setEmail(value);
              }}
              appendComponent={
                <View style={{justifyContent: 'center'}}>
                  <Image
                    source={
                      email == '' || (email != '' && emailError == '')
                        ? icons.correct
                        : icons.cancel
                    }
                    style={{
                      height: 20,
                      width: 20,
                      tintColor:
                        email == ''
                          ? COLORS.gray
                          : email != '' && emailError == ''
                          ? COLORS.green
                          : COLORS.red,
                    }}
                  />
                </View>
              }
            />
            <FormInput
              label="Mobile No."
              keyboardType="numeric"
              onChange={value => {
                setMobileNo(value);
              }}
              errorMsg={mobileNoError}
              appendComponent={
                <View style={{justifyContent: 'center'}}>
                  <Image
                    source={
                      mobileNo == '' || (mobileNo != '' && mobileNoError == '')
                        ? icons.correct
                        : icons.cancel
                    }
                    style={{
                      height: 20,
                      width: 20,
                      tintColor:
                        mobileNo == ''
                          ? COLORS.gray
                          : mobileNo != '' && mobileNoError == ''
                          ? COLORS.green
                          : COLORS.red,
                    }}
                  />
                </View>
              }
            />
            <TextButton
              label="Submit"
              buttonContainerStyle={{
                height: 55,
                alignItems: 'center',
                marginTop: SIZES.padding,
                borderRadius: SIZES.radius,
              }}
              // onPress={OnSubmit}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ContractorsModal;
