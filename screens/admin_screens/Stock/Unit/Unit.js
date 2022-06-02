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
import {SIZES, COLORS, icons, Images} from '../../../../constants';
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.item}>
          <Text style={styles.title}>{item.unit_name}</Text>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Button title="edit" />
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
        <View>
          <Title>UnitList</Title>
          <FlatList

            data={data}
            renderItem={renderItem}
            keyExtractor={item => `${item._id}`}
          />
        </View>
      </View>
    </View>
  );
};

export default Unit;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    // backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
  },

  item: {
    // backgroundColor: '#f9c2ff',

    padding: 20,
    marginVertical: 2,
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: COLORS.gray2,
    color: 'black',
  },
  scrollView: {
    height: 60,
  },
});
