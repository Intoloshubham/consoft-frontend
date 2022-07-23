import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  LogBox,
  Image,
  TouchableWithoutFeedback,
  Modal,
  ImageBackground,
} from 'react-native';
import {
  HeaderBar,
  TextButton,
  CustomDropdown,
  IconButton,
  ConformationAlert,
} from '../../../Components';
import {COLORS, FONTS, icons, SIZES, STATUS} from '../../../constants';
import Config from '../../../config';
import Toast from 'react-native-toast-message';
import {
  getProjectTeam,
  saveProjectTeam,
  deleteProjectTeam,
} from '../../../controller/ProjectTeamController';
import {getUserRole, roleByUser} from '../../../controller/UserRoleController';

const ProjectTeam = ({route}) => {
  const {project_id} = route.params; //
  const [addProjectTeamModal, setAddProjectTeamModal] = useState(false);
  const [projectTeam, setProjectTeam] = useState([]);
  const [teamDeleteConfirmation, setTeamDeleteConfirmation] = useState(false);

  //roloe dropdown
  const [openRole, setOpenRole] = useState(false);
  const [roleValue, setRoleValue] = useState('');
  const [roleItems, setRoleItems] = useState([]);

  // users dropdown
  const [openUser, setOpenUser] = useState(false);
  const [userValue, setUserValue] = useState([]);
  const [userItems, setUserItems] = useState([]);

  const [userId, setUserId] = useState('');

  const onRoleOpen = useCallback(() => {
    setOpenUser(false);
  }, []);

  const onUserOpen = useCallback(() => {
    setOpenRole(false);
  }, []);

  //---------------------------------------
  // fetch project team
  const fetchProjectTeam = useCallback(async () => {
    const team = await getProjectTeam(project_id);
    setProjectTeam(team);
  }, [project_id]);

  useEffect(() => {
    fetchProjectTeam();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [fetchProjectTeam]);

  const addProjectTeam = async () => {
    setAddProjectTeamModal(true);
    const res = await getUserRole();
    if (res.status === STATUS.RES_SUCCESS) {
      let roleFromApi = res.data.map(list => {
        return {label: list.user_role, value: list._id};
      });
      setRoleItems(roleFromApi);
    }
  };

  const getRolebyUser = async role_id => {
    const res = await roleByUser(role_id);
    if (res.status === STATUS.RES_SUCCESS) {
      let usersFromApi = res.data.map(ele => {
        return {label: ele.name, value: ele._id};
      });
      setUserItems(usersFromApi);
    }
  };
  // console.log("object")
  //---------------------------------------

  // post data
  const saveProjectTeamSubmit = async () => {
    const teamData = {
      project_id: project_id,
      user_id: userValue,
    };
    const res = await saveProjectTeam(teamData);
    if (res.status === STATUS.RES_SUCCESS) {
      showToast();
      setAddProjectTeamModal(false);
      await fetchProjectTeam();
    } else {
      alert(res.message);
    }
  };

  const deleteTeamSubmit = async () => {
    const res = await deleteProjectTeam(project_id, userId)
    if (res.status === STATUS.RES_SUCCESS) {
      await fetchProjectTeam();
      setTeamDeleteConfirmation(false);
    } else {
      alert(res.message);
    }
  };

  const showToast = () =>
    Toast.show({
      position: 'top',
      type: 'success',
      text1: 'Added Successfully',
      text2: 'Success',
      visibilityTime: 2000,
    });

  function renderTeamList() {
    const renderItem = ({item, index}) => (
      <View>
        {item.project_team.map((ele, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={{
                flexDirection: 'row',
                paddingVertical: SIZES.base,
              }}>
              <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                {i + 1}.
              </Text>
              <View style={{flex: 1, marginLeft: SIZES.radius}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.lightblue_900,
                      textTransform: 'capitalize',
                    }}>
                    Mr.{ele.user_name}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    {/* <TouchableOpacity
                      onPress={() => {
                        alert('edit name');
                      }}>
                      <ImageBackground
                        style={{
                          backgroundColor: COLORS.green,
                          padding: 5,
                          borderRadius: SIZES.base,
                          right: 10,
                        }}>
                        <Image
                          source={icons.edit}
                          style={{
                            width: 15,
                            height: 15,
                            // right: 15,
                            tintColor: COLORS.white,
                          }}
                        />
                      </ImageBackground>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      onPress={() => {
                        setUserId(ele.user_id);
                        setTeamDeleteConfirmation(true);
                      }}>
                      <ImageBackground
                        style={{
                          backgroundColor: COLORS.rose_600,
                          padding: 5,
                          borderRadius: SIZES.base,
                        }}>
                        <Image
                          source={icons.delete_icon}
                          style={{
                            width: 15,
                            height: 15,
                            tintColor: COLORS.white,
                          }}
                        />
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={{...FONTS.body4, color: COLORS.darkGray}}>
                  Designation - {item.designation}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
    return (
      <View
        style={{
          marginBottom: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}>
        {/* <Text style={{...FONTS.h2, color: COLORS.darkGray}}>List</Text> */}
        <FlatList
          contentContainerStyle={{marginTop: SIZES.radius}}
          data={projectTeam}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          scrollEnabled={true}
          maxHeight={510}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: COLORS.lightGray1,
                  marginVertical: 5,
                }}></View>
            );
          }}
        />
      </View>
    );
  }

  function renderAddProjectTeamModal() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={addProjectTeamModal}>
        <TouchableWithoutFeedback>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.transparentBlack7,
            }}>
            <View
              style={{
                position: 'absolute',
                left: SIZES.padding,
                width: '90%',
                padding: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
              }}>
              <View style={{}}>
                {/* header */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{flex: 1, fontSize: 20, color: COLORS.darkGray}}>
                    Project Team
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
                    onPress={() => setAddProjectTeamModal(false)}
                  />
                </View>
                <ScrollView>
                  <CustomDropdown
                    placeholder="Select role"
                    open={openRole}
                    value={roleValue}
                    items={roleItems}
                    setOpen={setOpenRole}
                    setValue={setRoleValue}
                    setItems={setRoleItems}
                    onOpen={onRoleOpen}
                    categorySelectable={true}
                    listParentLabelStyle={{
                      color: COLORS.white,
                    }}
                    maxHeight={150}
                    zIndex={2000}
                    zIndexInverse={2000}
                    onChangeValue={value => {
                      getRolebyUser(value);
                    }}
                  />
                  <CustomDropdown
                    placeholder="Select users"
                    open={openUser}
                    value={userValue}
                    items={userItems}
                    setOpen={setOpenUser}
                    setValue={setUserValue}
                    setItems={setUserItems}
                    // categorySelectable={true}

                    onOpen={onUserOpen}
                    multiple={true}
                    listParentLabelStyle={{
                      color: COLORS.white,
                    }}
                    maxHeight={100}
                    zIndex={1000}
                    zIndexInverse={3000}
                    closeAfterSelecting={true}
                  />

                  <TextButton
                    label="Submit"
                    buttonContainerStyle={{
                      height: 50,
                      alignItems: 'center',
                      marginTop: SIZES.padding * 2,
                      borderRadius: SIZES.radius,
                    }}
                    onPress={saveProjectTeamSubmit}
                  />
                </ScrollView>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <HeaderBar right={true} title="Project Team" />
      <TextButton
        label="Add New"
        buttonContainerStyle={{
          height: 45,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightblue_700,
        }}
        onPress={() => addProjectTeam()}
      />
      <Toast config={showToast} />
      {renderTeamList()}
      {renderAddProjectTeamModal()}
      <ConformationAlert
        isVisible={teamDeleteConfirmation}
        onCancel={() => {
          setTeamDeleteConfirmation(false);
        }}
        title="Team Delete"
        message="Are you sure want to delete this member ?"
        cancelText="Cancel"
        confirmText="Yes"
        onConfirmPressed={() => {
          deleteTeamSubmit();
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

export default ProjectTeam;
