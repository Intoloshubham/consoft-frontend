import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  HeaderBar,
  FormInput,
  TextButton,
  IconButton,
  CustomToast,
} from '../../../Components';
import {SIZES, COLORS, FONTS, icons} from '../../../constants';
import utils from '../../../utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  getSuppliers,
  postSuppliers,
  deleteSuppliers,
} from '../../../controller/SupplierController';

const Suppliers = () => {
  const [suppliersModal, setSuppliersModal] = React.useState(false);
  const [suppliers, setSuppliers] = React.useState([]);
  // form states
  const [name, setName] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [location, setLocation] = React.useState('');

  // error states
  const [nameError, setNameError] = React.useState('');
  const [mobileError, setMobileError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [locationError, setLocationError] = React.useState('');

  // CUSTOM TOAST OF CRUD OPERATIONS
  const [submitToast, setSubmitToast] = React.useState(false);
  const [updateToast, setUpdateToast] = React.useState(false);
  const [deleteToast, setDeleteToast] = React.useState(false);

  function isEnableSubmit() {
    return (
      name != '' &&
      nameError == '' &&
      mobile != '' &&
      mobileError == '' &&
      email != '' &&
      emailError == '' &&
      location != '' &&
      locationError == ''
    );
  }

  // ============================== Apis ===================================

  const getSupplier = async () => {
    let response = await getSuppliers();
    if (response.status === 200) {
      setSuppliers(response.data);
    } else {
      alert(response.message);
    }
  };

  const postSupplier = async () => {
    const formData = {
      supplier_name: name,
      supplier_mobile: mobile,
      supplier_email: email,
      supplier_location: location,
    };
    let response = await postSuppliers(formData);
    if (response.status === 200) {
      getSupplier();
      setSubmitToast(true);
      setSuppliersModal(false);
      setName('');
      setMobile('');
      setEmail('');
      setLocation('');
    } else {
      alert(response.message);
    }
    setTimeout(() => {
      setSubmitToast(false);
    }, 2000);
  };

  const deleteSupplier = async id => {
    let response = await deleteSuppliers(id);
    if (response.status === 200) {
      setDeleteToast(true);
      getSupplier();
    }
    setTimeout(() => {
      setDeleteToast(false);
    }, 2000);
  };

  React.useEffect(() => {
    getSupplier();
  }, []);

  console.log("object")

  function renderSuppliersModal() {
    return (
      <Modal animationType="slide" transparent={true} visible={suppliersModal}>
        <TouchableWithoutFeedback>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: COLORS.transparentBlack3,
            }}>
            <View
              style={{
                backgroundColor: COLORS.white2,
                position: 'absolute',
                width: '100%',
                height: '60%',
                // padding: SIZES.radius,
                paddingHorizontal: SIZES.padding,
                paddingTop: SIZES.radius,
                paddingBottom: SIZES.padding,
                borderTopRightRadius: SIZES.base,
                borderTopLeftRadius: SIZES.base,
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
                  onPress={() => setSuppliersModal(false)}
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
                    onChange={value => {
                      utils.validateText(value, setNameError);
                      setName(value);
                    }}
                    errorMsg={nameError}
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
                    label="Mobile No."
                    keyboardType="numeric"
                    onChange={value => {
                      utils.validateNumber(value, setMobileError);
                      setMobile(value);
                    }}
                    errorMsg={mobileError}
                    appendComponent={
                      <View style={{justifyContent: 'center'}}>
                        <Image
                          source={
                            mobile == '' || (mobile != '' && mobileError == '')
                              ? icons.correct
                              : icons.cancel
                          }
                          style={{
                            height: 20,
                            width: 20,
                            tintColor:
                              mobile == ''
                                ? COLORS.gray
                                : mobile != '' && mobileError == ''
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
                      utils.validateEmail(value, setEmailError);
                      setEmail(value);
                    }}
                    errorMsg={emailError}
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
                    label="Location"
                    keyboardType="default"
                    onChange={value => {
                      utils.validateText(value, setLocationError);
                      setLocation(value);
                    }}
                    errorMsg={locationError}
                    appendComponent={
                      <View style={{justifyContent: 'center'}}>
                        <Image
                          source={
                            location == '' ||
                            (location != '' && locationError == '')
                              ? icons.correct
                              : icons.cancel
                          }
                          style={{
                            height: 20,
                            width: 20,
                            tintColor:
                              location == ''
                                ? COLORS.gray
                                : location != '' && locationError == ''
                                ? COLORS.green
                                : COLORS.red,
                          }}
                        />
                      </View>
                    }
                  />
                  <TextButton
                    label="Save"
                    disabled={isEnableSubmit() ? false : true}
                    buttonContainerStyle={{
                      height: 45,
                      alignItems: 'center',
                      marginTop: SIZES.padding,
                      borderRadius: SIZES.base,
                      backgroundColor: isEnableSubmit()
                        ? COLORS.lightblue_700
                        : COLORS.transparentPrimary,
                    }}
                    onPress={() => postSupplier()}
                  />
                </KeyboardAwareScrollView>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  const renderItem = ({item, index}) => {
    return (
      <View>
        <Text
          style={{
            ...FONTS.h3,
            textTransform: 'capitalize',
            color: COLORS.lightblue_900,
          }}>
          {item.supplier_name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={icons.call}
              style={{
                height: 10,
                width: 10,
              }}
            />
            <Text
              style={{
                ...FONTS.h5,
                color: COLORS.darkGray,
                left: 5,
              }}>
              {item.supplier_mobile}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 30,
            }}>
            <Image
              source={icons.mail}
              style={{
                height: 10,
                width: 10,
              }}
            />
            <Text style={{...FONTS.h5, color: COLORS.darkGray, left: 5}}>
              {item.supplier_email}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={icons.location}
              style={{
                height: 10,
                width: 10,
                tintColor: COLORS.darkGray,
              }}
            />
            <Text
              style={{
                ...FONTS.h5,
                color: COLORS.darkGray,
                left: 5,
                textTransform: 'capitalize',
              }}>
              {item.supplier_location}
            </Text>
          </View>
          <TouchableOpacity onPress={() => deleteSupplier(item._id)}>
            <ImageBackground
              style={{
                backgroundColor: COLORS.warning_200,
                padding: 3,
                borderRadius: 2,
              }}>
              <Image
                source={icons.delete_icon}
                style={{
                  width: 12,
                  height: 12,
                  tintColor: COLORS.rose_600,
                }}
              />
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  function renderSuppliers() {
    return (
      <View
        style={{
          marginBottom: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: 3,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}>
        <FlatList
          data={suppliers}
          keyExtractor={item => `${item._id}`}
          renderItem={renderItem}
          maxHeight={510}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.lightGray1,
                  marginVertical: SIZES.radius,
                }}></View>
            );
          }}
        />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <HeaderBar right={true} title="Suppliers" />
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
        onPress={() => {
          setName(''),
            setMobile(''),
            setEmail(''),
            setLocation(''),
            setSuppliersModal(true);
        }}
      />
      {renderSuppliersModal()}
      {renderSuppliers()}

      <CustomToast
        isVisible={submitToast}
        onClose={() => setSubmitToast(false)}
        color={COLORS.green}
        title="Submit"
        message="Submitted Successfully..."
      />
      <CustomToast
        isVisible={updateToast}
        onClose={() => setUpdateToast(false)}
        color={COLORS.yellow_400}
        title="Update"
        message="Updated Successfully..."
      />
      <CustomToast
        isVisible={deleteToast}
        onClose={() => setDeleteToast(false)}
        color={COLORS.rose_600}
        title="Delete"
        message="Deleted Successfully..."
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
export default Suppliers;
