import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {
  COLORS,
  FONTS,
  SIZES,
  dummyData,
  icons,
  images,
} from '../../../../../constants';
import {Dropdown} from 'react-native-element-dropdown';
import {update_quantity_item} from '../../ReportApi.js';
import {FormInput, TextButton, HeaderBar} from '../../../../../Components';
import {useSelector} from 'react-redux';

const EditQuantityItems = () => {
  const [quantityItems, setQuantityItems] = useState([]);
  const [qtyUpdateModal, setQtyUpdateModal] = useState(false);

  const [quantityName, setQuantityName] = useState();
  const [updateQuantityName, setUpdateQuantityName] = useState();

  const [itemId, setItemId] = useState('');

  const userData = useSelector(state => state.user);

  const getQuantityItems = async () => {
    try {
      const resp = await fetch(
        `${process.env.API_URL}quantity-report-item/` +
          `${userData.company_id}`,
      );
      const quantitydata = await resp.json();
      setQuantityItems(quantitydata.data);
      //   console.log('quantitydata--');
      //   console.log(quantitydata);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const editQuantityItems = async id => {
    // console.log("id--",id);
    try {
      const resp = await fetch(
        `${process.env.API_URL}edit-quantity-report-item/` + `${id}`,
      );
      console.log('temp', resp);
      const temp = await resp.json();

      setUpdateQuantityName(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const updateItemName = async () => {
    // console.log('itemId--', itemId);
    // const formData = {
    //   category_name: catName,
    //   company_id: company_id,
    // };
    let response = await update_quantity_item(itemId);
    if (response.status == 200) {
      setUpdateToast(true);
    } else {
      alert(response.message);
    }
    setTimeout(() => {
      setUpdateToast(false);
    }, 2000);
  };

  useEffect(() => {
    getQuantityItems();
    editQuantityItems();
  }, []);

  const quantityItemsupdate = () => {
    setQtyUpdateModal(true);
    // Alert.alert(id,location);
    // settest(true);
    // setvoucherId(id);
    //     setValue(item_id);
    //     setqty(qty);
    //     setlocation(location);
    //     setvehicle(vehicle);
    // console.log(item_id,qty,location,vehicle);
    // setunitname(unitname);
  };

  const updateQtyItemModal = () => (
    <Modal animationType="slide" transparent={true} visible={qtyUpdateModal}>
      <View style={{backgroundColor: '#000000aa', flex: 1}}>
        <View
          style={{
            flex: 1,
            // backgroundColor: '#fff',
            // marginTop: '50%',
            // marginBottom: '50%',
            padding: 30,
            borderTopRightRadius: 35,
            borderTopLeftRadius: 30,
          }}>
          <View>
            <Card style={styles.card2}>
              <View>
                <Pressable
                  onPress={() => {
                    setQtyUpdateModal(false);
                  }}>
                  <Text
                    style={{
                      alignSelf: 'flex-end',
                      paddingRight: 8,
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    X
                  </Text>
                </Pressable>
              </View>
              <Card.Content>
                {/* <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && {borderColor: 'blue'},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="item_name"
                  valueField="_id"
                  placeholder={!isFocus ? 'Select item' : '...'}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    // console.log(item.unit_id);
                    setValue(item._id);
                    setunitname(item.unit_id);
                    setIsFocus(false);
                  }}
                /> */}
                <View style={{justifyContent: 'space-between'}}>
                  <FormInput
                    value={
                      updateQuantityName != null
                        ? updateQuantityName
                        : quantityName
                    }
                    label="Quantity Item Name"
                    onChange={value => {
                      setQuantityName(value);
                    }}
                  />
                </View>
                {/* <FormInput
                  // value={location}
                  label="Supplier/Vendor"
                  // onChange={value => {
                  //   setlocation(value);
                  // }}
                /> */}
                {/* <FormInput
                  // value={vehicle}
                  label="Vehicle no"
                  // onChange={value => {
                  //   setvehicle(value);
                  // }}
                /> */}

                <TextButton
                  label="Update"
                  buttonContainerStyle={{
                    height: 45,
                    borderRadius: SIZES.radius,
                    marginTop: SIZES.padding,
                  }}
                  onPress={() => updateItemName()}
                />
              </Card.Content>
            </Card>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderItem = ({item}) => {
    return (
      <View>
        <View
          style={[
            //   styles.item,
            {flexDirection: 'row', justifyContent: 'space-around'},
          ]}>
          <View style={{flex: 0.5, alignItems: 'flex-start'}}>
            <Text style={styles.title}>{item.item_name}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={
                () => {
                  editQuantityItems(item._id);
                  setQtyUpdateModal(true);
                  setQuantityName(item.item_name);
                  setItemId(item._id);
                }
                //   item._id,
                //   item.item_id,
                //   item.qty,
                //   item.location,
                //   item.vehicle_no,
              }>
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
            //  onPress={() => voucherDelete(item._id)}
            >
              <Image
                source={icons.delete_icon}
                style={{
                  width: 18,
                  height: 18,
                  right: 5,
                  tintColor: COLORS.red,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={{flex: 1}}>
        <HeaderBar right={true} title="Edit Quantity Items" />
        <FlatList
          maxHeight={500}
          contentContainerStyle={{marginTop: SIZES.radius}}
          scrollEnabled={true}
          data={quantityItems}
          keyExtractor={item => `${item._id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={true}
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
      {updateQtyItemModal()}
    </>
  );
};

export default EditQuantityItems;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 5,
  },
  card2: {
    borderWidth: 1,
    marginTop: 20,
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 5,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  // iconStyle: {
  //   width: 20,
  //   height: 20,
  // },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: COLORS.gray2,
    color: 'black',
    marginTop: 20,
  },
  dropdowns: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
});
