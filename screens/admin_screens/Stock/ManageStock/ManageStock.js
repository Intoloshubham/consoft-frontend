import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, Modal, Pressable} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Card, Title} from 'react-native-paper';
import {
  FormInput,
  CustomDropdown,
  TextButton,
  HeaderBar,
} from '../../../../Components';
import {COLORS, FONTS, SIZES} from '../../../../constants';

const ManageStock = () => {
  const [modalstock, setmodalstock] = useState(false);
  const [itemname, setItemname] = React.useState('');

  const [data, setdata] = useState([]);

  const [qty, setqty] = useState('');
  const [place, setplace] = useState('');
  const [vehicle, setvehicle] = useState('');
  // console.log(itemname,qty,place,vehicle);

  const itemData = async () => {
    try {
      const resp = await fetch('http://192.168.1.99:8000/api/item');
      const data = await resp.json();
      console.log(data);
      setdata(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    itemData();
  }, []);

  return (
    <View>
      <HeaderBar right={true} title="Manage Stock" />
      <View
        style={{
          marginHorizontal: SIZES.padding,
          backgroundColor: COLORS.white,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding,
          borderRadius: SIZES.radius,
          justifyContent: 'space-between',
          ...styles.shadow,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Title>Stock entry</Title>
          {/* <Button title="stockentry" onPress={() => setmodalstock(true)} /> */}
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.lightblue_700,
              paddingHorizontal: SIZES.radius,
              paddingVertical: SIZES.base,
              borderRadius: SIZES.radius,
            }}
            onPress={() => setmodalstock(true)}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h3,
              }}>
              Stock Entry
            </Text>
          </TouchableOpacity>
          <Modal animationType="slide" transparent={false} visible={modalstock}>
            <View style={{backgroundColor: '#000000aa', flex: 1}}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  marginTop: 50,
                  padding: 30,
                  borderTopRightRadius: 30,
                  borderTopLeftRadius: 30,
                }}>
                <View>
                  <Pressable onPress={setmodalstock}>
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
                <ScrollView>
                  <Card style={styles.card2}>
                    <Card.Content>
                      <CustomDropdown
                        data={data}
                        value={itemname}
                        labelField="label"
                        keyExtractor={item => `${item._id}`}
                        onChange={item => {
                          setItemname(item);
                        }}
                        renderItem={item => {
                          // console.log(item.item_name);
                          return (
                            <View
                              style={{
                                marginHorizontal: SIZES.radius,
                                marginTop: SIZES.base,
                              }}>
                              <Text style={{...FONTS.body4}}>
                                {item.item_name}
                              </Text>

                              {/* {item.unit_id === value && (
                                    <AntDesign
                                      color={COLORS.blue}
                                      name="check"
                                      size={20}
                                    />
                                  )} */}
                            </View>
                          );
                        }}
                      />

                      <FormInput
                        label="Quantity"
                        onChange={qty => {
                          setqty(qty);
                        }}
                      />
                      <FormInput
                        label="Place"
                        onChange={place => {
                          setplace(place);
                        }}
                      />
                      <FormInput
                        label="Vehicleno"
                        onChange={vehicle => {
                          setvehicle(vehicle);
                        }}
                      />
                      <TextButton
                        label="Save"
                        buttonContainerStyle={{
                          height: 45,
                          borderRadius: SIZES.radius,
                          marginTop: SIZES.padding,
                        }}
                        onPress={() => save()}
                      />
                    </Card.Content>
                  </Card>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

export default ManageStock;

const styles = StyleSheet.create({
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
