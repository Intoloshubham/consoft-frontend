import React from 'react';
import {View, Image} from 'react-native';
import AuthLayout from '../Authentication/AuthLayout';
import utils from '../../utils';
import {FormInput, TextButton, HeaderBar} from '../../Components';
import {COLORS, images, icons, SIZES} from '../../constants';

import {useDispatch} from 'react-redux';
import {registerCompany} from '../../services/companyAuthApi';
import {getCompanyId} from '../../services/asyncStorageService';

const CompanyRegistration = ({navigation}) => {
  const dispatch = useDispatch();

  const [cName, setCName] = React.useState('');
  //const [cPanNo, setCPanNo] = React.useState('');
  const [cMobileNo, setCMobileNo] = React.useState('');
  const [cEmail, setCEmail] = React.useState('');

  const [cNameError, setCNameError] = React.useState('');
  //const [cPanNoError, setCPanNoError] = React.useState('');
  const [cMobileNoError, setCMobileNoError] = React.useState('');
  const [cEmailError, setCEmailError] = React.useState('');

  const onSubmit = async () => {
    const companyData = {
      company_name: cName,
      //pan: cPanNo,
      mobile: cMobileNo,
      email: cEmail,
    };

    const result = await dispatch(registerCompany(companyData));

    if (result.payload.status === 200) {
      setTimeout(() => {
        navigation.navigate('VerifyProductKey');
      }, 300);
    } else {
      alert(res.payload.message);
    }
    // const company_id = await getCompanyId();
  };

  function isEnableCreateCompany() {
    return (
      cName != '' &&
      cNameError == '' &&
      //cPanNo != '' &&
      //cPanNoError == '' &&
      cMobileNo != '' &&
      cMobileNoError == '' &&
      cEmail != '' &&
      cEmailError == ''
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <HeaderBar right={true} title="registration" />

      <AuthLayout image={images.create_company} title="Let's Create Company">
        <View
          style={{
            marginHorizontal: SIZES.radius,
          }}>
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
          {/* <FormInput
            label="Pan No."
            keyboardType="default"
            onChange={value => {
              utils.validateText(value, setCPanNoError);
              setCPanNo(value);
            }}
            errorMsg={cPanNoError}
            appendComponent={
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={
                    cPanNo == '' || (cPanNo != '' && cPanNoError == '')
                      ? icons.correct
                      : icons.cancel
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:
                      cPanNo == ''
                        ? COLORS.gray
                        : cPanNo != '' && cPanNoError == ''
                        ? COLORS.green
                        : COLORS.red,
                  }}
                />
              </View>
            }
          /> */}
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
                    cMobileNo == '' || (cMobileNo != '' && cMobileNoError == '')
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
            // disabled={isEnableCreateCompany() ? false : true}
            buttonContainerStyle={{
              height: 45,
              alignItems: 'center',
              marginTop: SIZES.padding,
              borderRadius: SIZES.base,
              //   backgroundColor: isEnableCreateCompany()
              //     ? COLORS.lightblue_900
              //     : COLORS.transparentPrimary,
            }}
            onPress={onSubmit}
          />
        </View>
      </AuthLayout>
    </View>
  );
};

export default CompanyRegistration;
