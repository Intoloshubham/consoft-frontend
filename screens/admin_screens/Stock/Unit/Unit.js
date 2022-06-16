import React, {useState, useEffect, useParams} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {FormInput, HeaderBar, TextButton} from '../../../../Components';
import {SIZES, COLORS, icons, Images, FONTS} from '../../../../constants';

const url = 'http://192.168.1.99:8000/api/unit';

const Unit = () => {
  const [unitname, setUintname] = useState('');
  const [data, setdata] = useState([]);

  const [loading, setLoading] = React.useState(true);

  // modal create unit
  const [modal, setModal] = useState(false);
  const [showBox, setShowBox] = useState(false);

  const [unitid, setunitid] = useState('');
  // console.log(unitid);
  // const [edit, setedit] = useState([]);
  // const idref = React.useRef();

  const updateunit = (id,name) => {
    setShowBox(true);
      setunitid(id);
    //  console.log(id);
     setUintname(name)
     console.log(name);
    
  };

  const  Update =(id)=> {
    const data = {
      unit_name: unitname,
    };
      fetch(`http://192.168.1.99:8000/api/unit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        setUintname('');
        fetchData();
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }


  const fetchData = async () => {
    const resp = await fetch('http://192.168.1.99:8000/api/unit/');
    const data = await resp.json();
    //  console.log(data);
    setdata(data);
  };
  // get data api list

  useEffect(() => {
    fetchData();
  }, []);

  function submit(e) {
    const data = {
      unit_name: unitname,
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
        setUintname('');
        fetchData();
        console.log('Success:', data.message);
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

  //  delete unit api
  const DeleteUnit = async id => {
    console.log(id);
    let result = await fetch(`http://192.168.1.99:8000/api/unit/${id}`, {
      method: 'DELETE',
    });
    result = await result.json();
    console.log(result, alert('this unit deleted '));
    fetchData();
  };

  

  const renderItem = ({item}) => {
    return (
      <ScrollView>
        <View>
          <View style={styles.item}>
            <Text style={styles.title}>{item.unit_name}</Text>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <View style={{marginRight: 5}}>
                <Button
                  title="edit"
                  onPress={() => updateunit(item._id,item.unit_name,)}
                />
                <Modal
                  animationType="fade"
                  transparent={false}
                  visible={showBox}>
                  <View
                    style={{
                      backgroundColor: '#000000aa',
                      flex: 1,
                    }}>
                    <View
                      style={{
                        marginTop: 100,
                        padding: 20,
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderRadius: 20,
                        margin: 10,
                      }}>
                      <View>
                        <Pressable onPress={setShowBox}>
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
                      <View style={{marginTop: 10}}>
                        <Card style={{backgroundColor: ''}}>
                          <Card.Content>
                            <Title>Edit unit</Title>
                            <FormInput
                              value={unitname}
                              label="unit name"
                              onChange={value => {
                                setUintname(value);
                              }}
                            />

                            <TextButton
                              label="Update"
                              buttonContainerStyle={{
                                height: 45,
                                borderRadius: SIZES.radius,
                                marginTop: SIZES.padding,
                              }}
                              onPress={() => Update(item._id)}
                            />
                          </Card.Content>
                        </Card>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
              <View style={{marginLeft: 10}}>
                <Button title="X" onPress={() => DeleteUnit(item._id)} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{flex: 1}}>
      <HeaderBar right={true} />

      <View
        style={{
          marginHorizontal: SIZES.padding,
        }}>
        <Modal animationType="fade" transparent={false} visible={modal}>
          <View
            style={{
              backgroundColor: '#000000aa',
              flex: 1,
            }}>
            <View
              style={{
                marginTop: 100,
                padding: 20,
                backgroundColor: '#fff',
                borderWidth: 1,
                borderRadius: 20,
                margin: 10,
              }}>
              <View>
                <Pressable onPress={setModal}>
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
              <View style={{marginTop: 10}}>
                <Card style={{backgroundColor: ''}}>
                  <Card.Content>
                    <Title>Unit name</Title>
                    <FormInput
                      onChange={unitname => {
                        setUintname(unitname);
                      }}
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
            <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Units</Text>
            <Button title="add unit" onPress={() => setModal(true)} />
          </View>
          <FlatList
            maxHeight={410}
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
      </View>
    </View>
  );
};

export default Unit;
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
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
    fontSize: 20,
    backgroundColor: COLORS.gray2,
    color: 'black',
  },
  // listcard:{
  //   backgroundColor:"#FDF6EC",
  //   borderWidth:2,
  //   shadowColor:"#787A91",
  //   margin:5,
  //   elevation:50
  // },
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
