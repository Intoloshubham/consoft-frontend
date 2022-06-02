import React,{useEffect} from 'react';
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
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {Dropdown, FormInput, HeaderBar, TextButton,} from '../../../../Components';
import {COLORS, FONTS, SIZES} from '../../../../constants';
import {
  IndexPath,
  Layout,
  Select,
  SelectGroup,
  SelectItem,
} from '@ui-kitten/components';
import { color } from 'react-native-reanimated';

const url = 'http://192.168.1.99:8000/api/item';

const Items = () => {
  const [itemname, setItemname] = React.useState('');
  const [itemunit, setItemunit] = React.useState('');
  

  // modal
  const [itemmodal, setItemmodal] = React.useState(false);
  const [unitmodal, setunitmodal] = React.useState(false);


  const [demo, setdemo] = React.useState('');
  const [data, setdata] = React.useState([])

  const fetchData = async () => {
    const resp = await fetch('http://192.168.1.99:8000/api/item');
    const data = await resp.json();
    //  console.log(data);
        setdata(data);
    
  };

  const submit = (e) => {
    const data = {
      item_name: itemname,
      unit_id: itemunit,
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
        setItemunit('');
        fetchData();
        // console.log('Success:', data);
        {
          itemname == '' || itemunit == ''
            ? alert('all filed fill ')
            : alert('item Created Succcessfully');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
   fetchData(); 
  }, [])
  

  const renderItem = ({item}) => {

    return (
          <ScrollView style={styles.scrollView}>
          <View style={styles.item}>
          <Text style={styles.titleText}>{item.unit_id}</Text>
          <Text style={styles.titleText}>{item.item_name}</Text>
          
          {/* <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Button title="edit" />
            <Button title="X" />
          </View> */}
        </View>
      </ScrollView>
    );
  };

  return (
    <View>
      <HeaderBar right={true} />
      <View style={{marginHorizontal: SIZES.padding}}>
        <Card style={styles.card}>
          <Card.Content>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Title>StockItem</Title>
              <Button title="Addnew" onPress={() => setItemmodal(true)} />
              {/* modal start  */}
              <Modal animationType='slide' transparent={false} visible={itemmodal}>
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
                        <Button
                          title="addItem"
                          onPress={() => setunitmodal(true)}
                        />
                        <Modal animationType='slide' transparent={false} visible={unitmodal}>
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
                                      <Title>name</Title>
                                        <TextInput
                                          style={styles.input}
                                          onChangeText={setdemo}
                                          value={demo}
                                           />
                                          


                                      <TextButton
                                        label="Save"
                                        buttonContainerStyle={{
                                          height: 45,
                                          borderRadius: SIZES.radius,
                                          marginTop: SIZES.padding,
                                        }}
                                        onPress={() =>console.log("click")}
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
                          <Title style={{...FONTS.h3,color:COLORS.darkGray}}>Item-name</Title>
                          <TextInput
                          placeholder='item name'
                            style={styles.input}
                            onChangeText={setItemname}
                            value={itemname}
                          />

                          <Text style={{...FONTS.h3,color:COLORS.darkGray}}>Unit</Text>
                          <TextInput
                            placeholder='unit name'
                            style={styles.input}
                            onChangeText={setItemunit}
                            value={itemunit}
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
        <View>
          <Card>
            <Card.Content>
              <Title>ItemList</Title>
              <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item  => item._id}
            />
            </Card.Content>
          </Card>
        </View>
        <View><Text>fhjsdhf</Text></View>
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
    backgroundColor:COLORS.gray2,
    color:"black",
    margin:10
  },
  item:{
    flex:1,
    flexDirection:"row",
  },
  titleText:{
    fontSize:18,
    padding:10,
    fontWeight:"bold",
  }

});
