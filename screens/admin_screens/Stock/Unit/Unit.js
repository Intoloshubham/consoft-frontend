import React, {useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  StatusBar,
  Modal,
  Pressable,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {
  Dropdown,
  FormInput,
  HeaderBar,
  TextButton,
} from '../../../../Components';
import {SIZES, COLORS, icons, Images, FONTS} from '../../../../constants';
import {
  Autocomplete,
  IndexPath,
  Layout,
  Select,
  SelectGroup,
  SelectItem,
} from '@ui-kitten/components';

const url = 'http://192.168.1.99:8000/api/unit';

const Unit = (props) => {
  const [unitname, setUintname] = React.useState('');
  const [data, setdata] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // modal create unit
  const [modal, setModal] = React.useState(false);

  const fetchData = async () => {
    const resp = await fetch('http://192.168.1.99:8000/api/unit');
    const data = await resp.json();
    // console.log(data);
    setdata(data);
    setLoading(false);
  };

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
        //  console.log('Success:', data);
        {
          unitname == ''
            ? alert('plz fill unitname')
            : alert('unit Created Succcessfully');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  // get data api list
  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({item}) => {
    return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
     
          <View style={styles.item}>
           <Text style={styles.title}>{item.unit_name}</Text>
              <View style={{justifyContent:"space-evenly", flexDirection: 'row',}}>
                <Button title="edit"/>
                <Button title="X" />
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
        <Card style={{borderWidth: 1}}>
          <Card.Content>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Title>Units</Title>
              <Button title="addunit" onPress={() => setModal(true)} />
              <Modal animationType="fade" transparent={false} visible={modal}>
                <View style={{backgroundColor: '#000000aa', flex: 1}}>
                  <View
                    style={{
                      flex: 1,
                      margin: 20,
                      padding: 20,
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderRadius: 20,
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
                    <View style={{marginTop: 100}}>
                      <Card style={{backgroundColor: ''}}>
                        <Card.Content>
                          <Title>Unitname</Title>
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
                            onPress={() => submit()}
                          />
                        </Card.Content>
                      </Card>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </Card.Content>
        </Card>
        <View
      style={{
        marginBottom: SIZES.padding,
        marginTop:5,
        padding: 20,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        ...styles.shadow,
      }}>
      <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Unit List</Text>
      <FlatList
        contentContainerStyle={{marginTop: SIZES.radius}}
        scrollEnabled={false}
        data={data}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
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
    //  width:"80%",
    //  textAlign:"center",
    //  marginHorizontal:30,
    //  marginTop:10,
    //  borderWidth:1,
    //  padding:5,
    
     

  },
  title:{
    fontSize:20,
    fontWeight:"bold",  
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
  
