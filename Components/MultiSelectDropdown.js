import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';
import {icons, SIZES, COLORS} from '../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';

const MultiSelectDropdown = ({data, value, onChange}) => {
  return (
    <View
      style={{marginHorizontal: SIZES.padding, marginVertical: SIZES.padding}}>
      <MultiSelect
        style={{
          width: '100%',
          height: 45,
          backgroundColor: COLORS.gray3,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.base,
        }}
        data={data}
        labelField="label"
        valueField="value"
        label="Multi Select"
        placeholder="Select item"
        // search
        searchPlaceholder="Search"
        value={value}
        onChange={onChange}
        renderItem={item => {
          return (
            <View style={styles.item}>
              <Text style={styles.selectedTextStyle}>{item.label}</Text>
            </View>
          );
        }}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Text style={styles.textSelectedStyle}>{item.label}</Text>
              <AntDesign color="black" name="delete" size={17} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {padding: 16},
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});
export default MultiSelectDropdown;
