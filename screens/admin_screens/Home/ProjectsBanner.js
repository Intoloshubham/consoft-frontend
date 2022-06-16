import React from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {
  FormInput,
  Drop,
  CustomDropdown,
  IconButton,
  TextButton,
} from '../../../Components';
import {useNavigation} from '@react-navigation/native';
import AuthLayout from '../../Authentication/AuthLayout';
import utils from '../../../utils';
import {COLORS, SIZES, FONTS, icons, images} from '../../../constants';
import Toast from 'react-native-toast-message';
import axios from 'axios';
const url = 'http://192.168.1.99:8000/api/projects';

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
    fetch('http://192.168.1.99:8000/api/projects', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setProjects(data);
      });
  });
  const [projects, setProjects] = React.useState([]);

  // // project categories
  // React.useEffect(() => {
  //   fetch('http://192.168.1.99:8000/project-category')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //       // const catData = data.map((item, index) => {
  //       //   return {
  //       //     label: item.category_name,
  //       //     value: index,
  //       //   };
  //       // });
  //       setProjectCategory(data);
  //     })
  //     .catch(error => console.log(error.message));
  // }, []);

  // fetch('http://192.168.1.99:8000/project-category', {
  //   method: 'GET',
  //   //Request Type
  // })
  //   .then(response => response.json())
  //   .then(responseJson => {
  //     console.log(responseJson);
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });

  // fetch multiple api
  // const fetchReq1 = fetch(`http://192.168.1.99:8000/project-category`).then(
  //   res => res.json(),
  // );
  // const fetchReq2 = fetch(`http://192.168.1.99:8000/project-types`).then(res =>
  //   res.json(),
  // );
  // fetchReq1.then(res => console.log(res));
  // const allData = Promise.all([fetchReq1, fetchReq2]);
  // allData.then(res => console.log(res));
  //

  // React.useEffect(() => {
  //   fetch('http://192.168.1.99:8000/api/project-category', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //       setProjectCategory(data);
  //     });
  // }, []);
  // const [projectCategory, setProjectCategory] = React.useState([]);

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

  const unitData = [
    {label: 'Hectare', value: '1'},
    {label: 'Acre', value: '2'},
    {label: 'Sqm', value: '3'},
    {label: 'Sqf', value: '4'},
  ];

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
      text1: 'Update Successfully',
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

  // project id
  const [data, setData] = React.useState('');
  const modalHandler = id => {
    setData(id);
    console.log(id);
    setProjectCrud(true);
  };

  // delete projects
  const OnDeleteSubmit = () => {
    alert(data);
    fetch('http://192.168.1.99:8000/api/projects/' + `${data}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('delete');
    showToast();
  };

  // update projects
  const OnUpdateSubmit = () => {
    const updateData = {
      project_name: projectname,
      project_location: projectlocation,
      plot_area: projectplotarea,
      project_type: value,
    };

    fetch('http://192.168.1.99:8000/api/projects' + `/${data}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    showToast();
  };

  //edit projects
  const editpro = (name, location, type, area) => {
    setProjectName(name);
    setProjectLocation(location);
    setValue(type);
    setProjectPlotArea(area);
    console.log(name);
    console.log(location);
    console.log(area);
    console.log(type);
  };

  //render projects
  function renderProjects() {
    const renderItem = ({item, index}) => (
      <SafeAreaView>
        <ScrollView nestedScrollEnabled={true} scrollEnabled={true}>
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
                  {/* <ImageBackground
                    style={{
                      width: 18,
                      height: 18,
                      backgroundColor: COLORS.success_300,
                      borderRadius: SIZES.padding,
                      alignItems: 'center',
                      justifyContent: 'center',
                      right: 12,
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: COLORS.black,
                      }}>
                      {index + 1}
                    </Text>
                  </ImageBackground> */}
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
                        item.project_type,
                        item.plot_area,
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
        </ScrollView>
      </SafeAreaView>
    );
    return (
      <FlatList
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        data={projects}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
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
                          width: 100,
                          marginTop: 5,
                        }}>
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
              // alignItems: 'center',
              // justifyContent: 'center',
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
                  {/* <TextButton
                    label="Remove"
                    disabled={false}
                    buttonContainerStyle={{
                      marginTop: SIZES.radius,
                      backgroundColor: COLORS.yellow_400,
                      borderRadius: SIZES.base,
                      padding: 5,
                    }}
                    labelStyle={{
                      color: COLORS.black,
                      ...FONTS.h3,
                    }}
                    onPress={() => alert('Remove from  list add to database')}
                  /> */}
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
        <Text style={{...FONTS.body2, color: COLORS.white}}>Projects</Text>
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
      <Collapsible collapsed={collapsed}>
        <View>{renderProjects()}</View>
      </Collapsible>
      {/* create project modal  */}
      {renderCreateProjectModal()}
      {renderProjectCrudModal()}
    </TouchableOpacity>

    // <TouchableOpacity
    //   style={{
    //     marginTop: SIZES.padding,
    //     marginHorizontal: SIZES.padding,
    //     paddingVertical: SIZES.radius,
    //     paddingHorizontal: SIZES.padding,
    //     backgroundColor: COLORS.lightblue_600,
    //     borderRadius: SIZES.base,
    //     ...styles.shadow,
    //   }}
    //   onPress={toggleExpanded}>
    //   <View
    //     style={{
    //       flex: 1,
    //       flexDirection: 'row',
    //       alignItems: 'center',
    //     }}>
    //     <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //       <Text style={{...FONTS.body2, color: COLORS.white}}>Projects</Text>
    //       <TextButton
    //         label="Create New"
    //         disabled={false}
    //         buttonContainerStyle={{
    //           marginLeft: SIZES.padding * 3.7,
    //           alignItems: 'center',
    //           paddingHorizontal: SIZES.base,
    //           paddingVertical: 3,
    //           // padding: 5,
    //           borderRadius: 8,
    //           backgroundColor: COLORS.yellow_400,
    //         }}
    //         labelStyle={{
    //           color: COLORS.black,
    //           ...FONTS.body4,
    //         }}
    //         onPress={() => setCreateProjectModal(true)}
    //       />
    //     </View>
    //     <Image
    //       source={icons.down_arrow}
    //       style={{
    //         height: 18,
    //         width: 18,
    //         tintColor: COLORS.white,
    //         marginLeft: SIZES.padding,
    //       }}
    //     />
    //   </View>
    //   <Collapsible collapsed={collapsed}>
    //     <View>{renderProjects()}</View>
    //   </Collapsible>

    //   {/* create project modal  */}
    //   {renderCreateProjectModal()}
    //   {renderProjectCrudModal()}
    // </TouchableOpacity>
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
