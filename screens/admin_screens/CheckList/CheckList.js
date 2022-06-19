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
  SectionList,Image
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {FormInput, HeaderBar, TextButton} from '../../../Components';
import {SIZES, COLORS, icons, images, FONTS} from '../../../constants';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';

// const test=(item.check_items)=>{
//   return(

//     {
//       // arr=item.check_items
//       arr.map((elem,index)=>
//          console.log(elem.value);
//       )
//      }
//   )
// }

const renderItem = ({item, index}) => {
  return (
    <ScrollView>
      <View>
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>

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
  const [showdata, setshowdata] = useState([]);

  const [inputs, setInputs] = useState([{key: '', value: ''}]);
  const testref = React.useRef(0);

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
        // setInputs('');
        checklistItem();
        console.log('Success:', data);
        {
          createlist === ' ' || inputs === ' '
            ? alert('plz fill unitname')
            : data.message == 'The Title already exists'
            ? alert('This list is already exist')
            : alert(' createlist  ');
        }
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
      //console.log(datalist);
      // testref.current=datalist
      
      setshowdata(datalist);

    } catch (error) {
      console.log('error', error);
    }
  };

  //console.log(showdata);
  useEffect(() => {
    checklistItem();
  }, []);

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
                  />
                </View>

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
                <Card style={{borderWidth: 1, marginTop: 5}}>
                  <Card.Content>
                    <View style={styles.container}>
                      <ScrollView style={styles.inputsContainer}>
                        {inputs.map((input, key) => (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}
                            key={key}>
                            <TextInput
                              style={styles.inputcheck}
                              placeholder={'Enter Name'}
                              value={input.value}
                              onChangeText={setInputs =>
                                inputHandler(setInputs, key)
                              }
                            />
                            <TouchableOpacity
                              onPress={() => deleteHandler(key)}>
                              <AntDesign
                                style={{marginTop: 15, color: 'red'}}
                                name={'delete'}
                                size={30}
                              />
                            </TouchableOpacity>
                          </View>
                        ))}
                      </ScrollView>

                      {/* <Button title="add" onPress={addHandler} /> */}
                    </View>
                  </Card.Content>
                </Card>
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
          <ScrollView style={{maxHeight:490}}>
            <View>
            {showdata.map((element, index) => {
              return (
                <View key={index}>
                  <Card
                    style={{
                      borderWidth: 2,
                      marginTop: 1,
                      marginBottom: 2,
                      borderRadius: 10,
                      marginTop:10
                    }}>
                    <Card.Content>
                      <View
                        style={{
                          flexDirection: 'row',
                          borderBottomWidth: 1,
                          paddingBottom: 5,
                          justifyContent:"space-between",
                          position:"relative"
                        }}>
                        <Title>{element.title}</Title>
                        <View style={{position:"absolute",marginHorizontal:220}}>
                          {/* <Button title="edit" /> */}
                          <TouchableOpacity>
                            {/* <Image source={}/> */}
                          </TouchableOpacity>
                        </View>
                        <View>
                          <Button  title="X" />
                        </View>
                      </View>
                      <ScrollView style={styles.sa} nestedScrollEnabled={true}>
                        {element.check_items.map((ele,index) => {
                          return (
                            <View key={index} >
                              <Text
                                style={{
                                  padding: 2,
                                  fontSize: 18,
                                  fontWeight: 'bold',
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
            })}
        </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default CheckList;

const styles = StyleSheet.create({
  // item: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingBottom: 10,
  // },
  // title: {
  //   fontSize: 18,
  //   // fontWeight:"bold",
  // },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 15,
    backgroundColor: COLORS.gray2,
    color: 'black',
    marginTop: 10,
  },
  inputcheck: {
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 15,
    backgroundColor: COLORS.gray2,
    color: 'black',
    marginTop: 10,
    width: '90%',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.lightblue_700,
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  inputsContainer: {
    maxHeight: 200,
  },
  sa: {
    maxHeight: 100,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});
