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
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {FormInput, HeaderBar, TextButton} from '../../../Components';
import {SIZES, COLORS, icons, images, FONTS} from '../../../constants';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
  const [createlist, setcreatelist] = useState('');
  const [data, setdata] = useState([]);

  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);

  // create list funcation
  const createList = () => {
    console.log(value, createlist)
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
          <View style={{flex: 1, backgroundColor: '#000000aa',justifyContent:"center"}}>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 30,
                borderRadius: 20,
                margin:10
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
                <Card style={styles.card}>
                  <Card.Content>
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
                    <FormInput
                      label="Name"
                      onChange={createlist => {
                        setcreatelist(createlist);
                      }}
                    />
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
            maxHeight={400}
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
export default CheckList;

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    elevation: 20,
    borderRadius: 5,
    marginTop: 30,
  },
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
});
