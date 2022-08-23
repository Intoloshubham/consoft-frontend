import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
  StyleSheet,
  FlatList,
  Image,
  Animated,
  TextInput,
  ScrollView,
  Pressable, TouchableWithoutFeedback
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  icons,
  COLORS,
  SIZES,
  FONTS,
  dummyData,
  images,
} from '../../../constants';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './css/InProgressModalStyle';
import { IconButton } from '../../../Components'

Entypo.loadFont();

function InProgressModal({ inProgressModal, setinProgressModal }) {

  const [counterData, setCounterData] = React.useState(dummyData.barData);

  const [inputs, setInputs] = useState(counterData);

  const __handle_increase_counter = (item, index1) => {
    const _inputs = [...inputs];
    if (_inputs[index1].count < 100) {
      _inputs[index1].count = _inputs[index1].count + 5;
      _inputs[index1].key = index1;
      // console.log("🚀 ~ file: InProgressModal.js ~ line 39 ~ InProgressModal ~ _inputs", _inputs)
      setInputs(_inputs);
    }
  };

  const __handle_decrease_counter = (item, index1) => {
    const _inputs = [...inputs];
    if (_inputs[index1].count > 0) {
      _inputs[index1].count = _inputs[index1].count - 5;
      _inputs[index1].key = index1;
      // console.log("🚀 ~ file: InProgressModal.js ~ line 39 ~ InProgressModal ~ _inputs", _inputs)
      setInputs(_inputs);
    }
  };





  function CountingComponent() {
    return (
      <View style={{ margin: 10 }}>
        {
          inputs.map((item, index) => {
            return (
              <View key={index}
                style={{
                  marginTop: 15,
                  backgroundColor: COLORS.lightblue_200,
                  height: 150,
                  borderRadius: 5,
                  elevation: 10

                }}>
                <View style={{ backgroundColor: COLORS.lightblue_300, width: `${item.count}%`, borderBottomWidth: 10, borderColor:COLORS.green }}>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                  <Text style={{ color: 'black' }}>{item.code}</Text>
                  <Text style={{ color: 'black' }}>{item.date}</Text>
                </View>
                <View style={{ backgroundColor: COLORS.lightblue_500, height: 80, marginHorizontal: 10, marginTop: 5, padding: 10, borderRadius: 5 }}>
                  <Text style={{ color: 'black' }}>filling</Text>
                </View>
                <View style={{ marginTop: 5, marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={() => __handle_decrease_counter(item, index)}
                    >
                      <Entypo
                        name="minus"
                        size={25}
                        color={COLORS.black}
                      />
                    </TouchableOpacity>
                    <View>
                      <TextInput
                        style={styles.inputfromone}
                        editable={false}
                        // value={item.count[index1]}
                        value={String(`${item.count}%`)}
                        // onChangeText={(text)=>__handle_increase_counter(text,index1)}
                        placeholderTextColor={COLORS.lightGray1}
                        keyboardType="numeric"
                        placeholder={'counter'}
                      />
                    </View>
                    <TouchableOpacity

                      onPress={() => __handle_increase_counter(item, index)}
                    >
                      <Entypo
                        name="plus"
                        size={25}
                        color={COLORS.black}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={{ backgroundColor: COLORS.darkGray, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 1 }}>
                    <Text style={{ color: 'white', ...FONTS.h5 }}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  };



  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={inProgressModal}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: COLORS.transparentBlack8,
        }}>
        <View
          style={{
            backgroundColor: COLORS.white2,
            // position: 'absolute',
            width: '100%',
            height: '90%',
            // padding: SIZES.radius,
            paddingHorizontal: SIZES.base,
            paddingTop: SIZES.radius,
            paddingBottom: SIZES.padding,
            borderTopRightRadius: SIZES.base,
            borderTopLeftRadius: SIZES.base,
            backgroundColor: COLORS.white,
          }}>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center' ,marginBottom:15}}>
          <Text style={{color:'black',...FONTS.h2}}>Active Tasks Statistics</Text>
            <IconButton
              containerStyle={{
                boborderWidth: 2,
                borderRadius: 10,
                borderColor: COLORS.gray2,
              }}
              icon={icons.cross}
              iconStyle={{
                tintColor: COLORS.gray,
              }}
              onPress={() => setinProgressModal(false)}
            />
          </View>
          <ScrollView nestedScrollEnabled={true}>
            {CountingComponent()}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
export default InProgressModal;
