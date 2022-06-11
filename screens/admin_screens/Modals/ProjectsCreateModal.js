import React, {useEffect} from 'react';
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
import {Drop, IconButton} from '../../../Components';
import AuthLayout from '../../Authentication/AuthLayout';
import utils from '../../../utils';
import {useNavigation} from '@react-navigation/native';
import {TextButton, FormInput, CustomDropdown} from '../../../Components';
const url = 'http://192.168.1.99:8000/api/projects';
import Toast from 'react-native-toast-message';

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

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [items, setItems] = React.useState([
    {label: 'Residential', value: '1'},
    {label: 'Mid-rise apertment', value: '7', parent: '1'},
    {label: 'Hi-rise apertment', value: '6', parent: '1'},
    {label: 'Township', value: '5', parent: '1'},
    {label: 'House', value: '4', parent: '1'},
    {label: 'Apartment', value: '3', parent: '1'},
    {label: 'Bungalow', value: '2', parent: '1'},

    {label: 'Commercial', value: '8'},
    {label: 'Showroom / Office', value: '9', parent: '8'},
    {label: 'Mall/Multiplxer', value: '10', parent: '8'},
    {label: 'Health Care', value: '11'},
    {label: 'Hospitals', value: '12', parent: '11'},
    {label: 'Hospitality', value: '13'},
    {label: 'Hotels', value: '14', parent: '13'},
    {label: 'Resorts', value: '15', parent: '13'},
    {label: 'Mixed Used', value: '16', parent: '13'},
  ]);

  // const data = [
  // {label: 'Bungalow', value: '1'},
  // {label: 'Apartment', value: '2', parent: '1'},
  // {label: 'Flat', value: '3'},
  // {label: 'Mall', value: '4'},
  // {label: 'Duplex', value: '5'},
  // {label: 'Office', value: '6'},
  // {label: 'Residential', value: '1'},
  // {label: 'Mid-rise apertment', value: '7', parent: '1'},
  // {label: 'Hi-rise apertment', value: '6', parent: '1'},
  // {label: 'Township', value: '5', parent: '1'},
  // {label: 'House', value: '4', parent: '1'},
  // {label: 'Apartment', value: '3', parent: '1'},
  // {label: 'Bungalow', value: '2', parent: '1'},

  // {label: 'Commercial', value: '8'},
  // {label: 'Showroom / Office', value: '9', parent: '8'},
  // {label: 'Mall/Multiplxer', value: '10', parent: '8'},
  // {label: 'Health Care', value: '11'},
  // {label: 'Hospitals', value: '12', parent: '11'},
  // {label: 'Hospitality', value: '13'},
  // {label: 'Hotel', value: '14', parent: '13'},
  // ];

  const unitData = [
    {label: 'Hectare', value: '1'},
    {label: 'Acre', value: '2'},
    {label: 'Sqm', value: '3'},
    {label: 'Sqf', value: '4'},
  ];

  const [dropdown, setDropdown] = React.useState('');
  const [unitDropdown, setUnitDropdown] = React.useState('');

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

  const showToast = () =>
    Toast.show({
      position: 'top',
      type: 'success',
      text1: 'Login Successfully',
      text2: 'Success',
      visibilityTime: 400,
    });

  const OnSubmit = () => {
    const data = {
      project_name: projectname,
      project_location: projectlocation,
      plot_area: projectplotarea,
      project_type: value,
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
        showToast();
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
        <Toast config={showToast} />
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: modalY,
            width: '100%',
            height: '100%',
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.radius,
            borderTopLeftRadius: SIZES.radius,
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

            {/* <AuthLayout> */}
            <View
              style={{
                flex: 1,
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.base,
              }}>
              <FormInput
                label="Name"
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
              {/* <CustomDropdown
                data={data}
                placeholder="Select project types"
                value={dropdown}
                onChange={item => {
                  setDropdown(item.value);
                  console.log('selected', item);
                }}
              /> */}
              <Drop
                placeholder="Select project types"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                categorySelectable={false}
                listParentLabelStyle={{
                  fontWeight: 'bold',
                  color: COLORS.white,
                  fontSize: 18,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <FormInput
                  label="Plot area"
                  keyboardType="default"
                  autoCompleteType="cc-number"
                  containerStyle={{width: 215}}
                  onChange={value => {
                    utils.validateNumber(value, setProjectPlotAreaError);
                    setProjectPlotArea(value);
                  }}
                  errorMsg={projectPlotAreaError}
                />
                <View
                  style={{marginLeft: SIZES.radius, width: 100, marginTop: 5}}>
                  <CustomDropdown
                    data={unitData}
                    placeholder="Units"
                    label="Dropdown"
                    value={unitDropdown}
                    onChange={item => {
                      setUnitDropdown(item.value);
                      console.log('selected', item);
                    }}
                  />
                </View>
              </View>
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
            {/* </AuthLayout> */}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ProjectsCreateModal;
