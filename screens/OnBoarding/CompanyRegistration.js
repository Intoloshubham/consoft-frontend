import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import utils from '../../utils';
import {FormInput, TextButton, HeaderBar, CustomToast} from '../../Components';
import {COLORS, images, icons, SIZES, FONTS} from '../../constants';
import {useDispatch} from 'react-redux';
import {registerCompany} from '../../services/companyAuthApi';

const CompanyRegistration = ({navigation}) => {
  const dispatch = useDispatch();
  const [cName, setCName] = React.useState('');
  const [cMobileNo, setCMobileNo] = React.useState('');
  const [cEmail, setCEmail] = React.useState('');

  const [cNameError, setCNameError] = React.useState('');
  const [cMobileNoError, setCMobileNoError] = React.useState('');
  const [cEmailError, setCEmailError] = React.useState('');

  // CUSTOM TOAST OF CRUD OPERATIONS
  const [submitToast, setSubmitToast] = React.useState(false);

  const onSubmit = async () => {
    const companyData = {
      company_name: cName,
      mobile: cMobileNo,
      email: cEmail,
    };
    const result = await dispatch(registerCompany(companyData));
    if (result.payload.status === 200) {
      setTimeout(() => {
        setSubmitToast(true);
        navigation.navigate('VerifyProductKey');
        setCName('');
        setCMobileNo('');
        setCEmail('');
      }, 300);
    } else {
      alert(result.payload.message);
    }
    setTimeout(() => {
      setSubmitToast(false);
    }, 4000);
  };
  return (
    <View style={{flex: 1}}>
      <HeaderBar right={true} title="registration" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: SIZES.padding,
              justifyContent: 'space-around',
            }}>
            <View style={{marginBottom: 20, alignItems: 'center'}}>
              <Image
                source={images.create_company}
                resizeMode="contain"
                style={{
                  height: 80,
                  width: 160,
                }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  ...FONTS.h2,
                }}>
                Let's Create Company
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.darkGray,
                  marginTop: SIZES.base,
                  ...FONTS.body3,
                }}></Text>
            </View>
            <View>
              <FormInput
                label="Name"
                keyboardType="default"
                autoCompleteType="name"
                onChange={value => {
                  utils.validateText(value, setCNameError);
                  setCName(value);
                }}
                errorMsg={cNameError}
                appendComponent={
                  <View style={{justifyContent: 'center'}}>
                    <Image
                      source={
                        cName == '' || (cName != '' && cNameError == '')
                          ? icons.correct
                          : icons.cancel
                      }
                      style={{
                        height: 20,
                        width: 20,
                        tintColor:
                          cName == ''
                            ? COLORS.gray
                            : cName != '' && cNameError == ''
                            ? COLORS.green
                            : COLORS.red,
                      }}
                    />
                  </View>
                }
              />
              <FormInput
                label="Mobile No."
                keyboardType="phone-pad"
                onChange={value => {
                  utils.validateNumber(value, setCMobileNoError);
                  setCMobileNo(value);
                }}
                errorMsg={cMobileNoError}
                appendComponent={
                  <View style={{justifyContent: 'center'}}>
                    <Image
                      source={
                        cMobileNo == '' ||
                        (cMobileNo != '' && cMobileNoError == '')
                          ? icons.correct
                          : icons.cancel
                      }
                      style={{
                        height: 20,
                        width: 20,
                        tintColor:
                          cMobileNo == ''
                            ? COLORS.gray
                            : cMobileNo != '' && cMobileNoError == ''
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
                  utils.validateEmail(value, setCEmailError);
                  setCEmail(value);
                }}
                errorMsg={cEmailError}
                appendComponent={
                  <View style={{justifyContent: 'center'}}>
                    <Image
                      source={
                        cEmail == '' || (cEmail != '' && cEmailError == '')
                          ? icons.correct
                          : icons.cancel
                      }
                      style={{
                        height: 20,
                        width: 20,
                        tintColor:
                          cEmail == ''
                            ? COLORS.gray
                            : cEmail != '' && cEmailError == ''
                            ? COLORS.green
                            : COLORS.red,
                      }}
                    />
                  </View>
                }
              />
              <TextButton
                label="Save & Continue"
                buttonContainerStyle={{
                  height: 45,
                  alignItems: 'center',
                  marginTop: SIZES.padding,
                  borderRadius: SIZES.base,
                }}
                onPress={onSubmit}
              />
            </View>
            <View style={{marginBottom: 120}}></View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <CustomToast
        isVisible={submitToast}
        onClose={() => setSubmitToast(false)}
        color={COLORS.green}
        title="Success"
        message="Registration Completed Successfully..."
      />
    </View>
  );
};

export default CompanyRegistration;
