import React from 'react';
import {View, Text, Image} from 'react-native';
import {HeaderBar} from '../../Components';
import AuthLayout from '../Authentication/AuthLayout';
import utils from '../../utils';
import {COLORS, images, icons, SIZES} from '../../constants';
import {FormInput, TextButton} from '../../Components';

const url = 'http://192.168.1.99:8000/api/company';

const CreateCompany = ({navigation}) => {
  const [cName, setCName] = React.useState('');
  const [cPanNo, setCPanNo] = React.useState('');
  const [cMobileNo, setCMobileNo] = React.useState('');
  const [cEmail, setCEmail] = React.useState('');

  const [cNameError, setCNameError] = React.useState('');
  const [cPanNoError, setCPanNoError] = React.useState('');
  const [cMobileNoError, setCMobileNoError] = React.useState('');
  const [cEmailError, setCEmailError] = React.useState('');

  function isEnableCreateCompany() {
    return (
      cName != '' &&
      cNameError == '' &&
      cPanNo != '' &&
      cPanNoError == '' &&
      cMobileNo != '' &&
      cMobileNoError == '' &&
      cEmail != '' &&
      cEmailError == ''
    );
  }

  const onSubmit = () => {
    const data = {
      company_name: cName,
      pan: cPanNo,
      mobile: cMobileNo,
      email: cEmail,
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
        navigation.navigate('CompanyPayment');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <HeaderBar right={true} title="Create Company" />
      <AuthLayout image={images.create_company} title="Let's Create Company">
        <View
          style={{
            marginHorizontal: SIZES.padding,
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
          <FormInput
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

export default CreateCompany;
