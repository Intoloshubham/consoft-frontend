import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import AuthLayout from '../../Authentication/AuthLayout';
import utils from '../../../utils';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {TextButton, FormInput} from '../../../Components';
import {COLORS, FONTS, SIZES, images, icons} from '../../../constants';
const url = 'http://192.168.1.99:8000/api/add-project';

const CreateProjects = () => {
  const navigation = useNavigation();
  const [projectname, setProjectName] = React.useState('');
  const [projectError, setProjectError] = React.useState('');
  const [projectlocation, setProjectLocation] = React.useState('');
  const [projectLocationError, setProjectLocationError] = React.useState('');
  const [projectplotarea, setProjectPlotArea] = React.useState('');
  const [projectPlotAreaError, setProjectPlotAreaError] = React.useState('');

  function isEnableSubmit() {
    return (
      projectname != '' &&
      projectError == '' &&
      projectlocation != '' &&
      projectLocationError == '' &&
      projectplotarea != '' &&
      projectPlotAreaError == ''
    );
  }

  const OnSubmit = () => {
    const data = {
      project_name: projectname,
      project_location: projectlocation,
      plot_area: projectplotarea,
    };

    axios
      .post(url, data)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <AuthLayout
      title="Let's Create a New Projects"
      subtitle="Welcome back to ConSoft">
      <View style={{flex: 1, marginTop: SIZES.padding * 2}}>
        <FormInput
          placeholder="Create Project"
          keyboardType="default"
          autoCompleteType="username"
          onChange={value => {
            utils.validateText(value, setProjectError);
            setProjectName(value);
          }}
          errorMsg={projectError}
          appendComponent={
            <View style={{justifyContent: 'center'}}>
              <Image
                source={
                  projectname == '' || (projectname != '' && projectError == '')
                    ? icons.correct
                    : icons.cancel
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    projectname == ''
                      ? COLORS.gray
                      : projectname != '' && projectError == ''
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />
        <FormInput
          placeholder="Location"
          keyboardType="default"
          autoCompleteType="username"
          onChange={value => {
            utils.validateText(value, setProjectLocationError);
            setProjectLocation(value);
          }}
          errorMsg={projectLocationError}
          appendComponent={
            <View style={{justifyContent: 'center'}}>
              <Image
                source={
                  projectlocation == '' ||
                  (projectlocation != '' && projectLocationError == '')
                    ? icons.correct
                    : icons.cancel
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    projectlocation == ''
                      ? COLORS.gray
                      : projectlocation != '' && projectLocationError == ''
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />
        <FormInput
          placeholder="Plot area"
          keyboardType="numeric"
          autoCompleteType="cc-number"
          onChange={value => {
            utils.validateNumber(value, setProjectPlotAreaError);
            setProjectPlotArea(value);
          }}
          errorMsg={projectPlotAreaError}
          appendComponent={
            <View style={{justifyContent: 'center'}}>
              <Image
                source={
                  projectplotarea == '' ||
                  (projectplotarea != '' && projectPlotAreaError == '')
                    ? icons.correct
                    : icons.cancel
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    projectplotarea == ''
                      ? COLORS.gray
                      : projectplotarea != '' && projectPlotAreaError == ''
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />
        <TextButton
          label="Submit"
          disabled={isEnableSubmit() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSubmit()
              ? COLORS.button_blue
              : COLORS.lightblue_100,
          }}
          onPress={OnSubmit}
        />
      </View>
    </AuthLayout>
  );
};

export default CreateProjects;
