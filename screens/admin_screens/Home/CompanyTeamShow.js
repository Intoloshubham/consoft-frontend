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
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  HeaderBar,
  TextButton,
  IconButton,
  FormInput,
  CustomDropdown,
} from '../../../Components';
import {COLORS, FONTS, icons, SIZES} from '../../../constants';
import Config from '../../../config';

const ProjectCompanyShow = () => {
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const [comTeamDetails, setComTeamDetails] = React.useState([]);

  React.useEffect(() => {
    fetch(`${Config.API_URL}users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        setComTeamDetails(data);
      })
      .catch(error => console.log(error.message));
  }, [comTeamDetails]);

  const [showCompanyAddTeamModal, setShowCompanyAddTeamModal] =
    React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mobileNo, setMobileNo] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [mobileNoError, setMobileNoError] = React.useState('');

  //dropdown
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [items, setItems] = React.useState([
    {label: 'Maneger', value: '1'},
    {label: 'Engineer', value: '2'},
    {label: 'Supervisor', value: '3'},
    {label: 'Asst. Supervisor', value: '4'},
    {label: 'Site Engineer', value: '5'},
    {label: 'Other staff', value: '6'},
  ]);

  function renderTeamList() {
    const renderItem = ({item, index}) => (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: SIZES.base,
        }}>
        <Text style={{...FONTS.h3, color: COLORS.darkGray}}>{index + 1}.</Text>
        <View style={{flex: 1, marginLeft: SIZES.radius}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.lightblue_900,
                textTransform: 'capitalize',
              }}>
              Mr. {item.name}
            </Text>
            {/* <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  alert('edit name');
                }}>
                <Image
                  source={icons.edit}
                  style={{
                    width: 18,
                    height: 18,
                    right: 15,
                    tintColor: COLORS.lightblue_900,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  alert('delete name');
                }}>
                <Image
                  source={icons.delete_icon}
                  style={{
                    width: 18,
                    height: 18,
                    tintColor: COLORS.red,
                  }}
                />
              </TouchableOpacity>
            </View> */}
          </View>
          <Text
            style={{
              ...FONTS.body5,
              textTransform: 'capitalize',
              color: COLORS.darkGray,
            }}>
            Designation - {item.user_role}
          </Text>
          <Text
            style={{
              ...FONTS.body5,
              textTransform: 'capitalize',
              color: COLORS.darkGray,
            }}>
            Mobile No - +91-{item.mobile}
          </Text>
          <Text style={{...FONTS.body5, color: COLORS.darkGray}}>
            Email - {item.email}
          </Text>
        </View>
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
        {/* <Text
          style={{
            ...FONTS.h2,
            color: COLORS.darkGray,
          }}>
          List
        </Text> */}
        <FlatList
          data={comTeamDetails}
          keyExtractor={item => `${item._id}`}
          renderItem={renderItem}
          scrollEnabled={true}
          maxHeight={550}
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

  function renderAddCompanyTeamModal() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCompanyAddTeamModal}>
        <TouchableWithoutFeedback
          onPress={() => setShowCompanyAddTeamModal(false)}>
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
                    Company Team
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
                    onPress={() => setShowCompanyAddTeamModal(false)}
                  />
                </View>
                <ScrollView>
                  <CustomDropdown
                    placeholder="Select Role"
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
                    label="Name"
                    keyboardType="default"
                    autoCompleteType="username"
                    onChange={value => {
                      setName(value);
                    }}
                    appendComponent={
                      <View style={{justifyContent: 'center'}}>
                        <Image
                          source={
                            name == '' || (name != '' && nameError == '')
                              ? icons.correct
                              : icons.cancel
                          }
                          style={{
                            height: 20,
                            width: 20,
                            tintColor:
                              name == ''
                                ? COLORS.gray
                                : name != '' && nameError == ''
                                ? COLORS.green
                                : COLORS.red,
                          }}
                        />
                      </View>
                    }
                  />
                  <FormInput
                    label="Email"
                    keyboardType="email-address"
                    autoCompleteType="email"
                    onChange={value => {
                      setEmail(value);
                    }}
                    appendComponent={
                      <View style={{justifyContent: 'center'}}>
                        <Image
                          source={
                            email == '' || (email != '' && emailError == '')
                              ? icons.correct
                              : icons.cancel
                          }
                          style={{
                            height: 20,
                            width: 20,
                            tintColor:
                              email == ''
                                ? COLORS.gray
                                : email != '' && emailError == ''
                                ? COLORS.green
                                : COLORS.red,
                          }}
                        />
                      </View>
                    }
                  />
                  <FormInput
                    label="Mobile No."
                    keyboardType="numeric"
                    onChange={value => {
                      setMobileNo(value);
                    }}
                    errorMsg={mobileNoError}
                    appendComponent={
                      <View style={{justifyContent: 'center'}}>
                        <Image
                          source={
                            mobileNo == '' ||
                            (mobileNo != '' && mobileNoError == '')
                              ? icons.correct
                              : icons.cancel
                          }
                          style={{
                            height: 20,
                            width: 20,
                            tintColor:
                              mobileNo == ''
                                ? COLORS.gray
                                : mobileNo != '' && mobileNoError == ''
                                ? COLORS.green
                                : COLORS.red,
                          }}
                        />
                      </View>
                    }
                  />
                  <TextButton
                    label="Submit"
                    buttonContainerStyle={{
                      height: 55,
                      alignItems: 'center',
                      marginTop: SIZES.padding,
                      borderRadius: SIZES.radius,
                    }}
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
      <HeaderBar right={true} title="Company Team" />
      {/* <TextButton
        label="Add New"
        buttonContainerStyle={{
          height: 45,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightblue_700,
        }}
        onPress={() => setShowCompanyAddTeamModal(true)}
      /> */}
      {renderAddCompanyTeamModal()}
      {renderTeamList()}
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

export default ProjectCompanyShow;
