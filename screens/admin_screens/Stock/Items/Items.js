import React, {useEffect} from 'react';
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
import AntDesign from 'react-native-vector-icons/AntDesign';

const url = 'http://192.168.1.99:8000/api/item';

const Items = () => {
  const [itemname, setItemname] = React.useState('');
  // const [itemunit, setItemunit] = React.useState('');

  // modal
  const [itemmodal, setItemmodal] = React.useState(false);
  const [unitmodal, setunitmodal] = React.useState(false);

  const [unitname, setUintname] = React.useState('');
  const [data, setdata] = React.useState([]);

  const [datalist, setdatalist] = React.useState([]);

  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);

  const fetchData = async () => {
    const resp = await fetch('http://192.168.1.99:8000/api/unit');
    const data = await resp.json();
    //  console.log(data);
    setdata(data);
  };

  const listData = async () => {
    const resp = await fetch('http://192.168.1.99:8000/api/item');
    const data = await resp.json();
    //  console.log(data);
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
        setUintname('');
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

//   const itemDelete = async (item_id) =>{
//     var id = item_id;
//    let result = await fetch('http://192.168.1.99:8000/api/item/'+ id,{
//               method:"DELETE"
//    });
//           result = await result.json();
//           console.log(result,alert("this unit delete"));
//           fetchData();
// }

  const renderItem = ({item}) => {
    return (
      <ScrollView>
        <View>
          <View style={styles.item}>
            <Text style={styles.title}>{item.item_name}</Text>
            {/* <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <View style={{marginRight: 5}}>
                <Button title="edit" onPress={() => saw(item._id)} />
              </View>
              <View style={{marginLeft: 10}}>
                <Button title="X" onPress={() => itemDelete(item._id)} />
              </View>
            </View> */}
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
      <HeaderBar right={true} />
      <View style={{marginHorizontal: SIZES.padding}}>
        <Card style={styles.card}>
          <Card.Content>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Title>Stock item</Title>
              <Button title="Add new" onPress={() => setItemmodal(true)} />
              {/* modal start  */}
              <Modal
                animationType="slide"
                transparent={false}
                visible={itemmodal}>
                <View style={{backgroundColor: '#000000aa', flex: 1}}>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      marginTop: 50,
                      padding: 20,
                      borderRadius: 20,
                      flex: 1,
                    }}>
                    <ScrollView>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                          Item
                        </Text>

                        <Modal
                          animationType="slide"
                          transparent={false}
                          visible={unitmodal}>
                          <View style={{backgroundColor: '#000000aa', flex: 1}}>
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
                                    <Title>Unit</Title>
                                  </Card.Content>
                                </Card>
                                <View>
                                  <Card style={{borderWidth: 1}}>
                                    <Card.Content>
                                      <Title>Unit name</Title>
                                      <TextInput
                                        style={styles.input}
                                        onChangeText={setUintname}
                                        value={unitname}
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
                          <Title style={{...FONTS.h3, color: COLORS.darkGray}}>
                            Item name
                          </Title>
                          <TextInput
                            placeholder="item name"
                            style={styles.input}
                            onChangeText={setItemname}
                            value={itemname}
                          />
                          <View
                            style={{
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                            }}>
                            <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                              Units
                            </Text>
                            <TouchableOpacity
                              onPress={() => setunitmodal(true)}>
                              <Text
                                style={{
                                  ...FONTS.body3,
                                  borderWidth: 1,
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                  fontWeight: 'bold',
                                  borderRadius: 10,
                                }}>
                                add unit
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
            </View>
          </Card.Content>
        </Card>
        <View
          style={{
            marginBottom: SIZES.padding,
            marginTop: 5,
            padding: 20,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
            ...styles.shadow,
          }}>
          <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Items</Text>
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
          <Text></Text>
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
  title:{
    fontSize: 18,
   
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    margin: 10,
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
