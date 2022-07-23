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
} from '../../../Components';
import {COLORS, SIZES, FONTS, icons} from '../../../constants';
import Config from '../../../config';
import {
  getContractors,
  postContractors,
  deleteContractors,
} from '../../../controller/contractorController';

const Contractors = ({route}) => {
  const {project_id} = route.params; //
  const [showContractorsModal, setShowContractorsModal] = React.useState(false);

  const [contractors, setContractors] = React.useState([]);

  // company team states
  const [name, setName] = React.useState('');
  const [mobileNo, setMobileNo] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [mobileNoError, setMobileNoError] = React.useState('');

  // get contractors
  const fetchContractors = async () => {
    let data = await getContractors();
    setContractors(data);
  };

  // post contractors details
  const SubmitContractors = async () => {
    const formData = {
      project_id: project_id,
      contractor_name: name,
      phone_no: mobileNo,
    };
    let data = await postContractors(formData);
    if (data.status === 200) {
      setShowContractorsModal(false);
      setName('');
      setMobileNo('');
      fetchContractors();
    }
  };

  //delete contractors
  const DeleteContractors = async id => {
    let data = await deleteContractors(id);
    if (data.status === 200) {
      fetchContractors();
    }
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
                DeleteContractors(item._id);
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
          borderRadius: SIZES.radius,
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
