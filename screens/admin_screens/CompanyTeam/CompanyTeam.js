import React from 'react';
import {View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {SIZES, COLORS, icons} from '../../../constants';
import {FormInput, TextButton, CustomDropdown} from '../../../Components';
import Config from '../../../config';
import {HeaderBar} from '../../../Components';
import AuthLayout from '../../Authentication/AuthLayout';
import utils from '../../../utils';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';

const CompanyTeam = ({navigation}) => {
  // form states & dropdown role data fetch from api
  const [openRole, setOpenRole] = React.useState(false);
  const [roleValue, setRoleValue] = React.useState([]);
  const [role, setRole] = React.useState([]);
  //projects
  const [openProject, setOpenProject] = React.useState(false);
  const [projectValue, setProjectValue] = React.useState([]);
  const [project, setProject] = React.useState([]);
  //
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  // const [password, setPassword] = React.useState('');
  // const [showPass, setShowPass] = React.useState(false);

  //erroe states
  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [mobileError, setMobileError] = React.useState('');
  // const [passwordError, setPasswordError] = React.useState('');

  // get company data
  const company_data = useSelector(state => state.company);
  // console.log(company_data);

  function isEnableSubmit() {
    return (
      name != '' &&
      nameError == '' &&
      mobile != '' &&
      mobileError == '' &&
      email != '' &&
      emailError == ''
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

  // get roles from api
  React.useEffect(() => {
    fetch(`${Config.API_URL}role`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        let roleDataFromApi = data.map(one => {
          return {label: one.user_role, value: one._id};
        });
        setRole(roleDataFromApi);
      })
      .catch(error => console.log(error.message));
  }, []);

  // get roles from api
  React.useEffect(() => {
    fetch(`${Config.API_URL}projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        let roleDataFromApi = data.map(ele => {
          return {label: ele.project_name, value: ele._id};
        });
        setProject(roleDataFromApi);
      })
      .catch(error => console.log(error.message));
  }, []);

  const OnCreateCompanyTeam = () => {
    const data = {
      role_id: roleValue,
      name: name,
      email: email,
      mobile: mobile,
      company_id: company_data._id,
      project_id: projectValue,
    };

    // console.log(data);
    fetch(`${Config.API_URL}register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status == 200) {
      
          showToast();
        }
        // console.log(data);
      })
      .catch(error => {
        console.error(error.message);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <HeaderBar right={true} title="Company Team" />
      <AuthLayout
        image={icons.staff}
        title="Create a new team"
        subtitle="Success is best when it's shared.">
        <Toast config={showToast} />
        <View
          style={{
            flex: 1,
            marginTop: SIZES.radius,
            paddingBottom: SIZES.padding * 2,
            marginHorizontal: SIZES.radius,
          }}>
          <CustomDropdown
            placeholder="Select role"
            open={openRole}
            value={roleValue}
            items={role}
            setOpen={setOpenRole}
            setValue={setRoleValue}
            setItems={setRole}
            listParentLabelStyle={{
              color: COLORS.white,
            }}
            zIndex={4000}
          />

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
          {/* <FormInput
            label="Password"
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
          <CustomDropdown
            placeholder="Assign to projects"
            open={openProject}
            value={projectValue}
            items={project}
            setOpen={setOpenProject}
            setValue={setProjectValue}
            setItems={setProject}
            listParentLabelStyle={{
              color: COLORS.white,
            }}
            zIndex={3000}
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
            onPress={OnCreateCompanyTeam}
          />
        </View>
      </AuthLayout>
    </View>
  );
};

export default CompanyTeam;
