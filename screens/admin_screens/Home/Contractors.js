import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {
  HeaderBar,
  TextButton,
  FormInput,
  IconButton,
  CustomDropdown,
} from '../../../Components';
import {COLORS, SIZES, FONTS, icons} from '../../../constants';

const contractorsDetails = [
  {
    id: 1,
    name: 'Demo 1',
    email: 'demo1@gmail.com',
    mobile: 9988776655,
    designation: 'editor',
  },
  {
    id: 2,
    name: 'Demo 2',
    email: 'demo2@gmail.com',
    mobile: 9988776655,
    designation: 'editor',
  },
  {
    id: 3,
    name: 'Demo 3',
    email: 'demo3@gmail.com',
    mobile: 9988776655,
    designation: 'editor',
  },
  {
    id: 4,
    name: 'Demo 1',
    email: 'demo1@gmail.com',
    mobile: 9988776655,
    designation: 'editor',
  },
  {
    id: 5,
    name: 'Demo 2',
    email: 'demo2@gmail.com',
    mobile: 9988776655,
    designation: 'editor',
  },
];

const Contractors = () => {
  const [contractorsData, setContractorsData] =
    React.useState(contractorsDetails);
  const [showContractorsModal, setShowContractorsModal] = React.useState(false);

  // company team states
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
              ...FONTS.h3,
              color: COLORS.lightblue_900,
            }}>
            Mr.{item.name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
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
                    tintColor: COLORS.white,
                  }}
                />
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                alert('delete name');
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
        <Text
          style={{
            ...FONTS.body4,
            color: COLORS.darkGray,
            textTransform: 'capitalize',
          }}>
          Designation - {item.designation}
        </Text>
      </View>
    </View>
  );

  function renderAddContractorsModal() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showContractorsModal}>
        <TouchableWithoutFeedback
          onPress={() => setShowContractorsModal(false)}>
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
                    Contractors
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
                    onPress={() => setShowContractorsModal(false)}
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
        backgroundColor: COLORS.lightblue_50,
      }}>
      <HeaderBar right={true} title="Contractors" />
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
        onPress={() => setShowContractorsModal(true)}
      />
      <View
        style={{
          marginBottom: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}>
        <FlatList
          data={contractorsDetails}
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
        {renderAddContractorsModal()}
      </View>
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

export default Contractors;
