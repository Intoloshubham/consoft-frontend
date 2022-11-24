
import React, {useState, useMemo, useEffect} from 'react';

import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,

} from 'react-native';
import styles from '../UserReports/ReportStyle.js';
import {Dropdown} from 'react-native-element-dropdown';
import {Title, Divider} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import utils from '../../../utils';
import {useSelector} from 'react-redux';
import moment from 'moment';


import {
  get_stock_item_name,
  insert_voucher_details,
  get_pending_voucher_details,
  get_reverted_voucher,
  get_verified_voucher,

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

import {FlatList} from 'react-native-gesture-handler';


const UserEndVoucher = () => {
  const {cont_Project_list_drop, inputfromtwo} = styles;

  const [proListIsFocus, setProListIsFocus] = useState(false);
  const [voucherType, setVoucherType] = useState('');
  const [voucherModal, setVoucherModal] = useState(false);

  const [itemList, setItemList] = useState([]);
  const [itemId, setItemId] = useState('');

  const current_dat = moment().format('YYYY%2FMM%2FDD');

  let MyDateString = current_dat;

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


  const [pendingVoucher, setPendingVoucher] = useState([]);
  const [revertedVoucher, setRevertedVoucher] = useState([]);
  const [verifiedVoucher, setVerifiedVoucher] = useState([]);

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

  const getPendingPurchasedVoucher = async () => {
    try {
      const data = await get_pending_voucher_details(
        userCompanyData.company_id,
        MyDateString,
      );

      if (data.data.length >= 0) {
        // setPendingVoucher(data.data);
        data.data.map(ele => {
          setPendingVoucher(ele.voucherData);
        });
      }

      console.log('pendingVoucher---', pendingVoucher);
    } catch (error) {
      console.log(error);
    }
  };

  const getRevertedVoucher = async () => {
    try {
      const data = await get_reverted_voucher(
        userCompanyData.company_id,
        MyDateString,
      );

      if (data.data.length >= 0) {
        // setPendingVoucher(data.data);
        data.data.map(ele => {
          setRevertedVoucher(ele.voucherData);
        });
      }

      // console.log('pendingVoucher---', pendingVoucher);
    } catch (error) {
      console.log(error);
    }
  };

  const getVerifiedVoucher = async () => {
    try {
      const data = await get_verified_voucher(
        userCompanyData.company_id,
        MyDateString,
      );

      if (data.data.length >= 0) {
        // setPendingVoucher(data.data);
        data.data.map(ele => {
          setVerifiedVoucher(ele.voucherData);
        });

      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getPendingPurchasedVoucher();
    getRevertedVoucher();
    getVerifiedVoucher();
  }, []);

  const saveVoucherDetails = async () => {
    const data = {
      voucher_type: voucherType,
      company_id: userCompanyData.company_id,
      project_id: projectId,
      item_id: itemId,
      qty: qty,
      remark: remark,
      location: location,
      vehicle_no: vehicleNo,
    };


    const res = await insert_voucher_details(data);

    if (res.status == '200') {
      setSubmitToast(true);
      setTimeout(() => {
        setVoucherModal(false);

        setSubmitToast(false);

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
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
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

                  saveVoucherDetails();

                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderItem = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        margin: 1,
        borderWidth: 0.05,
        marginVertical: SIZES.base * 0.5,
      }}>
      <View style={{width: 150}}>
        <Text style={{fontSize: 16, textAlign: 'left'}}>
          {item.voucher_type}
        </Text>
      </View>
      <Divider
        style={{
          backgroundColor: COLORS.lightGray1,
          padding: 0.4,
          height: SIZES.height * 0.04,
        }}
      />
      <View style={{width: 80}}>
        <Text style={{fontSize: 16, textAlign: 'center'}}>
          {item.item_name}
        </Text>
      </View>
      <Divider
        style={{
          backgroundColor: COLORS.lightGray1,
          padding: 0.4,
          height: SIZES.height * 0.04,
        }}
      />
      <View style={{width: 60}}>
        <Text style={{fontSize: 16, textAlign: 'center'}}>{item.qty}</Text>
      </View>
      <Divider
        style={{
          backgroundColor: COLORS.lightGray1,
          padding: 0.4,
          height: SIZES.height * 0.04,
        }}
      />
      <View style={{width: 200}}>
        <Text style={{fontSize: 16, textAlign: 'left'}}>{item.remark}</Text>
      </View>
      <Divider
        style={{
          backgroundColor: COLORS.lightGray1,
          padding: 0.4,
          height: SIZES.height * 0.04,
        }}
      />
      <View style={{width: 100}}>
        <Text style={{fontSize: 16, textAlign: 'center'}}>
          {item.voucher_date}
        </Text>
      </View>
      <Divider
        style={{
          backgroundColor: COLORS.lightGray1,
          padding: 0.4,
          height: SIZES.height * 0.04,
        }}
      />
      <View style={{flexDirection:'row',justifyContent:'space-evenly',paddingHorizontal:20, width:140}}> 
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity>
            <FontAwesome name="edit" color={COLORS.blue} size={16} />
          </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="delete"
              color={COLORS.red}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  const ListHeader = () => {
    return (
      <View style={[styles1.headerFooterStyle, styles1.shadow]}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 150, backgroundColor: 'white'}}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
              Voucher Type
            </Text>
          </View>
          <View style={{width: 80, backgroundColor: 'white'}}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
              Item Name
            </Text>
          </View>
          <View style={{width: 60, backgroundColor: 'white'}}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
              Qty
            </Text>
          </View>
          <View style={{width: 200, backgroundColor: 'white'}}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
              Remark
            </Text>
          </View>
          <View style={{width: 120, backgroundColor: 'white'}}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
              Voucher Date
            </Text>
          </View>
          <View style={{width: 130, backgroundColor: 'white'}}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
              Action
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const ListFooter = () => {
    //View to set in Footer
    return (
      <View style={[styles1.headerFooterStyle, styles1.shadow]}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 150, backgroundColor: 'white'}}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
              Voucher Type
            </Text>
          </View>
          <View style={{width: 80, backgroundColor: 'white'}}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
              Item Name
            </Text>
          </View>
          <View style={{width: 60, backgroundColor: 'white'}}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
              Qty
            </Text>
          </View>
          <View style={{width: 200, backgroundColor: 'white'}}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
              Remark
            </Text>
          </View>
          <View style={{width: 100, backgroundColor: 'white'}}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
              Voucher Date
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, borderWidth: 1, alignContent: 'space-around'}}>

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


      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          ...styles1.shadow,
          alignItems: 'center',
          padding: 5,
          borderWidth: 0.2,
          borderLeftWidth: 3,
          borderLeftColor: COLORS.yellow_300,
          backgroundColor:COLORS.white3,
          marginHorizontal: 2,
          marginTop: '10%',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <View
            style={[
              // styles1.shadow,
              {padding: SIZES.base * 0.5, marginBottom: 2},
            ]}>
            <Text style={[FONTS.body3, {color: COLORS.gray}]}>
              Pending Voucher
            </Text>
          </View>
          <FlatList
            data={pendingVoucher}
            horizontal
            contentContainerStyle={{
              flexDirection: 'column',
              flexWrap: 'wrap',
              padding: 2,
              marginHorizontal: 2,
              // justifyContent: 'space-between',
              // marginBottom: SIZES.height * 0.61,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            //Header to show above listview
            ListHeaderComponent={ListHeader}
            //Footer to show below listview
            // ListFooterComponent={ListFooter}
            // ItemSeparatorComponent={ItemSeparatorView}
            keyExtractor={item => item._id.toString()}
          />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          ...styles1.shadow,
          padding: 5,
          borderWidth: 0.2,
          marginHorizontal: 3,
          borderLeftColor: COLORS.orange,
          backgroundColor:COLORS.white3,
          borderLeftWidth: 3,
          // alignItems: 'center',
          marginTop: '2%',
        }}>
        <View
          style={[
            // styles1.shadow,
            {borderWidth: 0.1, padding: SIZES.base * 0.5, marginBottom: 4},
          ]}>
          <Text style={[FONTS.body3, {color: COLORS.gray}]}>
            Reverted Voucher
          </Text>
        </View>
        <FlatList
          data={revertedVoucher}
          horizontal
          contentContainerStyle={{
            flexDirection: 'column',
            flexWrap: 'wrap',
            padding: 2,
            marginHorizontal: 2,
            // justifyContent: 'space-between',
            // marginBottom: SIZES.height * 0.61,
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          //Header to show above listview
          ListHeaderComponent={ListHeader}
          //Footer to show below listview
          // ListFooterComponent={ListFooter}
          // ItemSeparatorComponent={ItemSeparatorView}
          keyExtractor={item => item._id.toString()}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          ...styles1.shadow,
          padding: 5,
          borderWidth: 0.2,
          marginHorizontal: 4,
          borderLeftColor: COLORS.green_400,
          backgroundColor:COLORS.white3,
          borderLeftWidth: 3,
          marginTop: '3%',
          marginBottom: '2%',
        }}>
        <View
          style={[
            // styles1.shadow,
            {borderWidth: 0.1, padding: SIZES.base * 0.5, marginBottom: 4},
          ]}>
          <Text style={[FONTS.body3, {color: COLORS.gray}]}>
            Inprogress Voucher
          </Text>
        </View>
        <FlatList
          data={verifiedVoucher}
          horizontal
          contentContainerStyle={{
            flexDirection: 'column',
            flexWrap: 'wrap',
            padding: 2,
            marginHorizontal: 2,
            // justifyContent: 'space-between',
            // marginBottom: SIZES.height * 0.61,
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          //Header to show above listview
          ListHeaderComponent={ListHeader}
          //Footer to show below listview
          // ListFooterComponent={ListFooter}
          // ItemSeparatorComponent={ItemSeparatorView}
          keyExtractor={item => item._id.toString()}
        />
      </View>


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
const styles1 = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 1,
  },
  headerFooterStyle: {
    width: '100%',
    borderWidth: 0.1,
    // paddingHorizontal:3
    // paddingRight:5
    // height: 25,
    // backgroundColor: '#606070',
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    padding: 7,
  },
});
