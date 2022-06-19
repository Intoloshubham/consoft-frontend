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
 
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {FormInput, HeaderBar, TextButton} from '../../../Components';
import {SIZES, COLORS, icons, images, FONTS} from '../../../constants';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox } from 'react-native-paper';

const data = [
  { label: 'Good', value: '1' },
  { label: 'Best', value: '2' },
  { label: 'Excellent', value: '3' }
];

const CheckList = () => {
  const [list, setlist] = useState(false);
  const [updatelist, setupdatelist] = useState(false);
  const [modallist, setmodallist] = useState(false);

  const [createlist, setcreatelist] = useState();
  const [showdata, setshowdata] = useState([]);

  const [inputs, setInputs] = useState([{key: '', value: ''}]);

  const [checklistId, setchecklistId] = useState('');
  const [checked, setChecked] = React.useState(false);
  const [one, setone] = React.useState(false);
  const [two, settwo] = React.useState(false);
  const [demo, setdemo] = React.useState(false);
  const [work, setwork] = React.useState(false);

 
  const [value, setValue] = React.useState('');
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

  // create list funcation api save
  const createSave = () => {
    const data = {
      title: createlist,
      check_items: inputs,
    };
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
        // setInputs();
        checklistItem();
        console.log('Success:', data);
        {
          createlist === ' ' || inputs === ' '
            ? alert('plz fill unitname')
            : data.message == 'The Title already exists'
            ? alert('This list is already exist')
            : alert(' createlist  ');
        }
        setlist(false)
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
      // console.log(datalist);
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
  const update = (id, name, items) => {
    setupdatelist(true);
    setchecklistId(id);
    setcreatelist(name);
    // console.log(name);
    setInputs(items);
    //  console.log(items);
  };

  const updatechecklistdata = () => {
    const objdata = {
      title: createlist,
      check_items: inputs,
    };
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
        // setInputs('');
        console.log('Success:', data, alert(' update'));
        createlist === ' ' || inputs === ' ';
      });
      setupdatelist(false);
  };

  const createlistshowdata = (element, index) => {
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
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  ...FONTS.h2,
                  textTransform: 'capitalize',
                  color: COLORS.black,
                }}>
                {element.title}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    update(element._id, element.title, element.check_items)
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
              {element.check_items.map((ele, index) => {
                return (
                  <View key={index}>
                    <Text
                      style={{
                        ...FONTS.body3,
                        color: COLORS.darkGray,
                        textTransform: 'capitalize',
                        marginTop: SIZES.base,
                      }}>
                      {ele.value}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </Card.Content>
        </Card>
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

  return (
    <View>
      <HeaderBar right={true} title="Project Checklist"/>
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
                {/* <Card style={{borderWidth: 1, marginTop: 5}}>
                  <Card.Content> */}
                    <View style={styles.container}>
                      <ScrollView style={styles.inputsContainer}>
                        {inputs.map((input, key) => (
                          <View
                            style={{
                              justifyContent: 'space-between',
                              width:"90%"
                            }}
                            key={key}>
                            {/* <TextInput
                              style={styles.inputcheck}
                              placeholder={'Enter Name'}
                              value={input.value}
                              onChangeText={setInputs =>
                                inputHandler(setInputs, key)
                              }
                            /> */}
                            <FormInput
                              label="List"
                              value={input.value}
                              onChange={inputs => {
                                setInputs(inputs);
                                inputHandler(inputs, key);
                              }}
                            />
                            <TouchableOpacity
                              onPress={() => deleteHandler(key)}>
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

                      {/* <Button title="add" onPress={addHandler} /> */}
                    </View>
                  {/* </Card.Content>
                </Card> */}
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
                {/* </Card.Content>
                </Card> */}
              </View>
            </View>
          </Modal>
        </View>
        <View style={{flexDirection: 'row',justifyContent:"flex-end", marginTop: 2}}>
          <TouchableOpacity onPress={()=>{setmodallist(true)}} style={styles.button}>
            <Title style={{color:"white"}}>checklist</Title>
          </TouchableOpacity>
          <Modal visible={modallist} transparent={false} animationType="fade">
            <View style={{flex:1,backgroundColor:"#000000aa"}}>
              <View style={{backgroundColor:"#fff",marginTop:50,padding:20,flex:1,borderTopRightRadius:20,borderTopLeftRadius:20}}>
              <View style={{flexDirection:"row",justifyContent:"space-between",flexDirection:"row-reverse",borderBottomWidth:1}}>
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
                <Card style={{borderWidth:2,marginTop:10,borderRadius:10}}>
                  <Card.Content>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                 
                <Checkbox
                      status={checked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setChecked(!checked);
                      }}
                    />
                  <Text>Can you help translate this site into a foreign </Text>
                 </View>
                 <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                 <Checkbox
                      status={one ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setone(!one);
                      }}
                      />
                      <Text style={{fontSize:15}}>Good</Text>
                     <Checkbox
                      status={two ? 'checked' : 'unchecked'}
                      onPress={() => {
                        settwo(!two);
                      }}
                    />
                     <Text style={{fontSize:15}}>Best</Text>
                     <Checkbox
                      status={demo ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setdemo(!demo);
                      }}
                    />
                     <Text style={{fontSize:15}}>Excellent</Text>   
                </View>
                </Card.Content></Card>
                <Card style={{borderWidth:2,marginTop:10,borderRadius:10}}>
                  <Card.Content>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                 
                <Checkbox
                      status={checked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setChecked(!checked);
                      }}
                    />
                  <Text>Can you help translate this site into a foreign </Text>
                 </View>
                 <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                 <Checkbox
                      status={one ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setone(!one);
                      }}
                      />
                      <Text style={{fontSize:15}}>Good</Text>
                     <Checkbox
                      status={two ? 'checked' : 'unchecked'}
                      onPress={() => {
                        settwo(!two);
                      }}
                    />
                     <Text style={{fontSize:15}}>Best</Text>
                     <Checkbox
                      status={demo ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setdemo(!demo);
                      }}
                    />
                     <Text style={{fontSize:15}}>Excellent</Text>   
                </View>
                </Card.Content></Card>
                <Card style={{borderWidth:2,marginTop:10,borderRadius:10}}>
                  <Card.Content>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                 
                <Checkbox
                      status={checked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setChecked(!checked);
                      }}
                    />
                  <Text>Can you help translate this site into a foreign </Text>
                 </View>
                 <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                 <Checkbox
                      status={one ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setone(!one);
                      }}
                      />
                      <Text style={{fontSize:15}}>Good</Text>
                     <Checkbox
                      status={two ? 'checked' : 'unchecked'}
                      onPress={() => {
                        settwo(!two);
                      }}
                    />
                     <Text style={{fontSize:15}}>Best</Text>
                     <Checkbox
                      status={demo ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setdemo(!demo);
                      }}
                    />
                     <Text style={{fontSize:15}}>Excellent</Text>   
                </View>
                </Card.Content></Card>
                <View style={{flexDirection:"row",justifyContent:"center",marginTop:10}}><Button title='save'  /></View>
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
                  {/* <Text>Title</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setcreatelist}
                    value={createlist}
                  /> */}
                  <FormInput
                    label="Title"
                    onChange={createlist => {
                      setcreatelist(createlist);
                    }}
                    value={createlist}
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
                {/* </Card.Content>
                </Card> */}
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
    maxHeight: 200,
  },
  sa: {
    maxHeight: 100,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 15,
    height:35,
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
