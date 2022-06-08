import React, {useEffect, useState} from 'react';
<<<<<<< HEAD
import {StyleSheet, Text, View, Button, Modal, Pressable} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
=======

>>>>>>> 743e1aa2fffd371b276ad3b8b9873afdfa36b0a1
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  Pressable,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
<<<<<<< HEAD
=======

>>>>>>> 743e1aa2fffd371b276ad3b8b9873afdfa36b0a1
import {Card, Title} from 'react-native-paper';
import {
  FormInput,
  CustomDropdown,
  TextButton,
  HeaderBar,
} from '../../../../Components';
<<<<<<< HEAD
import {COLORS, FONTS, SIZES} from '../../../../constants';
=======

>>>>>>> 743e1aa2fffd371b276ad3b8b9873afdfa36b0a1
import {FONTS, SIZES, COLORS, Image, icons} from '../../../../constants';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const url = 'http://192.168.1.99:8000/api/stock-entry';

const ManageStock = () => {
  const [modalstock, setmodalstock] = useState(false);
  // fix unit state
  const [unitname, setunitname] = useState('');

  const [unitmodal, setunitmodal] = React.useState(false);
  const [itemname, setItemname] = React.useState('');
  const [valueunit, setValueunit] = React.useState(null);
  const [isFocusunit, setIsFocusunit] = React.useState(false);

  // const [stockname, setstockname] = useState(null);

  const [data, setdata] = useState([]);
  const [dataunit, setdataunit] = useState([]);

  const [qty, setqty] = useState('');
  const [location, setlocation] = useState('');
  const [vehicle, setvehicle] = useState('');

  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);

  const [datalist, setdatalist] = React.useState([]);

  // console.log(itemname,qty,place,vehicle);

  const itemData = async () => {
    try {
      const resp = await fetch('http://192.168.1.99:8000/api/item');
      const data = await resp.json();
<<<<<<< HEAD
      console.log(data);
      //  console.log(data);
=======


      //  console.log(data);

>>>>>>> 743e1aa2fffd371b276ad3b8b9873afdfa36b0a1
      setdata(data);
    } catch (error) {
      console.log(error);
    }
  };

  const listData = async () => {
    const resp = await fetch('http://192.168.1.99:8000/api/item');
    const data = await resp.json();
    //  console.log(data);
    setdatalist(data);
  };

  useEffect(() => {
    itemData();
  }, []);

  // post stock item
  const saveStock = e => {
    // console.log(value, qty, location, vehicle);
    const data = {
      item_id: value,
      qty: qty,
      location: location,
      vehicle_no: vehicle,
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        setValue(' ');
        setqty(' ');
        setlocation(' ');
        setvehicle(' ');

        // fetchData();
        console.log('Success:', data);
        {
          value == '' || qty == '' || location == '' || vehicle == ''
            ? alert('all field fill ')
            : alert(' stock item Created Succcessfully');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  ////

  ////

  const addstockitem = e => {
    //  alert("add item")
    const data = {
      item_name: itemname,
      unit_id: valueunit,
    };
    fetch('http://192.168.1.99:8000/api/item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        setItemname('');
        setValueunit('');
        setdataunit(dataunit);
        listData();
        console.log('Success:', data);
        {
          itemname == '' || valueunit == ''
            ? alert('all filed fill ')
            : data.message == 'This item is already exist'
            ? alert('This item is already exist')
            : alert('item  successfull create ');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const fetchData = async () => {
    const resp = await fetch('http://192.168.1.99:8000/api/unit');
    const dataunit = await resp.json();
    // console.log(dataunit);
    setdataunit(dataunit);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    listData();
  }, []);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  const renderLabelunit = () => {
    if (valueunit || isFocusunit) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  return (
    <View>
      <HeaderBar right={true} title="Manage Stock" />
<<<<<<< HEAD
      <View
        style={{
          marginHorizontal: SIZES.padding,
          backgroundColor: COLORS.white,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding,
          borderRadius: SIZES.radius,
          justifyContent: 'space-between',
          ...styles.shadow,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Title>Stock entry</Title>
          {/* <Button title="stockentry" onPress={() => setmodalstock(true)} /> */}
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.lightblue_700,
              paddingHorizontal: SIZES.radius,
              paddingVertical: SIZES.base,
              borderRadius: SIZES.radius,
            }}
            onPress={() => setmodalstock(true)}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h3,
              }}>
              Stock Entry
            </Text>
          </TouchableOpacity>
          <Modal animationType="slide" transparent={false} visible={modalstock}>
            <View style={{backgroundColor: '#000000aa', flex: 1}}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  marginTop: 50,
                  padding: 30,
                  borderTopRightRadius: 30,
                  borderTopLeftRadius: 30,
                }}>
                <View>
                  <Pressable onPress={setmodalstock}>
                    <Text
                      style={{
                        alignSelf: 'flex-end',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      X
                    </Text>
                  </Pressable>
                </View>
                <ScrollView>
                  <Card style={styles.card2}>
                    <Card.Content>
                      <CustomDropdown
                        data={data}
                        value={itemname}
                        labelField="label"
                        keyExtractor={item => `${item._id}`}
                        onChange={item => {
                          setItemname(item);
                        }}
                        renderItem={item => {
                          // console.log(item.item_name);
                          return (
                            <View
                              style={{
                                marginHorizontal: SIZES.radius,
                                marginTop: SIZES.base,
                              }}>
                              <Text style={{...FONTS.body4}}>
                                {item.item_name}
                              </Text>

                              {/* {item.unit_id === value && (
                                    <AntDesign
                                      color={COLORS.blue}
                                      name="check"
                                      size={20}
                                    />
                                  )} */}
                            </View>
                          );
                        }}
                      />

                      <FormInput
                        label="Quantity"
                        onChange={qty => {
                          setqty(qty);
                        }}
                      />
                      <FormInput
                        label="Place"
                        onChange={place => {
                          setplace(place);
                        }}
                      />
                      <FormInput
                        label="Vehicleno"
                        onChange={vehicle => {
                          setvehicle(vehicle);
                        }}
                      />
                      <TextButton
                        label="Save"
                        buttonContainerStyle={{
                          height: 45,
                          borderRadius: SIZES.radius,
                          marginTop: SIZES.padding,
                        }}
                        onPress={() => save()}
                      />
                    </Card.Content>
                  </Card>
                </ScrollView>
              </View>
=======

      <View style={{marginHorizontal: SIZES.padding}}>
        <Card style={styles.card}>
          <Card.Content>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Title>Stock entry</Title>
              <Button title="voucher" onPress={() => setmodalstock(true)} />
              <Modal
                animationType="slide"
                transparent={false}
                visible={modalstock}>
                <View style={{backgroundColor: '#000000aa', flex: 1}}>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#fff',
                      marginTop: 50,
                      padding: 30,
                      borderTopRightRadius: 30,
                      borderTopLeftRadius: 30,
                    }}>
                    <View>
                      <Pressable onPress={setmodalstock}>
                        <Text
                          style={{
                            alignSelf: 'flex-end',
                            fontSize: 20,
                            fontWeight: 'bold',
                          }}>
                          X
                        </Text>
                      </Pressable>
                    </View>
                    <ScrollView>
                      <Card style={styles.card2}>
                        <Card.Content>
                          <TouchableOpacity onPress={() => setunitmodal(true)}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                              }}>
                              <Text
                                style={{
                                  ...FONTS.body3,
                                  borderWidth: 1,
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                  fontWeight: 'bold',
                                  borderRadius: 10,
                                }}>
                                add item
                              </Text>
                              <Modal
                                animationType="slide"
                                transparent={false}
                                visible={unitmodal}>
                                <View
                                  style={{
                                    backgroundColor: '#000000aa',
                                    flex: 1,
                                  }}>
                                  <View
                                    style={{
                                      backgroundColor: '#fff',
                                      flex: 1,
                                      marginTop: 40,
                                      padding: 20,
                                      borderRadius: 20,
                                    }}>
                                    <View>
                                      <Pressable onPress={setunitmodal}>
                                        <Text
                                          style={{
                                            alignSelf: 'flex-end',
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                          }}>
                                          X
                                        </Text>
                                      </Pressable>
                                    </View>
                                    <View>
                                      <Card>
                                        <Card.Content>
                                          <Title>Item</Title>
                                        </Card.Content>
                                      </Card>
                                      <View>
                                        <Card style={{borderWidth: 1}}>
                                          <Card.Content>
                                            <FormInput
                                              label="Item name"
                                              onChange={itemname => {
                                                setItemname(itemname);
                                              }}
                                            />
                                            
                                            <Dropdown
                                              style={[
                                                styles.dropdowns,
                                                isFocusunit && {
                                                  borderColor: 'blue',
                                                },
                                              ]}
                                              placeholderStyle={
                                                styles.placeholderStyle
                                              }
                                              selectedTextStyle={
                                                styles.selectedTextStyle
                                              }
                                              inputSearchStyle={
                                                styles.inputSearchStyle
                                              }
                                              iconStyle={styles.iconStyle}
                                              data={dataunit}
                                              search
                                              maxHeight={300}
                                              labelField="unit_name"
                                              valueField="_id"
                                              placeholder={
                                                !isFocus ? 'Select unit' : '...'
                                              }
                                              searchPlaceholder="Search..."
                                              value={valueunit}
                                              onFocus={() =>
                                                setIsFocusunit(true)
                                              }
                                              onBlur={() =>
                                                setIsFocusunit(false)
                                              }
                                              onChange={item => {
                                                console.log(item);
                                                setValueunit(item._id);

                                                setIsFocusunit(false);
                                              }}
                                              // renderLeftIcon={() => (
                                              //   <AntDesign
                                              //     style={styles.icon}
                                              //     color={isFocus ? 'blue' : 'black'}
                                              //     name="Safety"
                                              //     size={20}
                                              //   />
                                              // )}
                                            />
                                            <TextButton
                                              label="AddItem"
                                              buttonContainerStyle={{
                                                height: 45,
                                                borderRadius: SIZES.radius,
                                                marginTop: SIZES.padding,
                                              }}
                                              onPress={() => addstockitem()}
                                            />
                                          </Card.Content>
                                        </Card>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              </Modal>
                            </View>
                          </TouchableOpacity>
                          <Dropdown
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
                            // renderLeftIcon={() => (
                            //   <AntDesign
                            //     style={styles.icon}
                            //     color={isFocus ? 'blue' : 'black'}
                            //     name="Safety"
                            //     size={20}
                            //   />
                            // )}
                          />
                          <View style={{justifyContent: 'space-between'}}>
                            <TextInput
                              style={styles.input}
                              editable={false}
                              selectTextOnFocus={false}
                              placeholder={unitname}
                            />
                            <FormInput
                              label="Quantity"
                              onChange={qty => {
                                setqty(qty);
                              }}
                            />
                          </View>
                          <FormInput
                            label="Supplier/Vendor"
                            onChange={location => {
                              setlocation(location);
                            }}
                          />
                          <FormInput
                            label="Vehicle no"
                            onChange={vehicle => {
                              setvehicle(vehicle);
                            }}
                          />

                          <TextButton
                            label="save"
                            buttonContainerStyle={{
                              height: 45,
                              borderRadius: SIZES.radius,
                              marginTop: SIZES.padding,
                            }}
                            onPress={() => saveStock()}
                          />
                        </Card.Content>
                      </Card>
                    </ScrollView>
                  </View>
                </View>
              </Modal>

>>>>>>> 743e1aa2fffd371b276ad3b8b9873afdfa36b0a1
            </View>
          </Modal>
        </View>
        <View style={{marginHorizontal: SIZES.padding}}>
          <Card style={styles.card}>
            <Card.Content>
              <Modal>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Title>Stock entry</Title>
                  <Button title="voucher" onPress={() => setmodalstock(true)} />
                  <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalstock}>
                    <View style={{backgroundColor: '#000000aa', flex: 1}}>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: '#fff',
                          marginTop: 50,
                          padding: 30,
                          borderTopRightRadius: 30,
                          borderTopLeftRadius: 30,
                        }}>
                        <View>
                          <Pressable onPress={setmodalstock}>
                            <Text
                              style={{
                                alignSelf: 'flex-end',
                                fontSize: 20,
                                fontWeight: 'bold',
                              }}>
                              X
                            </Text>
                          </Pressable>
                        </View>
                        <ScrollView>
                          <Card style={styles.card2}>
                            <Card.Content>
                              <TouchableOpacity
                                onPress={() => setunitmodal(true)}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                  }}>
                                  <Text
                                    style={{
                                      ...FONTS.body3,
                                      borderWidth: 1,
                                      paddingLeft: 10,
                                      paddingRight: 10,
                                      fontWeight: 'bold',
                                      borderRadius: 10,
                                    }}>
                                    add item
                                  </Text>
                                  <Modal
                                    animationType="slide"
                                    transparent={false}
                                    visible={unitmodal}>
                                    <View
                                      style={{
                                        backgroundColor: '#000000aa',
                                        flex: 1,
                                      }}>
                                      <View
                                        style={{
                                          backgroundColor: '#fff',
                                          flex: 1,
                                          marginTop: 40,
                                          padding: 20,
                                          borderRadius: 20,
                                        }}>
                                        <View>
                                          <Pressable onPress={setunitmodal}>
                                            <Text
                                              style={{
                                                alignSelf: 'flex-end',
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                              }}>
                                              X
                                            </Text>
                                          </Pressable>
                                        </View>
                                        <View>
                                          <Card>
                                            <Card.Content>
                                              <Title>Item</Title>
                                            </Card.Content>
                                          </Card>
                                          <View>
                                            <Card style={{borderWidth: 1}}>
                                              <Card.Content>
                                                <FormInput
                                                  label="Item name"
                                                  onChange={itemname => {
                                                    setItemname(itemname);
                                                  }}
                                                />

                                                <Dropdown
                                                  style={[
                                                    styles.dropdowns,
                                                    isFocusunit && {
                                                      borderColor: 'blue',
                                                    },
                                                  ]}
                                                  placeholderStyle={
                                                    styles.placeholderStyle
                                                  }
                                                  selectedTextStyle={
                                                    styles.selectedTextStyle
                                                  }
                                                  inputSearchStyle={
                                                    styles.inputSearchStyle
                                                  }
                                                  iconStyle={styles.iconStyle}
                                                  data={dataunit}
                                                  search
                                                  maxHeight={300}
                                                  labelField="unit_name"
                                                  valueField="_id"
                                                  placeholder={
                                                    !isFocus
                                                      ? 'Select unit'
                                                      : '...'
                                                  }
                                                  searchPlaceholder="Search..."
                                                  value={valueunit}
                                                  onFocus={() =>
                                                    setIsFocusunit(true)
                                                  }
                                                  onBlur={() =>
                                                    setIsFocusunit(false)
                                                  }
                                                  onChange={item => {
                                                    console.log(item);
                                                    setValueunit(item._id);

                                                    setIsFocusunit(false);
                                                  }}
                                                  // renderLeftIcon={() => (
                                                  //   <AntDesign
                                                  //     style={styles.icon}
                                                  //     color={isFocus ? 'blue' : 'black'}
                                                  //     name="Safety"
                                                  //     size={20}
                                                  //   />
                                                  // )}
                                                />
                                                <TextButton
                                                  label="AddItem"
                                                  buttonContainerStyle={{
                                                    height: 45,
                                                    borderRadius: SIZES.radius,
                                                    marginTop: SIZES.padding,
                                                  }}
                                                  onPress={() => addstockitem()}
                                                />
                                              </Card.Content>
                                            </Card>
                                          </View>
                                        </View>
                                      </View>
                                    </View>
                                  </Modal>
                                </View>
                              </TouchableOpacity>
                              <Dropdown
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
                                // renderLeftIcon={() => (
                                //   <AntDesign
                                //     style={styles.icon}
                                //     color={isFocus ? 'blue' : 'black'}
                                //     name="Safety"
                                //     size={20}
                                //   />
                                // )}
                              />
                              <View style={{justifyContent: 'space-between'}}>
                                <TextInput
                                  style={styles.input}
                                  editable={false}
                                  selectTextOnFocus={false}
                                  placeholder={unitname}
                                />
                                <FormInput
                                  label="Quantity"
                                  onChange={qty => {
                                    setqty(qty);
                                  }}
                                />
                              </View>
                              <FormInput
                                label="Supplier/Vendor"
                                onChange={location => {
                                  setlocation(location);
                                }}
                              />
                              <FormInput
                                label="Vehicle no"
                                onChange={vehicle => {
                                  setvehicle(vehicle);
                                }}
                              />

                              <TextButton
                                label="save"
                                buttonContainerStyle={{
                                  height: 45,
                                  borderRadius: SIZES.radius,
                                  marginTop: SIZES.padding,
                                }}
                                onPress={() => saveStock()}
                              />
                            </Card.Content>
                          </Card>
                        </ScrollView>
                      </View>
                    </View>
                  </Modal>
                </View>
              </Modal>
            </Card.Content>
          </Card>
        </View>
      </View>
    </View>
  );
};

export default ManageStock;

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
<<<<<<< HEAD
  card2: {
    borderWidth: 1,
  },
=======

>>>>>>> 743e1aa2fffd371b276ad3b8b9873afdfa36b0a1
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
<<<<<<< HEAD
=======

>>>>>>> 743e1aa2fffd371b276ad3b8b9873afdfa36b0a1
});
