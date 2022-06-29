import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {
  FormInput,
  CustomDropdown,
  IconButton,
  TextButton,
} from '../../../Components';
import {useNavigation} from '@react-navigation/native';
import AuthLayout from '../../Authentication/AuthLayout';
import utils from '../../../utils';
import {COLORS, SIZES, FONTS, icons} from '../../../constants';
import Toast from 'react-native-toast-message';
import Config from '../../../config';

const ProjectsBanner = () => {
  const navigation = useNavigation();
  //collapse
  const [collapsed, setCollapsed] = React.useState(true);
  const [showCreateProjectModal, setCreateProjectModal] = React.useState(false);
  const [projectCrud, setProjectCrud] = React.useState(false);

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };
  // get projects
  React.useEffect(() => {
    fetch(`${Config.API_URL}/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setProjects(data);
      });
  }, []);
  const [projects, setProjects] = React.useState([]);

  // // project categories
  React.useEffect(() => {
    fetch(`${Config.API_URL}project-category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        let proCatFromApi = data.map(item => {
          return {label: item.category_name, value: item._id};
        });
        // console.log(data);
        setProjectCategory(proCatFromApi);
      })
      .catch(error => console.log(error.message));
  }, []);

  // project types
  React.useEffect(() => {
    fetch(`${Config.API_URL}project-type`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        let proTypeFromApi = data.map(item => {
          return {label: item.project_type, value: item._id};
        });
        // console.log(data);
        setProjectType(proTypeFromApi);
      })
      .catch(error => console.log(error.message));
  }, []);

  // create projects
  const [projectname, setProjectName] = React.useState('');
  const [projectError, setProjectError] = React.useState('');

  const [projectlocation, setProjectLocation] = React.useState('');
  const [projectLocationError, setProjectLocationError] = React.useState('');

  const [projectplotarea, setProjectPlotArea] = React.useState('');
  const [projectPlotAreaError, setProjectPlotAreaError] = React.useState('');

  // fetch project category
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [projectCategory, setProjectCategory] = React.useState([]);

  // project types
  const [open1, setOpen1] = React.useState(false);
  const [value1, setValue1] = React.useState([]);
  const [projectType, setProjectType] = React.useState([]);

  //units
  const [open2, setOpen2] = React.useState(false);
  const [value2, setValue2] = React.useState([]);
  const [projectUnit, setProjectUnit] = React.useState([
    {label: 'Hectare', value: '1'},
    {label: 'Acre', value: '2'},
    {label: 'Sqm', value: '3'},
    {label: 'Sqf', value: '4'},
  ]);

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
      activeOpacity:10,
      text1: 'Update Successfully',
      text2: 'Success',
      visibilityTime: 400,
    });

  const OnSubmit = () => {
    const data = {
      project_name: projectname,
      project_location: projectlocation,
      project_area: projectplotarea,
      project_category: value,
      project_type: value1,
      project_measurement: value2,
    };

    fetch(`${Config.API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        // console.log('Success:', data);
        showToast();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // project id
  const [data, setData] = React.useState('');
  const modalHandler = id => {
    setData(id);
    // console.log(id);
    setProjectCrud(true);
  };

  // delete projects
  const OnDeleteSubmit = () => {
    alert(data);
    fetch(`${Config.API_URL}projects/` + `${data}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log('delete');
    showToast();
  };

  // update projects
  const OnUpdateSubmit = () => {
    const updateData = {
      project_name: projectname,
      project_location: projectlocation,
      project_area: projectplotarea,
      project_category: value,
      project_type: value1,
      project_measurement: value2,
    };

    fetch(`${Config.API_URL}projects/` + `${data}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    // setTimeout(() => {
    //   setCreateProjectModal(false);
    // }, 1000);
  };

  //edit projects
  const editpro = (name, location, category, type, area, unit) => {
    setProjectName(name);
    setProjectLocation(location);
    setValue(category);
    setValue1(type);
    setProjectPlotArea(area);
    setValue2(unit);
  };

  //render projects
  function renderProjects() {
    const renderItem = ({item, index}) => (
      <TouchableOpacity
        style={{marginVertical: SIZES.base}}
        onPress={() => {
          navigation.navigate('ProjectsDetails', {
            name: item.project_name,
          });
        }}>
        <View
          style={{
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white2,
            paddingHorizontal: SIZES.radius,
            paddingVertical: SIZES.radius,
            ...styles.shadow,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{...FONTS.h3, color: COLORS.black}}>
                {index + 1}.
              </Text>
              <Text
                style={{
                  marginLeft: 4,
                  fontSize: 18,
                  color: COLORS.darkGray,
                  textTransform: 'capitalize',
                }}>
                {item.project_name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  alert('All Notification Message Show in here...');
                }}>
                <Image
                  source={icons.notification}
                  style={{
                    width: 15,
                    height: 15,
                    tintColor: COLORS.darkGray,
                    right: 3,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  modalHandler(item._id);
                  editpro(
                    item.project_name,
                    item.project_location,
                    item.project_category,
                    item.project_type,
                    item.project_area,
                    item.project_measurement,
                  );
                }}>
                <Image
                  source={icons.menu}
                  style={{
                    width: 18,
                    height: 18,
                    tintColor: COLORS.darkGray,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.gray,
            }}>
            Project code - {index + 1}
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.gray,
            }}>
            Progress - 89%
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        contentContainerStyle={{
          marginTop: SIZES.padding,
          paddingBottom: SIZES.padding,
        }}
        data={projects}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        maxHeight={300}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  // create project modal
  function renderCreateProjectModal() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCreateProjectModal}>
        <TouchableWithoutFeedback onPress={() => setCreateProjectModal(false)}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.transparentBlack7,
            }}>
            <View
              style={{
                borderRadius: SIZES.base,
                backgroundColor: COLORS.white,
                position: 'absolute',
                left: 0,
                top: 100,
                width: '100%',
                height: '100%',
                padding: SIZES.padding,
                borderTopRightRadius: SIZES.radius,
                borderTopLeftRadius: SIZES.radius,
                backgroundColor: COLORS.white,
              }}>
              <View style={{}}>
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
                      value={projectname}
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
                      value={projectlocation}
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
                              (projectlocation != '' &&
                                projectLocationError == '')
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

                    <CustomDropdown
                      placeholder="Select category"
                      open={open}
                      value={value}
                      items={projectCategory}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setProjectCategory}
                      zIndex={9000}
                      zIndexInverse={1000}
                      multiple={false}
                      listParentLabelStyle={{
                        color: COLORS.white,
                      }}
                    />

                    <CustomDropdown
                      placeholder="Select types"
                      open={open1}
                      value={value1}
                      items={projectType}
                      setOpen={setOpen1}
                      setValue={setValue1}
                      setItems={setProjectType}
                      zIndex={7000}
                      zIndexInverse={1000}
                      listParentLabelStyle={{
                        color: COLORS.white,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <FormInput
                        label="Plot area"
                        keyboardType="numeric"
                        autoCompleteType="cc-number"
                        containerStyle={{width: 215}}
                        value={projectplotarea.toString()}
                        onChange={value => {
                          utils.validateNumber(value, setProjectPlotAreaError);
                          setProjectPlotArea(value);
                        }}
                        errorMsg={projectPlotAreaError}
                      />
                      <View
                        style={{
                          marginLeft: SIZES.radius,
                          width: '36%',
                          // marginTop: 5,
                        }}>
                        <CustomDropdown
                          placeholder="Unit"
                          open={open2}
                          value={value2}
                          items={projectUnit}
                          setOpen={setOpen2}
                          setValue={setValue2}
                          setItems={setProjectUnit}
                          listParentLabelStyle={{
                            color: COLORS.white,
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
                      onPress={() =>
                        data == '' ? OnSubmit() : OnUpdateSubmit()
                      }
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  // crud modal
  function renderProjectCrudModal() {
    return (
      <Modal animationType="slide" transparent={true} visible={projectCrud}>
        <TouchableWithoutFeedback onPress={() => setProjectCrud(false)}>
          <View
            style={{
              flex: 1,

              backgroundColor: COLORS.transparentBlack7,
            }}>
            <View
              style={{
                top: 200,
                borderRadius: SIZES.base,
                backgroundColor: COLORS.white,
                marginHorizontal: SIZES.padding * 4,
                paddingHorizontal: SIZES.padding,
              }}>
              <View style={{marginVertical: SIZES.padding}}>
                {/*  render here... */}
                <View>
                  <TextButton
                    label="Update"
                    disabled={false}
                    buttonContainerStyle={{
                      marginTop: SIZES.radius,
                      backgroundColor: COLORS.success_300,
                      borderRadius: SIZES.base,
                      padding: 5,
                    }}
                    labelStyle={{
                      color: COLORS.black,
                      ...FONTS.h3,
                    }}
                    onPress={() => {
                      setCreateProjectModal(true);
                      OnUpdateSubmit();
                    }}
                  />

                  <TextButton
                    label="Delete"
                    disabled={false}
                    buttonContainerStyle={{
                      marginTop: SIZES.radius,
                      backgroundColor: COLORS.rose_600,
                      borderRadius: SIZES.base,
                      padding: 5,
                    }}
                    labelStyle={{
                      color: COLORS.white,
                      ...FONTS.h3,
                    }}
                    onPress={() => OnDeleteSubmit()}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
  return (
    <TouchableOpacity
      style={{
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        paddingVertical: SIZES.radius,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.lightblue_600,
        borderRadius: SIZES.base,
        ...styles.shadow,
      }}
      onPress={toggleExpanded}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 20, color: COLORS.white}}>Projects</Text>
        <TextButton
          label="Create New"
          disabled={false}
          buttonContainerStyle={{
            marginLeft: SIZES.padding * 4,
            alignItems: 'center',
            paddingHorizontal: SIZES.base,
            paddingVertical: SIZES.base,
            paddingVertical: 2,
            borderRadius: 5,
            backgroundColor: COLORS.yellow_400,
          }}
          labelStyle={{
            color: COLORS.black,
            ...FONTS.body5,
          }}
          onPress={() => setCreateProjectModal(true)}
        />
        <Image
          source={icons.down_arrow}
          style={{
            height: 18,
            width: 18,
            tintColor: COLORS.white,
            justifyContent: 'flex-end',
          }}
        />
      </View>
      <Collapsible collapsed={collapsed}>{renderProjects()}</Collapsible>
      {/* create project modal  */}
      {renderCreateProjectModal()}
      {renderProjectCrudModal()}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
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
export default ProjectsBanner;
