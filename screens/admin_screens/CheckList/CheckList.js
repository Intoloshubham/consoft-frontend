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
  SectionList,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {FormInput, HeaderBar, TextButton} from '../../../Components';
import {SIZES, COLORS, icons, images, FONTS} from '../../../constants';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';

// const renderLabel = () => {
//   if (value || isFocus) {
//     return (
//       <Text style={[styles.label, isFocus && {color: 'blue'}]}>
//         Dropdown label
//       </Text>
//     );
//   }
//   return null;
// };



// const renderItem = ({item}) => {
//   return (
//     <ScrollView>
//       <View>
//         <View style={styles.item}>
//           <Text style={styles.title}>{item.unit_name}</Text>
//           <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
//             {/* <View style={{marginRight:5}}>
//               <Button title="edit" onPress={()=>alert(item._id)
//                   }/>
//               </View>
//               <View style={{marginLeft:10}}>
//                    <Button title="X" onPress={()=>alert(item._id)}/>
//               </View> */}
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

const CheckList = () => {
  const [list, setlist] = useState(false);
  const [createlist, setcreatelist] = useState();
  const [data, setdata] = useState([]);

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
    console.log(inputs, createlist);
  };

  // const showroll = async () => {
  //   const resp = await fetch('http://192.168.1.99:8000/api/role');
  //   const data = await resp.json();
  //   //  console.log(data);
  //   setdata(data);
  // };

  // useEffect(() => {
  //   showroll();
  // }, []);

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
                  <Text>Title</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setcreatelist}
                    value={createlist}
                    
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
                <Card style={{borderWidth:1,marginTop:5}}>
                  <Card.Content>

                
                <View style={styles.container}>
                  <ScrollView style={styles.inputsContainer}>
                    {inputs.map((input, key) => (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <TextInput
                          style={styles.inputcheck}
                          placeholder={'Enter Name'}
                          value={input.value}
                          onChangeText={setInputs =>
                            inputHandler(setInputs, key)
                          }
                        />
                        <TouchableOpacity onPress={() => deleteHandler(key)}>
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
                    createList();
                  }}
                />
                {/* </Card.Content>
                </Card> */}
              </View>
            </View>
          </Modal>
        </View>
        <View>
          <ScrollView>
          <Card style={{borderWidth:2,marginTop:5,borderRadius:10,elevation:20,}}>
            <Card.Content>
              <Title style={{borderBottomWidth:1}}>Manager</Title>
              <ScrollView style={styles.sa}>
                <Text style={{ padding:5,fontSize:16}}>1 hghdfgkhdfghdfghhfghsd</Text>
                <Text style={{ padding:5,fontSize:16}}>2 hghdfgkhdfghdfghhfghsd</Text>
                <Text style={{ padding:5,fontSize:16}}>3 hghdfgkhdfghdfghhfghsd</Text>
                <Text style={{ padding:5,fontSize:16}}>4 hghdfgkhdfghdfghhfghsd</Text>
                <Text style={{ padding:5,fontSize:16}}>5 hghdfgkhdfghdfghhfghsd</Text>
              </ScrollView>
            </Card.Content>
          </Card>

          <Card style={{borderWidth:2,marginTop:5,borderRadius:10}}>
            <Card.Content>
              <Title style={{borderBottomWidth:1}}>TeamLeader</Title>
              <ScrollView style={styles.sa}>
                <Text style={{ padding:5,fontSize:16}}>1 hghdfgkhdfghdfghhfghsd</Text>
                <Text style={{ padding:5,fontSize:16}}>2 hghdfgkhdfghdfghhfghsd</Text>
                <Text style={{ padding:5,fontSize:16}}>3 hghdfgkhdfghdfghhfghsd</Text>
                <Text style={{ padding:5,fontSize:16}}>4 hghdfgkhdfghdfghhfghsd</Text>
                <Text style={{ padding:5,fontSize:16}}>5 hghdfgkhdfghdfghhfghsd</Text>
              </ScrollView>
            </Card.Content>
          </Card>
          <Card style={{borderWidth:2,marginTop:5,borderRadius:10}}>
            <Card.Content>
              <Title style={{borderBottomWidth:1}}>TeamLeader</Title>
              <ScrollView style={styles.sa}>
                <Text style={{ padding:5,fontSize:16}}>1 hghdfgkhdfghdfghhfghsd</Text>
                <Text style={{ padding:5,fontSize:16}}>2 hghdfgkhdfghdfghhfghsd</Text>
                <Text style={{ padding:5,fontSize:16}}>3 hghdfgkhdfghdfghhfghsd</Text>
                <Text style={{ padding:5,fontSize:16}}>4 hghdfgkhdfghdfghhfghsd</Text>
                <Text style={{ padding:5,fontSize:16}}>5 hghdfgkhdfghdfghhfghsd</Text>
              </ScrollView>
            </Card.Content>
          </Card>
        </ScrollView>
        </View>
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
  // dropdown: {
  //   height: 50,
  //   borderWidth: 1,
  //   borderRadius: 8,
  //   paddingHorizontal: 8,
  //   marginTop: 5,
  // },
  // icon: {
  //   marginRight: 5,
  // },
  // label: {
  //   position: 'absolute',
  //   backgroundColor: 'white',
  //   left: 22,
  //   top: 8,
  //   zIndex: 999,
  //   paddingHorizontal: 8,
  //   fontSize: 14,
  // },
  // placeholderStyle: {
  //   fontSize: 16,
  // },
  // selectedTextStyle: {
  //   fontSize: 16,
  // },
  // // iconStyle: {
  // //   width: 20,
  // //   height: 20,
  // // },
  // inputSearchStyle: {
  //   height: 40,
  //   fontSize: 16,

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
});
