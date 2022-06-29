import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import FilePicker, {types} from 'react-native-document-picker';
import {COLORS, SIZES, FONTS, icons} from '../../../constants';
import {IconButton, CustomDropdown, TextButton} from '../../../Components';
import Config from '../../../config';

const WorkAssignModal = ({isVisible, onClose}) => {
  //assign work input
  const [work, setWork] = React.useState([{key: '', value: ''}]);
  const [newWork, setNewWork] = React.useState([]);

  const addHandler = () => {
    const inputs = [...work];
    inputs.push({key: '', value: ''});
    setWork(inputs);
  };

  const removeHandler = key => {
    const inputs = work.filter((input, index) => index != key);
    setWork(inputs);
  };

  const inputHandler = (text, key) => {
    const inputs = [...work];
    inputs[key].value = text;
    inputs[key].key = key;
    setWork(inputs);
  };

  const assignWorkArr = [];
  React.useEffect(() => {
    work.map((item, i) => {
      assignWorkArr.push(item.value);
      setNewWork(assignWorkArr);
    });
  }, [work]);

  //user roles from api
  const [openUserRole, setOpenUserRole] = React.useState(false);
  const [userRoleValue, setUserRoleValue] = React.useState([]);
  const [userRoles, setUserRoles] = React.useState([]);

  //users inside user roles
  const [openUsers, setOpenUsers] = React.useState(false);
  const [usersValue, setUsersValue] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  // button enable function
  function isEnableSubmit() {
    return work != '' && workError == '';
  }

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
        // console.log(data);
        let roleDataFromApi = data.map(one => {
          return {label: one.user_role, value: one._id};
        });
        setUserRoles(roleDataFromApi);
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
        // console.log(data);
        let userRolesFromApi = data.map(one => {
          return {label: one.name, value: one._id};
        });
        setUsers(userRolesFromApi);
      })
      .catch(error => console.log(error.message));
  };

  // Post assign work data from api
  const OnSubmit = () => {
    const FormData = {
      role_id: userRoleValue,
      user_id: usersValue,
      work: newWork,
    };
    console.log(FormData);
    fetch(`${Config.API_URL}assign-works`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(FormData),
    })
      .then(response => response.json())
      .then(data => {
        // console.log('Success:', data);
        if (data.status == 200) {
          setTimeout(() => {
            setShowAssignWorkModal(false);
          }, 1000);
        }
        // showToast();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  //Modal
  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [showAssignWorkModal, setShowAssignWorkModal] =
    React.useState(isVisible);

  React.useEffect(() => {
    if (showAssignWorkModal) {
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
  }, [showAssignWorkModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 650],
  });

  // Document picker
  const [fileData, setFileData] = React.useState([]);

  const handleFilePicker = async () => {
    try {
      const response = await FilePicker.pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
        type: [types.images, types.pdf, types.plainText],
      });
      setFileData(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={{flex: 1, backgroundColor: COLORS.transparentBlack7}}>
        {/* transparent background */}
        <TouchableWithoutFeedback onPress={() => setShowAssignWorkModal(false)}>
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
            left: SIZES.padding,
            top: modalY,
            width: '90%',
            height: '65%',
            padding: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}>
          {/* header */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 1, ...FONTS.h2, color: COLORS.darkGray}}>
              Assign Work
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
              onPress={() => setShowAssignWorkModal(false)}
            />
          </View>
          {/* <WorkAssign /> */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <CustomDropdown
              placeholder="Select"
              open={openUserRole}
              value={userRoleValue}
              items={userRoles}
              setOpen={setOpenUserRole}
              setValue={setUserRoleValue}
              setItems={setUserRoles}
              listParentLabelStyle={{
                color: COLORS.white,
              }}
              onChangeValue={value => {
                OnChangeHandler(value);
                console.log(value);
              }}
            />
            <CustomDropdown
              placeholder="Select"
              open={openUsers}
              value={usersValue}
              items={users}
              setOpen={setOpenUsers}
              setValue={setUsersValue}
              setItems={setUsers}
              categorySelectable={true}
              listParentLabelStyle={{
                color: COLORS.white,
              }}
              zIndex={3000}
              zIndexInverse={1000}
            />

            <View
              style={{
                // flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {/* <ScrollView> */}
              {work.map((input, key) => (
                <View style={{}} key={key}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: COLORS.darkGray,
                        ...FONTS.body4,
                        marginTop: SIZES.radius,
                      }}>
                      Work {key + 1}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        width: key == 0 ? '88%' : '80%',
                        paddingHorizontal: SIZES.padding,
                        borderRadius: SIZES.base,
                        backgroundColor: COLORS.gray3,
                      }}>
                      <TextInput
                        placeholder="Write here..."
                        placeholderTextColor={COLORS.darkGray}
                        value={input.value}
                        onChangeText={text => inputHandler(text, key)}
                      />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        style={{}}
                        onPress={() => removeHandler(key)}>
                        {key != 0 && (
                          <Image
                            source={icons.minus1}
                            style={{
                              height: 25,
                              width: 25,
                              right: 5,
                            }}
                          />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity onPress={addHandler}>
                        <Image
                          source={icons.plus1}
                          style={{
                            height: key == 0 ? 30 : 25,
                            width: key == 0 ? 30 : 25,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
              {/* </ScrollView> */}
            </View>

            <Text
              style={{
                marginTop: SIZES.radius,
                ...FONTS.body4,
                color: COLORS.darkGray,
              }}>
              Upload files
            </Text>
            <View
              style={{
                // marginTop: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.gray3,
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.base,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                {fileData.length > 0
                  ? fileData.map((list, index) => {
                      return (
                        <View key={index}>
                          <Text
                            style={{
                              ...FONTS.body4,
                              color: COLORS.lightblue_900,
                            }}>
                            {list.name},
                          </Text>
                        </View>
                      );
                    })
                  : null}
              </View>
              <TouchableOpacity onPress={handleFilePicker}>
                <Image
                  source={icons.upload_files}
                  style={{
                    height: 30,
                    width: 30,
                    tintColor: COLORS.black,
                  }}
                />
              </TouchableOpacity>
            </View>

            <TextButton
              label="Submit"
              buttonContainerStyle={{
                height: 50,
                alignItems: 'center',
                marginTop: SIZES.padding * 1.5,
                borderRadius: SIZES.radius,
              }}
              onPress={() => OnSubmit()}
            />
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default WorkAssignModal;
