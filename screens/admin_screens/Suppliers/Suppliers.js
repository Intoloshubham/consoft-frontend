import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {HeaderBar, FormInput, TextButton} from '../../../Components';
import {SIZES, COLORS, FONTS, images, icons} from '../../../constants';
import AuthLayout from '../../Authentication/AuthLayout';
import utils from '../../../utils';
import Toast from 'react-native-toast-message';

const Suppliers = () => {
  // form states
  const [name, setName] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [location, setLocation] = React.useState('');

  // error states
  const [nameError, setNameError] = React.useState('');
  const [mobileError, setMobileError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [locationError, setLocationError] = React.useState('');

  function isEnableSubmit() {
    return (
      name != '' &&
      nameError == '' &&
      mobile != '' &&
      mobileError == '' &&
      email != '' &&
      emailError == '' &&
      location != '' &&
      locationError == ''
    );
  }
  // show toast on successfullt created
  const showToast = () =>
    Toast.show({
      position: 'top',
      type: 'success',
      text1: 'User Created Successfully',
      text2: 'Success',
      visibilityTime: 2000,
    });

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <HeaderBar right={true} title="Suppliers" />
      <AuthLayout
        image={icons.suppliers1}
        title="Create Suppliers"
        subtitle="Good supplier management is essential to a well run supply chain">
        <Toast config={showToast} />
        <View
          style={{
            flex: 1,
            marginTop: SIZES.base,
            paddingBottom: SIZES.padding * 2,
            marginHorizontal: SIZES.radius,
          }}>
          <FormInput
            label="Name"
            keyboardType="default"
            autoCompleteType="username"
            onChange={value => {
              utils.validateText(value, setNameError);
              setName(value);
            }}
            errorMsg={nameError}
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
            label="Mobile No."
            keyboardType="numeric"
            onChange={value => {
              utils.validateNumber(value, setMobileError);
              setMobile(value);
            }}
            errorMsg={mobileError}
            appendComponent={
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={
                    mobile == '' || (mobile != '' && mobileError == '')
                      ? icons.correct
                      : icons.cancel
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:
                      mobile == ''
                        ? COLORS.gray
                        : mobile != '' && mobileError == ''
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
            label="Location"
            keyboardType="default"
            onChange={value => {
              utils.validateText(value, setLocationError);
              setLocation(value);
            }}
            errorMsg={locationError}
            appendComponent={
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={
                    location == '' || (location != '' && locationError == '')
                      ? icons.correct
                      : icons.cancel
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:
                      location == ''
                        ? COLORS.gray
                        : location != '' && locationError == ''
                        ? COLORS.green
                        : COLORS.red,
                  }}
                />
              </View>
            }
          />
          <TextButton
            label="Save"
            disabled={isEnableSubmit() ? false : true}
            buttonContainerStyle={{
              height: 45,
              alignItems: 'center',
              marginTop: SIZES.padding,
              borderRadius: SIZES.base,
              backgroundColor: isEnableSubmit()
                ? COLORS.lightblue_700
                : COLORS.transparentPrimary,
            }}
            onPress={() => console.log('Save Suppliers')}
          />
        </View>
      </AuthLayout>
    </View>
  );
};

export default Suppliers;
