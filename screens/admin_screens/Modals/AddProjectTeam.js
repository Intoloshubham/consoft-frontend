import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import AuthLayout from '../../Authentication/AuthLayout';
import utils from '../../../utils';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {TextButton, FormInput, Dropdown} from '../../../Components';
import {COLORS, FONTS, SIZES, images, icons} from '../../../constants';

const AddProjectTeam = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = React.useState('');
  const [fullNameError, setFullNameError] = React.useState('');

  const [mobileNo, setMobileNo] = React.useState('');
  const [mobileNoError, setMobileNoError] = React.useState('');

  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');

  const teamRole = ['Engineer', 'Supervisor', 'Asst. Supervisor'];

  function isEnableSubmit() {
    return (
      fullName != '' &&
      fullNameError == '' &&
      mobileNo != '' &&
      mobileNoError == '' &&
      email != '' &&
      emailError == ''
    );
  }
  return (
    <AuthLayout>
      <View style={{flex: 1, marginTop: SIZES.base}}>
        <Dropdown data={teamRole} defaultButtonText="Select Designation" />
        <FormInput
          placeholder="Full Name"
          keyboardType="default"
          autoCompleteType="username"
          onChange={value => {
            utils.validateText(value, setFullNameError);
            setFullName(value);
          }}
          errorMsg={fullNameError}
          appendComponent={
            <View style={{justifyContent: 'center'}}>
              <Image
                source={
                  fullName == '' || (fullName != '' && fullNameError == '')
                    ? icons.correct
                    : icons.cancel
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    fullName == ''
                      ? COLORS.gray
                      : fullName != '' && fullNameError == ''
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />
        <FormInput
          placeholder="Email"
          keyboardType="default"
          autoCompleteType="username"
          onChange={value => {
            utils.validateEmail(value, setEmailError);
            setEmail(value);
          }}
          errorMsg={emailError}
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
          placeholder="Mobile No."
          keyboardType="numeric"
          autoCompleteType="username"
          onChange={value => {
            utils.validateNumber(value, setMobileNoError);
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
          disabled={isEnableSubmit() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSubmit()
              ? COLORS.lightblue_700
              : COLORS.lightblue_100,
          }}
          //   onPress={OnSubmit}
        />
      </View>
    </AuthLayout>
  );
};

export default AddProjectTeam;
