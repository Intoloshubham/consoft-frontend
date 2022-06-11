import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import AuthLayout from '../Authentication/AuthLayout';
import {FONTS, SIZES, COLORS, icons, images} from '../../constants';
import {
  FormInput,
  TextButton,
  TextIconButton,
  Dropdown,
} from '../../Components';
import utils from '../../utils';
const url = 'http://192.168.1.99:8000/api/register';

const SignUp = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [mobileNo, setMobileNo] = React.useState('');
  // const [password, setPassword] = React.useState('');
  // const [showPass, setShowPass] = React.useState(false);

  const [emailError, setEmailError] = React.useState('');
  const [usernameError, setUsernameError] = React.useState('');
  const [mobileNoError, setMobileNoError] = React.useState('');
  // const [passwordError, setPasswordError] = React.useState('');

  const designations = ['Engineer', 'Supervisor', 'Asst. Supervisor'];
  const defaultButtonText = React.useState('');

  function isEnableSignUp() {
    return (
      email != '' &&
      username != '' &&
      mobileNo != '' &&
      // password != '' &&
      emailError == '' &&
      // passwordError == '' &&
      usernameError == '' &&
      mobileNoError == ''
    );
  }

  const OnSubmit = () => {
    const data = {
      role: designations,
      name: username,
      email: email,
      mobile: mobileNo,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <AuthLayout
      title="Getting Started"
      subtitle="welcome back to consoft"
      titleContainerStyle={{marginTop: SIZES.radius}}>
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding,
        }}>
        <Dropdown data={designations} defaultButtonText="Select Designation" />
        <FormInput
          placeholder="Username"
          // containerStyle={{marginTop: SIZES.base}}
          //   keyboardType="email-address"
          //   autoCompleteType="email"
          onChange={value => {
            //validate email
            // utils.validateEmail(value, setUsernameError);
            setUsername(value);
          }}
          errorMsg={usernameError}
          appendComponent={
            <View style={{justifyContent: 'center'}}>
              <Image
                source={
                  username == '' || (username != '' && usernameError == '')
                    ? icons.correct
                    : icons.cancel
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    username == ''
                      ? COLORS.gray
                      : username != '' && usernameError == ''
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />
        <FormInput
          placeholder="Email"
          keyboardType="email-address"
          autoCompleteType="email"
          onChange={value => {
            //validate email

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
          // keyboardType="email-address"
          // autoCompleteType="email"
          onChange={value => {
            //validate number
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

        {/* <FormInput
          placeholder="Password"
          secureTextEntry={!showPass}
          autoCompleteType="password"
          onChange={value => {
            utils.validatePassword(value, setPasswordError);
            setPassword(value);
          }}
          errorMsg={passwordError}
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={() => setShowPass(!showPass)}>
              <Image
                source={showPass ? icons.eye_close : icons.eye}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.gray,
                }}
              />
            </TouchableOpacity>
          }
        /> */}
        {/* SignIn & SignUp section  */}
        <TextButton
          label="Sign Up"
          disabled={isEnableSignUp() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignUp()
              ? COLORS.lightblue_700
              : COLORS.transparentPrimary,
          }}
          onPress={OnSubmit}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'center',
            paddingBottom: SIZES.padding * 8,
          }}>
          <Text
            style={{
              color: COLORS.darkGray,
              ...FONTS.body3,
            }}>
            Already have an account?
          </Text>
          <TextButton
            label="Sign In"
            buttonContainerStyle={{
              marginLeft: 3,
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3,
              fontWeight: 'bold',
            }}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
      {/* footer  */}
    </AuthLayout>
  );
};

export default SignUp;
