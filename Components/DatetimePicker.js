import React, {useState} from 'react';
import {
  View,
  Button,
  Text,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {HeaderBar} from '../Components';
import {COLORS, FONTS, SIZES, icons} from '../constants';

const DatetimePicker = ({onPress, onChange}) => {
  //   const [date, setDate] = useState(new Date(1598051730000));
  //   const onChange = (event, selectedDate) => {
  //     const currentDate = selectedDate;
  //     setDate(currentDate);
  //   };

  const showMode = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onChange,
      mode: date,
      is24Hour: true,
    });
  };

  //   const showDatepicker = () => {
  //     showMode('date');
  //   };

  //   const showTimepicker = () => {
  //     showMode('time');
  //   };
  return (
    <View
      style={{
        padding: 20,
        borderRadius: SIZES.base,
        backgroundColor: COLORS.lightblue_700,
        ...styles.shadow,
      }}>
      <Text
        style={{
          ...FONTS.h2,
          color: COLORS.white,
        }}>
        Expected Date
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            marginTop: SIZES.padding,
            // height: 50,
            width: '65%',
            borderWidth: 2,
            borderColor: COLORS.lightGray1,
            borderRadius: SIZES.base,
            // alignItems: 'center',
            paddingHorizontal: SIZES.radius,
            paddingVertical: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
            }}>
            Date: {date.toLocaleDateString()}
          </Text>
          {/* <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
            }}>
            Time: {date.toLocaleTimeString()}
          </Text> */}
        </View>
        <View
          style={{
            marginTop: SIZES.padding,
            height: 50,
            width: '30%',
            borderWidth: 2,
            borderColor: COLORS.lightGray1,
            borderRadius: SIZES.base,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.base,
          }}>
          <TouchableOpacity onPress={onPress}>
            <Image
              source={icons.date}
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.success_300,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={showTimepicker}>
            <Image
              source={icons.time}
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.success_300,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
export default DatetimePicker;
