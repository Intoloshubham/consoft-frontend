import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  HeaderBar,
  TextButton,
  FormInput,
  IconButton,
  CustomToast,
  DeleteConfirmationToast,
} from '../../../Components';
import {COLORS, SIZES, FONTS, icons} from '../../../constants';
import {
  getContractors,
  postContractors,
  deleteContractors,
} from '../../../controller/ContractorController';
import {useSelector} from 'react-redux';

const Contractors = ({route}) => {
  const companyData = useSelector(state => state.company);
  const company_id = companyData._id;
  const {project_id} = route.params; //
  const [showContractorsModal, setShowContractorsModal] = React.useState(false);
  const [contractors, setContractors] = React.useState([]);
  // company team states
  const [name, setName] = React.useState('');
  const [mobileNo, setMobileNo] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [mobileNoError, setMobileNoError] = React.useState('');

  // CUSTOM TOAST OF CRUD OPERATIONS
  const [submitToast, setSubmitToast] = React.useState(false);
  const [updateToast, setUpdateToast] = React.useState(false);
  const [deleteToast, setDeleteToast] = React.useState(false);

  //
  const [deleteConfirm, setDeleteConfirm] = React.useState(false);

  // get contractors
  const fetchContractors = async () => {
    let data = await getContractors();
    // console.log(data)
    setContractors(data);
  };

  // post contractors details
  const SubmitContractors = async () => {
    const formData = {
      project_id: project_id,
      contractor_name: name,
      phone_no: mobileNo,
      company_id: company_id,
    };
    let data = await postContractors(formData);
    if (data.status === 200) {
      setSubmitToast(true);
      setShowContractorsModal(false);
      setName('');
      setMobileNo('');
      fetchContractors();
    } else {
      alert(data.message);
    }
    setTimeout(() => {
      setSubmitToast(false);
    }, 2000);
  };

  const [conId, setConId] = React.useState('');
  const conDelete = id => {
    setConId(id);
    setDeleteConfirm(true);
  };
  //delete contractors
  const DeleteContractors = async () => {
    let data = await deleteContractors(conId);
    if (data.status === 200) {
      fetchContractors();
      setDeleteToast(true);
      setDeleteConfirm(false);
    }
    setTimeout(() => {
      setDeleteToast(false);
    }, 1500);
  };

  React.useEffect(() => {
    fetchContractors();
  }, []);

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
              textTransform: 'capitalize',
            }}>
            Mr. {item.contractor_name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                alert('edit name');
              }}>
              <ImageBackground
                style={{
                  backgroundColor: COLORS.green,
                  padding: 3,
                  borderRadius: 2,
                  right: 12,
                }}>
                <Image
                  source={icons.edit}
                  style={{
                    width: 12,
                    height: 12,
                    tintColor: COLORS.white,
                  }}
                />
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                conDelete(item._id);
                // DeleteContractors(item._id);
              }}>
              <ImageBackground
                style={{
                  backgroundColor: COLORS.rose_600,
                  padding: 3,
                  borderRadius: 2,
                }}>
                <Image
                  source={icons.delete_icon}
                  style={{
                    width: 12,
                    height: 12,
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
          Mobile No - {item.phone_no}
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
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
              borderRadius: 5,
              backgroundColor: COLORS.white,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text style={{fontSize: 25, color: COLORS.darkGray}}>
                Contractors
              </Text>
              <ImageBackground
                style={{
                  backgroundColor: COLORS.white,
                  padding: 2,
                  elevation: 20,
                }}>
                <TouchableOpacity
                  onPress={() => setShowContractorsModal(false)}>
                  <Image
                    source={icons.cross}
                    style={{height: 25, width: 25, tintColor: COLORS.rose_600}}
                  />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <ScrollView>
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
            </ScrollView>
            <TextButton
              label="Submit"
              buttonContainerStyle={{
                height: 50,
                alignItems: 'center',
                marginTop: SIZES.padding,
                borderRadius: SIZES.radius,
              }}
              onPress={() => SubmitContractors()}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  return (
    <View
      style={{
        flex: 1,
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
        onPress={() => {
          setName('');
          setMobileNo('');
          setShowContractorsModal(true);
        }}
      />
      <View
        style={{
          marginBottom: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: 5,
          backgroundColor: COLORS.white2,
          ...styles.shadow,
        }}>
        <FlatList
          data={contractors}
          keyExtractor={item => `${item._id}`}
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
                  backgroundColor: COLORS.gray2,
                  marginVertical: 5,
                }}></View>
            );
          }}
        />
        {renderAddContractorsModal()}

        <CustomToast
          isVisible={submitToast}
          onClose={() => setSubmitToast(false)}
          color={COLORS.green}
          title="Add Team"
          message="Addedd Successfully..."
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

        <DeleteConfirmationToast
          isVisible={deleteConfirm}
          onClose={() => setDeleteConfirm(false)}
          title={'Are You Sure?'}
          message={'Do you really want to delete?'}
          color={COLORS.rose_600}
          icon={icons.delete_withbg}
          onClickYes={() => DeleteContractors()}
        />
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
