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
} from 'react-native';
import FilePicker, {types} from 'react-native-document-picker';
import {COLORS, SIZES, FONTS, icons, Apis} from '../../../constants';
import {IconButton, FormInput, Drop, TextButton} from '../../../Components';
import Config from '../../../config';

const WorkAssignModal = ({isVisible, onClose}) => {
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

  // api call for getting roles
  React.useEffect(() => {
    fetch(`${Config.API_URL}/role`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        let rolesFromApi = data.map(team => {
          return {label: team.user_role, value: team._id};
        });
        setRoleItems(rolesFromApi);
      })
      .catch(error => console.log(error.message));
  }, []);

  // get assign works
  React.useEffect(() => {
    fetch(`${Config.API_URL}/assign-works`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // let rolesFromApi = data.map(team => {
        //   return {label: team.user_role, value: team._id};
        // });
        // setRoleItems(rolesFromApi);
      })
      .catch(error => console.log(error.message));
  }, []);
  // post data from api
  const OnSubmit = () => {
    const data = {
      role_id: roleValue,
      list: userValue,
      work: assignWork,
    };

    fetch(`${Config.API_URL}/assign-works`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
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

  //form data
  const [openRole, setOpenRole] = React.useState(false);
  const [roleValue, setRoleValue] = React.useState([]);
  const [roleItems, setRoleItems] = React.useState([]);

  // second from users
  const [openUser, setOpenUser] = React.useState(false);
  const [userValue, setUserValue] = React.useState([]);
  const [userItems, setUserItems] = React.useState([
    {label: 'User 1', value: 'User1'},
    {label: 'User 2', value: 'User2'},
    {label: 'User 3', value: 'User3'},
    {label: 'User 4', value: 'User4'},
    {label: 'User 5', value: 'User5'},
  ]);
  const [assignWork, setAssignWork] = React.useState('');
  const [assignWorkError, setAssignWorkError] = React.useState('');

  function isEnableSubmit() {
    return assignWork != '' && assignWorkError == '';
  }

  // document picker
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
            // height: '50%',
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
          <ScrollView>
            <Drop
              placeholder="Select"
              open={openRole}
              value={roleValue}
              items={roleItems}
              setOpen={setOpenRole}
              setValue={setRoleValue}
              setItems={setRoleItems}
              categorySelectable={true}
              listParentLabelStyle={{
                color: COLORS.white,
              }}
              zIndex={5000}
              zIndexInverse={1000}
            />
            <Drop
              placeholder="Select"
              open={openUser}
              value={userValue}
              items={userItems}
              setOpen={setOpenUser}
              setValue={setUserValue}
              setItems={setUserItems}
              // multiple={true}
              categorySelectable={true}
              listParentLabelStyle={{
                color: COLORS.white,
              }}
              zIndex={3000}
              zIndexInverse={1000}
            />
            <FormInput
              inputStyle={{width: 200}}
              multiline={true}
              numberOfLines={8}
              label="Work details"
              keyboardType="default"
              autoCompleteType="username"
              onChange={value => {
                setAssignWork(value);
              }}
            />

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
