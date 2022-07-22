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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector, useDispatch} from 'react-redux';
import {ConformationAlert} from '../../../Components';
import { getProjectCategory, getProjects, deleteProjects } from '../../../controller/ProjectController';


const ProjectsBanner = ({company_id}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const {data: projectList} = useSelector(state => state.projects);
  

  //COMPANY DATA

  // const companyData = useSelector(state => state.company);
  // const company_id = companyData._id;

  //CONFIRMATION MODAL ON DELETE
  const [projectDeleteConfirmation, setProjectDeleteConfirmation] =
    React.useState(false);

  //PROJECT BANNER COLLAPSED
  const [collapsed, setCollapsed] = React.useState(true);

  

  //PROJECT CREATE & UPDATE MODAL
  const [showCreateProjectModal, setCreateProjectModal] = React.useState(false);
  const [showUpdateProjectModal, setUpdateProjectModal] = React.useState(false);
  const [projectCrud, setProjectCrud] = React.useState(false);

  // STORE PROJECT DATA
  const [projects, setProjects] = React.useState([]);

  // CREATE & UPDATE PROJECTS FORM DATA
  const [projectname, setProjectName] = React.useState('');
  const [projectlocation, setProjectLocation] = React.useState('');
  const [projectplotarea, setProjectPlotArea] = React.useState('');
  // getting categories from api - dropdown
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [projectCategory, setProjectCategory] = React.useState([]);
  // getting types from api - dropdown
  const [open1, setOpen1] = React.useState(false);
  const [value1, setValue1] = React.useState([]);
  const [projectType, setProjectType] = React.useState([]);
  //project area units
  const [open2, setOpen2] = React.useState(false);
  const [value2, setValue2] = React.useState([]);
  const [projectUnit, setProjectUnit] = React.useState([
    {label: 'HA', value: '1'},
    {label: 'Acre', value: '2'},
    {label: 'SQm', value: '3'},
    {label: 'SQF', value: '4'},
  ]);

  //FORM VALIDATION ERROR STATES
  const [projectError, setProjectError] = React.useState('');
  const [projectLocationError, setProjectLocationError] = React.useState('');
  const [projectPlotAreaError, setProjectPlotAreaError] = React.useState('');

  const toggleExpanded = async () => {
    setCollapsed(!collapsed);
    if (collapsed) {
      const projectList = await getProjects();
      setProjects(projectList);
    }
  };

  // ON BUTTON SUBMISSON VALIDATION
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

  // GETTING DATA ALL API'S
  // API FOR GETTING PROJECTS DATA

  // function getProjects(company_id) {
  //   fetch(`${Config.API_URL}projects`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data)
  //     // console.log("object")
  //     setProjects(data);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }

  // React.useEffect(() => {
  //   fetch(`${Config.API_URL}projects`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       // console.log(data)
  //       // console.log("object")
  //       setProjects(data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, [projects]);

  // GETTING PROJECTS CATEGORIES
  // React.useEffect(() => {
  //   fetch(`${Config.API_URL}project-category`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       let proCatFromApi = data.map(item => {
  //         return {label: item.category_name, value: item._id};
  //       });
  //       setProjectCategory(proCatFromApi);
  //     })
  //     .catch(error => console.log(error.message));
  // }, [projectCategory]);

  // GETTING PROJECTS TYPES
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
        setProjectType(proTypeFromApi);
      })
      .catch(error => console.log(error.message));
  }, [projectType]);

  // POST PROJECTS FORM DATA
  const OnSubmit = () => {
    const data = {
      project_name: projectname,
      project_location: projectlocation,
      project_area: projectplotarea,
      project_category: value,
      project_type: value1,
      project_measurement: value2,
      company_id: company_id,
    };
    // setProjects(projectList);

    // console.log(projectList);
    fetch(`${Config.API_URL}projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {

          
          showToast();
          setTimeout(() => {
            setCreateProjectModal(false);
            setProjectName('');
            setProjectLocation('');
            setProjectPlotArea('');
            setValue('');
            setValue1('');
            setValue2('');
          }, 2000);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // GETTING PROJECTS ID
  const [data, setData] = React.useState('');
  const modalHandler = id => {
    setData(id);
    setProjectCrud(true);
  };

  // DELETE PROJECTS
  const OnDeleteSubmit = (data) => {

    // deleteProjects(data);

    fetch(`${Config.API_URL}projects/` + `${data}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setTimeout(() => {
      setProjectDeleteConfirmation(false);
    }, 1500);
    setTimeout(() => {
      setProjectCrud(false);
    }, 2000);
  };

  // PUTR DATA IN FORM FOR UPDATION
  const getProjectDataForEdit = (
    name,
    location,
    category,
    type,
    area,
    unit,
  ) => {
    setProjectName(name);
    setProjectLocation(location);
    setValue(category);
    setValue1(type);
    setProjectPlotArea(area);
    setValue2(unit);
  };
  // UPDATE PROJECTS
  const OnUpdateSubmit = () => {
    const updateData = {
      project_name: projectname,
      project_location: projectlocation,
      project_area: projectplotarea,
      project_category: value,
      project_type: value1,
      project_measurement: value2,
      company_id: companyData._id,
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
        // console.log(data);
        if (data.status === 200) {
          showUpdateToast();
          setTimeout(() => {
            setUpdateProjectModal(false);
          }, 1000);
          setTimeout(() => {
            setUpdateProjectModal(false);
            setProjectCrud(false);
          }, 1500);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  

  // EMPTY ALL FORM STATED
  function empltModalForm() {
    setProjectName('');
    setProjectLocation('');
    setProjectPlotArea('');
    setValue('');
    setValue1('');
    setValue2('');
   
  }

  const createProject = async () =>{
    empltModalForm();
    setCreateProjectModal(true);

    const data = await getProjectCategory();
    let proCatFromApi = data.map(item => {
      return {label: item.category_name, value: item._id};
    });
    setProjectCategory(proCatFromApi);

  }

  // TOAST
  const showToast = () =>
    Toast.show({
      position: 'top',
      type: 'success',
      activeOpacity: 10,
      text1: 'Submitted Successfully',
      text2: 'Success',
      visibilityTime: 1800,
    });

  const showUpdateToast = () =>
    Toast.show({
      position: 'top',
      type: 'success',
      text1: 'Updated Successfully',
      activeOpacity: 10,
      text1: 'Updated Successfully',
      text2: 'Success',
      visibilityTime: 1800,
    });

  //RENDER PROJECTS
  function renderProjects() {
    const renderItem = ({item, index}) => (
      <TouchableOpacity
        style={{marginVertical: SIZES.base}}
        onPress={() => {
          navigation.navigate('ProjectsDetails', {
            name: item.project_name,
            project_id: item._id,
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
                    width: 18,
                    height: 18,
                    tintColor: COLORS.darkGray,
                    right: 5,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  modalHandler(item._id);
                  getProjectDataForEdit(
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
                    width: 20,
                    height: 20,
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

  // CREATE PROJECT MODAL
  function renderCreateProjectModal() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showCreateProjectModal}>
        <TouchableWithoutFeedback>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: COLORS.transparentBlack2,
            }}>
            <Toast config={showToast} />
            <Toast config={showUpdateToast} />
            <View
              style={{
                backgroundColor: COLORS.white2,
                position: 'absolute',
                width: '100%',
                height: '65%',
                // padding: SIZES.radius,
                paddingHorizontal: SIZES.padding,
                paddingTop: SIZES.radius,
                paddingBottom: SIZES.padding,
                borderTopRightRadius: SIZES.base,
                borderTopLeftRadius: SIZES.base,
                backgroundColor: COLORS.white,
              }}>
              <View style={{alignItems: 'flex-end'}}>
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
              <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAwareScrollView
                  keyboardDismissMode="on-drag"
                  contentContainerStyle={{
                    flex: 1,
                  }}>
                  <FormInput
                    label="Name"
                    keyboardType="default"
                    autoCompleteType="username"
                    // value={projectname}
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
                    // value={projectlocation}
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
                    multiple={false}
                    listParentLabelStyle={{
                      color: COLORS.white,
                    }}
                    maxHeight={150}
                    zIndex={3000}
                    zIndexInverse={1000}
                  />

                  <CustomDropdown
                    placeholder="Select types"
                    open={open1}
                    value={value1}
                    items={projectType}
                    setOpen={setOpen1}
                    setValue={setValue1}
                    setItems={setProjectType}
                    listParentLabelStyle={{
                      color: COLORS.white,
                    }}
                    maxHeight={150}
                    zIndex={2000}
                    zIndexInverse={2000}
                  />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <FormInput
                      label="Plot area"
                      keyboardType="numeric"
                      autoCompleteType="cc-number"
                      containerStyle={{width: '60%'}}
                      // value={projectplotarea.toString()}
                      onChange={value => {
                        utils.validateNumber(value, setProjectPlotAreaError);
                        setProjectPlotArea(value);
                      }}
                      errorMsg={projectPlotAreaError}
                    />
                    <View
                      style={{
                        marginTop: 13,
                        marginLeft: SIZES.radius,
                        width: '35%',
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
                        maxHeight={70}
                        zIndex={1000}
                        zIndexInverse={3000}
                      />
                    </View>
                  </View>
                  <TextButton
                    label="Submit"
                    disabled={isEnableSubmit() ? false : true}
                    buttonContainerStyle={{
                      height: 45,
                      alignItems: 'center',
                      marginTop: SIZES.padding,
                      marginBottom: SIZES.padding,
                      borderRadius: SIZES.base,
                      backgroundColor: isEnableSubmit()
                        ? COLORS.lightblue_700
                        : COLORS.transparentPrimary,
                    }}
                    onPress={() => OnSubmit()}
                  />
                </KeyboardAwareScrollView>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  // CREATE PROJECT MODAL
  function renderUpdateProjectModal() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showUpdateProjectModal}>
        <TouchableWithoutFeedback>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: COLORS.transparentBlack2,
            }}>
            <Toast config={showToast} />
            <Toast config={showUpdateToast} />
            <View
              style={{
                backgroundColor: COLORS.white2,
                position: 'absolute',
                width: '100%',
                height: '65%',
                // padding: SIZES.radius,
                paddingHorizontal: SIZES.padding,
                paddingTop: SIZES.radius,
                paddingBottom: SIZES.padding,
                borderTopRightRadius: SIZES.base,
                borderTopLeftRadius: SIZES.base,
                backgroundColor: COLORS.white,
              }}>
              <View style={{alignItems: 'flex-end'}}>
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
                  onPress={() => setUpdateProjectModal(false)}
                />
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAwareScrollView
                  keyboardDismissMode="on-drag"
                  contentContainerStyle={{
                    flex: 1,
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
                    multiple={false}
                    listParentLabelStyle={{
                      color: COLORS.white,
                    }}
                    maxHeight={150}
                    zIndex={3000}
                    zIndexInverse={1000}
                  />

                  <CustomDropdown
                    placeholder="Select types"
                    open={open1}
                    value={value1}
                    items={projectType}
                    setOpen={setOpen1}
                    setValue={setValue1}
                    setItems={setProjectType}
                    listParentLabelStyle={{
                      color: COLORS.white,
                    }}
                    maxHeight={150}
                    zIndex={2000}
                    zIndexInverse={2000}
                  />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <FormInput
                      label="Plot area"
                      keyboardType="numeric"
                      autoCompleteType="cc-number"
                      containerStyle={{width: '60%'}}
                      value={projectplotarea.toString()}
                      onChange={value => {
                        utils.validateNumber(value, setProjectPlotAreaError);
                        setProjectPlotArea(value);
                      }}
                      errorMsg={projectPlotAreaError}
                    />
                    <View
                      style={{
                        marginTop: 13,
                        marginLeft: SIZES.radius,
                        width: '35%',
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
                        maxHeight={70}
                        zIndex={1000}
                        zIndexInverse={3000}
                      />
                    </View>
                  </View>
                  <TextButton
                    label="Update"
                    disabled={isEnableSubmit() ? false : true}
                    buttonContainerStyle={{
                      height: 45,
                      alignItems: 'center',
                      marginTop: SIZES.padding,
                      marginBottom: SIZES.padding,
                      borderRadius: SIZES.base,
                      backgroundColor: isEnableSubmit()
                        ? COLORS.lightblue_700
                        : COLORS.transparentPrimary,
                    }}
                    onPress={() => OnUpdateSubmit()}
                  />
                </KeyboardAwareScrollView>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  // EDIT & UPDATE MODAL OF PROJECTS
  function renderProjectCrudModal() {
    return (
      <Modal animationType="fade" transparent={true} visible={projectCrud}>
        <TouchableWithoutFeedback onPress={() => setProjectCrud(false)}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.transparentBlack5,
            }}>
            <View
              style={{
                position: 'absolute',
                width: '40%',
                backgroundColor: COLORS.white,
                paddingHorizontal: SIZES.radius,
                paddingVertical: SIZES.radius,
                borderRadius: 3,
              }}>
              <ScrollView>
                <TextButton
                  label="Update"
                  disabled={false}
                  buttonContainerStyle={{
                    backgroundColor: null,
                  }}
                  labelStyle={{
                    color: COLORS.black,
                    ...FONTS.h3,
                  }}
                  onPress={() => {
                    setUpdateProjectModal(true);
                  }}
                />
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: COLORS.gray,
                    marginVertical: SIZES.base,
                    marginHorizontal: SIZES.padding,
                  }}></View>
                <TextButton
                  label="Delete"
                  disabled={false}
                  buttonContainerStyle={{
                    backgroundColor: null,
                  }}
                  labelStyle={{
                    color: COLORS.black,
                    ...FONTS.h3,
                  }}
                  onPress={
                    () => {
                      setProjectDeleteConfirmation(true);
                    }
                    //  OnDeleteSubmit()
                  }
                />
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
  return (
    <View
      style={{
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        paddingVertical: SIZES.radius,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.lightblue_600,
        borderRadius: SIZES.base,
        ...styles.shadow,
      }}
      // onPress={toggleExpanded}
      >
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
          onPress={ () => {
            createProject()
          }}
          // onPress={ createProject()}
        />
        <TouchableOpacity onPress={toggleExpanded}>

          <Image
            source={collapsed ? icons.down_arrow : icons.up_arrow}
            style={{
              height: 18,
              width: 18,
              tintColor: COLORS.white,
              justifyContent: 'flex-end',
            }}
          />
        </TouchableOpacity>
      </View>
      <Collapsible collapsed={collapsed}>{renderProjects()}</Collapsible>

      {/* PROJECT CREATE MODAL  */}
      {renderCreateProjectModal()}

      {/* PROJECTS EDIT & UPDATE MODAL */}
      {renderProjectCrudModal()}

      {/* PROJECT UPDATE MODAL  */}
      {renderUpdateProjectModal()}

      {/* DELETE CONFIRMATION MODAL */}
      <ConformationAlert
        isVisible={projectDeleteConfirmation}
        onCancel={() => {
          setProjectDeleteConfirmation(false);
        }}
        title="Delete Project"
        message="Are you sure want to delete this project ?"
        cancelText="Cancel"
        confirmText="Yes"
        onConfirmPressed={() => {
          OnDeleteSubmit();
        }}
      />
    </View>
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
