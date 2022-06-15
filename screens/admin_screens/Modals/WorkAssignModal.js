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
import {COLORS, SIZES, FONTS, icons} from '../../../constants';
import {IconButton, FormInput, Drop, TextButton} from '../../../Components';

const WorkAssignModal = ({isVisible, onClose}) => {
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
    outputRange: [SIZES.height, SIZES.height - 650],
  });

  //form data
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [items, setItems] = React.useState([
    {label: 'Engineer', value: '1'},
    {label: 'Maneger', value: '2'},
    {label: 'Supervisor', value: '3'},
    {label: 'Asst. Supervisor', value: '4'},
    {label: 'Site Engineer', value: '5'},
    {label: 'Other staff', value: '6'},
  ]);
  const [projectTeamname, setProjectTeamName] = React.useState('');
  const [projectTeamNameError, setProjectTeamNameError] = React.useState('');

  function isEnableSubmit() {
    return projectTeamname != '' && projectTeamNameError == '';
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
              onPress={() => setCreateProjectModal(false)}
            />
          </View>
          {/* <WorkAssign /> */}
          <ScrollView>
            <Drop
              placeholder="Select"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              categorySelectable={true}
              listParentLabelStyle={{
                color: COLORS.white,
              }}
            />
            <FormInput
              inputStyle={{width: 200}}
              multiline={true}
              numberOfLines={8}
              label="Work details"
              keyboardType="default"
              autoCompleteType="username"
              onChange={value => {
                setProjectTeamName(value);
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
              onPress={() => alert('Okay...')}
            />
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default WorkAssignModal;
