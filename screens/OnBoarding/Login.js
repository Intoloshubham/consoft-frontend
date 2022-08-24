import React from 'react';
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
  Linking,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import utils from '../../utils';
import {FormInput, TextButton, CustomToast} from '../../Components';
import {FONTS, COLORS, SIZES, icons, images} from '../../constants';
import {userLogin} from '../../services/userAuthApi';
import {companyLogin} from '../../services/companyAuthApi';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCompanyId,
  getUserId,
  getToken,
} from '../../services/asyncStorageService';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [userMobileNo, setUserMobileNo] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const [userMobileNoError, setUserMobileNoError] = React.useState('');
  const [companyMobileNo, setCompanyMobileNo] = React.useState('');
  const [companyPassword, setCompanyPassword] = React.useState('');
  const [companyMobileNoError, setCompanyMobileNoError] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);

  // CUSTOM TOAST OF CRUD OPERATIONS
  const [submitToast, setSubmitToast] = React.useState(false);
  const [switchValue, setSwitchValue] = React.useState(false);
  const toggleSwitch = value => {
    setSwitchValue(value);
    if (value) {
      setUserMobileNo('');
      setUserPassword('');
    } else {
      setCompanyMobileNo('');
      setCompanyPassword('');
    }
  };

  const [userId, setUserId] = React.useState('');
  const [companyId, setCompanyId] = React.useState('');
  const [token, setToken] = React.useState('');

  const userOnSubmit = async () => {
    const UserData = {
      mobile: userMobileNo,
      password: userPassword,
    };
    const res = await dispatch(userLogin(UserData));
    console.log(res);
    if (res.payload.status === 200) {
      setSubmitToast(true);
      navigation.navigate('UserDashboard');
      // setUserMobileNo('');
      // setUserPassword('');
    } else {
      alert(res.payload.message);
    }
    setTimeout(() => {
      setSubmitToast(false);
    }, 2000);
  };

  const companyOnSubmit = async () => {
    const company_data = {
      mobile: companyMobileNo,
      password: companyPassword,
    };
    const res = await dispatch(companyLogin(company_data));
    if (res.payload.status === 200) {
      setSubmitToast(true);
      navigation.navigate('Home');
      // setCompanyMobileNo('');
      // setCompanyPassword('');
    } else {
      alert(res.payload.message);
    }
    setTimeout(() => {
      setSubmitToast(false);
    }, 2000);
  };

  const makeCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:+91-8109093551';
    } else {
      phoneNumber = 'telprompt:${+919988774455}';
    }
    Linking.openURL(phoneNumber);
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
            buttonContainerStyle={{
              height: 45,
              alignItems: 'center',
              marginVertical: SIZES.padding,
              borderRadius: SIZES.base,
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
          marginTop: SIZES.base,
          marginHorizontal: SIZES.radius,
          ...styles.formContainer,
        }}>
        <Text style={{textAlign: 'center', color: 'black', fontSize: 15}}>
          Registered Company Login
        </Text>
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
            onPress={companyOnSubmit}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding,
            justifyContent: 'center',
            paddingBottom: 5,
          }}>
          <TouchableOpacity onPress={() => alert('Demo Video')}>
            <Text
              style={{
                color: COLORS.black,
                ...FONTS.body4,
                fontWeight: 'bold',
              }}>
              Demo{' '}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: COLORS.black,
              ...FONTS.body4,
              fontWeight: 'bold',
            }}>
            &
          </Text>
          <TextButton
            label="Free 7-days trial"
            buttonContainerStyle={{
              marginLeft: 4,
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.rose_600,
              ...FONTS.h4,
              fontWeight: 'bold',
            }}
            onPress={() => navigation.navigate('CompanyRegistration')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingBottom: SIZES.radius,
          }}>
          <TextButton
            label="Free Register Or Purchase"
            buttonContainerStyle={{
              backgroundColor: COLORS.lightblue_900,
              paddingHorizontal: SIZES.radius * 3,
              paddingVertical: 5,
              borderRadius: 5,
            }}
            labelStyle={{
              color: COLORS.white,
              ...FONTS.h4,
            }}
            onPress={() => navigation.navigate('CompanyRegistration')}
          />
        </View>
        <View
          style={{
            marginHorizontal: SIZES.padding * 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              padding: 6,
              borderRadius: 5,
            }}
            onPress={() => {
              Linking.openURL(
                'mailto:ssdoffice44@gmail.com?subject=Subject&body=description',
              );
            }}>
            <Image
              source={icons.mail}
              resizeMode="contain"
              style={{
                height: 12,
                width: 12,
                tintColor: COLORS.black,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              padding: 6,
              borderRadius: 5,
            }}
            onPress={makeCall}>
            <Image
              source={icons.call}
              resizeMode="contain"
              style={{
                height: 12,
                width: 12,
                tintColor: COLORS.black,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              padding: 6,
              borderRadius: 5,
            }}
            onPress={() => {
              Linking.openURL('https://wa.me/8109093551');
            }}>
            <Image
              source={icons.whatsapp}
              resizeMode="contain"
              style={{
                height: 12,
                width: 12,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              padding: 6,
              borderRadius: 5,
            }}
            onPress={() => Linking.openURL('http://www.intoloindia.com/')}>
            <Image
              source={icons.website}
              resizeMode="contain"
              style={{
                height: 12,
                width: 12,
                tintColor: COLORS.black,
              }}
            />
          </TouchableOpacity>
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
          trackColor={{false: COLORS.gray, true: COLORS.gray}}
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
      behavior={Platform.OS === 'ios' ? SIZES.padding : SIZES.height}
      style={{flex: 1}}>
      <LinearGradient
        colors={[COLORS.lightblue_100, COLORS.lightblue_300]}
        style={{flex: 1}}>
        {renderHeaderLogo()}
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAwareScrollView
            keyboardDismissMode="on-drag"
            contentContainerStyle={{
              flex: 1,
            }}>
            {renderHeaderImage()}
            {renderToggleButton()}
            {switchValue ? renderCompanyForm() : renderUserForm()}
          </KeyboardAwareScrollView>
        </ScrollView>
      </LinearGradient>
      <CustomToast
        isVisible={submitToast}
        onClose={() => setSubmitToast(false)}
        color={COLORS.green}
        title="Login"
        message="Login Successfully..."
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: SIZES.radius,
    paddingBottom: SIZES.padding,
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

export default Login;
