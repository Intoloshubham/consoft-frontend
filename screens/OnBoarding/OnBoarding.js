import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  Switch,
  Button,
} from 'react-native';
import {FONTS, COLORS, SIZES, icons, images, constants} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import {FormInput, TextButton} from '../../Components';
import utils from '../../utils';
import Toast from 'react-native-toast-message';
const url = 'http://192.168.1.99:8000/api/login';

const OnBoarding = ({navigation}) => {
  const [switchValue, setSwitchValue] = React.useState(false);
  const toggleSwitch = value => {
    setSwitchValue(value);
  };

  const [userMobileNo, setUserMobileNo] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const [userMobileNoError, setUserMobileNoError] = React.useState('');

  const [companyMobileNo, setCompanyMobileNo] = React.useState('');
  const [companyPassword, setCompanyPassword] = React.useState('');
  const [companyMobileNoError, setCompanyMobileNoError] = React.useState('');

  const [showPass, setShowPass] = React.useState(false);

  function isEnableLogin() {
    return (
      userMobileNo != '' &&
      userMobileNoError == '' &&
      companyMobileNo != '' &&
      companyMobileNoError == ''
    );
  }
  const showToast = () =>
    Toast.show({
      position: 'top',
      type: 'success',
      text1: 'Login Successfully',
      text2: 'Success',
      visibilityTime: 400,
    });

  const showToastError = () =>
    Toast.show({
      position: 'top',
      type: 'error',
      text1: 'Please Enter Valid data',
      text2: 'Error',
      visibilityTime: 400,
    });
  const userOnSubmit = () => {
    const data = {
      mobile: userMobileNo,
      password: userPassword,
    };
    console.log(data);
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
        if (data.access_token) {
          showToast();
          setTimeout(() => {
            navigation.navigate('UserDashboard');
          }, 200);
        }
        if (!data.access_token) {
          showToastError();
          setTimeout(() => {
            navigation.navigate('UserDashboard');
          }, 200);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  function renderHeaderLogo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.consoft_PNG}
          resizeMode="contain"
          style={{
            height: 100,
          }}
        />
      </View>
    );
  }
  function renderHeaderImage() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.build_f}
          resizeMode="contain"
          style={{
            width: '60%',
          }}
        />
      </View>
    );
  }
  function renderUserForm() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
          ...styles.formContainer,
        }}>
        <View>
          <FormInput
            placeholder="Mobile No."
            keyboardType="phone-pad"
            autoCompleteType="tel"
            onChange={value => {
              //validate email
              utils.validateNumber(value, setUserMobileNoError);
              setUserMobileNo(value);
            }}
            errorMsg={userMobileNoError}
            appendComponent={
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={
                    userMobileNo == '' ||
                    (userMobileNo != '' && userMobileNoError == '')
                      ? icons.correct
                      : icons.cancel
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:
                      userMobileNo == ''
                        ? COLORS.gray
                        : userMobileNo != '' && userMobileNoError == ''
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
            onChange={value => setUserPassword(value)}
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
          <TextButton
            label="Login"
            // disabled={isEnableSignIn() ? false : true}
            buttonContainerStyle={{
              height: 45,
              alignItems: 'center',
              marginTop: SIZES.padding,
              borderRadius: SIZES.base,
              // backgroundColor: isEnableSignIn()
              //   ? COLORS.lightblue_900
              //   : COLORS.transparentPrimary,
            }}
            onPress={userOnSubmit}
          />
        </View>
      </View>
    );
  }
  function renderCompanyForm() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
          ...styles.formContainer,
          // ...styles.shadow,
        }}>
        <View>
          <FormInput
            placeholder="Mobile No."
            keyboardType="phone-pad"
            autoCompleteType="tel"
            onChange={value => {
              //validate email
              utils.validateNumber(value, setCompanyMobileNoError);
              setCompanyMobileNo(value);
            }}
            errorMsg={companyMobileNoError}
            appendComponent={
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={
                    companyMobileNo == '' ||
                    (companyMobileNo != '' && companyMobileNoError == '')
                      ? icons.correct
                      : icons.cancel
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:
                      companyMobileNo == ''
                        ? COLORS.gray
                        : companyMobileNo != '' && companyMobileNoError == ''
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
            onChange={value => setCompanyPassword(value)}
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
          <TextButton
            label="Login"
            buttonContainerStyle={{
              height: 45,
              alignItems: 'center',
              marginTop: SIZES.padding,
              borderRadius: SIZES.base,
            }}
          />
        </View>
        <View
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
            If you want to create company?
          </Text>
          <TextButton
            label="Register"
            buttonContainerStyle={{
              marginLeft: 4,
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.red,
              ...FONTS.h3,
              fontWeight: 'bold',
            }}
            onPress={() => navigation.navigate('CreateCompany')}
          />
        </View>
      </View>
    );
  }
  function renderToggleButton() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 4,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            ...FONTS.h3,
            marginRight: SIZES.base,
            color: switchValue ? COLORS.gray : COLORS.black,
          }}>
          User Login
        </Text>
        <Switch
          onValueChange={toggleSwitch}
          value={switchValue}
          trackColor={{false: COLORS.gray, true: COLORS.rose_600}}
          thumbColor={switchValue ? COLORS.white : COLORS.white}
          ios_backgroundColor={COLORS.blue}
        />
        <Text
          style={{
            ...FONTS.h3,
            marginLeft: SIZES.base,
            color: switchValue ? COLORS.black : COLORS.gray,
          }}>
          Company Login
        </Text>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <LinearGradient
        colors={[COLORS.lightblue_50, COLORS.lightblue_300]}
        style={{flex: 1}}>
        {/* <Button title="Show toast" onPress={showToast} /> */}
        {renderHeaderLogo()}
        <Toast config={showToast} />
        <ScrollView>
          {renderHeaderImage()}
          {renderToggleButton()}
          {switchValue ? renderCompanyForm() : renderUserForm()}
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    // borderWidth: 0.8,
    // borderColor: COLORS.lightGray2,
    // borderRadius: SIZES.base,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.radius,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default OnBoarding;
