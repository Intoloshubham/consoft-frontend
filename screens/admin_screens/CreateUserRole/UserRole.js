import React from 'react';
import {
  View,
  Text,
  Modal,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  HeaderBar,
  TextButton,
  FormInput,
  CustomToast,
} from '../../../Components';
import {COLORS, FONTS, SIZES, icons} from '../../../constants';
import {postUserRole} from '../../../controller/UserRoleController';
import utils from '../../../utils';
import {useSelector} from 'react-redux';
import {getUserRole} from '../../../controller/UserRoleController';

const UserRole = () => {
  const companyData = useSelector(state => state.company);
  const company_id = companyData._id;

  // CUSTOM TOAST OF CRUD OPERATIONS
  const [submitToast, setSubmitToast] = React.useState(false);
  const [createUserModal, setCreateUserModal] = React.useState(false);

  // form data
  const [userRole, setUserRole] = React.useState('');
  const [userRoles, setUserRoles] = React.useState([]);

  //error states
  const [userRoleError, setUserRoleError] = React.useState('');

  function isEnableSubmit() {
    return userRole != '' && userRoleError == '';
  }

  // ====================================Apis ==============================

  const submitUserRole = async () => {
    const formData = {user_role: userRole, company_id: company_id};
    let response = await postUserRole(formData);
    if (response.status === 200) {
      setSubmitToast(true);
      setCreateUserModal(false);
      setUserRole('');
      getUsersRole();
    } else {
      alert(response.message);
    }
    setTimeout(() => {
      setSubmitToast(false);
    }, 1500);
  };

  const getUsersRole = async () => {
    let response = await getUserRole(company_id);
    console.log(response)
    if (response.status === 200) {
      setUserRoles(response.data);
    }
  };

  React.useEffect(() => {
    getUsersRole();
  }, []);

  function renderAddUserRoleModal() {
    return (
      <Modal animationType="slide" transparent={true} visible={createUserModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.transparentBlack7,
          }}>
          <View
            style={{
              width: '90%',
              padding: SIZES.padding,
              borderRadius: SIZES.base,
              backgroundColor: COLORS.white,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 20, color: COLORS.darkGray}}></Text>
              <ImageBackground
                style={{
                  backgroundColor: COLORS.darkGray,
                  padding: 3,
                  borderRadius: 3,
                }}>
                <TouchableOpacity onPress={() => setCreateUserModal(false)}>
                  <Image
                    source={icons.cross}
                    style={{height: 12, width: 12, tintColor: COLORS.white}}
                  />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <ScrollView>
              <FormInput
                label="User role"
                keyboardType="default"
                onChange={value => {
                  utils.validateText(value, setUserRoleError);
                  setUserRole(value);
                }}
                errorMsg={userRoleError}
                appendComponent={
                  <View style={{justifyContent: 'center'}}>
                    <Image
                      source={
                        userRole == '' ||
                        (UserRole != '' && userRoleError == '')
                          ? icons.correct
                          : icons.cancel
                      }
                      style={{
                        height: 20,
                        width: 20,
                        tintColor:
                          userRole == ''
                            ? COLORS.gray
                            : userRole != '' && userRoleError == ''
                            ? COLORS.green
                            : COLORS.red,
                      }}
                    />
                  </View>
                }
              />
            </ScrollView>
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
              onPress={submitUserRole}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  function renderUserRole() {
    const renderItem = ({item, index}) => (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{...FONTS.h4}}>{index + 1}.</Text>
          <Text
            style={{
              ...FONTS.h3,
              left: 5,
              color: COLORS.darkGray,
              textTransform: 'capitalize',
            }}>
            {item.user_role}
          </Text>
        </View>
      </View>
    );

    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.padding,
          backgroundColor: COLORS.lightblue_50,
          padding: 20,
          ...styles.shadow,
        }}>
        <FlatList
          data={userRoles}
          keyExtractor={item => `${item._id}`}
          renderItem={renderItem}
          maxHeight={450}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: COLORS.gray2,
                  marginVertical: 10,
                }}></View>
            );
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <HeaderBar right={true} title="User Role" />
      <TextButton
        label="Add New"
        buttonContainerStyle={{
          height: 45,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightblue_700,
          ...styles.shadow,
        }}
        onPress={() => setCreateUserModal(true)}
      />
      {renderAddUserRoleModal()}
      {renderUserRole()}
      <CustomToast
        isVisible={submitToast}
        onClose={() => setSubmitToast(false)}
        color={COLORS.green}
        title="Submit"
        message="Submitted Successfully..."
      />
    </View>
  );
};
export default UserRole;

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
