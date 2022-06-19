import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  Pressable,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {FormInput, HeaderBar, TextButton} from '../../../../Components';
import {COLORS, FONTS, SIZES} from '../../../../constants';
import {Dropdown} from 'react-native-element-dropdown';


const url = 'http://192.168.1.99:8000/api/item';

const Items = () => {
  const [itemname, setItemname] = React.useState('');
  // const [itemunit, setItemunit] = React.useState('');

  // modal
  const [itemmodal, setItemmodal] = React.useState(false);
  const [unitmodal, setunitmodal] = React.useState(false);
  const [updateitemmodal, setupdateitemmodal] = useState(false);

  const [unitname, setUnitname] = React.useState('');

  const [data, setdata] = React.useState([]);

  const [datalist, setdatalist] = React.useState([]);

  const [value, setValue] = React.useState('');
  
  const [isFocus, setIsFocus] = React.useState(false);

  const [itemid, setitemid] = React.useState('');

  const fetchData = async () => {
    const resp = await fetch('http://192.168.1.99:8000/api/unit');
    const data = await resp.json();
    //  console.log(data);
    setdata(data);
  };

  const listData = async () => {
    const resp = await fetch('http://192.168.1.99:8000/api/item');
    const data = await resp.json();
    //console.log(data);
    setdatalist(data);
  };

  const submit = e => {
    const data = {
      item_name: itemname,
      unit_id: value,
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
        setItemname('');
        setValue('');
        listData();
        console.log('Success:', data);
        {
          itemname == '' || value == ''
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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    listData();
  }, []);

  // unit create item modal
  function saveUnit(e) {
    const unitdata = {
      unit_name: unitname,
    };
    fetch('http://192.168.1.99:8000/api/unit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(unitdata),
    })
      .then(response => response.json())
      .then(data => {
        setUnitname('');
        fetchData();
        console.log('Success:', data);
        {
          unitname == ''
            ? alert('plz fill unitname')
            : data.message == 'This unit is already exist'
            ? alert('This unit is already exist')
            : alert('unit successfull create ');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const DeleteItem = async item_id => {
    var id = item_id;
    let result = await fetch('http://192.168.1.99:8000/api/item/' + id, {
      method: 'DELETE',
    });
    result = await result.json();
    listData();
    console.log(result, alert('this item  deleted '));
  };

  // edit modal api
    const edititem = (id, name,unit_id)=>{
      setupdateitemmodal(true);
      setitemid(id);
      // console.log(id);
      setItemname(name);
      // console.log(name);
       setValue(unit_id);
      //  console.log(unit_id);
    }

    const updateItem = (e) => {
      const updateItemdata = {
        item_name: itemname,
        unit_id:value
      }
      // 
        fetch('http://192.168.1.99:8000/api/item/'+itemid,{
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateItemdata),
      })
        .then(response =>{ response.json()})
        .then(data => {
          listData();
          setItemname('');
          setValue('');
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
        ///
        // fetch('http://192.168.1.99:8000/api/item/'+itemid, {
        //   method: 'PUT',
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(
        //     // item_name: itemname,
        //     // unit_id: value 
        //     updateItemdata
        //   )
        // }).then(data=>console.log(data))
        ////
        
    
    


  const renderItem = ({item}) => {
    return (
      <ScrollView>
        <View>
          <View style={styles.item}>
            <Text style={styles.title}>{item.item_name}</Text>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <View style={{marginRight: 5}}>
                <Button
                  title="edit"
                  onPress={() => {
                   edititem(item._id,item.item_name,item.unit_id)
                  }}
                />
              </View>
              <View style={{marginLeft: 10}}>
                <Button title="X" onPress={() => DeleteItem(item._id)} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

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
  return (
    <View>
      <HeaderBar right={true} title="Items"/>
      <View style={{marginHorizontal: SIZES.padding}}>
        {/* modal start  */}
        <Modal animationType="slide" transparent={false} visible={itemmodal}>
          <View
            style={{
              backgroundColor: '#000000aa',
              flex: 1,
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 20,
                borderRadius: 20,
                margin: 10,
              }}>
              <ScrollView>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>Item</Text>
                  <Modal
                    animationType="slide"
                    transparent={false}
                    visible={unitmodal}>
                    <View
                      style={{
                        backgroundColor: '#000000aa',
                        flex: 1,
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: '#fff',

                          padding: 20,
                          borderRadius: 20,
                          margin: 10,
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
                              <Title>Unit</Title>
                            </Card.Content>
                          </Card>
                          <View>
                            <Card style={{borderWidth: 1}}>
                              <Card.Content>
                                <FormInput
                                  label="unit name"
                                  onChange={unitname => {
                                    setUnitname(unitname);
                                  }}
                                />

                                <TextButton
                                  label="Save"
                                  buttonContainerStyle={{
                                    height: 45,
                                    borderRadius: SIZES.radius,
                                    marginTop: SIZES.padding,
                                  }}
                                  onPress={() => saveUnit()}
                                />
                              </Card.Content>
                            </Card>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Modal>
                  <Pressable onPress={setItemmodal}>
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

                <Card style={styles.Itemmodal}>
                  <Card.Content>
                    <FormInput
                      label="item name"
                      onChange={itemname => {
                        setItemname(itemname);
                      }}
                    />
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                        Units
                      </Text>
                      <TouchableOpacity onPress={() => setunitmodal(true)}>
                        <Text
                          style={{
                            ...FONTS.body3,
                            borderWidth: 1,
                            paddingLeft: 10,
                            paddingRight: 10,
                            fontWeight: 'bold',
                            borderRadius: 10,
                            marginTop: 10,
                          }}>
                          Add unit
                        </Text>
                      </TouchableOpacity>
                    </View>
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
                      labelField="unit_name"
                      valueField="_id"
                      placeholder={!isFocus ? 'Select unit' : '...'}
                      searchPlaceholder="Search..."
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setValue(item._id);
                        setIsFocus(false);
                      }}/>

                    <TextButton
                      label="Save"
                      buttonContainerStyle={{
                        height: 45,
                        borderRadius: SIZES.radius,
                        marginTop: SIZES.padding,
                      }}
                      onPress={() => submit()}
                    />
                  </Card.Content>
                </Card>
              </ScrollView>
            </View>
          </View>
        </Modal>
        {/* modal end  */}

        <View
          style={{
            marginBottom: SIZES.padding,
            marginTop: 5,
            padding: 20,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
            ...styles.shadow,
          }}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Items</Text>
            <Button title="Add new" onPress={() => setItemmodal(true)} />
          </View>
          <FlatList
            maxHeight={410}
            contentContainerStyle={{marginTop: SIZES.radius}}
            scrollEnabled={true}
            data={datalist}
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
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={updateitemmodal}>
            <View
              style={{
                backgroundColor: '#000000aa',
                flex: 1,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 20,
                  borderRadius: 20,
                  margin: 10,
                }}>
                <ScrollView>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                      Edit item
                    </Text>
                    <Pressable onPress={setupdateitemmodal}>
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

                  <Card style={styles.Itemmodal}>
                    <Card.Content>
                      <FormInput
                        label="item name"
                        value={itemname}
                        onChange={value => {
                          setItemname(value);
                        }}
                      />
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
                        labelField="unit_name"
                        valueField="_id"
                        placeholder={!isFocus ? 'Select unit' : '...'}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          setValue(item._id);
                          setIsFocus(false);
                        }}
                      />

                      <TextButton
                        label="Update"
                        buttonContainerStyle={{
                          height: 45,
                          borderRadius: SIZES.radius,
                          marginTop: SIZES.padding,
                        }}
                        onPress={() => updateItem()}
                      />
                    </Card.Content>
                  </Card>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

export default Items;
const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
  },
  Itemmodal: {
    borderWidth: 1,
    marginTop: 5,
    // backgroundColor:"yellow"
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: COLORS.gray2,
    color: 'black',
    margin: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 15,
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
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
