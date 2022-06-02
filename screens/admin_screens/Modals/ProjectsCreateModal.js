import React from 'react';
import {
  View,
  Text,
  Animated,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import {COLORS, SIZES, FONTS, icons, images} from '../../../constants';
import {IconButton} from '../../../Components';
import AuthLayout from '../../Authentication/AuthLayout';
import utils from '../../../utils';
import {useNavigation} from '@react-navigation/native';
import {TextButton, FormInput, CustomDropdown} from '../../../Components';
const url = 'http://192.168.1.99:8000/api/projects';

const ProjectsCreateModal = ({isVisible, onClose}) => {
  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [showCreateProjectModal, setCreateProjectModal] =
    React.useState(isVisible);

  React.useEffect(() => {
    if (showCreateProjectModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showCreateProjectModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 680],
  });

  const navigation = useNavigation();

  // create projects
  const [projectname, setProjectName] = React.useState('');
  const [projectError, setProjectError] = React.useState('');
  const [projectlocation, setProjectLocation] = React.useState('');
  const [projectLocationError, setProjectLocationError] = React.useState('');
  const [projectplotarea, setProjectPlotArea] = React.useState('');
  const [projectPlotAreaError, setProjectPlotAreaError] = React.useState('');
  const data = [
    {label: 'Engineer', value: '1'},
    {label: 'Supervisor', value: '2'},
    {label: 'Asst. Superviosr', value: '3'},
  ];
  const [dropdown, setDropdown] = React.useState(null);

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
      project_type: dropdown,
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
      })
      .catch(error => {
        console.error('Error:', error);
      });

    setTimeout(() => {
      setCreateProjectModal(false);
    }, 1000);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={{flex: 1, backgroundColor: COLORS.transparentBlack7}}>
        {/* transparent background */}
        <TouchableWithoutFeedback onPress={() => setCreateProjectModal(false)}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}></View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: modalY,
            width: '100%',
            height: '100%',
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}>
          {/* header */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 1, ...FONTS.h2, color: COLORS.darkGray}}>
              Create New Project
            </Text>
            <IconButton
              containerStyle={{
                boborderWidth: 2,
                borderRadius: 10,
                borderColor: COLORS.gray2,
              }}
              icon={icons.cross}
              iconStyle={{
                tintColor: COLORS.gray,
              }}
              onPress={() => setCreateProjectModal(false)}
            />
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 250,
            }}>
            {/* <CreateProjects /> */}

            <AuthLayout>
              <View
                style={{
                  flex: 1,
                  marginTop: SIZES.padding,
                  marginHorizontal: SIZES.base,
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
                  label="Project name"
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
                          projectname == '' ||
                          (projectname != '' && projectError == '')
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
                  label="Location"
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
                              : projectlocation != '' &&
                                projectLocationError == ''
                              ? COLORS.green
                              : COLORS.red,
                        }}
                      />
                    </View>
                  }
                />

                <FormInput
                  label="Plot area"
                  keyboardType="default"
                  autoCompleteType="cc-number"
                  onChange={value => {
                    utils.validateNumber(value, setProjectPlotAreaError);
                    setProjectPlotArea(value);
                  }}
                  errorMsg={projectPlotAreaError}
                  appendComponent={
                    <View
                      style={{
                        justifyContent: 'center',
                        marginTop: SIZES.base,
                        height: 30,
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
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ProjectsCreateModal;
