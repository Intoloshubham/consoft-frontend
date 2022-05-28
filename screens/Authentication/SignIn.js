import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import AuthLayout from './AuthLayout';
import {
  FormInput,
  CustomSwitch,
  TextButton,
  TextIconButton,
} from '../../Components';
import utils from '../../utils';
import {icons, SIZES, COLORS, FONTS} from '../../constants';
import axios from 'axios';
const url = 'http://192.168.1.99:8000/api/login';

const SignIn = ({navigation}) => {
  const [mobileNo, setMobileNo] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [mobileNoError, setMobileNoError] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);

  const [saveMe, setSaveMe] = React.useState(false);

  function isEnableSignIn() {
    return mobileNo != '' && mobileNoError == '';
  }

  const onSubmit = () => {
    const data = {
      mobile: mobileNo,
      password: password,
    };
    console.log(data);
    // axios
    //   .post(url, data)
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.role == 'Administrator' || data.role == 'Editor') {
          navigation.navigate('Home');
        } else if (data.role == 'User') {
          navigation.navigate('UserDashboard');
        } else {
          console.log(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <AuthLayout
      title="Let's Sign You In"
      subtitle="Welcome Back You on Consoft">
      <View style={{flex: 1, marginTop: SIZES.padding * 2}}>
        <FormInput
          placeholder="Mobile No."
          keyboardType="phone-pad"
          autoCompleteType="tel"
          onChange={value => {
            //validate email
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
        <FormInput
          placeholder="Password"
          secureTextEntry={!showPass}
          keyboardType="default"
          autoCompleteType="password"
          containerStyle={{marginTop: SIZES.base}}
          onChange={value => setPassword(value)}
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
        />
        {/* save me & forgot password  */}
        {/* <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'flex-end',
          }}>
          <CustomSwitch value={saveMe} onChange={value => setSaveMe(value)} />
          <TextButton
            label="Forgot Password"
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.gray,
              ...FONTS.body4,
            }}
            onPress={() => navigation.navigate('ForgotPassword')}
          />
        </View> */}
        <TextButton
          label="Sign In"
          disabled={isEnableSignIn() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: 'center',
            marginTop: SIZES.padding * 2,
            borderRadius: SIZES.base,
            backgroundColor: isEnableSignIn()
              ? COLORS.lightblue_700
              : COLORS.transparentPrimary,
          }}
          onPress={onSubmit}
        />
        {/* <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'center',
            paddingBottom: SIZES.padding,
          }}>
          <Text
            style={{
              color: COLORS.darkGray,
              ...FONTS.body3,
            }}>
            Don't have an account?
          </Text>
          <TextButton
            label="Sign Up"
            buttonContainerStyle={{
              marginLeft: 3,
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3,
              fontWeight: 'bold',
            }}
            onPress={() => navigation.navigate('SignUp')}
          />
        </View> */}
        {/* <TextButton
          label="Forgot Password"
          buttonContainerStyle={{
            height: 55,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.blue,
          }}
          labelStyle={{
            color: COLORS.white,
            ...FONTS.body4,
          }}
          onPress={() => navigation.navigate('ForgotPassword')}
        /> */}
        <View style={{paddingBottom: SIZES.padding * 13}}></View>
      </View>
      {/* footer  */}
    </AuthLayout>
  );
};

export default SignIn;
