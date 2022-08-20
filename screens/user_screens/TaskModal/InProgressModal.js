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

Entypo.loadFont();

function InProgressModal({ inProgressModal, setinProgressModal }) {
  const [count, setCount] = React.useState(0);
  const [Num, setNum] = React.useState(0);
  const [dumybardata, setdumybardata] = React.useState(dummyData.barData);
  const [ShowCounterid, setShowCounterid] = useState(null);
  const ShowCounteridRef = React.useRef();
  const [Data, setData] = useState(null);
  const GetPercentIdRef = React.useRef();

  const __handle_increase_counter = (item, id) => {
    // setShowCounterid(id)
    ShowCounteridRef.current = id;
    console.log('showcounterref=' + ShowCounteridRef.current + '' + 'id=' + id);
    if (id == ShowCounteridRef.current) {
      if (count < 100) {
        setCount(count => count + 5);
      }
    } else {
      setCount(5);
    }
  };

  const __handle_decrease_counter = (item, id) => {
    // setShowCounterid(id)
    ShowCounteridRef.current = id;
    if (id == ShowCounteridRef.current) {
      if (count > 0) {
        setCount(count => count - 5);
      }
    } else {
      setCount(5);
    }
  };

  const Text_Counter = (item, id) => {
    return (
      <TextInput
        placeholder="%"
        style={{
          width: 60,
          height: 40,
          fontSize: 15,
          top: 5,
          color: COLORS.black,
        }}
        editable={false}
        value={String(`${count}%`)}

      // onChange={(e) => __handleonchange(e)}
      ></TextInput>
    );
  };
  const Text_Counter2 = (item, id) => {
    return (
      <TextInput
        placeholder=" "
        style={{
          width: 60,
          height: 40,
          fontSize: 15,
          top: 5,
          color: COLORS.black,
        }}
        editable={false}
        value={String(`${0}%`)}></TextInput>
    );
  };

  const __getPercent = (item, id) => {
    const new_data = dumybardata.findIndex(i => i.label === item.label);
    GetPercentIdRef.current = new_data;
    // GetPercentIdRef
    // console.log(new_data);
    // console.log(GetPercentIdRef.current);
    if (GetPercentIdRef.current == id) {
      console.log(count);
      setCount(0);
    } else {
      return null;
    }
  };

  const CountingComponent = () => {
    return dumybardata.map((item, index1) => {
      return (
        // Container
        <View
          style={{
            flexDirection:"row",
            justifyContent:"space-between",
          }}
          key={index1}
        >
        {/* PARENT VIEW FOR SNO AND DATE PLUS CODE  */}
          <View 
          style={{
            flexDirection:"row",
            justifyContent:"space-between",
            marginHorizontal:SIZES.padding
            }}>
            <View>
              <Text>{item.label}</Text>
            </View>
            <View>
              <Text>{item.date}</Text>
            </View>
            <View>
              <Text>{item.code}</Text>
            </View>
          </View>
          {/* INC AND DEC BUTTON PARENT VIEW START */}
          <View>
            <TouchableOpacity
              
            >              
            </TouchableOpacity>
            <TouchableOpacity
            
            >              
            </TouchableOpacity>
          </View>


        </View>
      );
    })
  };



  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={inProgressModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setinProgressModal(!inProgressModal);
          clearInterval(countInterval);
        }}>
        <View style={styles.modal_container}>
          {/* main view start  */}
          <View style={{}}>

            <View
              style={[styles.act_tsk_stat_view,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 15,
                borderWidth: 1,
                elevation: 1,
                paddingVertical: SIZES.h5,
                borderColor: COLORS.transparentBlack2,
                margin: SIZES.radius * 0.2,
                borderRadius: SIZES.radius * 0.4
              }]}>
              <View>
                <Text
                  style={[
                    styles.act_tsk_stat,
                    { color: COLORS.white2, ...FONTS.body2, textAlign: 'center' },
                  ]}>
                  Active Task Statistic
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  paddingHorizontal: SIZES.radius
                }}
                onPress={() => setinProgressModal(!inProgressModal)}>
                <Entypo name="cross" color={'black'} size={25} />
              </TouchableOpacity>
            </View>
          </View>
          {/* main view close */}
          <View
            style={{
            }}>
            <CountingComponent />
          </View>
        </View>
      </Modal>
    </>
  );
}
export default InProgressModal;
