import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import AuthLayout from '../../Authentication/AuthLayout';
import utils from '../../../utils';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {TextButton, FormInput, Dropdown} from '../../../Components';
import {COLORS, FONTS, SIZES, images, icons} from '../../../constants';
const url = 'http://192.168.1.99:8000/api/projects';

const CreateProjects = () => {
  const navigation = useNavigation();
  const [projectname, setProjectName] = React.useState('');
  const [projectError, setProjectError] = React.useState('');
  const [projectlocation, setProjectLocation] = React.useState('');
  const [projectLocationError, setProjectLocationError] = React.useState('');
  const [projectplotarea, setProjectPlotArea] = React.useState('');
  const [projectPlotAreaError, setProjectPlotAreaError] = React.useState('');

  const projectType = [
    'Bungalow',
    'Duplex/House',
    'Hi-rise apartments',
    'Mid-rise apartments',
    'Township',
  ];

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
      project_type: protype,
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
        alert('Project Created Succcessfully');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <AuthLayout
    // title="Let's Create a New Projects"
    // subtitle="Welcome back to ConSoft"
    >
      <View style={{flex: 1, marginTop: SIZES.padding * 2}}>
        <FormInput
          placeholder="Project name"
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
        <Dropdown data={projectType} defaultButtonText="Select type..." />
        <FormInput
          placeholder="Plot area"
          keyboardType="default"
          autoCompleteType="cc-number"
          onChange={value => {
            // utils.validateNumber(value, setProjectPlotAreaError);
            setProjectPlotArea(value);
          }}
          // errorMsg={projectPlotAreaError}
          appendComponent={
            <View
              style={{
                justifyContent: 'center',
                marginTop: SIZES.base,
                height: 40,
              }}>
              {/* <Image
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
              /> */}
              <Text style={{...FONTS.body4, color: COLORS.darkGray}}>
                H/A/Sqm/Sft
              </Text>
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
              ? COLORS.lightblue_700
              : COLORS.lightblue_100,
          }}
          onPress={OnSubmit}
        />
      </View>
    </AuthLayout>
  );
};

export default CreateProjects;
