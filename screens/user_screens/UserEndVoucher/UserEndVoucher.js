import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from '../UserReports/ReportStyle.js';
import {Dropdown} from 'react-native-element-dropdown';
import {Title, Divider} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import utils from '../../../utils';
import {useSelector} from 'react-redux';

import {
  get_stock_item_name,
  insert_voucher_details,
} from '../UserReports/ReportApi.js';
import {
  COLORS,
  FONTS,
  SIZES,
  dummyData,
  icons,
  images,
  constants,
} from '../../../constants';
import {
  FormInput,
  TextButton,
  HeaderBar,
  CustomToast,
  DeleteConfirmationToast,
} from '../../../Components';

const UserEndVoucher = () => {
  const {cont_Project_list_drop, inputfromtwo} = styles;

  const [proListIsFocus, setProListIsFocus] = useState(false);
  const [voucherType, setVoucherType] = useState('');
  const [voucherModal, setVoucherModal] = useState(false);

  const [itemList, setItemList] = useState([]);
  const [itemId, setItemId] = useState('');

  const [qty, setQty] = useState('');
  const [qtyError, setQtyError] = useState('');

  const [remark, setRemark] = useState('');
  const [remarkError, setRemarkError] = useState('');

  const [vehicleNo, setVehicleNo] = useState('');
  const [vehicleNoError, setVehicleNoError] = useState('');

  const [location, setLocation] = useState('');
  const [locationError, setLocationError] = useState('');

  const [projectLists, setProjectLists] = useState([]);
  const [projectId, setProjectId] = useState('');

  // CUSTOM TOAST OF CRUD OPERATIONS
  const [submitToast, setSubmitToast] = React.useState(false);
  const [updateToast, setUpdateToast] = React.useState(false);
  const [deleteToast, setDeleteToast] = React.useState(false);

  const [deleteConfirm, setDeleteConfirm] = React.useState(false);

  const userCompanyData = useSelector(state => state.user);

  useMemo(() => {
    if (userCompanyData._id) {
      const getProjectsByUserId = async () => {
        let data = await fetch(
          `${process.env.API_URL}user-by-projects/${userCompanyData._id}`,
        );
        let resp = await data.json();

        setProjectLists(resp);
      };
      getProjectsByUserId();
    }
  }, []);

  const getStockDataItems = async () => {
    try {
      const data = await get_stock_item_name();

      if (data.data.length >= 0) {
        setItemList(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveVoucherDetails = async () => {
    const data = {
      voucher_type:voucherType,
      company_id: userCompanyData.company_id,
      project_id: projectId,
      item_id: itemId,
      qty: qty,
      remark: remark,
      location: location,
      vehicle_no: vehicleNo,
    };
    console.log("🚀 ~ file: UserEndVoucher.js ~ line 110 ~ saveVoucherDetails ~ data", data)

    const res = await insert_voucher_details(data);
    console.log("🚀 ~ file: UserEndVoucher.js ~ line 112 ~ saveVoucherDetails ~ res", res)
    if (res.status == '200') {
      setSubmitToast(true);
      setTimeout(() => {
        setVoucherModal(false);
      }, 800);
    }
  };

  const addVoucherModal = () => {
    return (
      <Modal visible={voucherModal} transparent={false} animationType="slide">
        <View style={{flex: 1, backgroundColor: COLORS.transparentBlack1}}>
          <View style={{flex: 1, backgroundColor: '#000000aa'}}>
            <View
              style={{
                height: '90%',
                width: '100%',
                backgroundColor: '#fff',
                marginTop: 80,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 22,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Title>{voucherType ? voucherType : 'Select Voucher'}</Title>
                <Pressable
                  onPress={() => {
                    setVoucherModal(false);
                  }}>
                  <AntDesign name="close" size={24} color={COLORS.black} />
                </Pressable>
              </View>
              <View style={{flex: 1}}>
                <Dropdown
                  style={[
                    cont_Project_list_drop,
                    {
                      width: SIZES.width * 0.88,
                      // marginTop: 0,
                    },
                    proListIsFocus && {
                      borderColor: COLORS.gray2,
                    },
                  ]}
                  placeholderStyle={{fontSize: 16, color: COLORS.darkGray}}
                  selectedTextStyle={{color: COLORS.gray}}
                  containerStyle={{
                    width: SIZES.width * 0.88,
                    borderRadius: SIZES.base,
                    paddingTop: SIZES.base * 0.5,
                    marginTop: SIZES.base,
                  }}
                  iconStyle={{
                    height: 28,
                  }}
                  data={projectLists}
                  maxHeight={200}
                  labelField="project_name"
                  valueField="project_id"
                  placeholder={'Select Project'}
                  onFocus={() => setProListIsFocus(true)}
                  onBlur={() => setProListIsFocus(false)}
                  onChange={item => {
                    setProjectId(item.project_id);
                    setProListIsFocus(false);
                  }}
                />
                <Dropdown
                  style={[
                    cont_Project_list_drop,
                    {
                      width: SIZES.width * 0.88,
                      // marginTop: 0,
                    },
                    proListIsFocus && {
                      borderColor: COLORS.gray2,
                    },
                  ]}
                  placeholderStyle={{fontSize: 16, color: COLORS.darkGray}}
                  selectedTextStyle={{color: COLORS.gray}}
                  containerStyle={{
                    width: SIZES.width * 0.88,
                    borderRadius: SIZES.base,
                    paddingTop: SIZES.base * 0.5,
                    marginTop: SIZES.base,
                  }}
                  iconStyle={{
                    height: 28,
                  }}
                  data={constants.VOUCHER_TYPE}
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder={'Select Voucher Type'}
                  // onFocus={() => setProListIsFocus(true)}
                  // onBlur={() => setProListIsFocus(false)}
                  onChange={item => {
                    getStockDataItems();
                    setVoucherType(item.label);
                    // setProListIsFocus(false);
                    // setVoucherModal(true);
                  }}
                />
                <Dropdown
                  style={[
                    cont_Project_list_drop,
                    {
                      width: SIZES.width * 0.88,
                      // marginTop: 0,
                    },
                    proListIsFocus && {
                      borderColor: COLORS.gray2,
                    },
                  ]}
                  placeholderStyle={{fontSize: 16, color: COLORS.darkGray}}
                  selectedTextStyle={{color: COLORS.gray}}
                  containerStyle={{
                    width: SIZES.width * 0.88,
                    borderRadius: SIZES.base,
                    paddingTop: SIZES.base * 0.5,
                    // marginTop: SIZES.base,
                  }}
                  iconStyle={{
                    height: 28,
                  }}
                  data={itemList}
                  maxHeight={200}
                  labelField="item_name"
                  valueField="_id"
                  placeholder={'Select Item'}
                  // onFocus={() => setProListIsFocus(true)}
                  // onBlur={() => setProListIsFocus(false)}
                  onChange={item => {
                    setItemId(item._id);
                    // setProListIsFocus(false);
                    setVoucherModal(true);
                  }}
                />
                <FormInput
                  placeholder="Qty"
                  onChange={value => {
                    utils.validateText(value, setQtyError);
                    setQty(value);
                  }}
                  value={qty}
                  keyboardType="numeric"
                  errorMsg={qtyError}
                  appendComponent={
                    <View style={{justifyContent: 'center'}}>
                      <Image
                        source={
                          qty == '' || (qty != '' && qtyError == '')
                            ? icons.correct
                            : icons.cancel
                        }
                        style={{
                          height: 20,
                          width: 20,
                          tintColor:
                            qty == ''
                              ? COLORS.gray
                              : qty != '' && qtyError == ''
                              ? COLORS.green
                              : COLORS.red,
                        }}
                      />
                    </View>
                  }
                />
                {constants.CHECK_VOUCHER_TYPE.RECEIVED_RETURN_VOUCHER ==
                voucherType ? (
                  <FormInput
                    placeholder="Vehicle no"
                    onChange={value => {
                      utils.validateText(value, setVehicleNoError);
                      setVehicleNo(value);
                    }}
                    value={vehicleNo}
                    errorMsg={vehicleNoError}
                    appendComponent={
                      <View style={{justifyContent: 'center'}}>
                        <Image
                          source={
                            vehicleNo == '' ||
                            (vehicleNo != '' && vehicleNoError == '')
                              ? icons.correct
                              : icons.cancel
                          }
                          style={{
                            height: 20,
                            width: 20,
                            tintColor:
                              vehicleNo == ''
                                ? COLORS.gray
                                : vehicleNo != '' && vehicleNoError == ''
                                ? COLORS.green
                                : COLORS.red,
                          }}
                        />
                      </View>
                    }
                  />
                ) : null}
                {constants.CHECK_VOUCHER_TYPE.RECEIVED_VOUCHER ==
                voucherType ? (
                  <FormInput
                    placeholder="Location"
                    onChange={value => {
                      utils.validateText(value, setLocationError);
                      setLocation(value);
                    }}
                    value={location}
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
                ) : null}
                <FormInput
                  placeholder="Remark"
                  onChange={value => {
                    utils.validateText(value, setRemarkError);
                    setRemark(value);
                  }}
                  value={remark}
                  errorMsg={remarkError}
                  appendComponent={
                    <View style={{justifyContent: 'center'}}>
                      <Image
                        source={
                          remark == '' || (remark != '' && remarkError == '')
                            ? icons.correct
                            : icons.cancel
                        }
                        style={{
                          height: 20,
                          width: 20,
                          tintColor:
                            remark == ''
                              ? COLORS.gray
                              : remark != '' && remarkError == ''
                              ? COLORS.green
                              : COLORS.red,
                        }}
                      />
                    </View>
                  }
                />
              </View>
              <TextButton
                label="Submit"
                buttonContainerStyle={{
                  height: 50,
                  width: '100%',
                  alignItems: 'center',
                  borderRadius: SIZES.radius * 0.5,
                  backgroundColor: COLORS.lightblue_700,
                }}
                onPress={() => {
                  saveVoucherDetails()
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Pressable
        onPress={() => {
          getStockDataItems();
          setVoucherModal(true);
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',

          paddingVertical: SIZES.base * 0.5,
          paddingHorizontal: SIZES.base * 1.5,
          borderWidth: 1,
          marginTop: SIZES.base,
          width: SIZES.width * 0.95,
          backgroundColor: COLORS.lightblue_500,
          alignSelf: 'center',
          borderRadius: SIZES.base * 0.5,
          borderColor: COLORS.lightblue_300,
        }}>
        <Text style={[FONTS.body3, {color: COLORS.white2}]}>Voucher Entry</Text>
        <FontAwesome5
          name="hand-point-right"
          size={25}
          color={COLORS.white}></FontAwesome5>
      </Pressable>
      <View>{addVoucherModal()}</View>
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
      <DeleteConfirmationToast
        isVisible={deleteConfirm}
        onClose={() => setDeleteConfirm(false)}
        title={'Are You Sure?'}
        message={'Do you really want to delete?'}
        color={COLORS.rose_600}
        icon={icons.delete_withbg}
        onClickYes={() => deleteContReportButton()}
      />
    </View>
  );
};

export default UserEndVoucher;
