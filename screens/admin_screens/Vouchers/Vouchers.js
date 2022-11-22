import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
import {FONTS, SIZES, COLORS, images, icons} from '../../../constants';
import {getVoucher} from '../../../controller/VoucherController';
import {useSelector} from 'react-redux';

const Vouchers = () => {
  const companyDetail = useSelector(state => state.company);
  const company_id = companyDetail._id;
  // console.log(company_id);
  const [date, setDate] = React.useState(new Date());
  const MyDateString =
    date.getFullYear() +
    '%2F' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '%2F' +
    ('0' + date.getDate()).slice(-2);

  // voucher data
  const [voucherData, setVoucherData] = React.useState([]);
  const [voucherModal, setVoucherModal] = React.useState(false);
  const [voucherModalData, setVoucherModalData] = React.useState('');

  const fetchVouchers = async () => {
    const res = await getVoucher(company_id, MyDateString);
    setVoucherData(res.data);
  };

  React.useEffect(() => {
    fetchVouchers();
  }, []);

  function renderVouchers() {
    const renderItem = ({item, index}) => (
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => setVoucherModal(true)}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.darkGray,
          }}>
          {index + 1}.
        </Text>
        <Text
          style={{
            left: 3,
            ...FONTS.h3,
            textTransform: 'capitalize',
            color: COLORS.darkGray,
          }}>
          {item.item_name}
          {'  -  '}
        </Text>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.darkGray,
          }}>
          {item.qty}
        </Text>
      </TouchableOpacity>
    );

    return (
      <ScrollView>
        {voucherData.map((element, index) => {
          return (
            <View
              style={{
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: COLORS.darkGray,
                  fontWeight: '500',
                }}>
                {element.voucher_type}
              </Text>
              {/* <FlatList
                contentContainerStyle={{
                  margin: 3,
                  backgroundColor: COLORS.white,
                  padding: 10,
                  elevation: 2,
                  borderRadius: 2,
                }}
                data={element.voucherData}
                keyExtractor={item => `${item._id}`}
                renderItem={renderItem}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => {
                  return (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: COLORS.lightGray1,
                        marginVertical: 10,
                      }}></View>
                  );
                }}
              /> */}
              {element.voucherData.map((ele, i) => {
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      margin: 3,
                      backgroundColor: COLORS.white,
                      padding: 10,
                      elevation: 2,
                      borderRadius: 2,
                    }}
                    onPress={() => {
                      setVoucherModalData({
                        voucher_type: element.voucher_type,
                        item_name: ele.item_name,
                        qty: ele.qty,
                        vehicle_no: ele.vehicle_no,
                        location: ele.location,
                        remark: ele.remark,
                      });
                      setVoucherModal(true);
                    }}>
                    <Text
                      style={{
                        ...FONTS.h3,
                        color: COLORS.darkGray,
                      }}>
                      {index + 1}.
                    </Text>
                    <Text
                      style={{
                        left: 3,
                        ...FONTS.h3,
                        textTransform: 'capitalize',
                        color: COLORS.darkGray,
                      }}>
                      {ele.item_name}
                      {'  -  '}
                    </Text>
                    <Text
                      style={{
                        ...FONTS.h3,
                        color: COLORS.darkGray,
                      }}>
                      {ele.qty}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    );
  }

  function renderVoucherModal() {
    return (
      <Modal animationType="slide" transparent={true} visible={voucherModal}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            backgroundColor: COLORS.transparentBlack6,
          }}>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '80%',
              padding: SIZES.padding,
              backgroundColor: COLORS.white,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
            {/* header */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 22,
                  color: COLORS.darkGray,
                  fontWeight: '500',
                }}>
                {voucherModalData.voucher_type}
              </Text>
              <ImageBackground
                style={{
                  backgroundColor: COLORS.white,
                  padding: 2,
                  elevation: 20,
                }}>
                <TouchableOpacity onPress={() => setVoucherModal(false)}>
                  <Image
                    source={icons.cross}
                    style={{
                      height: 25,
                      width: 25,
                      tintColor: COLORS.rose_600,
                    }}
                  />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View
              style={{
                borderBottomWidth: 0.8,
                borderColor: COLORS.darkGray2,
                marginVertical: 5,
                marginBottom: 15,
              }}></View>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                  Project name{' - '}
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.darkGray,
                    textTransform: 'capitalize',
                  }}>
                  {voucherModalData.location}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                  Item name{' - '}
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.darkGray,
                    textTransform: 'capitalize',
                  }}>
                  {voucherModalData.item_name}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                  Quantity{' - '}
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.darkGray,
                    textTransform: 'capitalize',
                  }}>
                  {voucherModalData.qty}
                </Text>
              </View>
              {voucherModalData.location != null ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                    Location{' - '}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.darkGray,
                      textTransform: 'capitalize',
                    }}>
                    {voucherModalData.location}
                  </Text>
                </View>
              ) : null}
              {voucherModalData.vehicle_no != null ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                    Vehicle no{' - '}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.darkGray,
                      textTransform: 'capitalize',
                    }}>
                    {voucherModalData.vehicle_no}
                  </Text>
                </View>
              ) : null}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                  Remark{' - '}
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.darkGray,
                    textTransform: 'capitalize',
                  }}>
                  {voucherModalData.remark}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: COLORS.green,
                  borderRadius: 3,
                }}
                onPress={() => alert('Verify')}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.white,
                    fontWeight: '500',
                  }}>
                  Verify
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: COLORS.red_600,
                  left: 15,
                  borderRadius: 3,
                }}
                onPress={() => alert('Revert')}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.white,
                    fontWeight: '500',
                  }}>
                  Revert
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={{flex: 1, margin: 10}}>
      {renderVouchers()}
      {renderVoucherModal()}
    </View>
  );
};

export default Vouchers;
