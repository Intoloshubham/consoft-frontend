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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  HeaderBar,
  TextButton,
  FormInput,
  Drop,
  IconButton,
} from '../../../Components';
import {COLORS, FONTS, icons, SIZES} from '../../../constants';

const teamdetail = [
  {
    id: 1,
    name: 'Shivam Verma',
    email: 'shivam@gmail.com',
    mobile: 9988776655,
    designation: 'Engineer',
  },
  {
    id: 2,
    name: 'Rahul Shrivastav',
    email: 'rahul@gmail.com',
    mobile: 9988776655,
    designation: 'Architect',
  },
  {
    id: 3,
    name: 'Chotu Patel',
    email: 'chotu@gmail.com',
    mobile: 9988776655,
    designation: 'Engineer',
  },
];
const ProjectTeam = () => {
  const navigation = useNavigation();
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  });

  const [teamdetails, setTeamDetails] = React.useState(teamdetail);
  const [showAddProjectTeamModal, setShowAddProjectTeamModal] =
    React.useState(false);
  const [collapsed, setCollapsed] = React.useState(true);
  const toggleExpanded = () => {
    if (collapsed) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  };
  // project team states
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mobileNo, setMobileNo] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [mobileNoError, setMobileNoError] = React.useState('');

  //drop
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

  function renderTeamList() {
    const renderItem = ({item, index}) => (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            paddingVertical: SIZES.base,
          }}>
          <Text style={{...FONTS.h3, color: COLORS.darkGray}}>{index + 1}</Text>
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
                  color: COLORS.darkGray,
                }}>
                Mr.{item.name}
              </Text>
              <View style={{flexDirection: 'row'}}>
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
              </View>
            </View>
            <Text style={{...FONTS.body4}}>
              Designation - {item.designation}
            </Text>
          </View>
        </TouchableOpacity>
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
          scrollEnabled={false}
          data={teamdetails}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
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
        <TouchableWithoutFeedback
          onPress={() => setShowAddProjectTeamModal(false)}>
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
                  <Drop
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
                    // onPress={OnSubmit}
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
          height: 50,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightblue_700,
        }}
        onPress={() => setShowAddProjectTeamModal(true)}
      />

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
