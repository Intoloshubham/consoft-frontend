import React from 'react';

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


      //  console.log(data);

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

      <View style={{marginHorizontal: SIZES.padding}}>
        <Card style={styles.card}>
          <Card.Content>
            <Modal>
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

            </View>
          </Modal>
          </Card.Content>
        </Card>
      </View>
    </View>
  );

};

export default ManageStock;
