import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
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
import Config from '../../../config';

const stockdetails = [
  {id: 1, name: 'Bricks', quantity: 45},
  {id: 2, name: 'Sand', quantity: 88},
  {id: 3, name: 'Iron', quantity: 57},
  {id: 4, name: 'Cement', quantity: 55},
  {id: 5, name: 'Oil', quantity: 95},
];

const StocksAndInventry = () => {
  const [details, setDetails] = React.useState(stockdetails);
  const [showAddMaterialsModal, setShowAddMaterialsModal] =
    React.useState(false);
  // company team states
  const [quantity, setQuantity] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [vehicleNo, setVehicleNo] = React.useState('');

  //drop
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [items, setItems] = React.useState([]);

  //Gey data of stock-entry
  const [stocks, setStocks] = React.useState([]);
  //api
  React.useEffect(() => {
    fetch(`${Config.API_URL}item`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        let itemFromApi = data.map(one => {
          return {label: one.item_name, value: one._id};
        });
        setItems(itemFromApi);
      })
      .catch(error => console.log(error.message));
  }, []);

  React.useEffect(() => {
    fetch(`${Config.API_URL}stock-entry`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setStocks(data);
      })
      .catch(error => console.log(error.message));
  }, []);

  const OnSubmit = () => {
    const FormData = {
      item_id: value,
      qty: quantity,
      location: location,
      vehicle_no: vehicleNo,
    };
    
    fetch(`${Config.API_URL}stock-entry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(FormData),
    })
      .then(response => response.json())
      .then(data => {
    
        if (data.status == 200) {
          setTimeout(() => {
            setShowAddMaterialsModal(false);
          }, 1000);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  function renderTeamList() {
    const renderItem = ({item}) => (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: SIZES.base,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{...FONTS.h3, color: COLORS.darkGray}}>{}</Text>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.darkGray,
              fontWeight: 'bold',
            }}>
            {item.qty}
          </Text>
        </View>
        <View style={{marginLeft: 40, flexDirection: 'row'}}>
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
        <FlatList
          data={stocks}
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
      </View>
    );
  }

  function renderAddMaterialModal() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAddMaterialsModal}>
        <TouchableWithoutFeedback
          onPress={() => setShowAddMaterialsModal(false)}>
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
                    Materials
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
                    onPress={() => setShowAddMaterialsModal(false)}
                  />
                </View>
                <ScrollView>
                  <CustomDropdown
                    placeholder="Select Item"
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
                    label="Quantity"
                    keyboardType="numeric"
                    onChange={value => {
                      setQuantity(value);
                    }}
                    appendComponent={
                      <View style={{justifyContent: 'center'}}>
                        <Image
                          source={
                            quantity == '' || quantity != ''
                              ? icons.correct
                              : icons.cancel
                          }
                          style={{
                            height: 20,
                            width: 20,
                            tintColor:
                              quantity == ''
                                ? COLORS.gray
                                : quantity != ''
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
                      setLocation(value);
                    }}
                    appendComponent={
                      <View style={{justifyContent: 'center'}}>
                        <Image
                          source={
                            location == '' || location != ''
                              ? icons.correct
                              : icons.cancel
                          }
                          style={{
                            height: 20,
                            width: 20,
                            tintColor:
                              location == ''
                                ? COLORS.gray
                                : location != ''
                                ? COLORS.green
                                : COLORS.red,
                          }}
                        />
                      </View>
                    }
                  />
                  <FormInput
                    label="Vehicle No"
                    keyboardType="default"
                    onChange={value => {
                      setVehicleNo(value);
                    }}
                    appendComponent={
                      <View style={{justifyContent: 'center'}}>
                        <Image
                          source={
                            vehicleNo == '' || vehicleNo != ''
                              ? icons.correct
                              : icons.cancel
                          }
                          style={{
                            height: 20,
                            width: 20,
                            tintColor:
                              vehicleNo == ''
                                ? COLORS.gray
                                : vehicleNo != ''
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
                    onPress={OnSubmit}
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
      <HeaderBar right={true} title="Stock Inventry" />
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
        onPress={() => setShowAddMaterialsModal(true)}
      />
      {renderTeamList()}
      {renderAddMaterialModal()}
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
export default StocksAndInventry;
