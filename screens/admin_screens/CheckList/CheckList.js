import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Alert,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {FormInput, HeaderBar, TextButton} from '../../../Components';
import {SIZES, COLORS, icons, images, FONTS} from '../../../constants';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';

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

const renderItem = ({item}) => {
  return (
    <ScrollView>
      <View>
        <View style={styles.item}>
          <Text style={styles.title}>{item.unit_name}</Text>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            {/* <View style={{marginRight:5}}>
              <Button title="edit" onPress={()=>alert(item._id)
                  }/>
              </View>
              <View style={{marginLeft:10}}>
                   <Button title="X" onPress={()=>alert(item._id)}/>
              </View> */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const CheckList = () => {
  const [list, setlist] = useState(false);
  const [createlist, setcreatelist] = useState();
  const [data, setdata] = useState([]);

  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);

  const [fields, setFields] = useState([{value: null}]);

  const [inputs, setInputs] = useState([{key: '', value: ''}]);

  const addHandler = () => {
    const _inputs = [...inputs];
    _inputs.push({key: '', value: ''});
    setInputs(_inputs);
  };

  const deleteHandler = key => {
    const _inputs = inputs.filter((input, index) => index != key);
    setInputs(_inputs);
  };

  const inputHandler = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].value = text;
    _inputs[key].key = key;
    setInputs(_inputs);
  };

  

  // create list funcation
  const createList = () => {
    console.log(value, createlist);
  };

  const showroll = async () => {
    const resp = await fetch('http://192.168.1.99:8000/api/role');
    const data = await resp.json();
    //  console.log(data);
    setdata(data);
  };

  useEffect(() => {
    showroll();
  }, []);

  return (
    <View>
      <HeaderBar right={true} title="Project Checklist" />
      <View style={{marginHorizontal: SIZES.padding}}>
        <Modal visible={list} animationType="slide" transparent={false}>
          <View style={{flex: 1, backgroundColor: '#000000aa'}}>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 30,
                borderRadius: 20,
                margin: 10,
              }}>
              <View>
                <Pressable onPress={setlist}>
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
                {/* <Card style={styles.card}>
                  <Card.Content> */}
                <Dropdown
                  style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="user_role"
                  valueField="_id"
                  placeholder={!isFocus ? 'Select name' : '...'}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    // console.log(item.unit_id);
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
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <Text>Name</Text>
                    <TouchableOpacity onPress={addHandler}>
                      <Text
                        style={{
                          ...FONTS.body3,
                          borderWidth: 1,
                          paddingLeft: 10,
                          paddingRight: 10,
                          fontWeight: 'bold',
                          borderRadius: 5,
                        }}>
                        Add More
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* <TextInput
                    style={styles.input}
                    onChangeText={setcreatelist}
                    value={createlist}
                  /> */}
                </View>
                <View style={styles.container}>
                  <ScrollView style={styles.inputsContainer}>
                    {inputs.map((input, key) => (
                      <View style={{flexDirection:"row",justifyContent:"space-between",}}>
                        <TextInput
                          style={styles.inputcheck}
                          // placeholder={'Enter Name'}
                          value={input.value}
                          onChangeText={text => inputHandler(text, key)}
                        />
                          <TouchableOpacity onPress={() => deleteHandler(key)}>
                            <AntDesign style={{marginTop:15,color:"red"}} name={'delete'} size={30}/>
                            {/* <Text
                              style={{
                                ...FONTS.body3,
                                borderWidth: 1,
                                paddingLeft: 10,
                                paddingRight: 10,
                                fontWeight: 'bold',
                                borderRadius: 5,
                                padding:11,
                               marginTop:10
                              }}>
                              Delete
                            </Text> */}
                          </TouchableOpacity>
                       
                      </View>
                    ))}
                  </ScrollView>

                  {/* <Button title="add" onPress={addHandler} /> */}
                </View>
                <TextButton
                  label="Create"
                  buttonContainerStyle={{
                    height: 45,
                    borderRadius: SIZES.radius,
                    marginTop: SIZES.padding,
                  }}
                  onPress={() => {
                    createList();
                  }}
                />
                {/* </Card.Content>
                </Card> */}
              </View>
            </View>
          </View>
        </Modal>
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
            <Text style={{...FONTS.h2, color: COLORS.darkGray}}>
              Check list
            </Text>
            <Button
              title="create"
              onPress={() => {
                setlist(true);
              }}
            />
          </View>
          <FlatList
            maxHeight={10}
            contentContainerStyle={{marginTop: SIZES.radius}}
            scrollEnabled={true}
            data={data}
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
        {/* <ScrollView  horizontal={true}> */}
        <View style={{justifyContent:"space-around",flexDirection:"row"}}> 
          <View>
            <TouchableOpacity style={styles.button}>
              <Title>Manager</Title>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.button}>
              <Title>Teamleader</Title>
            </TouchableOpacity>
          </View>
        </View>
      {/* </ScrollView> */}
      </View>
    </View>
  );
};
export default CheckList;

const styles = StyleSheet.create({
  // card: {
  //   borderWidth: 2,
  //   elevation: 20,
  //   borderRadius: 5,
  //   marginTop: 10,
  // },
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
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    // fontWeight:"bold",
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 15,
    backgroundColor: COLORS.gray2,
    color: 'black',
    marginTop: 10,
  },
  inputcheck:{
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 15,
    backgroundColor: COLORS.gray2,
    color: 'black',
    marginTop: 10,
    width:"90%",
    justifyContent:"space-between"
  }
  // container: {
  //   flex: 1,
  //   padding: 20,
  //   backgroundColor: 'gray'
  // },
  // inputsContainer: {
  //   marginBottom: 20,
  //   width:"80%"
  // },
  // inputContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   borderBottomWidth: 1,
  //   borderBottomColor: "black",

  // }
});
