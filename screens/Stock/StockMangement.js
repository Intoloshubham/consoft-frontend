import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import {FormInput, TextButton, Dropdown} from '../../Components';
import {SIZES, COLORS, icons} from '../../constants';
import {Card, Title, DataTable} from 'react-native-paper';
import {IndexPath, Select, SelectItem, Icon} from '@ui-kitten/components';
// import SelectDropdown from 'react-native-select-dropdown'
// import  Deeler from '../Stock/Deeler'

const DATA = [
  {
    id: '1',
    title: 'Sand',
  },
  {
    id: '2',
    title: 'Cement',
  },
  {
    id: '3',
    title: 'Stone',
  },
  {
    id: '4',
    title: 'Iron',
  },
];

// create  a table  const
// const optionsPerPage = [2, 3, 4];

//  const CalendarIcon = props => <Icon {...props} name="calendar" />;
const countries = ['Jabalpur', 'Bhopal', 'Katni', 'Indore'];
const DeelerName = ['Anurag', 'Abhishek', 'Anmol', 'Rohit'];

function StockMangement() {
  // modal stock city useState
  const [selectedIndex, setSelectedIndex] = React.useState();
  const [modal, setModal] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const [sand, setSand] = React.useState('');
  const [cement, setCement] = React.useState('');
  const [stone, setStone] = React.useState('');
  const [iron, setIron] = React.useState('');

  const [value, setValue] = React.useState('');

  const [date, setDate] = React.useState(new Date());

  const renderItem = ({item}) => <Item title={item.title} />;

  // const [page, setPage] = React.useState(0);
  // const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  // React.useEffect(() => {
  //   setPage(0);
  // }, [itemsPerPage]);

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <View>
        <Button title="addItem" onPress={() => setShow(true)} />
        <Modal visible={show} transparent={false}>
          <View style={{backgroundColor: '#000000aa', flex: 1}}>
            <View
              style={{
                backgroundColor: '',
                margin: 10,
                padding: 10,
                borderRadius: 10,
                flex:1
              }}>
              <ScrollView>
              <Card>
                <Card.Content>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                     
                    }}>
                    <Title style={{fontSize: 20, textAlign: 'center'}}>
                      StockItem
                    </Title>
                    <Button title="closed" onPress={() => setShow(false)} />
                  </View>
                </Card.Content>
              </Card>

              <Card style={{backgroundColor: 'rgba(171, 170, 158, 0.8)',flex:1}}>
                <Card.Content>
                  <View>
                    <Title style={styles.itemText}>StockItem_id</Title>
                    <FormInput />
                    <Title style={styles.itemText}>Date</Title>
                    <FormInput />
                    <Title style={styles.itemText}>DeelerName</Title>
                    <Dropdown
                      data={DeelerName}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                    />
                    <Title style={styles.itemText}>City</Title>
                    <Dropdown
                      data={countries}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                    />
                    <TextButton
                      label="Submit"
                      buttonContainerStyle={{
                        height: 45,
                        borderRadius: SIZES.radius,
                        marginTop: SIZES.padding,
                      }}
                      onPress={() => console.log('fgj')}
                    />
                  </View>
                </Card.Content>
              </Card>
             </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        margin: 10,
      }}>
      <Card style={{backgroundColor: ''}}>
        <Card.Content>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <Title style={{fontSize: 20, color: '#000'}}>StockMaterial</Title>
            <Button title="StockItemModal" onPress={() => setModal(true)} />
          </View>
        </Card.Content>
      </Card>

      {/* <Text style={{fontSize: 20}}>StockItemModal</Text>
              <Button title="StockItemModal" onPress={() => setModal(true)} /> */}
            {/* <Card>
              <Card.Content>
                
              </Card.Content>
            </Card> */}


      <View>
        <Modal visible={modal} animationType="slide" transparent={true}>
          <View style={{backgroundColor: '#000000aa', flex: 1}}>
            <View
              style={{
                margin: 30,
                backgroundColor: 'rgba(171, 170, 158, 0.8)',
                flex: 1,
                borderRadius: 10,
              }}>
              <ScrollView>
                <Text
                  style={{
                    fontSize: 20,
                    width: '100%',
                    height: 40,
                    backgroundColor: 'black',
                    color: 'white',
                  }}>
                  StockItem
                </Text>

                {/* modal body  */}
                <View
                  style={{
                    flex: 1,
                    marginHorizontal: SIZES.padding,
                    marginVertical: SIZES.padding,
                  }}>
                  <FormInput
                    placeholder="Sand"
                    containerStyle={{
                      color: COLORS.gray,
                    }}
                    onChange={value => {
                      //validate email
                      setSand(value);
                    }}
                    appendComponent={
                      <View style={{justifyContent: 'center'}}>
                        <Image
                          source={icons.correct}
                          style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.green,
                          }}
                        />
                      </View>
                    }
                  />
                  <FormInput
                    placeholder="Cement"
                    containerStyle={{
                      color: COLORS.gray,
                    }}
                    onChange={value => {
                      setCement(value);
                    }}
                    appendComponent={
                      <View style={{justifyContent: 'center'}}>
                        <Image
                          source={icons.correct}
                          style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.green,
                          }}
                        />
                      </View>
                    }
                  />
                  <FormInput
                    placeholder="Stone"
                    containerStyle={{
                      color: COLORS.gray,
                    }}
                    onChange={value => {
                      setStone(value);
                    }}
                    appendComponent={
                      <View style={{justifyContent: 'center'}}>
                        <Image
                          source={icons.correct}
                          style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.green,
                          }}
                        />
                      </View>
                    }
                  />
                  <FormInput
                    placeholder="Iron"
                    containerStyle={{
                      color: COLORS.gray,
                    }}
                    onChange={value => {
                      setIron(value);
                    }}
                    appendComponent={
                      <View style={{justifyContent: 'center'}}>
                        <Image
                          source={icons.correct}
                          style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.green,
                          }}
                        />
                      </View>
                    }
                  />
                  <TextButton
                    label="Submit"
                    buttonContainerStyle={{
                      height: 45,
                      borderRadius: SIZES.radius,
                      marginTop: SIZES.padding,
                    }}
                    onPress={() => console.log('fgj')}
                  />
                </View>
              </ScrollView>
              <Button title="closed" onPress={() => setModal(false)} />
              {/* modal bady end  */}
            </View>
          </View>
        </Modal>
      </View>

      <View style={{marginTop: 10}}>
        <Card style={{backgroundColor: ''}}>
          <Card.Content>
            <Title
              style={{
                backgroundColor: '#95929c',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              StockItemList
            </Title>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </Card.Content>
        </Card>
      </View>
      {/* Table create stock item  */}
      <View style={{marginTop: 5}}>
        <Card style={{backgroundColor: ''}}>
          <Card.Content>
            <Title>StockItemTable</Title>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={{fontSize: 15}}>
                  StockItem
                </DataTable.Title>
                <DataTable.Title numeric>Quantity</DataTable.Title>
                <DataTable.Title numeric>Abelable</DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell>Sand</DataTable.Cell>
                <DataTable.Cell numeric>159</DataTable.Cell>
                <DataTable.Cell numeric>6.0</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Cement</DataTable.Cell>
                <DataTable.Cell numeric>237</DataTable.Cell>
                <DataTable.Cell numeric>8.0</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Stone</DataTable.Cell>
                <DataTable.Cell numeric>237</DataTable.Cell>
                <DataTable.Cell numeric>8.0</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Iron</DataTable.Cell>
                <DataTable.Cell numeric>237</DataTable.Cell>
                <DataTable.Cell numeric>8.0</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 0,
  },
  item: {
    backgroundColor: 'rgba(206, 205, 230, 0.99)',
    padding: 5,
    marginVertical: 2,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  header: {
    fontSize: 15,
    backgroundColor: '',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemText:{
    color:"white"
  }
});
export default StockMangement;
