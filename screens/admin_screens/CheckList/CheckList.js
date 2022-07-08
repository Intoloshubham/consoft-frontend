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
  TextInput,
  Image,
  LogBox,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {
  FormInput,
  HeaderBar,
  TextButton,
  Drop,
  FloatingButton,
} from '../../../Components';
import {SIZES, COLORS, icons, images, FONTS} from '../../../constants';
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Checkbox} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {loadOptions} from '@babel/core';

const CheckList = () => {
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  });

  const [addmodal, setaddmodal] = React.useState(false);

  // const [value, setValue] = React.useState([]);
  // const [items, setItems] = React.useState([]);

  const [list, setlist] = useState(false);
  const [updatelist, setupdatelist] = useState(false);
  const [modallist, setmodallist] = useState(false);

  const [createlist, setcreatelist] = useState();
  const [showdata, setshowdata] = useState([]);

  const [inputs, setInputs] = useState([{key: '', value: ''}]);
  const [inputs1, setInputs1] = useState([{key: '', value: ''}]);

  const [inputslist, setInputslist] = useState([]);

  const [checklistId, setchecklistId] = useState('');
  const [checked, setChecked] = React.useState(false);
  const [one, setone] = React.useState(false);
  const [two, settwo] = React.useState(false);
  const [demo, setdemo] = React.useState(false);
  const [work, setwork] = React.useState(false);

  //drop
  const [data, setdata] = useState([]);
  const [value, setvalue] = useState(null);
  const [isFocus, setIsFocus] = React.useState(false);

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
  // const _selectdropdownhandler = (txt, index) => {
  //   // console.log(txt);
  //   const _select = [...drop];
  //   // console.log("inti _select "+_select);
  //   _select[index].value = txt.option_type;
  //   _select[index].key = index;
  //   setdrop(_select);
  //   // console.log(value);
  // };

  // create list funcation api save
  const createSave = () => {
    const data = {
      checklist_name: createlist,
      checklist_item: inputslist,
      checklist_option_type_id: value,
    };
    // console.log(data);
    fetch('http://192.168.1.99:8000/api/checklists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        setcreatelist('');
        setInputslist('');
        setvalue('');
        checklistItem();
        console.log('Success:', data, alert('createlist'));
        // {
        //   createlist === ' ' || inputs === ' ' || drop === ' '
        //     ? alert('plz fill textbox')
        //     : data.message == 'The Title already exists'
        //     ? alert('This list is already exist')
        //     : alert(' createlist  ');
        // }
        setlist(false);
      })

      .catch(error => {
        console.error('Error:', error);
      });
  };

  // fatch  checklist data unig fatch api

  const checklistItem = async () => {
    try {
      const resp = await fetch('http://192.168.1.99:8000/api/checklists');
      const datalist = await resp.json();
      //  console.log(datalist);
      setshowdata(datalist);
    } catch (error) {
      console.log('error', error);
    }
  };

  //console.log(showdata);
  useEffect(() => {
    checklistItem();
  }, []);

  const deleteChecklist = async id => {
    try {
      let result = await fetch(
        'http://192.168.1.99:8000/api/checklists/' + id,
        {
          method: 'DELETE',
        },
      );
      result = await result.json();
      checklistItem();
      console.log(result, alert('deleted'));
    } catch (error) {
      console.log('error', error.message);
    }
  };

  // useEffect(() => {
  //   deleteChecklist();
  // },[])
  // update createlist
  const update = (id, name, item,option_id) => {
    setupdatelist(true);
    setchecklistId(id);
    // console.log(id);
    setcreatelist(name);
    setvalue(option_id.map((option)=>{
      return (
        (option.option_type)
      )}))
     setInputs(item.map(ele => {
      return(ele.checklist_item)}));
     };
    // console.log(value);
    // let obj_data = {...inputs};
    // setInputs1(obj_data);

    // const list_text_array1 = [{...inputs}];
    // useEffect(() => {
    //   inputs.map(ele => {
    //     list_text_array.push(ele.value);
    //     // console.log("inner  "+list_text_array);
    //     setInputs1(list_text_array1);
    //   });
    // }, [inputs]);

    // console.log(inputs1);

    // console.log(inputslist);
      
      // //  console.log(inputs); 
      //  const inparr=inputs.map((ele)=>{
      //   console.log(ele)
      //   })
        
      // console.log(inparr)

  const updatechecklistdata = () => {
    const objdata = {
      checklist_name: createlist,
      checklist_item: inputslist,
      checklist_option_type_id: value
    };
    // console.log(objdata);
    fetch('http://192.168.1.99:8000/api/checklists/' + checklistId, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objdata),
    })
      .then(response => response.json())
      .then(data => {
        checklistItem();
        setcreatelist('');
        console.log('Success:', data, alert(' update'));
        createlist === ' ';
      });
    setupdatelist(false);
  };

  const createlistshowdata = (element, index) => {
    //  console.log(element);
    return (
      <View key={index}>
        <Card
          style={{
            borderWidth: 2,
            marginTop: 1,
            marginBottom: 2,
            borderRadius: 10,
            marginTop: 10,
          }}>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                borderBottomWidth: 0.8,
                borderBottomColor: COLORS.gray,
                paddingBottom: SIZES.radius,
                // alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  ...FONTS.h2,
                  textTransform: 'capitalize',
                  color: COLORS.black,
                }}>
                {element.checklist_name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => addmodalsave(element.checklist_name)}>
                  <Ionicons
                    name={'add-circle'}
                    size={25}
                    color={'gray'}
                    style={{
                      // height: 20,
                      // width: 20,
                      // tintColor: COLORS.lightblue_800,
                      right: 20,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    update(element._id, element.checklist_name, element.list,element.list)
                  }>
                  <Image
                    source={icons.edit}
                    style={{
                      height: 20,
                      width: 20,
                      tintColor: COLORS.lightblue_800,
                      right: 10,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteChecklist(element._id)}>
                  <Image
                    source={icons.delete_icon}
                    style={{
                      height: 20,
                      width: 20,
                      tintColor: COLORS.red,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView style={styles.sa} nestedScrollEnabled={true}>
              {/* {console.log(element.list)} */}
              {element.list !== undefined
                ? element.list.map((ele, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          ...FONTS.body3,
                          color: COLORS.darkGray,
                          textTransform: 'capitalize',
                          marginTop: SIZES.base,
                          flexDirection: 'row',
                           justifyContent: 'space-between',
                          //  alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            ...FONTS.body3,
                            color: COLORS.darkGray,
                            textTransform: 'capitalize',
                            // marginTop: SIZES.base,
                          }}>
                          {ele.checklist_item}
                          
                        </Text>
                        <Text>{ele.option_type}</Text>
                      </View>
                    );
                  })
                : null}
            </ScrollView>
          </Card.Content>
        </Card>
        {/* </TouchableOpacity> */}
      </View>
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

  const check = async () => {
    try {
      const resp = await fetch(
        'http://192.168.1.99:8000/api/checklist-option-type',
      );
      let dataitem = await resp.json();
      setdata(dataitem);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    check();
  }, []);

  const list_text_array = [];
  useEffect(() => {
    inputs.map(ele => {
      list_text_array.push(ele.value);
      // console.log("inner  "+list_text_array);
      setInputslist(list_text_array);
    });
  }, [inputs]);
  // console.log("outer loop "+inputslist);
  // console.log(typeof(inputslist));

  const addmodalsave = name => {
    setaddmodal(true);
    setcreatelist(name);
    // console.log(name);
  };

  function edit(e, input) {
    input.value;
    // console.log(input.value);
  }

  // console.log(data)
  return (
    <View>
      <HeaderBar right={true} title="Project Checklist" />
      <View style={{marginHorizontal: SIZES.padding}}>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setlist(true);
            }}>
            <Title style={{color: 'white'}}>Create list</Title>
          </TouchableOpacity>
          <Modal visible={list} animationType="slide" transparent={false}>
            <View style={{flex: 1, backgroundColor: '#000000aa'}}>
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 20,
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
                  <FormInput
                    label="Title"
                    onChange={createlist => {
                      setcreatelist(createlist);
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: 10,
                  }}>
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
                <View>
                  <ScrollView style={styles.inputsContainer}>
                    {inputs.map((input, key) => (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                        }}
                        key={key}>
                        <FormInput
                          containerStyle={{width: '90%'}}
                          label="List"
                          value={input.value}
                          onChange={inputs => {
                            setInputs(inputs);
                            inputHandler(inputs, key);
                          }}
                        />

                        <View>
                          <TouchableOpacity onPress={() => deleteHandler(key)}>
                            <Image
                              source={icons.delete_icon}
                              style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.red,
                                marginTop: 30,
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}

                    <View>
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
                        labelField="option_type"
                        valueField="_id"
                        placeholder={!isFocus ? 'Select' : '...'}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          setvalue(item._id);
                          setIsFocus(false);
                        }}
                      />
                    </View>
                  </ScrollView>
                </View>

                <View>
                  <TextButton
                    label="Create"
                    buttonContainerStyle={{
                      height: 45,
                      borderRadius: SIZES.radius,
                      marginTop: SIZES.padding,
                    }}
                    onPress={() => {
                      createSave();
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 2,
          }}>
          <TouchableOpacity
            onPress={() => {
              setmodallist(true);
            }}
            style={styles.button}>
            <Title style={{color: 'white'}}>checklist</Title>
          </TouchableOpacity>
          <Modal visible={modallist} transparent={false} animationType="fade">
            <View style={{flex: 1, backgroundColor: '#000000aa'}}>
              <View
                style={{
                  backgroundColor: '#fff',
                  marginTop: 50,
                  padding: 20,
                  flex: 1,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexDirection: 'row-reverse',
                    borderBottomWidth: 1,
                  }}>
                  <Pressable onPress={setmodallist}>
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                      }}>
                      X
                    </Text>
                  </Pressable>
                  <Title>Username CheckList</Title>
                </View>

                {showdata !== undefined
                  ? showdata.map((element, index) => {
                      return (
                        <View key={index}>
                          <Card
                            style={{
                              borderWidth: 3,
                              marginTop: 10,
                              borderRadius: 10,
                            }}>
                            <Card.Content>
                              <View style={{flexDirection: 'row'}}>
                                <Text
                                  style={{fontSize: 15, fontWeight: 'bold'}}>
                                  1
                                </Text>
                                <Checkbox
                                  status={checked ? 'checked' : 'unchecked'}
                                  onPress={() => {
                                    setChecked(!checked);
                                  }}
                                />
                                <Text
                                  style={{
                                    ...FONTS.body3,
                                    color: COLORS.darkGray,
                                    textTransform: 'capitalize',
                                    marginTop: SIZES.base,
                                  }}>
                                  {element.checklist_name}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Checkbox
                                  status={one ? 'checked' : 'unchecked'}
                                  onPress={() => {
                                    setone(!one);
                                  }}
                                />
                                <Text style={{fontSize: 15}}>Good</Text>
                                <Checkbox
                                  status={two ? 'checked' : 'unchecked'}
                                  onPress={() => {
                                    settwo(!two);
                                  }}
                                />
                                <Text style={{fontSize: 15}}>Best</Text>
                                <Checkbox
                                  status={demo ? 'checked' : 'unchecked'}
                                  onPress={() => {
                                    setdemo(!demo);
                                  }}
                                />
                                <Text style={{fontSize: 15}}>Excellent</Text>
                              </View>
                            </Card.Content>
                          </Card>
                        </View>
                      );
                    })
                  : null}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}>
                  <Button title="save" />
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <ScrollView style={{maxHeight: 490}}>
          <View>
            {showdata !== undefined
              ? showdata.map((element, index) => {
                  return createlistshowdata(element, index);
                })
              : null}
          </View>
        </ScrollView>
        <View>
          <Modal visible={updatelist} animationType="slide" transparent={false}>
            <View style={{flex: 1, backgroundColor: '#000000aa'}}>
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 30,
                  borderRadius: 20,
                  margin: 10,
                  flex:1
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Title>Edit</Title>
                  <Pressable onPress={setupdatelist}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      X
                    </Text>
                  </Pressable>
                </View>
                <View>
                  <FormInput
                    label="Title"
                    onChange={createlist => {
                      setcreatelist(createlist);
                    }}
                    value={createlist}
                    />
                    {/* {console.log(createlist)} */}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: 10,
                  }}>
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

                <View>
                  <ScrollView style={styles.inputsContainer}>
                    {inputs.map((input, key) => (
                      <View
                        style={{
                          justifyContent: 'space-between',
                          width: '90%',
                        }}
                        key={key}>
                        {/* <TextInput
                          style={styles.input}
                          placeholder={'Enter Name'}
                          value={inputslist}
                          onChangeText={inputslist =>{
                            setInputslist(inputslist)
                            inputHandler(setInputs, key)
                          }}
                        /> */}

                        <FormInput
                          label="name"
                           value={input.value}
                          onChange={inputs => {
                            setInputs(inputs);
                             inputHandler(inputs, key);
                          }}
                         
                        />
                        <TouchableOpacity onPress={() => deleteHandler(key)}>
                          <Image
                            source={icons.delete_icon}
                            style={{
                              height: 20,
                              width: 20,
                              tintColor: COLORS.red,
                              right: 10,
                              marginHorizontal: 300,
                              marginVertical: -35,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                    <View>
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
                        labelField="option_type"
                        valueField="_id"
                        placeholder={!isFocus ? 'Select' : '...'}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          setvalue(item._id);
                          setIsFocus(false);
                        }}
                      />
                    </View>
                  </ScrollView>
                </View>
                <TextButton
                  label="Update"
                  buttonContainerStyle={{
                    height: 45,
                    borderRadius: SIZES.radius,
                    marginTop: SIZES.padding,
                  }}
                  onPress={() => {
                    updatechecklistdata();
                  }}
                />
              </View>
            </View>
          </Modal>
        </View>
        {/* modal addmore  */}
        <View>
          <Modal visible={addmodal} animationType="slide" transparent={false}>
            <View style={{flex: 1, backgroundColor: '#000000aa'}}>
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 30,
                  borderRadius: 20,
                  margin: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Title></Title>
                  <Pressable onPress={setaddmodal}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      X
                    </Text>
                  </Pressable>
                </View>
                <View>
                  <FormInput
                    placeholder={createlist}
                    editable={false}
                    selectTextOnFocus={false}
                    label="Title"
                    onChange={createlist => {
                      setcreatelist(createlist);
                    }}
                    // value={createlist}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: 10,
                  }}>
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

                <View>
                  <ScrollView style={styles.inputsContainer}>
                    {inputs.map((input, key) => (
                      <View
                        style={{
                          justifyContent: 'space-between',
                          width: '90%',
                        }}
                        key={key}>
                        {/* <TextInput
                              style={styles.inputcheck}
                              placeholder={'Enter Name'}
                              value={input.value.value}
                              onChangeText={setInputs =>
                                inputHandler(setInputs, key)
                              }
                              
                            /> */}
                        <FormInput
                          label="name"
                          value={input.value}
                          onChange={inputs => {
                            setInputs(inputs);
                            inputHandler(inputs, key);
                          }}
                        />
                        <TouchableOpacity onPress={() => deleteHandler(key)}>
                          <Image
                            source={icons.delete_icon}
                            style={{
                              height: 20,
                              width: 20,
                              tintColor: COLORS.red,
                              right: 10,
                              marginHorizontal: 300,
                              marginVertical: -35,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                </View>
                <View>
                  <Dropdown
                    style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data} 
                    labelField="option_type"
                    valueField="_id"
                    placeholder={!isFocus ? 'Select' : '...'}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setvalue(item._id);
                      setIsFocus(false);
                      // setValue([{_id:txt._id,option_type:txt.option_type}]);
                      // _selectdropdownhandler(txt, index);
                      // console.log("setvalue    "+value.option_type);
                      // addbox(key,value);
                    }}
                  />
                </View>
                <View>
                  <TextButton
                    label="save"
                    buttonContainerStyle={{
                      height: 45,
                      borderRadius: SIZES.radius,
                      marginTop: SIZES.padding,
                    }}
                    onPress={() => {
                      save();
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};
export default CheckList;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.lightblue_700,
    padding: 5,
    borderRadius: 10,
  },
  inputsContainer: {
    maxHeight: 300,
  },
  sa: {
    maxHeight: 100,
  },
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: COLORS.gray2,
    color: 'black',
  },
});
