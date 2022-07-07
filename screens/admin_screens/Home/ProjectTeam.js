import React from 'react';
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
} from '../../../Components';
import {COLORS, FONTS, icons, SIZES} from '../../../constants';
import Config from '../../../config';
import Toast from 'react-native-toast-message';

const ProjectTeam = ({route}) => {
  const {project_id} = route.params; //

  const showToast = () =>
    Toast.show({
      position: 'top',
      type: 'success',
      text1: 'Added Successfully',
      text2: 'Success',
      visibilityTime: 1800,
    });

  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  });

  const [teamdetails, setTeamDetails] = React.useState([]);
  const [showAddProjectTeamModal, setShowAddProjectTeamModal] =
    React.useState(false);

  // call apis
  React.useEffect(() => {
    fetch(`${Config.API_URL}role`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        let roleFromApi = data.map(one => {
          return {label: one.user_role, value: one._id};
        });
        setRoleItems(roleFromApi);
      })
      .catch(error => console.log(error.message));
  }, []);

  const OnChangeHandler = id => {
    fetch(`${Config.API_URL}role-by-users/` + `${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        let usersFromApi = data.map(ele => {
          return {label: ele.name, value: ele._id};
        });
        setUserItems(usersFromApi);
      })
      .catch(error => console.log(error.message));
  };
  React.useEffect(() => {
    OnChangeHandler;
  }, []);

  //roloe dropdown
  const [openRole, setOpenRole] = React.useState(false);
  const [roleValue, setRoleValue] = React.useState('');
  const [roleItems, setRoleItems] = React.useState([]);

  // users dropdown
  const [openUser, setOpenUser] = React.useState(false);
  const [userValue, setUserValue] = React.useState([]);
  const [userItems, setUserItems] = React.useState([]);

  const onRoleOpen = React.useCallback(() => {
    setOpenUser(false);
  }, []);

  const onUserOpen = React.useCallback(() => {
    setOpenRole(false);
  }, []);

  // post data
  const OnSubmit = () => {
    const FormData = {
      project_id: project_id,
      user_id: userValue,
    };
    fetch(`${Config.API_URL}project-team`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(FormData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setTimeout(() => {
            showToast();
            setShowAddProjectTeamModal(false);
          }, 3000);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const deleteHandler = id => {
    console.log(id);
    fetch(`${Config.API_URL}project-team/` + `${project_id}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log(error.message));
  };

  React.useEffect(() => {
    fetch(`${Config.API_URL}project-team/` + `${project_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setTeamDetails(data);
      })
      .catch(error => console.log(error.message));
  }, []);

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
                      onPress={() => deleteHandler(ele.user_id)}>
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
          data={teamdetails}
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
        visible={showAddProjectTeamModal}>
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
                    onPress={() => setShowAddProjectTeamModal(false)}
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
                      OnChangeHandler(value);
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
                    onPress={OnSubmit}
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
        onPress={() => setShowAddProjectTeamModal(true)}
      />
      <Toast config={showToast} />

      {renderTeamList()}
      {renderAddProjectTeamModal()}
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
