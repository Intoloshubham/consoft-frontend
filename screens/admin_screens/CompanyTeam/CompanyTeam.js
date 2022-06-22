import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import AuthLayout from '../../Authentication/AuthLayout';
import {FONTS, SIZES, COLORS, icons} from '../../../constants';
import {FormInput, TextButton, CustomDropdown} from '../../../Components';
import utils from '../../../utils';
import Config from '../../../config';
import {HeaderBar} from '../../../Components';

const CompanyTeam = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [mobileNo, setMobileNo] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);

  const [emailError, setEmailError] = React.useState('');
  const [usernameError, setUsernameError] = React.useState('');
  const [mobileNoError, setMobileNoError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  // dropdown
  const data = [
    {label: 'Engineer', value: '1'},
    {label: 'Supervisor', value: '2'},
    {label: 'Asst. Superviosr', value: '3'},
  ];
  const [dropdown, setDropdown] = React.useState(null);

  const OnSubmit = () => {
    const data = {
      role: dropdown,
      name: username,
      email: email,
      mobile: mobileNo,
      password: password,
    };

    fetch(`${Config.API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error.message);
      });
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <HeaderBar right={true} title="Company Team" />

      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding * 2,
          marginHorizontal: SIZES.padding,
        }}>
        <CustomDropdown
          data={data}
          label="Dropdown"
          value={dropdown}
          onChange={item => {
            setDropdown(item.value);
            console.log('selected', item);
          }}
        />
        <FormInput
          label="Name"
          // placeholder="Username"
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
          label="Email"
          // placeholder="Email"
          keyboardType="email-address"
          autoCompleteType="email"
          onChange={value => {
            //validate email

            // utils.validateEmail(value, setEmailError);
            setEmail(value);
          }}
          // errorMsg={emailError}
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
          // placeholder="Mobile No."
          // keyboardType="email-address"
          // autoCompleteType="email"
          onChange={value => {
            //validate number
            // utils.validateNumber(value, setMobileNoError);
            setMobileNo(value);
          }}
          // errorMsg={mobileNoError}
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
          label="Password"
          // placeholder="Password"
          secureTextEntry={!showPass}
          autoCompleteType="password"
          onChange={value => {
            // utils.validatePassword(value, setPasswordError);
            setPassword(value);
          }}
          // errorMsg={passwordError}
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
        {/* SignIn & SignUp section  */}
        <TextButton
          label="Submit"
          buttonContainerStyle={{
            height: 55,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
          }}
          onPress={OnSubmit}
        />
      </View>
    </View>
  );
};

export default CompanyTeam;
